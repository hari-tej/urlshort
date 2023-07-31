const express= require('express');
const mongoose=require('mongoose');
const URL= require('./models/data');
const shortId=require('shortid');


require('dotenv').config();
const app=express();

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: false }));

const PORT=process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    
    console.log("connected to the database successfully");
    app.listen(PORT,()=>{
        console.log("Listening to requests from port 3003");
    });

}).catch((err)=>{
    console.log(err);
});


app.get("/",async(req,res)=>{
    const shorturls= await URL.find();
    const latest=await URL.find().sort({_id:-1}).limit(1);
    res.render('index',{shorturls:shorturls,latest:latest});
});

app.post("/shorturls",async(req,res)=>{
    const code=shortId.generate();
    const shorter=process.env.BASE_URL+"/"+code;
     await URL.create({full:req.body.fullUrl,short:shorter,code:code});
     res.redirect("/");
    
    
});

app.get("/:shorturl",async(req,res)=>{
    const shorturl= await URL.findOne({code:req.params.shorturl});
    if(shorturl==null) return res.sendStatus(404);
    
    shorturl.clicks++;
    shorturl.save();

    res.redirect(shorturl.full);

});

