const express = require("express")
const data = require("./data")
const server = express()
server.use(express.json())

server.get('/', (req,res)=>{
    res.send("expressssssssssss")
})

server.get('/aktorler',(req,res)=>{
    res.status(200).json(data)
})
server.get('/aktorler/:id',(req,res)=>{
    const {id}=req.params; //req.query - req.body
    console.log(req.params);
    const aktor = data.find((aktor)=>aktor.id===parseInt(id))
    if(aktor){
        res.status(200).json(aktor);
    }
    else{
        res.status(404).send("Bulunamadı");
    }
})
server.listen(3001,()=>{
  
})