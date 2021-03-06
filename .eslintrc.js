module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-unused-vars": "warn",
    "quotes": ["warn", "single"],
    "semi": ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": [ "error", {"devDependencies": true}],
    "react/forbid-prop-types": 0,
    "react/prop-types": ["warn"],
    "no-underscore-dangle": "off",
    "react/no-danger": "off"
  }
};