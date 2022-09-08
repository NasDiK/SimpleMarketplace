const express =require('express');
const cors = require('cors');
const app =express();
const knexfile = require('./knexfile');
const db = require('knex')(knexfile.development);
const loginRouter = require('./routers/loginRouter');
const mainRouter = require('./routers/mainRouter');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(loginRouter);
app.use(mainRouter);

app.get('/',(req,res)=>{
    res.send('Hello world!');
});

app.get('/users',(req,res)=>{
    db.select('*').from('log').then((records)=>res.send(JSON.stringify(records)));
})

app.get('/addlog',(req,res)=>{
    db('log').insert({text:'newRec'}).then((x)=>res.sendStatus(200));
})

app.listen(3001,()=>{
    console.log('Сервер запущен на порте 3001');
})