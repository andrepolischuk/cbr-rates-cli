import chalk from 'chalk';
import cbrRates from 'cbr-rates';
import each from 'ea';
import indentString from 'indent-string';
import meow from 'meow';

const cli = meow(`
    Usage
      cbr-rates [id] [date]

    Examples
      cbr-rates
      cbr-rates usd
      cbr-rates 2014.5.12
`);

let currencyId = cli.input[0];
let dateString = cli.input[1];

if (/\./.test(currencyId)) {
  [currencyId, dateString] = [dateString, currencyId];
}

let date;

if (dateString) {
  const [year, month, day] = dateString.split('.');
  date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

cbrRates(date).then(rates => {
  const values = [];

  each(rates, ({value}) => {
    values.push(value);
  });

  const length = integerLength(Math.max(...values));

  each(rates, ({par, value}, id) => {
    if (currencyId && currencyId !== id) return;
    const indent = length - integerLength(value);
    id = id.toUpperCase();
    value = indentString(value.toFixed(2), ' ', indent);
    console.log(`${id}  ${chalk.bold(value)}  ${chalk.grey(par)}`);
  });
});

function integerLength(num) {
  return Math.floor(num).toFixed().toString().length;
}
