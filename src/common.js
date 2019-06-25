export default function (Vue, options) {
  Vue.prototype.$$ = {
    // scope: this,
    // bindScope: function (that) {
    //   this.scope = that
    // },
    // deBindScope: function () {
    //   this.scope = this
    // },
    msgOk: function (message) {
      Vue.$vux.toast.show({
        type: 'success',
        position: 'middle',
        text: message,
      });
    },
    msgErr: function (message) {
      Vue.$vux.toast.show({
        type: 'cancel',
        position: 'middle',
        text: message
      });
    },
    msgInf: function (message) {
      Vue.$vux.toast.show({
        type: 'text',
        position: 'middle',
        text: message
      });
    },
    msgWarn: function (message) {
      Vue.$vux.toast.show({
        type: 'warn',
        position: 'middle',
        text: message
      });
    },
    msgAlert: function (content = '', title = '', showcb = null, hidecb = null) {
      Vue.$vux.alert.show({
        title: title,
        content: content,
        onShow() {
          if (showcb) {
            showcb();
          }
        },
        onHide() {
          if (hidecb) {
            hidecb();
          }
        }
      })
    },
    msgConfirm: function (content = '提示', title = '提示', confirmcb = null, cancelcb = null, showcb = null, hidecb = null) {
      Vue.$vux.confirm.show({
        title: title,
        content: content,
        onShow() {
          if (showcb) {
            showcb();
          }
        },
        onHide() {
          if (hidecb) {
            hidecb();
          }
        },
        onCancel() {
          if (cancelcb) {
            cancelcb();
          }
        },
        onConfirm() {
          if (confirmcb) {
            confirmcb();
          }
        }
      })
    },
    uuidv4: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    downloadURI: function (uri, name) {
      const link = document.createElement('a')
      link.download = name
      link.href = uri
      link.click()
    },
    getExt: function (file) {
      const index = file.lastIndexOf('.')
      return file.substring(index + 1)
    },
    isPicture: function (file) {
      const ext = this.getExt(file)
      const exts = ['png', 'jpg', 'jpeg', 'gif', 'svg']
      if (this.inArray(ext, exts) !== false) {
        return true
      }
      return false
    },
    isFile: function (file) {
      const ext = this.getExt(file)
      const exts = ['png', 'jpg', 'jpeg', 'gif']
      if (this.inArray(ext, exts) === false) {
        return true
      }
      return false
    },
    overPicSize: function (file, size = 1048576, max = 1048576) {
      if (this.isPicture(file) && size <= max) {
        return true
      }
      return false
    },
    overFileSize: function (file, size = 15728640, max = 15728640) {
      if (this.isFile(file) && size <= max) {
        return true
      }
      return false
    },
    isWord: function (file) {
      const ext = this.getExt(file)
      const exts = ['docx', 'doc']
      if (this.inArray(ext, exts) !== false) {
        return true
      }
      return false
    },
    /**
     * 是否是正整数，若失败，则返回false
     * @param {string} val 要转换的值
     * @returns {boolean}
     */
    isPositiveInt: function (val) {
      const n = this.getInt(val)
      if (n % 1 !== 0 || n <= 0) {
        return false
      }
      return true
    },
    /**
     * 将值转为int型，若失败，则返回0
     * @param {string} val 要转换的值
     * @returns {int}
     */
    getInt: function (val) {
      return this.getIntDefault(val, 0)
    },
    /**
     * 将值转为int型，若失败，则返回null
     * @param {string} val 要转换的值
     * @returns {int?} 如果转换失败，则返回null
     */
    getIntNull: function (val) {
      return this.getIntDefault(val, null)
    },
    /**
     * 将值转为int型，若失败，则返回defaultValue
     * @param {string} val 要转换的值
     * @param {int} defaultValue 默认值
     * @returns {int} 转换结果
     */
    getIntDefault: function (val, defaultValue) {
      return parseInt(val, 10) || defaultValue
    },
    /**
     * 将值转为float型，若失败，则返回0
     * @param {string} val 要转换的值
     * @returns {float} 转换结果
     */
    getFloat: function (val) {
      return this.getFloatDefault(val, 0)
    },
    /**
     * 将值转为float型，若失败，则返回null
     * @param {string} val 要转换的值
     * @returns {float?} 转换结果
     */
    getFloatNull: function (val) {
      return this.getFloatDefault(val, null)
    },
    /**
     * 将值转为float型，若失败，则返回defaultValue
     * @param {string} val 要转换的值
     * @param {float} defaultValue 默认值
     * @returns {float} 转换结果
     */
    getFloatDefault: function (val, defaultValue) {
      return parseFloat(val) || defaultValue
    },
    /**
     * 判断指定值是否为一个对象
     * @param {object} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isObject: function (val) {
      return val !== null && Object.prototype.toString.call(val) === '[object Object]'
    },
    /**
     * 判断val是否为数字
     * @param {object} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isNumber: function (val) {
      return val !== null && Object.prototype.toString.call(val) === '[object Number]'
    },
    /**
     * 判断指定值是否为Date对象
     * @param {object} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isDate: function (val) {
      return val instanceof Date && !isNaN(val.valueOf())
    },
    /**
     * 判断指定值是否为数组
     * @param {object} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isArray: function (val) {
      return val !== null && Object.prototype.toString.call(val) === '[object Array]'
    },
    /**
     * 判断指定值是否为function
     * @param {object} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isFunction: function (val) {
      return val !== null && Object.prototype.toString.call(val) === '[object Function]'
    },
    /**
     * 判断指定值是否为String
     * @param {object} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isString: function (val) {
      return val !== null && Object.prototype.toString.call(val) === '[object String]'
    },
    /**
     * 判断指定字符串是否为"true"
     * @param {string} val 要判断的值
     * @returns {bool} 判断结果
     */
    isBoolean: function (val) {
      return val !== null && Object.prototype.toString.call(val) === '[object Boolean]'
    },
    /**
     * 判断指定值是否为undefined
     * @param {object} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isUndefined: function (val) {
      return val === undefined || Object.prototype.toString.call(val) === '[object undefined]'
    },
    /**
     * 判断指定值为null或为空字符串
     * @param {string} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isNullOrEmpty: function (val) {
      return val === null || val === ''
    },
    /**
     * 判断指定值为null，或为空字符串，或为空白字符串
     * @param {string} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isNullOrWhiteSpace: function (val) {
      return this.isNullOrEmpty(this.string.trim(val))
    },
    /**
     * 判断指定值是否为RegExp对象
     * @param {object} val 要判断的值
     * @returns {bool} 判断结果
     */
    isRegExp: function (val) {
      return val && val instanceof RegExp
    },
    /**
     * 判断指定值是否为NaN
     * @param {object} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isNaN: function (val) {
      return isNaN(val)
    },
    /**
     * 判断指定值是否为null
     * @param {object} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isNull: function (val) {
      return val === null
    },
    /**
     * 指定值是否全部为大写
     * @param {string} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isUpper: function (val) {
      return val.toUpperCase() === val
    },
    /**
     * 指定值是否全部为小写
     * @param {string} val 要判断的值
     * @returns {Boolean} 判断结果
     */
    isLower: function (val) {
      return val.toLowerCase() === val
    },
    /**
     * 判断指定val是否在数组array中
     * @param {Object} val 需要判断的值
     * @param {Array} data 所在的数组
     * @param {Number} idx 从数组array的idx处开始判断，若未指定，则从整个数组array中判断
     * @returns {Number} val在array中的位置，若不在，则返回false
     */
    inArray: function (target, data, idx) {
      if (!data) return false
      if (!this.isArray(data)) {
        return false
      }
      var arrLen = data.length
      idx = idx || 0
      idx = (idx < 0 || idx > data.length - 1) ? 0 : idx
      for (; idx < arrLen; idx++) {
        if (data[idx] === target) {
          return idx
        }
      }
      return false
    },
    /**
     * 合并多个数组为一个数组
     * @param {Array} args 要合并的数组参数，如：arr1,arr2,arr3...
     * @returns {Array} 合并后的结果数组
     */
    concat: function (args) {
      return [].concat.apply([], arguments)
    },
    /**
     * 将一个或多个数组合并为一个字符串
     * @param {String} separator 指定分隔符
     * @param {Array} args 要合并的数组参数(arr1,arr2,arr3...)
     * @returns {String} 合并后的字符串
     */
    join: function (separator, args) {
      var source = []
      if (arguments.length > 2) {
        for (var i = 1; i < arguments.length; i++) {
          source = source.concat(arguments[i])
        }
      } else {
        source = arguments[1]
      }
      return source.join(separator)
    },
    /**
     * 去掉array中的重复项
     * @param {Array} arr 需要去重的数组
     * @returns {Array} 去重后的新数组
     */
    unique: function (arr) {
      if (!arr || arr.length <= 1) {
        return arr
      }
      var _arr = arr.sort()
      var duplicateIdx = []
      var idxLength = 0
      for (let i = 1; i < _arr.length; i++) {
        if (_arr[i] === _arr[i - 1]) {
          idxLength = duplicateIdx.push(i)
        }
      }
      if (idxLength > 0) {
        while (idxLength--) {
          _arr.splice(duplicateIdx[idxLength], 1)
        }
        arr = _arr
      }
      return arr
    },
    /**
     * 在指定数组中删除指定的数据
     * @param {Array} sourceArr 待操作的数组
     * @param {Array} removeArr 需要删除的项
     * @returns {Array} 新的数组
     */
    remove: function (sourceArr, removeArr) {
      if (!sourceArr || !removeArr || removeArr.length === 0) {
        return sourceArr
      }
      removeArr = this.unique(removeArr)
      var sourceLen = sourceArr.length
      var removeLen = removeArr.length
      var tempIdx = -1

      for (var i = 0; i < sourceLen; i++) {
        for (var j = 0; j < removeLen; j++) {
          tempIdx = this.inArray(removeArr[j], sourceArr)
          if (tempIdx >= 0) {
            sourceArr.splice(tempIdx, 1)
            sourceLen = sourceArr.length
          }
        }
      }
      return sourceArr
    },
    /**
     * 将obj转换为Array
     * @param {object} obj 要转换为Array的对象
     * @returns {Array} 转换后的数组
     */
    toArray: function (obj) {
      if (!obj) {
        return null
      }
      if (!obj.length) {
        return null
      }
      if (this.isArray(obj)) {
        return obj
      }
      if (this.isObject(obj)) {
        return [].slice.call(obj)
      }
      return null
    },
    isvalidUsername: function (str) {
      const reg = /^[A-Za-z0-9]+$/
      return reg.test(str)
    },
    validateURL: function (textval) {
      const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
      return urlregex.test(textval)
    },
    validateLowerCase: function (str) {
      const reg = /^[a-z]+$/
      return reg.test(str)
    },
    validateUpperCase: function (str) {
      const reg = /^[A-Z]+$/
      return reg.test(str)
    },
    validatAlphabets: function (str) {
      const reg = /^[A-Za-z]+$/
      return reg.test(str)
    },
    validateEmail: function (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    createUniqueString: function () {
      const timestamp = +new Date() + ''
      const randomNum = parseInt((1 + Math.random()) * 65536) + ''
      return (+(randomNum + timestamp)).toString(32)
    },
    parseTime: function (time, cFormat) {
      if (arguments.length === 0) {
        return null
      }
      const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return time_str
    },
    formatTime: function (time, option) {
      time = +time * 1000
      const d = new Date(time)
      const now = Date.now()

      const diff = (now - d) / 1000

      if (diff < 30) {
        return '刚刚'
      } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
      } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
      } else if (diff < 3600 * 24 * 2) {
        return '1天前'
      }
      if (option) {
        return parseTime(time, option)
      } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
      }
    },
    getQueryObject: function (url) {
      url = url == null ? window.location.href : url
      const search = url.substring(url.lastIndexOf('?') + 1)
      const obj = {}
      const reg = /([^?&=]+)=([^?&=]*)/g
      search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
      })
      return obj
    },
    getByteLen: function (val) {
      let len = 0
      for (let i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null) {
          len += 1
        } else {
          len += 0.5
        }
      }
      return Math.floor(len)
    },
    cleanArray: function (actual) {
      const newArray = []
      for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
          newArray.push(actual[i])
        }
      }
      return newArray
    },
    cleanParam: function (json) {
      if (!json) return ''
      return cleanArray(Object.keys(json).map(key => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(json[key])
      })).join('&')
    },
    param2Obj: function (url) {
      const search = url.split('?')[1]
      if (!search) {
        return {}
      }
      return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    },
    html2Text: function (val) {
      const div = document.createElement('div')
      div.innerHTML = val
      return div.textContent || div.innerText
    },
    objectMerge: function (target, source) {
      if (typeof target !== 'object') {
        target = {}
      }
      if (Array.isArray(source)) {
        return source.slice()
      }
      for (const property in source) {
        if (source.hasOwnProperty(property)) {
          const sourceProperty = source[property]
          if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty)
            continue
          }
          target[property] = sourceProperty
        }
      }
      return target
    },
    getTime: function (type) {
      if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90
      } else {
        return new Date(new Date().toDateString())
      }
    },
    debounce: function (func, wait, immediate) {
      let timeout, args, context, timestamp, result
      const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp
        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last)
        } else {
          timeout = null
          // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
          if (!immediate) {
            result = func.apply(context, args)
            if (!timeout) context = args = null
          }
        }
      }
      return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
          result = func.apply(context, args)
          context = args = null
        }

        return result
      }
    },
    deepClone: function (source) {
      if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
      }
      const targetObj = source.constructor === Array ? [] : {}
      for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = source[keys].constructor === Array ? [] : {}
            targetObj[keys] = deepClone(source[keys])
          } else {
            targetObj[keys] = source[keys]
          }
        }
      }
      return targetObj
    },
    //获取元素横坐标,不适用于表格和iframe中的元素
    getElementLeft: function (element) {
      let actualLeft = element.offsetLeft;
      let current = element.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      return actualLeft;
    },
    //获取元素纵坐标,不适用于表格和iframe中的元素
    getElementTop: function (element) {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    },
    //获取元素横坐标(相对于viewport的距离)
    getElementViewLeft: function (element) {
      let actualLeft = element.offsetLeft;
      let current = element.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      let elementScrollLeft = 0;
      if (document.compatMode == "BackCompat") {
        elementScrollLeft = document.body.scrollLeft;
      } else {
        elementScrollLeft = document.documentElement.scrollLeft;
      }
      return actualLeft - elementScrollLeft;
    },
    //获取元素纵坐标(相对于viewport的距离)
    getElementViewTop: function (element) {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      let elementScrollTop = 0;
      if (document.compatMode == "BackCompat") {
        elementScrollTop = document.body.scrollTop;
      } else {
        elementScrollTop = document.documentElement.scrollTop;
      }
      return actualTop - elementScrollTop;
    }
  }
}
