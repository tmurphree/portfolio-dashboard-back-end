module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: "airbnb-base",
  rules: {
    'linebreak-style': process.env.OPERATING_SYSTEM === 'Windows' ? 'off' : 'error',
    'no-console': 'off',
    'no-plusplus': ['error', { "allowForLoopAfterthoughts": true }],
    'operator-linebreak': ['error', 'after'],
  },
};
