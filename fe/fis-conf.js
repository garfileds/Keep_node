/**
 * Created by adoug on 2017/5/13.
 */

/****************环境变量*****************/
fis
    .set('project.files', ['public/**', 'views/**', 'map.json'])
    .set('project.ignore', [''])
    .set('project.fileType.text', 'map, vue')


// 模块化支持插件
// https://github.com/fex-team/fis3-hook-commonjs (forwardDeclaration: true)
fis.hook('commonjs', {
  extList: [
    '.js', '.vue',
  ],
  paths: {
    // vue: '/node_modules/vue/dist/vue.common.js'
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

// 所有scss文件
fis.match('**.scss', {
  rExt: 'css',
  parser: [
    fis.plugin('node-sass', {
      sourceMap: true
    })
  ],
  postprocessor: fis.plugin('autoprefixer')
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
      runtimeOnly: true,
      extractCSS: false,
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

fis.match('/public/components/**.vue:scss', {
  rExt: 'css',
  parser: [
    fis.plugin('node-sass', {
      sourceMap: true
    })
  ],
  postprocessor: fis.plugin('autoprefixer')
})

// 模块文件
fis.match('/public/js/**.js', {
  isMod: true,
  parser: [
    fis.plugin('babel-6.x')
  ]
})

// 页面直接引入的主文件，不进行模块require包装
fis.match('/public/js/main.js', {
  parser: [
    fis.plugin('babel-6.x')
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

fis.match('map.json', {
  deploy: fis.plugin('local-deliver', {
    to: 'D:/JavaScript/Keep_node/public/'
  })
})

fis.match('node_modules/**', {
  deploy: fis.plugin('local-deliver', {
    to: 'D:/JavaScript/Keep_node/public'
  })
})

// 打包: 这个过程介于url和deploy之间
fis.match('::package', {
  packager: fis.plugin('map', {
    useSourceMap : true // 合并后开启 SourceMap 功能。
  }),

  postpackager: fis.plugin('loader', {
    resourceType: 'mod',
    resourcemapWhitespace: 0,
    useInlineMap: true // 资源映射表内嵌
  })
})

// node_modules 库, 只 packTo 部分文件, 有的文件不是全局依赖还是按需加载
fis.match('/(node_modules/{' + require('./common-lib-conf.json').join(',') + '}/**.js)', {
  packTo: '/public/runtime/packages.js'
})

fis.match('/public/js/{global, module, router, store}/**.js', {
  packTo: '/public/runtime/common.js'
})

fis.match('{/public/js/main.js, /public/components/App.vue}', {
  packTo: '/public/runtime/common.js'
})

fis.match('/public/components/(*)/(**).vue', {
  packTo: '/public/runtime/components/$1/$2Pack.js'
})

fis.match('/public/components/user/{welcome, welcomeSlide}.vue', {
  packTo: '/public/runtime/common.js'
})


fis.media('prod')
.match('/public/components/**.vue:js', {
  optimizer: fis.plugin('uglify-js', {
    sourceMap: {
      url: 'inline'
    }
  })
})
.match('/public/components/**.vue:scss', {
  optimizer: fis.plugin('clean-css', {
    'keepBreaks': true //保持一个规则一个换行
  })
})
.match('**.{es, js}', {
  optimizer: fis.plugin('uglify-js', {
    sourceMap: {
      url: 'inline'
    }
  })
})
.match('**.{scss, less, css}', {
  optimizer: fis.plugin('clean-css', {
    'keepBreaks': true //保持一个规则一个换行
  })
})
