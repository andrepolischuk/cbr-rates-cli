import meow from 'meow';
import cbrRates from 'cbr-rates';
import { grey, bold } from 'chalk';
import indentString from 'indent-string';

const cli = meow(`
    Usage
      cbr-rates [...id] [date]

    Examples
      cbr-rates
      cbr-rates usd eur
      cbr-rates 2014.5.12
`);

function parseDateString(str) {
  const [ year, month, day ] = str.split('.');
  return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
}

function integerLength(num) {
  return Math.floor(num).toFixed().toString().length;
}

function isIdExist(id, ids) {
  return !ids.length || ids.indexOf(id) > -1;
}

const [ last ] = cli.input.slice(-1);
let ids = cli.input.map(id => id.toLowerCase());
let date;

if (/\./g.test(last)) {
  ids = ids.slice(0, -1);
  date = parseDateString(last);
}

cbrRates(date).then(rates => {
  const values = Object.keys(rates)
    .filter(id => isIdExist(id, ids))
    .map(id => rates[id].value);

  const length = integerLength(Math.max(...values));

  Object.keys(rates).forEach(id => {
    if (!isIdExist(id, ids)) return;

    const { par, value } = rates[id];
    const indent = length - integerLength(value);
    const formattedValue = indentString(value.toFixed(2), ' ', indent);

    /* eslint-disable no-console */
    console.log(`${id.toUpperCase()}  ${bold(formattedValue)}  ${grey(par)}`);
  });
});
