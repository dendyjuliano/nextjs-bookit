const mongose = require('mongoose')

const dbConnect = () => {
    if (mongose.connection.readyState >= 1) {
        return
    }

    mongose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(con => console.log('connect to local database'))
}

export default dbConnect