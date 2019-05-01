const google = require('./API/googleAPI')
const bing = require('./API/bingAPI')
let argumentos = process.argv.slice(2)
// eslint-disable-next-line no-unused-vars
let [firstSearch, secondSearch] = argumentos

argumentos.map(element => {
  bing.bingWebSearch(element)
  google.googleSearch(element)
})
