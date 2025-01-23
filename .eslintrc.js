// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  ignorePatterns: ["/dist/*"],
  rules: {
    "expo/no-env-var-destructuring": "off",
    "import/no-unresolved": "off",
  },
};
