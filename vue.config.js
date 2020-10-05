module.exports = {
  'transpileDependencies': [
    'vuetify',
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
  }
}