import chalk from 'chalk';
import cbrRates from 'cbr-rates';
import indentString from 'indent-string';
import meow from 'meow';

const cli = meow(`
    Usage
      cbr-rates [...id] [date]

    Examples
      cbr-rates
      cbr-rates usd eur
      cbr-rates 2014.5.12
`);

const [last] = cli.input.slice(-1);
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
    let {par, value} = rates[id];
    const indent = length - integerLength(value);
    value = indentString(value.toFixed(2), ' ', indent);
    console.log(`${id.toUpperCase()}  ${chalk.bold(value)}  ${chalk.grey(par)}`);
  });
});

function parseDateString(str) {
  const [year, month, day] = str.split('.');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

function integerLength(num) {
  return Math.floor(num).toFixed().toString().length;
}

function isIdExist(id, ids) {
  return !ids.length || ids.indexOf(id) > -1;
}
