const request = require('postman-request')

//Start with our first abstraction
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2RlYWNvbjA3MjAiLCJhIjoiY2ttbWd5b3g3MG9lNjJ2b2Q1ZDN6b29sdiJ9.JxOXjKQh3mvdNmx_P7amCg&limit=1'
    //Make the http request
    request({ url, json : true}, (error, {body}) => {
       if(error){
          callback('Unable to connect to the geo-code service!',undefined)
       }else if(body.features.length === 0){
          callback('Unable to find location.  Try another search',undefined)
       }else{
          callback(undefined, {
             latitude : body.features[0].center[1],
             longitude : body.features[0].center[0],
             location : body.features[0].place_name
          })
       }
    })
 }
 
 module.exports = geocode