export const DEFAULT_VALUE = {
  ARRAY: '[]',
  OBJECT: '{}',
  STRING: '',
}

export const sessionStorageFactory = (params) => {
  const {
    key,
    defaultValue,
    raw,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = params

  const setItem = (value) => {
    const data = raw ? value : serializer(value)
    window.sessionStorage.setItem(key, data || defaultValue)
  }

  const getItem = () => {
    const data = window.sessionStorage.getItem(key) || defaultValue
    return raw ? data : deserializer(data)
  }

  const removeItem = () => window.sessionStorage.removeItem(key)

  return {
    setItem,
    getItem,
    removeItem,
  }
}
