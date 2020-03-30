import React from "/web_modules/react.js";
import ReactDOM from "/web_modules/react-dom.js";

import App from "./App.js";
let rootEl = document.getElementById("root");
ReactDOM.render(React.createElement(App), rootEl);
setTimeout(() => {
	rootEl.style.opacity = "1";
}, 100);
