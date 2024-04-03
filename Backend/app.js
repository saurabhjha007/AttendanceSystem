require("dotenv").config();
const express= require("express");
const app=express();
const cors=require("cors");
const session=require("express-session");
const mongoose=require("mongoose");
const authRoutes=require("./routes/auth-routes");
const adminRoutes= require("./routes/admin-routes");


mongoose.connect('mongodb://127.0.0.1:27017/AttendeceSystem')
.then(()=> console.log('AttendeceSystem DB connected'))
.catch(err => console.log(err));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:["http://localhost:5173"]
}));

app.get("/",(req,res)=>{
    res.status(200).send("Working Fine");
})

app.use("/auth",authRoutes);
app.use("/admin",adminRoutes);



const port=5000;
app.listen(port,()=>{
    console.log(`Server running Port Number ${port} `);
})