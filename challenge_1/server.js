const express = require('express')
const app = express()
const path = require('path');

// TIL -> You're supposed to use express STATIC in order to serve multiple files at a time
app.use(express.static(__dirname))
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))