import chalk from 'chalk';
import cbrRates from 'cbr-rates';
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

const date = parseDateString(dateString);

cbrRates(date).then(rates => {
  const values = Object.keys(rates).map(id => rates[id].value);
  const length = integerLength(Math.max(...values));

  Object.keys(rates).forEach(id => {
    if (currencyId && currencyId !== id) return;
    let {par, value} = rates[id];
    const indent = length - integerLength(value);
    id = id.toUpperCase();
    value = indentString(value.toFixed(2), ' ', indent);
    console.log(`${id}  ${chalk.bold(value)}  ${chalk.grey(par)}`);
  });
});

function parseDateString(str) {
  if (!str) return;
  const [year, month, day] = dateString.split('.');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

function integerLength(num) {
  return Math.floor(num).toFixed().toString().length;
}
