module.exports = {
  prRepoUrl: function prRepoUrl(botio) {
    var baseUrl;
    baseUrl = botio.head_url.replace('git://', 'https://').
                             replace(/\.git$/, '');

    return baseUrl + '/tree/' + botio.head_ref;
  }
};
