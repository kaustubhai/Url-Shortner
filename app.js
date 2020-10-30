const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect("mongodb://localhost/urlShortner", {
    useUnifiedTopology: true, useNewUrlParser: true
}, () => console.log('database connected'))

app.set('view engine', 'ejs')

app.use(express.json({extended: false}))

app.use('/', require('./routes/index'))
app.use('/api/url', (req, res) => require('./routes/url'))


app.listen(PORT, () => console.log("Server is live on", PORT))