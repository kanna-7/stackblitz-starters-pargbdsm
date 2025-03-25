
const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const dotenv = require('dotenv')
const userSchema = require('./Schema')
dotenv.config();
const app = express();
const port = 3010;

app.use(express.static('static'));
 app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/menu',async(req,res)=>{
  try{
    const {name,description,price}=req.body;
    if(!name || !price){
      res.status(400).send({msg:"All fields are required"});
    }
    const data = new userSchema({name,description,price});
    await data.save();
    res.status(200).send({msg:"Item created successfully"});
  }
  catch (error) {
    res.status(500).send({msg:"Something went wrong"});
  }
})
app.get('/menu',async (req,res)=>{
  try {
    const data = await userSchema.find();
    res.status(200).json(data);
  } catch(error){
    res.status(500).send({msg:'Something went wrong'})
  }
})
app.listen(port, async() => {
  try{
    await mongoose.connect(process.env.MONGO);
    console.log('Server connected successfully')
    console.log(`Example app listening at http://localhost:${port}`);
  } catch (error){
    console.log("Error",error);
  }
  
});
