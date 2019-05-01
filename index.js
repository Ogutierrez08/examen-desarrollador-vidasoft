const google = require('./API/googleAPI')
const bing = require('./API/bingAPI')
let resultBingString = ''
let resultGoogleString = ''
let argumentos = process.argv.slice(2)
// eslint-disable-next-line no-unused-vars
let [firstSearch, secondSearch] = argumentos

let getDataBingSearch = (data, currentIndex, maxResult, onSuccess) => {
  if (currentIndex < data.length) {
    bing.bingWebSearch(data[currentIndex], result => {
      if (result > maxResult) {
        maxResult = result
        resultBingString = data[currentIndex]
        getDataBingSearch(data, currentIndex + 1, maxResult, onSuccess)
      } else {
        getDataBingSearch(data, currentIndex + 1, maxResult, onSuccess)
      }
    })
  } else {
    console.log(`EL MAS BUSCADO EN BING ES : ${resultBingString} con ${maxResult} busquedas`)
    onSuccess()
  }
}

let getDataGoogleSearch = (data, currentIndex, maxResult, onSuccess) => {
  if (currentIndex < data.length) {
    google.googleSearch(data[currentIndex], result => {
      if (parseInt(result) > maxResult) {
        maxResult = parseInt(result)
        resultGoogleString = data[currentIndex]
        getDataGoogleSearch(data, currentIndex + 1, maxResult, onSuccess)
      } else {
        getDataGoogleSearch(data, currentIndex + 1, maxResult, onSuccess)
      }
    })
  } else {
    console.log(`EL MAS BUSCADO EN GOOGLE ES : ${resultGoogleString} con ${maxResult} busquedas`)
    onSuccess()
  }
}

if (argumentos.length > 0) {
  console.log('-------------------------------------------')
  getDataBingSearch(argumentos, 0, 0, () => {
    console.log('-------------------------------------------')
    getDataGoogleSearch(argumentos, 0, 0, () => {
      console.log('********** RESULTADOS FINALIZADOS **********')
    })
  })
} else {
  console.log('Ingrese un criterio de busqueda')
}
