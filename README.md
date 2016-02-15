# cbr-rates-cli [![Build Status][travis-image]][travis-url]

> Get currency rates from Central Bank of Russia

[cbr-rates][cbr-rates] - API for this module

```sh
cbr-rates
AMD  13.38  100
AUD  47.01  1
AZN  61.03  1
BGN  36.38  1
BRL  18.41  1
BYR  40.06  10000  
CAD  49.23  1
CHF  65.51  1
CNY  10.00  1
CZK  26.34  10
DKK  95.37  10
EUR  71.14  1
GBP  99.95  1
...
USD  63.99  1
UZS  24.77  1000
XDR  89.70  1
ZAR  50.05  10
```

## Install

```sh
npm install --global cbr-rates-cli
```

## Usage

```sh
cbr-rates --help

  Usage
    cbr-rates [id] [date]

  Examples
    cbr-rates
    cbr-rates usd
    cbr-rates 2014.5.12
```


## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/cbr-rates-cli
[travis-image]: https://travis-ci.org/andrepolischuk/cbr-rates-cli.svg?branch=master

[cbr-rates]: https://github.com/andrepolischuk/cbr-rates
