'use strict'

const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const pino = require('pino')

const koa = new Koa()
const router = new Router()





koa.use(bodyparser())
// this is called middleware
koa.use((ctx, next) => {
    console.log(ctx.request.path)
    
    ctx.response.status = 200
    return next() // keep connection open = you can run multiple things
})

koa.use(ctx => {
    console.log(ctx.request.path)
    
    ctx.response.status = 400

})


//koa uses promises, expess does not
koa.use(async (ctx, next)=>{
    //do stuff
})

router.get('/home', ctx => {
    ctx.response.set = {'STRV-my-important-info': 'yolo'}
    ctx.response.body = {
        hello: 'world',
    }
})

router.get('/articles/:id', ctx => {
    ctx.response.body = {
        yourId: ctx.params.id,
    }
})

koa.user(router.routes())

const server = koa.listen(3000)

process.on ('SIGINT', () => {
    // always start terminating with user side, then databses etc..
    server.close()
    // never call process.exit() => does not exit gracefuly
    setTimeout(()=> {
        throw new Error('Boo!') // there is something in event loop, delayts whole closing
    }, 10000).unref() // => means that if this is the only thing, dont wait for it
})