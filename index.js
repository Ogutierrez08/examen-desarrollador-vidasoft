// const google = require('./API/googleAPI')
const bing = require('./API/bingAPI')
let resultString = ''
let argumentos = process.argv.slice(2)
// eslint-disable-next-line no-unused-vars
let [firstSearch, secondSearch] = argumentos

let getDataSearch = (data, currentIndex, maxResult) => {
  if (currentIndex < data.length) {
    bing.bingWebSearch(data[currentIndex], result => {
      if (result > maxResult) {
        maxResult = result
        resultString = data[currentIndex]
        getDataSearch(data, currentIndex + 1, maxResult)
      } else {
        getDataSearch(data, currentIndex + 1, maxResult)
      }
    })
  } else {
    console.log(`EL MAS BUSCADO EN BING ES : ${resultString} con ${maxResult} busquedas`)
  }
}

getDataSearch(argumentos, 0, 0)
