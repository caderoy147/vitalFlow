require('dotenv').config()

const express = require('express')
const bloodRequestRoutes = require('./routes/bloodRequests')


//express app
const app = express();

//middleware
app.use(express.json()) //IMPORTANT, this is so that any request is looked 

app.use((req, res, next)=>{
  console.log(req.path, req.method)
  next()
})


//route handler
// app.get('/',(req, res) =>{
//   res.json({mssg: 'Welcome to the app'})
// })

//routers
app.use('/api/bloodRequests',bloodRequestRoutes)



// listen for request
app.listen(process.env.PORT,()=>{
  console.log('listening on port',process.env.PORT)
})

