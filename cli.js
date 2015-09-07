#!/usr/bin/env node
import chalk from 'chalk';
import cbrRates from 'cbr-rates';
import each from 'ea';
import indentString from 'indent-string';
import meow from 'meow';

const cli = meow({
  help: [
    'Usage',
    '  cbr-rates [date]',
    '',
    'Examples',
    '  cbr-rates',
    '  cbr-rates 2014.5.12'
  ]
});

const dateString = cli.input[0];
let date;

if (dateString) {
  const [year, month, day] = dateString.split('.');
  date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

cbrRates(date, (err, rates) => {
  if (err) return;
  const values = [];

  each(rates, ({value}) => {
    values.push(value);
  });

  const length = integerLength(Math.max(...values));

  each(rates, ({par, value}, id) => {
    const indent = length - integerLength(value);
    id = id.toUpperCase();
    value = indentString(value.toFixed(4), ' ', indent);
    console.log(`${id}  ${chalk.bold(value)}  ${chalk.grey(par)}`);
  });
});

function integerLength(num) {
  return num.toFixed().toString().length;
}
