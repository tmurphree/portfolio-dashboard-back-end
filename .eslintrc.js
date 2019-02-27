module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: "airbnb-base",
  rules: {
    'linebreak-style': process.env.OPERATING_SYSTEM === 'Windows' ? 'off' : 'error',
    'no-plusplus': ['error', { "allowForLoopAfterthoughts": true }],
    'operator-linebreak': ['error', 'after'],
  },
};
