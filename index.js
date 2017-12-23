const getWasmExport = (url, name) => {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes, {}))
    .then(results => results.instance.exports[name])
};

Promise.all([
  getWasmExport(require('./add.rs'), 'add'),
  getWasmExport(require('./substract.wasm'), 'substract')
]).then(([add, substract]) => {
  alert(substract(add(1, 2), 3));
})
