import test from 'ava';
import {exec} from 'child_process';
const babel = __dirname + '/node_modules/.bin/babel-node';

test('should return last rates', t => {
  t.plan(2);

  exec(`${babel} cli.js`, {cwd: __dirname}, (err, stdout) => {
    t.ifError(err);
    t.true(stdout.trim().indexOf('USD') > 0);
  });
});

test('should return rates for specified date', t => {
  t.plan(2);

  exec(`${babel} cli.js 2015.5.15`, {cwd: __dirname}, (err, stdout) => {
    t.ifError(err);
    t.true(stdout.trim().indexOf('USD') > 0);
  });
});
