// Stylelint config — based on fable_skills/templates/stylelint.config.mjs.
// Enforces the design-token rules from `css-modules` / `design-system`.
//
// 段階適用メモ: トークン強制ルール（scale-unlimited/declaration-strict-value と
// z-index 生値禁止）は、デザイントークン拡充（Phase 2 / requirements.md D-2〜D-3）の
// 完了時に有効化する。それまでは既存 CSS が生値ベースのため一時的に無効。
/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-declaration-strict-value'],
  rules: {
    // TODO(Phase 2): トークン化完了後に有効化 — themable properties must use var().
    // 'scale-unlimited/declaration-strict-value': [
    //   [
    //     '/color/', 'fill', 'stroke', 'z-index', 'box-shadow', 'transition-duration',
    //     '/^margin/', '/^padding/', 'gap', 'row-gap', 'column-gap',
    //   ],
    //   {
    //     ignoreValues: [
    //       'transparent', 'currentColor', 'inherit', 'none', 'initial', 'unset',
    //       '/^(0|auto)( (0|auto)){0,3}$/',
    //     ],
    //   },
    // ],
    // TODO(Phase 2): z-index トークンラダー導入後に有効化
    // 'declaration-property-value-disallowed-list': {
    //   'z-index': ['/^\\d+$/'],
    // },
    // CSS Modules use camelCase class names (styles.primaryButton)
    'selector-class-pattern': ['^[a-z][a-zA-Z0-9]+$', { resolveNestedSelectors: true }],
  },
  // tokens.css defines the primitives/scale — exempt it from the var()-only rule
  overrides: [
    { files: ['**/tokens.css'], rules: { 'scale-unlimited/declaration-strict-value': null } },
  ],
};
