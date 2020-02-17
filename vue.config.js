const path = require('path')
function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports ={
  // resolve : {
  //   alias : {
  //     'views': '@/views',
  //     'components': '@/components',
  //     'network': '@/network',
  //     'common': '@/common',
  //     'assets': '@/assets',
  //   }
  // },
  chainWebpack: (config) =>{
    config.resolve.alias
        .set('views',resolve('src/views'))
        .set('components',resolve('src/components'))
        .set('network',resolve('src/network'))
        .set('common',resolve('src/common'))
        .set('assets',resolve('src/assets'))
  }
}
