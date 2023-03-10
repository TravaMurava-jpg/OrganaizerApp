const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const path = require('path');

const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', require('../server/routes/auth.route'))
app.use('/api/todo', require('../server/routes/todo.route'))
app.use('/api/group', require('../server/routes/group.route'))
app.use('/api/groups', require('../server/routes/groups.route'))
app.use('/api/sharedtodo', require('../server/routes/sharedtodo.route'))
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });



async function connecting(){
    try {
        await mongoose.connect('mongodb+srv://Semyon:1221@cluster0.1aqash6.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connected to the DB')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
    }
    connecting()
    var PORT = process.env.PORT || 4000
    app.listen(PORT, function() {
        console.log(`Server is running on port ${PORT}!`)
    })