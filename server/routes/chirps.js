const express = require("express");
const router = express.Router();
import db from '../db/index.js'

// REST API
router.get('/:id?', async(req, res)=>{
    
    const id=req.params.id;
    try{
        if(id){

            res.json(await db.one(id))
          
        }else{

            res.json(await db.all());
          
        }

    }catch(e){
        console.log(e);
        res.sendStatus(500);

    }

});


// Create
router.post("/", async(req, res) => {
    const userid = req.body.userid;
    const content= req.body.content;
    const location=req.body.location;

    try{
        await db.post(userid, content, location);
        res.sendStatus(200);

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

// Delete
router.delete("/:id", async(req, res) => {
    const id = req.params.id;

    try{
        await db.remove(id);
        res.sendStatus(200);

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }
  
});

// Update
router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const content= req.body.content;
    const location=req.body.location;

    try{
        await db.update(id, content, location);
        res.sendStatus(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

export default router;