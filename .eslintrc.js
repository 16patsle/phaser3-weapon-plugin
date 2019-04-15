module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "globals": {
    "Phaser": "readonly"
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn"
  }
};
