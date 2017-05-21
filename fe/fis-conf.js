/**
 * Created by adoug on 2017/5/13.
 */

/****************环境变量*****************/
fis
    .set('project.files', ['public/**', 'views/**'])
    .set('project.ignore', [''])
    .set('project.fileType.text', 'map, vue')


// 模块化支持插件
// https://github.com/fex-team/fis3-hook-commonjs (forwardDeclaration: true)
fis.hook('commonjs', {
  extList: [
    '.js', '.vue',
  ],
  paths: {
    vue: '/node_modules/vue/dist/vue.common.js'
  },
  umd2commonjs: true,
  ignoreDependencies: [

  ]
})

// 禁用components，启用node_modules
fis.unhook('components')
fis.hook('node_modules')

fis.match('node_modules/**.js', {
  isMod: true
})

// 所有js文件
fis.match('{**.js}', {
  isMod: true,
  rExt: 'js'
})

// 编译vue组件
fis.match('/public/components/**.vue', {
  isMod: true,
  rExt: 'js',
  parser: [
    fis.plugin('vue-component', {
      runtimeOnly: true
    })
  ]
})

fis.match('/public/components/**.vue:js', {
  isMod: true,
  rExt: 'js',
  parser: [
    fis.plugin('babel-6.x', {
      "plugins": [["import", {
          "libraryName": "element-ui"
        }]]
    })
  ]
})

// 模块文件
fis.match('/public/js/module/**.js', {
  isMod: true,
  parser: [
    fis.plugin('babel-6.x', {})
  ]
})

// 页面直接引入的主文件，不进行模块require包装
fis.match('/public/js/*.js', {
  parser: [
    fis.plugin('babel-6.x', {})
  ],
  isMod: false
})

// mod.js文件
fis.match('/public/js/mod.js', {
  parser: null,
  isMod: false
})

//发布
fis.match('/public/(**)', {
  url: '/$1',
  deploy: fis.plugin('local-deliver', {
    to: 'D:/JavaScript/Keep_node/'
  })
})

fis.match('/views/(**)', {
  deploy: fis.plugin('local-deliver', {
    to: 'D:/JavaScript/Keep_node/'
  })
})

fis.match('node_modules/**', {
  deploy: fis.plugin('local-deliver', {
    to: 'D:/JavaScript/Keep_node/public'
  })
})

// 打包: 这个过程介于url和deploy之间
fis.match('::package', {
  postpackager: fis.plugin('loader'),
})