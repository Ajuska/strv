'use strict'

// Install with:
// npm install request
// npm install request-promise

// async await
// make a request to retrieve Luke Skywalker (GET http://swapi.co/api/people/1)
// You will retrieve Luke detail with vehicles array
// Then retrieve all vehicles by making requests to vehicle URL (e.g. GET http://swapi.co/api/vehicles/14)
// Use map function (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to retrieve vehicles names and dump them to the console


const rp = require('request-promise')

const BASE_URL = 'http://swapi.co/api'

async function run() {
    const response = await rp(`${BASE_URL}/people/1`)
        .then(function (resp) {
            const vehicles = JSON.parse(resp).vehicles
            return vehicles
        })
        .catch(function (err) {
            console.error(err)
        })
    
    let cars = []
    const array_of_promises =   [   rp(`${response[0]}`),
                                    rp(`${response[1]}`)
                                ]
    for await (const response_data of array_of_promises) {
        cars.push(JSON.parse(response_data).name)
    }

    console.log(cars)
    
    // I am not sure where to use this "MAP" function, as it must be used on array 
    // and I am recieving objects when I call vehicle endpoint (= the code under is not working)
    // const car_names = response.map(inside_data => await rp(`${inside_data}`).name)

    // cars variable in this case listed below was list of dictionaries (strings..) i.e. response:
    // [ '{"name":"Snowspeeder","model":"t-47 airspeeder","manufacturer":"Incom corporation","cost_in_credits":"unknown","length":"4.5","max_atmosphering_speed":"650","crew":"2","passengers":"0","cargo_capacity":"10","consumables":"none","vehicle_class":"airspeeder","pilots":["https://swapi.co/api/people/1/","https://swapi.co/api/people/18/"],"films":["https://swapi.co/api/films/2/"],"created":"2014-12-15T12:22:12Z","edited":"2014-12-22T18:21:15.623033Z","url":"https://swapi.co/api/vehicles/14/"}',
    // '{"name":"Imperial Speeder Bike","model":"74-Z speeder bike","manufacturer":"Aratech Repulsor Company","cost_in_credits":"8000","length":"3","max_atmosphering_speed":"360","crew":"1","passengers":"1","cargo_capacity":"4","consumables":"1 day","vehicle_class":"speeder","pilots":["https://swapi.co/api/people/1/","https://swapi.co/api/people/5/"],"films":["https://swapi.co/api/films/3/"],"created":"2014-12-18T11:20:04.625000Z","edited":"2014-12-22T18:21:15.920537Z","url":"https://swapi.co/api/vehicles/30/"}' ]
    // const car_names = cars.map(data_inside => data_inside.name)

}

run()