const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const publicpath = path.join(__dirname, '../public')
const viewsPath = path.join('__dirname', '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

app.use(express.static(publicpath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chi Zhang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chi Zhang'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Chi Zhang'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chi Zhang',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    res.send({
        product: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide a address term"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chi Zhang',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})