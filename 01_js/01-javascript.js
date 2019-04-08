/// STRICT MODE

'use strict'
//variables are 'locked' ==> like read only
const obj = {
    first: 'John'
}

Object.freeze(obj)
obj.first = 'Brian'

console.log(obj.first)

/// VAR LET CONST    
//never use var (it does not give any errors)
obj  = {} //not allowed
obj.first = '' //allowed


// OBJECTS
const obj = new Object()
const obj = {}

const comoputedField = 'name-${Math.random()}'

delete obj.first
Reflect.deleteProperty(obj, 'first')


//customize propetry with Object.defineProprety
// .>anumerate:false withh hide the propetry from listing


//// THIS BINDING
// 'this' will use context of the object it is called on
// it can be changed by .call/.apply/.bind which is called on func.
// arrow function binds this to outside

////  STRICT OPERATORS  
// === strict equal // == it find type where can both object be converted, than i converts is and qeuals it


//// PROTOTYPE OBJECTS
//every object, function, class has prototype

//// CLOSURES
// functions inside of function which can holds some value (care for memory leaks)

//// ASYNC
// 

