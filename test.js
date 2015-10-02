import test from 'ava';
import execFile from 'exec-file';

test('should return last rates', t => {
  t.plan(2);

  execFile('cli.js', {cwd: __dirname}, (err, stdout) => {
    t.ifError(err);
    t.true(stdout.trim().indexOf('USD') > 0);
  });
});

test('should return rates for specified date', t => {
  t.plan(2);

  execFile('cli.js', ['2015.5.15'], {cwd: __dirname}, (err, stdout) => {
    t.ifError(err);
    t.true(stdout.trim().indexOf('USD') > 0);
  });
});
