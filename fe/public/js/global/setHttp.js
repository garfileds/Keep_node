/**
 * Created by adoug on 2017/7/3.
 */
import Vue from 'vue'

const needLoadingReqs = {
  '[GET] /api/plans': {},
  '[DELETE] /user/token': {
    tip: '正在登出，我们会保存你最近的更改...'
  },
  '[GET] /api/pokemen': {}
}

export function setLoadingAndError(router) {
  Vue.http.interceptors.push(function(request, next) {
    let self = this || router.app

    const key = `[${request.method}] ${request.url}`
    const needLoading = needLoadingReqs.hasOwnProperty(key)

    needLoading && self.$store.commit({
      type: 'changeLoading',
      isLoading: true,
      tip: needLoadingReqs[key].tip || ''
    })

    next(function(response) {
      needLoading && self.$store.commit({
        type: 'changeLoading',
        isLoading: false
      })

      if (response.status === 401) {
        alert('验证失败，请重新登录。')
        return self.$router.push('/')
      }
      return response
    })
  })
}

export function setJWT(token) {
  Vue.http.headers.common['Authorization'] = token ? `Bearer ${token}` : ''
}