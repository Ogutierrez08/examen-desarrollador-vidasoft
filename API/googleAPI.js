const google = require('googleapis').google
const customsearch = google.customsearch('v1')
const config = require('../config/googleConfig')

module.exports = {
  googleSearch (query, onSucess) {
    customsearch.cse.list({ cx: config.CX, q: query, auth: config.API_KEY }, function (err, resp) {
      if (err) {
        console.log('An error occured', err)
        return
      }
      console.log('Google Search API')
      console.log(`${query}: LA CANTIDAD DE RESULTADOS ENCONTRADOS ES:` + JSON.stringify(resp.data.queries.request[0].totalResults))
      onSucess(resp.data.queries.request[0].totalResults)
    })
  }
}
