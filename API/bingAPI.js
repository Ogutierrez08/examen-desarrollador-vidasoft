const https = require('https')
const config = require('../config/bingConfig')

module.exports = {
  bingWebSearch  (query, onSucess) {
    https.get({
      hostname: 'api.cognitive.microsoft.com',
      path: '/bing/v7.0/search?q=' + encodeURIComponent(query),
      headers: { 'Ocp-Apim-Subscription-Key': config.subscriptionKey }
    }, res => {
      let body = ''
      // eslint-disable-next-line no-return-assign
      res.on('data', part => body += part)
      res.on('end', () => {
        for (var header in res.headers) {
          if (header.startsWith('bingapis-') || header.startsWith('x-msedge-')) {
            //   console.log(header + ': ' + res.headers[header])
          }
        }
        console.log('BING API SEARCH:')
        console.dir(`${query}: LA CANTIDAD DE RESULTADOS ENCONTRADOS ES: ` + JSON.parse(body).webPages.totalEstimatedMatches, { colors: false, depth: null })
        onSucess(JSON.parse(body).webPages.totalEstimatedMatches)
      })
      res.on('error', e => {
        console.log('Error: ' + e.message)
        throw e
      })
    })
  }

}
