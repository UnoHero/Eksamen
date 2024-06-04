const mongoose = require('mongoose');
const DBNAME="Eksamen";

const mongoConnect = URI =>{
    let state = 'unresolved'
    console.info(`Attempting to connect to mongo database @ URI: \n${URI}`)
    mongoose.connect(URI, {
        DBNAME
    })
        .then(result => {
            state = 'established!'
        })
        .catch(err=>{
            console.error('\n',err,'\n');
            state= 'unresolved!'
        })
        .finally(()=>{
            console.info(`Connection to database ${state}`)
        })
}

module.exports={
    mongoConnect
}