const express = require("express");
const app = express();
const productRoutes = require('./routes/product')

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://arav:arav1234@cluster0.sw2zbly.mongodb.net/shop?retryWrites=true&w=majority',()=>{
    console.log('connected');
})
app.use(express.json());

// mongoose.set('strictQuery',true)
app.use('/products/',productRoutes);

app.listen(5000,()=>{
    console.log('server is running')
})
