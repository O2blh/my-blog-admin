export const DEFAULT_VALUE = {
  ARRAY: '[]',
  OBJECT: '{}',
  STRING: '',
}

export const localStorageFactory = (params) => {
  const {
    key,
    defaultValue,
    raw,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = params

  const setItem = (value) => {
    const data = raw ? value : serializer(value)
    window.localStorage.setItem(key, data || defaultValue)
  }

  const getItem = () => {
    const data = window.localStorage.getItem(key) || defaultValue
    return raw ? data : deserializer(data)
  }

  const removeItem = () => window.localStorage.removeItem(key)

  return {
    setItem,
    getItem,
    removeItem,
  }
}
