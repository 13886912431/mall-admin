module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/airbnb"],
    parserOptions: {
        parser: "babel-eslint"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "comma-dangle": 0,
        indent: [2, 4],
        "arrow-parens": 0,
        quotes: 0,
        "no-tabs": 0,
        "linebreak-style": 0,
        "no-undef": 0,
        "no-param-reassign": 0,
        "no-restricted-syntax": 0,
        "no-unused-vars": [2, {"args": "none"}]
    }
};
