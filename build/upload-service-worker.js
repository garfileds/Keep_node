const fs = require('fs')
const Url = require('url')
const path = require('path')

/**
 * 遵从RFC规范的文件上传功能实现
 * @param  {String}   url      上传的url
 * @param  {Object}   opt      配置
 * @param  {Object}   data     要上传的formdata，可传null
 * @param  {String}   content  上传文件的内容
 * @param  {String}   subpath  上传文件的文件名
 * @param  {Function} callback 上传后的回调
 * @name _upload
 * @function
 */

const _upload = function(url, opt, data, content, subpath, callback) {
  if (typeof content === 'string') {
    content = new Buffer(content, 'utf8')
  } else if (!(content instanceof Buffer)) {
    console.log('unable to upload content [%s]', (typeof content))
  }
  opt = opt || {}
  data = data || {}
  var endl = '\r\n'
  var boundary = '-----np' + Math.random()
  var collect = []

  var key, value
  for (key in data) {
    value = data[key]

    collect.push('--' + boundary + endl)
    collect.push('Content-Disposition: form-data; name="' + key + '"' + endl)
    collect.push(endl)
    collect.push(value + endl)
  }

  collect.push('--' + boundary + endl)
  collect.push('Content-Disposition: form-data; name="' + (opt.uploadField || "file") + '"; filename="' + subpath + '"' + endl)
  collect.push(endl)
  collect.push(content)
  collect.push(endl)
  collect.push('--' + boundary + '--' + endl)

  var length = 0
  collect.forEach(function(ele) {
    if (typeof ele === 'string') {
      length += new Buffer(ele).length
    } else {
      length += ele.length
    }
  })

  opt.method = opt.method || 'POST'
  opt.headers = Object.assign({
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': length
  }, opt.headers || {})
  opt = parseUrl(url, opt)
  var http = opt.protocol === 'https:' ? require('https') : require('http')
  var req = http.request(opt, function(res) {
    var status = res.statusCode
    var body = ''
    res
    .on('data', function(chunk) {
      body += chunk
      console.log(body)
    })
    .on('end', function() {
      if (status >= 200 && status < 300 || status === 304) {
        callback(null, body)
      } else {
        callback(status)
      }
    })
    .on('error', function(err) {
      callback(err.message || err)
    })
  })
  collect.forEach(function(d) {
    req.write(d)
  })
  req.end()
}

function _(pth) {
  var type = typeof pth;
  if (arguments.length > 1) {
    pth = Array.prototype.join.call(arguments, '/');
  } else if (type === 'string') {
    //do nothing for quickly determining.
  } else if (type === 'object') {
    pth = Array.prototype.join.call(pth, '/');
  } else if (type === 'undefined') {
    pth = '';
  }
  if (pth) {
    pth = path.normalize(pth.replace(/[\/\\]+/g, '/')).replace(/\\/g, '/');
    if (pth !== '/') {
      pth = pth.replace(/\/$/, '');
    }
  }
  return pth;
}

function parseUrl(url, opt) {
  opt = opt || {}
  url = Url.parse(url)
  var ssl = url.protocol === 'https:'
  opt.host = opt.host || opt.hostname || ((ssl || url.protocol === 'http:') ? url.hostname : 'localhost')
  opt.port = opt.port || (url.port || (ssl ? 443 : 80))
  opt.path = opt.path || (url.pathname + (url.search ? url.search : ''))
  opt.method = opt.method || 'GET'
  opt.agent = opt.agent || false
  return opt
}

let upOpt = {
  url: 'http://45.78.23.100:8999/receiver',
  opt: null,
  data: {
    email: undefined,
    token: undefined,
    to: _(path.join('/var/www/adoug.info', 'public/service-worker.js'))
  },
  content: '',
  subpath: 'service-worker.js',
  callback: null
}

const swPath = path.resolve(__dirname, '../public/service-worker.js')
fs.readFile(swPath, function (err, data) {
  if (err) {
    console.log(err)
    return console.log('fail to read service-worker.js')
  }

  upOpt.content = data
  upOpt.callback = function(err, res) {
    var json = null
    res = res && res.trim()

    try {
      json = res ? JSON.parse(res) : null
    } catch (e) {}

    if (!err && json && json.errno) {
      console.log('error in JSON.parse()')
    } else if (err || !json && res !== '0') {
      console.log('upload file [' + upOpt.subpath + '] to [' + upOpt.data.to + '] by receiver [' + upOpt.url + '] error [' + (err || res) + ']')
    } else {
      process.stdout.write(
        '\n - ' +
        upOpt.subpath.replace(/^\//, '') +
        ' >> ' +
        upOpt.data.to
      )
    }
  }

  _upload(upOpt.url, upOpt.opt, upOpt.data, upOpt.content, upOpt.subpath, upOpt.callback)
})
