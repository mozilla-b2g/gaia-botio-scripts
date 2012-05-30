var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');

cmd = [
  'GAIA_PORT=8777',
  'REPORTER=TAP',
  'TEST_OUTPUT=stdout',
  'TEST_FAST=0',
  'TEST_AGENT_SERVER=ws://50.116.11.35:8789',
  'B2G_HOME=/data/bot.io/b2g',
  'GAIA_DOMAIN=pr1.gaiamobile.org',
  'tools/ci/unit/pr.sh emulator'
];

exec(cmd.join(' '), {silent:false, async:true}, function(err, output) {
  botio.message('Finished running tests');
});
