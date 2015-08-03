#!/usr/bin/env node
import chalk from 'chalk';
import cbrRates from 'cbr-rates';
import each from 'ea';
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

  each(rates, ({par, value}, id) => {
    id = id.toUpperCase();
    value = value.toFixed(4);
    console.log(`${id}  ${chalk.bold(value)}  ${chalk.grey(par)}`);
  });
});
