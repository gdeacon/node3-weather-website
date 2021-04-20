const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const app = express()
console.log('Port value from envionrment = ' + process.env.PORT)
const port = process.env.PORT || 3000



//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



//Setup our routs

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Garrett Deacon'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title : 'About me',
        name : 'Garrett Deacon'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title : 'Help Page',
        message : 'Here is where to get help',
        name : 'Garrett Deacon'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address to search!'
        })
    }
    
    //now use our utility classes for geocoding an forcast to actually fetch a forcase
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
     
        //Now get the forecast
        forecast(latitude, longitude,  (error, forecastData) => {
           if(error){
                return res.send({error})
           }

            res.send({
                location,
                forecast : forecastData,
                address : req.query.address
            })           
         })//end forcase   
     
     })//end geocode    

})//end route

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    
    res.send({
        products : []
    })
})

//404 routes
app.get('/help/*', (req,res) =>{
    res.render('notfound',{
        title : '404, Help Not Found!',
        message : '',
        name : 'Garrett Deacon',
        errorMessage: 'Help article not found!'
    })
})



app.get('*', (req, res) => {
    res.render('notfound',{
        title : '404',
        message : '',
        name : 'Garrett Deacon',
        errorMessage: 'Page not found!'
    })
})


//Start the server
app.listen(port, () =>{
    console.log('Server is up on port ' +  port)
})