module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx'
    ],
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-json-strings'
  ]
}
