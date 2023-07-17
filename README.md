# Quidax-Package

A community supported NodeJS Package that enables developers to build crypto products securely and seamlessy leveraging [Quidax's](https://quidax.com/) API.

## Table of content

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Available Services exposed by the Package](#available-services-exposed-by-the-sdk)

## Getting Started

- To get started with this Package, create an [account](https://quidax.com/) on Quidax, if you haven't already.
- You can then retrieve your API keys from your account dashboard.

#### Want to contribute?

Contributions are welcome! Kindly refer to the [contribution guidelines](https://github.com/ridbay/quidax-package/blob/main/CONTRIBUTING.md).

## Installation

This package can be installed with `npm` or `yarn`.

Using `npm`,

```
npm install quidax-package
```

Using `yarn`,

```bash
yarn add quidax-package
```

## Usage

```js
const { Quidax } = require('quidax-package'); // JavaScript
import { Quidax } from 'quidax-package'; // Typescript
```

Instantiate the Quidax class

```js
const quidax = new Quidax(PRIVATE_KEY, { merchant_id });
```

**Note:**

- The merchant id field is optional, you don't have to specify it, For example:

```javascript
const quidax = new Quidax(PRIVATE_KEY);
```

- For more information about the services exposed by the Package, please refer to the [documentation](https://docs.quidax.com/reference/introduction-user-accounts).
- Be sure to keep your API Credentials securely in [environment variables](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html).

## Available Services exposed by the Package

The following services are available with this package
