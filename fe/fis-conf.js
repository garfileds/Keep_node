/**
 * Created by adoug on 2017/5/13.
 */

/****************环境变量*****************/
fis
.set('project.name', 'Keep')
.set('project.files', ['public/**', 'views/**', 'map.json'])
.set('project.fileType.text', 'map, vue')
.set('project.ignore', ['node_modules/**'])

const config = {
  publicPrefix: '/public',
  viewPrefix: '/views',
  localDeploy: 'D:/JavaScript/Keep_node'
}

// 支持commonJs
fis.hook('commonjs', {
  extList: [
    '.js', '.vue',
  ],
  paths: {
    // vue: '/node_modules/vue/dist/vue.common.js'
  },
  umd2commonjs: true
})

// 禁用components，启用node_modules
fis.unhook('components')
fis.hook('node_modules')

fis.match('/node_modules/**', {
  isMod: true,
  release: `${config.publicPrefix}/$0`,
  url: '$0'
})

// 配置map.json
fis.match('/map.json', {
  release: `${config.publicPrefix}/map.json`
})

// 配置html：/views/
fis.match('/views/(**).html', {
  release: `${config.viewPrefix}/$1.html`
})

// 配置图片：压缩和响应式由gulp另行处理，fis3缺少相关插件
fis.match('/public/(images/**)', {
  release: `${config.publicPrefix}/$1`,
  url: '$1'
})

// 配置scss
fis.match('/public/(style/**).scss', {
  rExt: 'css',
  parser: [
    fis.plugin('node-sass')
  ],
  postprocessor: fis.plugin('autoprefixer'),
  release: `${config.publicPrefix}/$1.css`,
  url: '/$1.css'
})

// 配置js
fis.match('/public/(**).{js,vue}', {
  isMod: true,
  rExt: 'js',
  release: `${config.publicPrefix}/$1.js`,
  url: '/$1.js'
})

// 配置vue组件
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

// 配置模块文件
fis.match('/public/(js/**).js', {
  isMod: true,
  parser: [
    fis.plugin('babel-6.x')
  ]
})

// 页面直接引入的主文件，不进行模块require包装, i.e., mod.js & main.js
fis.match('/public/js/*.js', {
  isMod: false
})

// mod.js文件
fis.match('/public/js/mod.js', {
  parser: null
})

// 打包
fis.match('::package', {
  postpackager: fis.plugin('loader', {
    resourceType: 'mod',
    resourcemapWhitespace: 0,
    useInlineMap: true // 资源映射表内嵌
  })
})

fis.match('::package', {
  useSourceMap : true,

  packager: fis.plugin('deps-pack', {
    // node_modules 库, 只打包部分文件, 有的文件不是全局依赖还是按需加载
    [`${config.publicPrefix}/runtime/packages.js`]: [
      '/node_modules/{' + require('./common-lib-conf.json').join(',') + '}/**.js',
      '/node_modules/{' + require('./common-lib-conf.json').join(',') + '}/**.js:deps'
    ],

    [`${config.publicPrefix}/runtime/elementDatepickerPack.js`]: [
      '/node_modules/element-ui/lib/date-picker.js',
      '/node_modules/element-ui/lib/date-picker.js:deps'
    ],

    [`${config.publicPrefix}/runtime/common.js`]: [
      '/public/js/{global,module,router,store}/**.js',
      '{/public/js/main.js,/public/components/App.vue}',
      '/public/components/user/{welcome,welcomeSlide}.vue'
    ],

    // 按路由进行组件打包
    [`${config.publicPrefix}/runtime/components/user/welcomePack`]: [
      '/public/components/user/welcome.vue',
      '/public/components/user/welcome.vue:deps'
    ],

    [`${config.publicPrefix}/runtime/components/user/loginPack`]: [
      '/public/components/user/login.vue',
      '/public/components/user/login.vue:deps'
    ],

    [`${config.publicPrefix}/runtime/components/user/registerPack`]: [
      '/public/components/user/register.vue',
      '/public/components/user/register.vue:deps'
    ],

    [`${config.publicPrefix}/runtime/components/user/settingPack`]: [
      '/public/components/user/setting.vue',
      '/public/components/user/setting.vue:deps'
    ],

    [`${config.publicPrefix}/runtime/components/user/pokemenPack`]: [
      '/public/components/user/pokemen.vue',
      '/public/components/user/pokemen.vue:deps'
    ],

    [`${config.publicPrefix}/runtime/components/homePack`]: [
      '/public/components/home/**.vue',
      '/public/components/home/**.vue:deps'
    ],

    [`${config.publicPrefix}/runtime/components/plan/planDetailPack.vue`]: [
      '/public/components/plan/planDetail.vue',
      '/public/components/plan/planDetail.vue:deps'
    ],

    [`${config.publicPrefix}/runtime/components/plan/planAddPack.vue`]: [
      '/public/components/plan/planAdd.vue',
      '/public/components/plan/planAdd.vue:deps'
    ],

    [`${config.publicPrefix}/runtime/components/plan/planEdit.vue`]: [
      '/public/components/plan/planEdit.vue',
      '/public/components/plan/planEdit.vue:deps'
    ]
  })
})

// 发布
fis.match('**', {
  deploy: [
    fis.plugin('skip-packed', {
      ignore: []
    }),

    fis.plugin('local-deliver', {
      to: config.localDeploy
    })
  ]
})

fis.media('prod')
.match('**.{es, js ,vue:js}', {
  optimizer: fis.plugin('uglify-js', {
    sourceMap: {
      url: 'inline'
    }
  })
})
.match('**.{scss, less, css, vue:scss}', {
  optimizer: fis.plugin('clean-css', {
    'keepBreaks': true //保持一个规则一个换行
  })
})
