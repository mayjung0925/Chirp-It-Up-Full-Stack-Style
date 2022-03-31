const express = require("express");
const router = express.Router();
import db from '../db/index.js'

// REST API
router.get('/:id?', async(req, res)=>{
    
    const id=req.params.id;
    try{
        if(id){
            const chirp= await db.one(id)

            res.json(chirp);
            res.sendStatus(200);
          
        }else{

            const chirps = await db.all()
            res.json(chirps);
            res.sendStatus(200);
          
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
        const newChirp= await db.post(userid, content, location);
        res.send(newChirp);
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
        const removeChirip = await db.remove(id);
        res.send(removeChirip)
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
     

    try{
        const updatedChirp= await db.update(id, content);
        res.json(updatedChirp);
        res.sendStatus(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

export default router;