// Stylelint config — based on fable_skills/templates/stylelint.config.mjs.
// Enforces the design-token rules from `css-modules` / `design-system`.
//
// 段階適用メモ:
// - 色 / z-index / box-shadow / transition-duration のトークン強制は有効（Phase 2 で対応済み）。
// - spacing（margin/padding/gap）の強制は、スペーシングのトークン化（Phase 4 の
//   UI/UX 調整と同時に実施予定）が終わってから配列に追加する。
/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-declaration-strict-value'],
  rules: {
    // Themable properties must use var() — raw hex/rgb values in component modules are bugs.
    'scale-unlimited/declaration-strict-value': [
      ['/color/', 'fill', 'stroke', 'z-index', 'box-shadow', 'transition-duration'],
      {
        ignoreValues: [
          'transparent', 'currentColor', 'inherit', 'none', 'initial', 'unset',
          '/^(0|auto)( (0|auto)){0,3}$/',
        ],
      },
    ],
    // Ban arbitrary z-index integers (use the z-index token ladder)
    'declaration-property-value-disallowed-list': {
      'z-index': ['/^\\d+$/'],
    },
    // CSS Modules use camelCase class names (styles.primaryButton)
    'selector-class-pattern': ['^[a-z][a-zA-Z0-9]+$', { resolveNestedSelectors: true }],
  },
  // tokens.css defines the primitives/scale — exempt it from the var()-only rule
  overrides: [
    { files: ['**/tokens.css'], rules: { 'scale-unlimited/declaration-strict-value': null } },
  ],
};
