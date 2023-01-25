const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', require('../server/routes/auth.route'))
app.use('/api/todo', require('../server/routes/todo.route'))
app.use('/api/group', require('../server/routes/group.route'))
app.use('/api/groups', require('../server/routes/groups.route'))
app.use('/api/sharedtodo', require('../server/routes/sharedtodo.route'))




async function connecting(){
    try {
        await mongoose.connect('mongodb+srv://Semyon:1221@cluster0.1aqash6.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to the DB')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
    }
    connecting()
    app.listen(4000, () => console.log(`listening on port 4000`))