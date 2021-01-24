const express = require("express")
const data = require("./data")
const server = express()

server.get('/', (req,res)=>{
    res.send("express")
})

server.get('/aktorler',(req,res)=>{
    res.status(200).json(data)
})
server.get('/aktorler/:id',(req,res)=>{
    const {id}=req.params;
    const aktor = data.find((aktor)=>aktor.id===parseInt(id))
    if(aktor){
        res.status(200).json(aktor);
    }
    else{
        res.status(404).send("Bulunamadı");
    }
})
server.listen(3000,()=>{
    console.log("merhaba")
})