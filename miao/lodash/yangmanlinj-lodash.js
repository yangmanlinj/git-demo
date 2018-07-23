var yangmanlinj = {

//调用对象内完成的函数格式
//return this.chunk(array, size = 1)

  fill: function fill(ary, val, start = 0, end = ary.length) {
    for (var i = 0; i < ary.length; i++) {
      ary[i] = val //每一个都指向相同的值，所以改一个，所有都变
    }
    return ary //返回原数组是为了接下来的链式调用
  },

  chunk: function chunk(array, size = 1) {
    
  },

  unary: function unary(f) {
    return function(value) {
      return f(value)
    }
  },

  negate: function negate(f) { //把原函数内容取反
    return function(...args) {
      return !f(...args)
    }
  },

  range: function range(start, end, step = 1) {
    var result = []

    if (arguments.length === 1) {
      for (var i = 0; i < start; i++) {
        result.push(i)
      }
      return result
    } else {
      for (var i = start; i < end; i += step) {
        result.push(i)
      }
      return result
    }
  }

  // function range(start, end) {
  //   var result = []
  //   for (var i = start; i < end; i++) {
  //     result.push(i)
  //   }
  //   return result
  // }

  // function range(start, end, step) { 
  //   step = step || 1 //代替step = 1
  //   var result = []

  //   if (arguments.length === 1) {
  //     end = start
  //     start = 0
  //   } 
  //   for (var i = start; i < end; i += step) {
  //     result.push(i)
  //   }
  //   return result
  // }
  ,

  sum: function sum(ary) { //数组求和
    var result = 0
    for (var i = 0; i < ary.length; i++) {
      result += ary
    }
    return result
  },

  isEqual: function isEqual(a, b) {
    if (a === b) { //必须写最前
      return true
    }

    if (a !== a && b !== b) { //判断NaN
      return true
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      var l = Math.max(a.length, b.length)
      for (var i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i])) { //a[i] !== b[i]不能判断ab是对象的情况
            return false
        }
      }
      return true
    }
    if (typeof a === 'object' && typeof b === 'object') {
      var propNames = []
      for (var p in a) {
        propNames.push(p)
      }
      for (var p in b) {
        propNames.push(p)
      }
      propNames = unique(propNames)

      // var propNames = []
      // var keysa = keys(a)
      // var keysb = keys(b)
      // propNames = unique(keysa.concat(keysb))

      for (var prop in propNames) {
        if (!isEqual(a[prop], b[prop])) {
          return false
        }
      }
      return true
    }

    return a === b
  },

  unique: function unique(ary) {//去重

  },

  keys: function keys() {
    
  },

  cloneDeep: function cloneDeep() {

  },

  identity: function identity() {

  },

  property: function property(propName) {
    return function (obj) {
      return obj[propName]
    }
  },

  indetity: function identity(v) {
    return v
  },

  // sum: function sum(ary) {
  //   result sumBy(ary, it => it)
  // },
  sum: function sum(ary) {
    return sumBy(ary, identity)
  },

  sumBy: function sumBy(ary, iteratee) {
    var result = 0
    for (var i = 0; i < ary.length; i++) {
      result += iteratee(ary[i])
    }
    return result
  },

  matches: function matches(src) {
    return function(obj) {
      for (var key in src) {
        if (src[key] !== obj[key]) {
          if (!isSubset(src[key], obj[key])) { //深度对比
            return false
          } else if (src[key] !== obj[key]) {
            return false
          }
        }
      }
      return true
    }
  },

  isMatch: function isMatch(object, source) {

  },

  matchesProperty: function matchesProperty(ary) {

  },

  fromPairs: function fromPairs(pairs) {

  },

  toPairs: function toPairs(obj) {

  },

  flatten: function flatten(ary) {
    var result = []

    for (var i = 0; i < ary.length; i++) {
      if(!Array.isArray(ary[i])) {
        result.push(ary[i])
      } else {
        for (var j = 0; j < ary[i].length; j++) {
          result.push(ary[i][j])
        }
      }
    }
    return result
  }

  // function flatten(ary) {
  //   return ary.reduce((result, item) => {
  //     if (Array.isArray(item)) {
  //       for (var i = 0; i < item.length; i++) {
  //         result.push(item[i])
  //       }
  //     } else {
  //       result.push(item)
  //     }
  //   }, [])
  // }

  // function flatten(ary) {
  //   return ary.reduce((result, item) => {
  //     if (Array.isArray(item)) {
  //       result.splice(result.length, 0, ...item)
  //     } else {
  //       result.push(item)
  //     }
  //   }, [])
  // }

  // function flatten(ary) { //内存占用稍多
  //   return ary.reduce((result, item) => {
  //     if (Array.isArray(item)) {
  //       result = [...result, ...item]
  //     } else {
  //       result = [...result, item]
  //     }
  //   }, [])
  // }

  // function flatten(ary) { 
  //   return [].concat(...ary)
  //   //或return flattenDepth(ary, 1)
  // }
  ,

  flattenDeep: function flattenDeep(ary) {
    var result = []

    for (var i = 0; i < ary.length; i++) {
      if (Array.isArray(i)) {
        var tmp = flattenDeep(ary[i]) //递归
        result = [...result, ...tmp]
      } else {
        result.push(ary[i])
      }
    }
    return result 
  }

  // function flattenDeep(ary, infinity) {
  //   return flattenDepth(ary, 100)//一般不会超过100
  // }
  ,

  flattenDepth: function flattenDepth(ary, depth = 1) {//展开depth层
    if (depth === 0) {
      return ary.slice()//返回原数组的copy,或[...ary]
      //不要返回原数组
    }
    var result = []

    for (var i = 0; i < ary.length; i++) {
      if (Array.isArray(ary[i])) {
        var tmp = flattenDepth(ary[i], depth - 1)
        result = [...result, ...tmp]
      } else {
        result.push(ary[i])
      }
    }
    return result
  },

  differenceBy: function differenceBy(array, ...args) {
    var iteratee
    if (typeof args[args.length - 1] === 'string' || typeof args[args.length - 1] === 'function') {
      iteratee = args.pop()
    } else {
      iteratee = identity
    } //参数归一化
  },

  dropWhile: function dropWhile(ary, predicate) {
    predicate = iteratee(predicate)

    for () {
      if (predicate()) {}
        break;
    }
    return result
  },

  iteratee: function iteratee(shorthand) { //把前面的判断语句抽象成一个函数，方便重复调用
    if (typeof shorthand === 'function') {
      return shorthand
    }
    if (typeof shorthand = 'string') {
      return _.matches(shorthand)
    }

    if (Array.isArray(shorthand)) {
      return _.matchesPredicate(shorthand)
    }

    if (typeof shorthand = 'object') {
      return _.matches(shorthand)
    }
  },

  dropRightWhile: function dropRightWhile (ary, predicate) {
    predicate = iteratee(predicate)
  },

  keyBy: function keyBy(ary, key) {
    var obj = {}

    for (var item of ary) {
      obj[item[key]] = item //由item属性查出对象
    }

    return obj
  },

  groupBy: function groupBy(ary, propName) {
    var map = {}
    for (var item of ary) {
      if (item[propName] in map) {
        map[item[propName]].push(item)
      } else {
        map[item[propName]] = [item]
      }
    }
    return map
  }

  // 高阶函数
  // function groupBy(ary, predicate) { //把ary传进predicate，里返回值构造新对象
  //   var map = {}
  //   for (var item of ary) {
  //     var key = predicate(item)
  //     if (key in map) {
  //       map[key].push(item)
  //     } else {
  //       map[key] = [item]
  //     }
  //   }
  //   return map
  // }

  // function groupBy(ary, predicate) { //把ary传进predicate，里返回值构造新对象
  //   return ary.reduce((map, item) => {
  //     var key = predicate(item)
  //     if (key in map) {
  //       map[key].push(item)
  //     } else {
  //       map[key] = [item]
  //     }
  //     return map
  //   },{})
  // }

  // function groupBy(ary, predicate) { //把ary传进predicate里返回值构造新对象
  //   return ary.reduce((map, item) => {
  //     var key = predicate(item)
  //     key in map ?
  //       map[key].push(item)
  //     :
  //       map[key] = [item]

  //     return map
  //   },{})
  // }
  ,




}

