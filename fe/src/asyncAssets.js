// 延迟加载的资源

// bg图片
import bg from '../images/bg_medium@1x.jpg'

let img = document.createElement('img')
img.src = bg
img.style.display = 'none'

document.body.appendChild(img)

// common.scss
// import(/* webpackChunkName: "async.common.scss" */'@/modules/style/common.scss')