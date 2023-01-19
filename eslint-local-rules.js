'use strict';

module.exports = {
  'disallow-importing-values-from-react-native/types': {
    meta: {
      docs: {
        description: "Disallow importing values from 'react-native/types'",
        recommended: false,
      },
      schema: [],
      fixable: 'code',
    },
    create: function (context) {
      return {
        ImportDeclaration: function (node) {
          if (
            node.source.value === 'react-native/types' &&
            node.importKind === 'value'
          )
            context.report({
              node: node,
              message: "Cannot import value from 'react-native/types'",
              fix: function (fixer) {
                return fixer.replaceText(node.source, "'react-native'");
              },
            });
        },
      };
    },
  },
};
