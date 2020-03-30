node tasks/generateSchema.js
npx apollo codegen:generate --localSchemaFile=schema.json --target=typescript --globalTypesFile=src/_types/GlobalTypes.d.ts _types