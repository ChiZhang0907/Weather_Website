const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/beaaf45e8c523d2dc6ec61114488e0ab/'+ latitude + ',' + longitude

    request({url: url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location!', undefined)
        }else{
            var summary = body.currently.summary
            var temperature = body.currently.temperature
            var precipProbability = body.currently.precipProbability
            callback(undefined,summary + '. It is currently ' + temperature + ' degress out.' + 'There is a ' + precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
