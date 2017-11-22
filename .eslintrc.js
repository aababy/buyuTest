module.exports = {
    "extends": "eslint:recommended",

    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "impliedStrict": true
        }
    },

    "env": {
        "amd": true,
    },

    "globals": {
    	"cc": true,
    	"module": true,
        "SocketBase": true,
  	},

    "rules": {
        "no-mixed-spaces-and-tabs": 0,
        "no-empty": 0,
        "no-unused-vars": 0,
        "block-scoped-var": 2,
        "no-use-before-define": 2,
    },
};