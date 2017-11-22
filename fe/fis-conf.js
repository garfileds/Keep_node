/**
 * Created by adoug on 2017/11/20.
 */

/* 配置环境变量 */
fis
.set('project.name', 'Keep')
.set('project.files', ['/modules/**', '/components/**', '/views/**', '/images/**', '/meta/**', '/mock/**', 'map.json'])
.set('project.fileType.text', 'map, vue')

/* 配置产出路径 */
const config = {
  publicPrefix: '/public',
  viewPrefix: '/views',
  localDeployMock: 'D:/JavaScript/dist2',
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
  release: '$0'
})

/* 配置map.json */
fis.match('/map.json', {
  release: '/map.json'
})

/* 配置meta文件 */
fis.match('/meta/(**)', {
  release: '$1'
})

/* 配置mock */
fis.match('/mock/**', {
  release: '$0'
})

/* 配置html：/views/ */
fis.match('/views/(**).html', {
  release: '/$1.html',
  useMap: true
})

/* 配置js */
fis.match('({/modules,/components}/**).{js,vue}', {
  isMod: true,
  rExt: 'js',
  release: '/$1$2.js'
})
.match('/components/**.vue', {
  parser: [
    fis.plugin('vue-component', {
      runtimeOnly: true,
      extractCSS: false,
    })
  ]
})
.match('{/modules,/components}/**.{js,vue:js}', {
  parser: [fis.plugin('babel-6.x', {
    "plugins": [["import", {
      "libraryName": "element-ui"
    }]]
  })]
})
.match('/views/(*.js)', {
  isMod: false,
  parser: [fis.plugin('babel-6.x')],
  release: '/viewJs/$1'
})
.match('/views/(libs/**.js)', {
  release: '/viewJs/$1'
})

/* 配置scss */

//.html:css针对首屏的critical css
fis.match('{/modules/style/**.scss,/components/**.vue:scss,/views/*.html:css}', {
  rExt: 'css',
  parser: [
    fis.plugin('node-sass')
  ],
  postprocessor: fis.plugin('autoprefixer'),
})
.match('/modules/style/**', {
  release: '$0'
})

/* 配置图片 */
fis.match('/images/**', {
  release: '$0'
})
// 首屏加载需要异步该图片
.match('/images/all-devices.png', {
  useMap: true
})

/* 打包 */
fis.match('::package', {
  postpackager: fis.plugin('loader', {
    resourceType: 'mod',
    useInlineMap: true
  })
})

fis.match('::package', {
  useSourceMap : true,

  packager: fis.plugin('deps-pack', {
    // node_modules 库, 只打包部分文件, 有的文件不是全局依赖还是按需加载
    '/pkgs/dependencies.js': [
      '/node_modules/{' + require('./common-lib-conf.json').join(',') + '}/**.js',
      '/node_modules/{' + require('./common-lib-conf.json').join(',') + '}/**.js:deps'
    ],

    '/pkgs/libs/elementDatepickerPack.js': [
      '/node_modules/element-ui/lib/date-picker.js',
      '/node_modules/element-ui/lib/date-picker.js:deps'
    ],

    '/pkgs/main.js': [
      '/modules/**.js',
      '/views/libs/**.js',
      '!/views/libs/mod.js',
      '/views/main.js',
      '/components/App.vue',
      '/components/user/welcome.vue',
      '/components/user/welcome.vue:deps'
    ],

    // 按路由进行组件打包
    '/pkgs/components/user/welcomePack.js': [
      '/components/user/welcome.vue',
      '/components/user/welcome.vue:deps'
    ],

    '/pkgs/components/user/loginPack.js': [
      '/components/user/login.vue',
      '/components/user/login.vue:deps'
    ],

    '/pkgs/components/user/registerPack.js': [
      '/components/user/register.vue',
      '/components/user/register.vue:deps'
    ],

    '/pkgs/components/user/settingPack.js': [
      '/components/user/setting.vue',
      '/components/user/setting.vue:deps'
    ],

    '/pkgs/components/user/pokemenPack.js': [
      '/components/user/pokemen.vue',
      '/components/user/pokemen.vue:deps'
    ],

    '/pkgs/components/homePack.js': [
      '/components/home/**.vue',
      '/components/home/**.vue:deps'
    ],

    '/pkgs/components/plan/planDetailPack.js': [
      '/components/plan/planDetail.vue',
      '/components/plan/planDetail.vue:deps'
    ],

    '/pkgs/components/plan/planAddPack.js': [
      '/components/plan/planAdd.vue',
      '/components/plan/planAdd.vue:deps'
    ],

    '/pkgs/components/plan/planEditPack.js': [
      '/components/plan/planEdit.vue',
      '/components/plan/planEdit.vue:deps'
    ]
  })
})

/**
 * rd-mock环境：api由mock提供，http://fis.baidu.com/fis3/docs/node-mock.html
 * rd环境：api非mock，直接部署到后端项目
 * prod环境：在rd的基础上压缩
 **/

fis.media('rd-mock')
.match('**', {
  deploy: [
    fis.plugin('local-deliver', {
      to: config.localDeployMock
    })
  ]
})

const medias = ['rd', 'prod']
medias.forEach(media => {
  fis.media(media)
  .match('/mock/**', {
    release: false
  })
  .match('**', {
    deploy: [
      fis.plugin('local-deliver', {
        to: config.localDeploy + config.publicPrefix
      })
    ]
  })
  .match('/views/**.html', {
    deploy: [
      fis.plugin('local-deliver', {
        to: config.localDeploy + config.viewPrefix
      })
    ]
  })
})

fis.media('prod')
.match('{{/components,/images,/modules,/pkgs}/**,/views/**.js}', {
  useHash: true
})
.match('**.{js,vue:js}', {
  optimizer: fis.plugin('uglify-js', {
    sourceMap: {
      url: 'inline'
    }
  })
})
.match('**.{scss,css,vue:scss}', {
  optimizer: fis.plugin('clean-css', {
    'keepBreaks': true
  })
})
