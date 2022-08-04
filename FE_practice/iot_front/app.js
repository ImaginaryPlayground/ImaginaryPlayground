const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/about', (req, res) => {
    res.send('<h1>This is About Page</h1>')
})

app.listen(3000, () => {
 console.log('I love you 3000')
})
