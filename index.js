const getWasmExports = (url, names) => {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes, {}))
    .then(results => names.reduce((obj, name) => {
      console.log(obj, name)
      obj[name] = results.instance.exports[name]
      return obj
    }, {}))
};

Promise.all([
  getWasmExports(require('./main.rs'), ['add', 'multi']),
  getWasmExports(require('./substract.wasm'), ['substract'])
]).then((results) => results.reduce((obj, result) => {
  return Object.assign(obj, result)
}), {}).then(({add, substract, multi})=> {
  alert(multi(substract(add(20, 2), 1), 20))
})
