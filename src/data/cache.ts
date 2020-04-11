export interface CacheOptions {
  duration?: number;
  location?: Storage;
  key?: string;
  // Allow figuring out cache key at runtime using the args provided to the wrapped async function
  getCacheKey?: (...providedParams: any[]) => string;
  cacheBustKey?: string;
}

let defaultConfig: CacheOptions = {
  duration: 1000 * 60,
  location: sessionStorage,
  cacheBustKey: "bustcache", // bustcache=true or bustcache=true
};

let _isExpired = (cacheValue) => {
  return cacheValue.expiration && Date.now() > cacheValue.expiration;
};

let getOptions = function (cacheOpts: CacheOptions | string): CacheOptions {
  if (typeof cacheOpts === "string") {
    cacheOpts = {
      key: cacheOpts as string,
    };
  }
  return { ...defaultConfig, ...cacheOpts };
};

/*
 *  Check the querystring for a the specified cache buste param key.
 *  Note: Currently only look for presence of key, doesn't care what value is
 *  So 'bustcache=false' would actually flag as true in "shouldBustCache"
 */
let shouldBustCache = function (cbKey: string) {
  cbKey = cbKey.toLowerCase();
  try {
    if (window.location.search) {
      let params = new URLSearchParams(window.location.search);
      return params.has(cbKey);
    }
  } catch (err) {
    console.log("Error: Unable to check 'shouldBustCache'", err);
  }
  return false;
};

export const getCache = (cacheOpts: CacheOptions | string) => {
  let opts = getOptions(cacheOpts);
  if (true || shouldBustCache(opts.cacheBustKey)) return null;
  let { location } = opts;
  if (!opts.key && !opts.getCacheKey) throw new Error("key is required");

  let valueStr = location.getItem(opts.key);

  if (valueStr) {
    let val = JSON.parse(valueStr);
    return !_isExpired(val) ? val.payload : null;
  } else {
    return null;
  }
};

export const setCache = (cacheOpts: CacheOptions | string, payload: any) => {
  let opts = getOptions(cacheOpts);
  let { duration, location } = opts;

  if (!opts.key && !opts.getCacheKey) throw new Error("key is required");

  let nowTicks = Date.now();
  let expiration = (duration && nowTicks + duration) || null;
  location.setItem(opts.key, JSON.stringify({ payload, expiration }));
  return getCache(opts);
};

export const cachify = function (asyncFn: any, cacheConfig: CacheOptions, context: any = this) {
  if (!asyncFn || typeof asyncFn !== "function") {
    throw new Error("Cachify Error: You must pass an async function as the first param");
  }
  if (!cacheConfig && !cacheConfig.getCacheKey) {
    throw new Error(
      "Cachify Error: You must pass a cacheConfig object with a 'key' or 'getCacheKey', Ex: cachify(fetchUsers, { key: 'myapp-users' }"
    );
  }
  return async function (...args) {
    let cacheOptions = { ...cacheConfig };
    // Allow figuring out cache key at runtime using the args provided to the wrapped async function
    if (!cacheOptions.key) {
      cacheOptions.key = cacheOptions.getCacheKey(...args);
    }
    let data = getCache(cacheOptions);
    if (!data) {
      data = await asyncFn.apply(context, args);
      setCache(cacheOptions, data);
    }
    return data;
  };
};

export default { get: getCache, set: setCache };
