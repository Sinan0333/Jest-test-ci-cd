const connectDb = require('./config/db')
const app =  require('./app')

connectDb()
app.listen(3000,()=>console.log('Backend started'))