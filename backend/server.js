require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
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


//Connect to DB this allows our program to have cloud database using mongoose. mongoose has added functionality too
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT,()=>{
      console.log('Connected to db & listening on port',process.env.PORT)
    })
  })


  .catch((error) => {
    console.log(error);
  })



// // listen for request
// app.listen(process.env.PORT,()=>{
//   console.log('listening on port',process.env.PORT)
// })

