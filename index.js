// Use this simple app to query the Bing Web Search API and get a JSON response.
// Usage: node search.js "your query".
const https = require('https')

// const SUBSCRIPTION_KEY = process.env['39a0639b1ade4d118b6e9b358891fc26']
// if (!SUBSCRIPTION_KEY) {
//   throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
// }

let bingWebSearch = (query) => {
  https.get({
    hostname: 'api.cognitive.microsoft.com',
    path: '/bing/v7.0/search?q=' + encodeURIComponent(query),
    headers: { 'Ocp-Apim-Subscription-Key': '39a0639b1ade4d118b6e9b358891fc26' }
  }, res => {
    let body = ''
    // eslint-disable-next-line no-return-assign
    res.on('data', part => body += part)
    res.on('end', () => {
      for (var header in res.headers) {
        if (header.startsWith('bingapis-') || header.startsWith('x-msedge-')) {
          console.log(header + ': ' + res.headers[header])
        }
      }
      console.log('\nBING API SEARCH:\n')
      console.dir(`${query}: LA CANTIDAD DE RESULTADOS ENCONTRADOS ES: ` + JSON.parse(body).webPages.totalEstimatedMatches, { colors: false, depth: null })
    })
    res.on('error', e => {
      console.log('Error: ' + e.message)
      throw e
    })
  })
}

const query = process.argv[2] || 'Microsoft Cognitive Services'

bingWebSearch(query)
