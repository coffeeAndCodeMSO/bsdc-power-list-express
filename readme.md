# ES6 Basics

This repository is an introduction to ES6, as well as using Babel on a simple NodeJS site.

## Installation

First, run `npm init` to initialize your project.

You will then want to install each of these dependencies. (Note, to install development dependencies, use `npm install --save-dev {package-name}`)

**Production Dependencies:**
```
express
```
**Development Dependencies:**
```
babel-core
babel-loader
babel-preset-latest
webpack
```

## Project Structure

```
[dist]
[node_modules]
[src]
---- [public]
--------- [js]
------------- script.js
--------- index.html
---- server.js
package.json
webpack.config.client.js
webpack.config.server.js
```

`dist` is the folder that Webpack will be outputting our bundled express code.

`src` is the folder that we will include all of our familiar files, including our `server.js` and our `public` folder.

## Getting Started

First, bundle your server files:
```
npm run dev:server
```

Then, bundle your client-side files:
```
npm run dev:client
```

Finally, start your server.
```
npm run dev:start
```

Begin by taking a look at what is in the `src/server.js` file. We are using some new ES6 syntax to create our server.

Since we are using ES6 syntax, we will need to use Babel to transpile our code. We are using webpack to transpile our code and bundle all of it into the `dist` folder.

**We will be discussing Webpack and it's configuration at another time, so for now, go ahead and use the files included.**
