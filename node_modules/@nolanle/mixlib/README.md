[![npm][npm-image]][npm-url]
[![npm-downloads][npm-downloads-image]][npm-url]

[npm-downloads-image]: https://img.shields.io/npm/dm/@nolanle/mixlib.svg?style=flat
[npm-image]: https://img.shields.io/npm/v/@nolanle/mixlib.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@nolanle/mixlib

## Installation

First of all, installation step:

* With npm

```
npm install @nolanle/mixlib
```

* With yarn

```
yarn add @nolanle/mixlib
```

## Usages

* Generate Master Key and Mnemonic

```
import {create, Network} from '@nolanle/mixlib;

<!-- 12 | 15 | 18 | 21 | 24 -->
const count = 12;

<!-- use this -->
const masterKey = await create('Master Key', count);
console.log(masterKey.mnemonic);
```

* Derive master key to accounts

```
const network = new Network('Ethereum', 'ETH', 18, 60);
const ethAccount = masterKey.derive(network);
```

* Working with account

```
const address = ethAccount.toAddress();
const balance = ethAccount.getBalance();
const privkey = ethAccount.toPrivateKey();
```
