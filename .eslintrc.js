module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-unused-vars": "warn",
    "max-len": ["warn", {
      "code": 100,
      "comments": 120,
      "ignoreUrls": true
    }]
  }
};
