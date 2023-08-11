const { handler } = require('./index.js')

handler().then(data => console.log(JSON.stringify(data)))