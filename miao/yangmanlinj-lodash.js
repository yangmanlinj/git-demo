var yangmanlinj = {

  fill: function fill(ary, val, start, end) {
    for (var i = 0; i < ary.length; i++) {
      ary[i] = val //每一个都指向相同的值，所以改一个，所有都变
    }
    return ary //返回原数组是为了接下来的链式调用
  },

  chunk: function(array, size) {
    
  },
}