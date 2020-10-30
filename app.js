const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json({extended: false}))

mongoose.connect("mongodb://localhost/urlShortner", {
    useUnifiedTopology: true, useNewUrlParser: true
}, () => console.log('database connected'))

app.set('view engine', 'ejs')

app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))
app.use('*', (req, res) => res.status(404).send('404 Error. Page not found'))


app.listen(PORT, () => console.log("Server is live on", PORT))

