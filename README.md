## Synopsis

This Projects is for transferring funds from mnemonic accounts to other accounts by scrapping blockchain. It is configured to use both Bitcoin as well as Ethereum. It can also be used ERC20 complaint Tokens as well.

## Installation

Install the dependencies and dev dependencies.

```sh
$ git clone https://github.com/sumitr-tech/blockchain-scrapper.git
$ cd blockchain-scrapper
$ npm install
```

To run the project:

```sh
$ npm run start
```

## Scrapper configuration

This configuration is file is used by the scrapper to create account, transfer funds to account, node from which to interact.

``` js
  [{
    mnemonicCustomName: 'Mnemonic1',
    mnemonic: config.get('mnemonic_phrase_1'),
    passphrase: '',
    path: `m/44'/60'/0'/0`,
    lastIndex: 10,
    initialBlock: 1875800,
    zValue: 10,
    blockchain: EthereumBlockchain,
    toAddress: '0x6862932bf3082b7cA21ccb2d242080B0906A4E4d',
    clientNode: 'http://localhost:8545'
  }]
```

Here, mnemonic is provided by the env variable. Since we are not storing the mnemonic is db, so we are taking a custom name for it, which can be used in later stages to easily identify the accounts.

## Things Remaining
* Bitcoin adapter for getting block transaction and sending funds
* Internal transaction for ethereum
