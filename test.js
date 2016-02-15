import test from 'ava';
import execa from 'execa';

test('should return last rates', async t => {
  const {stdout} = await execa('./cli.js');
  t.true(stdout.trim().indexOf('USD') > -1);
});

test('should return rates for specified date', async t => {
  const {stdout} = await execa('./cli.js', ['2015.5.15']);
  t.true(stdout.trim().indexOf('USD') > -1);
});

test('should return rates for specified currency', async t => {
  const {stdout} = await execa('./cli.js', ['usd']);
  t.true(stdout.trim().indexOf('USD') > -1);
});
