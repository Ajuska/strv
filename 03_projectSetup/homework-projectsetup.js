// store articles in something better than database
// add eslint
// implement endpoints
// use pino (logs)
// everytime request will come in, log the info, not just about these routes


'use strict'

const   Koa = require('koa'),
        Router = require('koa-router'),
        Bodyparser = require('koa-body'),
        Logger = require('koa-pino-logger')

const   app = new Koa(),
        router = new Router()

let articles = [
    {
        name: 'How to train your dragon.'
    },
    {
        name: 'What to buy for STRV course.'
    }
];

router.get('/articles/:id', ctx => {
    ctx.body = articles[ctx.params.id];
});

router.post('/articles/create', ctx => {
    const body = ctx.request.body;
    articles.push(body)
    ctx.body = { status: "success"}
});

router.put('/articles/:id', ctx => {
    ctx.body = Object.assign(articles[ctx.params.id], ctx.request.body);
});


// App middleware
app
    .use(Bodyparser())
    .use(router.allowedMethods())
    .use(router.routes())
    .use(Logger());


app.listen(3000, () => console.log('Server started ...'));



// router.get('articles')
// router.get('articles/:id/')
// router.delele('articles/:id/')
// router.patch('articles/:id/')
// router.put('articles/:id/')

// const article = {
//     id: '123',
//     text: 'hola!',
// }



