// store articles in something better than array --> database?
// add eslint --> npx eslint homework-projectsetup.js
// implement endpoints (GET, POST, PUT, DELETE)
// use pino (logs)
// everytime request will come in, log the info, not just about these routes


'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-body')
const logger = require('koa-pino-logger')

const app = new Koa()
const router = new Router()

const BASE_URL = '/api/v1/articles'

const articles = [
    {
        name: 'How to train your dragon.',
        rating: 10,
        likes: 987,
    },
    {
        name: 'What to buy for STRV course.',
        rating: 9,
        likes: 362,
    },
    {
        name: '10 things you should never do in Koa.',
        rating: 3,
        likes: 10,
    },
]

router.get(`${BASE_URL}/:id`, ctx => {
    try {
        const article = articles[ctx.params.id]
        ctx.status = 200
        ctx.body = {
            status: 'success',
            data: article,
        }
    } catch (err) {
        console.log(err)
    }
})

router.post(`${BASE_URL}/create`, ctx => {
    try {
        const body = ctx.request.body
        articles.push(body)
        ctx.status = 201
        ctx.body = {
            status: 'success',
            message: 'article created', 
        }
    } catch (err) {
        console.log(err)
    }
})

router.put(`${BASE_URL}/:id`, ctx => {
    try {
        const body = ctx.request.body
        articles[ctx.params.id] = body
        ctx.status = 200
        ctx.body = {
            status: 'success',
            message: 'article updated' }
    } catch (err) {
        console.log(err)
    }
})

router.delete(`${BASE_URL}/:id`, ctx => {
    try {
        articles.splice([ctx.params.id], 1)
        ctx.status = 200
        ctx.body = {
            status: 'success',
            message: 'article removed',
        }
    } catch (err) {
        console.log(err)
    }
})


// App middleware
app
    .use(bodyparser())
    .use(router.allowedMethods())
    .use(router.routes())
    .use(logger())


app.listen(3000, () => console.log('Server started ...'))
