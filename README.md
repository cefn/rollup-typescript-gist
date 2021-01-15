# rollup-typescript-gist

Running the `start` task in this project demonstrates the problem with rollup compiling typescript files.

The file [index.ts](./index.ts) attempts to transpile and bundle a single [prefix.ts](./sources/prefix.ts) source file.

The source file compiles to pure javascript, and imports only types and other functions which compile to pure javascript.

However, the index.ts routine actually causes _every .ts file_ in the project to compile, as demonstrated by the warning lines shown.

Here is the full output...

```bash
cefn@cefn-focal-thinkpad:~/Documents/github/rollup-typescript-gist$ npm run start

> rollup-typescript-gist@1.0.0 start /home/cefn/Documents/github/rollup-typescript-gist
> npx ts-node index.ts

@rollup/plugin-typescript TS2322: Type 'number' is not assignable to type 'string'.
@rollup/plugin-typescript TS1259: Module '"path"' can only be default-imported using the 'allowSyntheticDefaultImports' flag
Success!
```

# Warning details

The line `@rollup/plugin-typescript TS2322: Type 'number' is not assignable to type 'string'.` comes from trying to compile `do-not-compile-this.ts` which was not expected.

The line `@rollup/plugin-typescript TS1259: Module '"path"' can only be default-imported using the 'allowSyntheticDefaultImports' flag` comes from trying to compile `index.ts` itself!

# Problem definition

Although index.ts DOES succeed at compiling `prefix.ts` to a `prefix.js` I can find no successful configuration which DOESN'T compile every `.ts` file in the common root folder of prefix and its imports (this is the project root folder).

# Background

As described in the [CouchDB docs](https://docs.couchdb.org/en/stable/ddocs/views/intro.html#what-is-a-view) ES5 javascript can be used to define MapReduce operations over a CouchDB index. I would like to use Typescript to define and manage these map and reduce functions, and author those functions using common shared code, hence the need for imports and a typescript rollup for functions compiling to pure ES5 javascript.
