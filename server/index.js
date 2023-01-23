const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', require('../server/routes/auth.route'))



// connecting to mongo and checking if DB is running
async function connecting(){
    try {
        await mongoose.connect('mongodb://localhost/TODO')
        console.log('Connected to the DB')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
    }
    connecting()
    // end of connecting to mongo and checking if DB is running

    app.listen(4000, () => console.log(`listening on port 4000`))