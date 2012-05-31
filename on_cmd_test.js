var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');

cmd = [
  'DISPLAY=:99',
  'GAIA_PORT=8777',
  'REPORTER=TAP',
  'TEST_OUTPUT=' + botio.public_dir + '/mocha-test-results.txt',
  'TEST_FAST=0',
  'TEST_AGENT_SERVER=ws://50.116.11.35:8789',
  'B2G_HOME=/data/botio/b2g-desktop/obj-x86_64-unknown-linux-gnu/',
  'GAIA_DOMAIN=prdb2g.gaiamobile.org',
  'GAIA_PORT=:8080',
  'tools/ci/unit/b2g-desktop.sh'
];

exec('Xvfb :99 &');
exec('make update-common');

exec(cmd.join(' '), {silent: false, async: true}, function(err, output) {
  require('./create-test-results')(
    botio.private_dir,
    'B2G Desktop Results',
    botio.public_dir + '/b2g-desktop-results.html'
  );
  botio.message('B2G Desktop: ' + botio.public_url + '/b2g-desktop-results.html');
});
