var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');

cmd = [
  'DISPLAY=:99',
  'REPORTER=TAP',
  'TEST_OUTPUT=' + botio.private_dir + '/mocha-test-results.txt',
  'TEST_FAST=0',
  'TEST_AGENT_SERVER=ws://50.116.11.35:8789',
  'GAIA_DOMAIN=prdb2g.gaiamobile.org',
  'GAIA_PORT=:8080',
  'PATH=' + __dirname + '/envs/b2g/:$PATH',
  'tools/ci/unit/b2g-desktop.sh'
];

exec('Xvfb :99 &');
exec('make update-common');
exec('cp -R ' + __dirname + '/envs/xulrunner-sdk ' + botio.private_dir);

exec(__dirname + '/envs/update.sh', { silent: false, async: true }, function() {
  runTests();
});

function runTests() {
  exec(cmd.join(' '), {silent: false, async: true}, function(err, output) {
    var fail = false;

    require('./create-test-results')(
      botio.private_dir,
      'B2G Desktop Results',
      botio.public_dir + '/b2g-desktop-results.html'
    );

    if (output.match('GAIA: TESTS PASS')) {
      botio.message('+ **B2G Desktop:** Passed');
    } else {
      botio.message('+ **B2G Desktop:** FAILED');
      fail = true;
    }

    botio.message(
      ' : ' + botio.public_url + '/b2g-desktop-results.html'
    );

    if (fail) {
      exit(1);
    }
  });
}
