const google = require('./API/googleAPI')
const bing = require('./API/bingAPI')
let resultBingString = ''
let resultGoogleString = ''
let argumentos = process.argv.slice(2)
// eslint-disable-next-line no-unused-vars
let [firstSearch, secondSearch] = argumentos

let getDataBingSearch = (data, currentIndex, maxResult) => {
  if (currentIndex < data.length) {
    bing.bingWebSearch(data[currentIndex], result => {
      if (result > maxResult) {
        maxResult = result
        resultBingString = data[currentIndex]
        getDataBingSearch(data, currentIndex + 1, maxResult)
      } else {
        getDataBingSearch(data, currentIndex + 1, maxResult)
      }
    })
  } else {
    console.log(`EL MAS BUSCADO EN BING ES : ${resultBingString} con ${maxResult} busquedas`)
  }
}

let getDataGoogleSearch = (data, currentIndex, maxResult) => {
  if (currentIndex < data.length) {
    google.googleSearch(data[currentIndex], result => {
      if (result > maxResult) {
        maxResult = result
        resultGoogleString = data[currentIndex]
        getDataGoogleSearch(data, currentIndex + 1, maxResult)
      } else {
        getDataGoogleSearch(data, currentIndex + 1, maxResult)
      }
    })
  } else {
    console.log(`EL MAS BUSCADO EN GOOGLE ES : ${resultGoogleString} con ${maxResult} busquedas`)
  }
}

if (argumentos.length > 0) {
  getDataBingSearch(argumentos, 0, 0)
  getDataGoogleSearch(argumentos, 0, 0)
} else {
  console.log('Ingrese un criterio de busqueda')
}
