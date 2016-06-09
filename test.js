import test from 'ava';
import execa from 'execa';

test('return last rates', async t => {
  const { stdout } = await execa('./cli.js');
  t.true(stdout.indexOf('EUR') > -1);
  t.true(stdout.indexOf('GBP') > -1);
  t.true(stdout.indexOf('USD') > -1);
});

test('return rates for specified date', async t => {
  const { stdout } = await execa('./cli.js', [ '2015.5.15' ]);
  t.true(stdout.indexOf('EUR') > -1);
  t.true(stdout.indexOf('GBP') > -1);
  t.true(stdout.indexOf('USD') > -1);
});

test('return rates for specified currency', async t => {
  const { stdout } = await execa('./cli.js', [ 'eur', 'usd' ]);
  t.true(stdout.indexOf('EUR') > -1);
  t.true(stdout.indexOf('USD') > -1);
  t.true(stdout.indexOf('GBP') === -1);
});
