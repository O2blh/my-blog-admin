export const reqSvgs = require.context(
  '../assets/images/',
  true,
  /\.(jpg|jpeg|png|bmp)$/
)

export const isContained = (a, b) => {
  if (!(a instanceof Array) || !(b instanceof Array)) return false
  const len = b.length
  if (a.length < len) return false
  for (let i = 0; i < len; i++) {
    if (!a.includes(b[i])) return false
  }
  return true
}

export const parshQueryString = (search) => {
  if (!search) {
    return {}
  }
  const obj = {}
  search
    .substr(1)
    .split('&')
    .forEach((item) => {
      const key = item.split('=')[0]
      const val = item.split('=')[1]
      obj[key] = val
    })
  return obj
}

export const debounce = (fn, delay) => {
  let timer = null
  return function () {
    clearTimeout(timer)
    let context = this
    let args = arguments
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}
