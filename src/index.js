const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

const { data } = require('./data')

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')
app.get("/totalRecovered" ,async(req,res)=>{
    const results=await connection.find()
    let total=0;
    let id="id"

    results.map((ele)=>{
        total=total+parseInt(ele.recovered)
    })
  

    res.json({
     "id":"total",
     "recovered":total
})

})
app.get("/totalActive" ,async(req,res)=>{
    const results=await connection.find()
    let total=0;
    let id="id"

    results.map((ele)=>{
        total=total+parseInt(ele.infected)
    })
  

    res.json({
     "id":"total",
     "active":total
})

})

app.get("/totalDeath" ,async(req,res)=>{
    const results=await connection.find()
    let total=0;
    let id="id"

    results.map((ele)=>{
        total=total+parseInt(ele.death)
    })
  

    res.json({
     "id":"total",
     "death":total
})

})
app.get("/hotspotStates" ,async(req,res)=>{
    const results=await connection.find()
  
    let arr=[]
   
  
    

    results.map((ele)=>{

        if(((ele.infected - ele.recovered)/ele.infected)>0.1){
            arr.push({
                state:ele.state,
                rate:((ele.infected - ele.recovered)/ele.infected).toFixed(5)
            })
           
        }
      
})
console.log(arr)
res.send(arr)
})
app.get("/healthyStates" ,async(req,res)=>{
    const results=await connection.find()
  
    let arr=[]
   
  
    

    results.map((ele)=>{

        if((ele.death/ele.infected)<0.005){
            arr.push({
                state:ele.state,
                mortality:(ele.death/ele.infected).toFixed(5)
            })
           
        }
      
})
console.log(arr)
res.send(arr)
})




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;