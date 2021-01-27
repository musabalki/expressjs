const router=require('express').Router();
let data = require("../data")

router.get('/',(req,res)=>{
    res.status(200).json(data)
})

let next_id = 4;

router.post("/",(req,res,next)=>{
    let yeni_aktor=req.body;
    if(!yeni_aktor.isim)
    {
        next({statusCode:400,errorMessage:"Aktor eklemek icin isim giriniz"});
    }
    else if(yeni_aktor.isim && !yeni_aktor.filmler)
    {
        next({statusCode:400,errorMessage:"Aktor eklemek icin filmleri giriniz"});
    }
    else
    {
        yeni_aktor.id=next_id;
        next_id++;
        data.push(yeni_aktor)
        res.status(201).json(yeni_aktor);
    }
   
})
router.delete("/:id",(req,res)=>{
    const sil_id=req.params.id;
    const sil_aktor=data.find(aktor=>Number(sil_id)===aktor.id)
    console.log(sil_aktor)
    if(sil_aktor){
        data = data.filter(aktor=>aktor.id!==Number(sil_id))
        res.status(204).end();
    }
    else{
        res.status(404).json({error:"hata silinemedi"})
    }
})
router.put("/:id",(req,res)=>{
    const update_id=req.params.id;
    const update_body=req.body;
    const update_aktor=data.find(aktor=>{
        if(Number(update_id)===aktor.id){
            aktor.isim=update_body.isim;
            aktor.filmler=update_body.filmler;
           //newAktor={...aktor,update_body}
           //console.log(newAktor)
            res.status(204).end();
        }
        else{
            res.status(404).json("hata");
        }
    })
    //console.log(sil_aktor)
    /*if(sil_aktor){
        data = data.filter(aktor=>aktor.id!==Number(sil_id))
        res.status(204).end();
    }
    else{
        res.status(404).json({error:"hata silinemedi"})
    }*/
})
router.get('/:id',(req,res)=>{
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

module.exports = router;