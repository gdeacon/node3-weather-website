const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c1439fe121a4b603a904017ceb4bf5fa&query='+ latitude+',' + longitude +'&units=f'
    request({ url: url, json : true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        } else{
            const theForecast = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature 
            + ' degrees, but it feels like ' + body.current.feelslike + ' degrees'

            callback(undefined,theForecast)
        }    

    })

}

module.exports = forecast