module.exports = {
  extends: ['./node_modules/commitlint-config-gitmoji'],
  rules: {
    'scope-enum': [2, 'always', ['global', 'akagi', 'kaguya', 'globalkey']],
  },
};
