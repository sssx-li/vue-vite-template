module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    // standard 规则集合
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
    // 接入 Prettier 规则
    'stylelint-config-prettier',
    'stylelint-prettier/recommended',
    // 拓展vue规则
    'stylelint-config-recommended-vue',
  ],
  rules: {
    // 开启 Prettier 自动格式化功能
    'prettier/prettier': true,
    'selector-class-pattern': null,
    'scss/operator-no-newline-after': null,
    'custom-property-pattern': null,
    'no-empty-source': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['box-orient'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['include', 'mixin', 'use'],
      },
    ],
  },
};
