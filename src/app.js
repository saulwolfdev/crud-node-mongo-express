const bodyParser=require("body-parser");
const express=require("express");
const morgan=require("morgan");
const mongoose=require("mongoose");

const app =express();

const usersRoutes=require("./routes/users");

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost/rest-api",
{useMongoClient:true})
.then(db=>console.log("database is connected"))
.catch(err=>console.log(err))

//SETTINGS 
app.set("port",process.env.PORT||3001);

//MIDDLEWARES
app.use(morgan("dev"));
app.use(bodyParser.json());
//ROUTES
app.use("/users",usersRoutes);
//SERVER
app.listen(app.get("port"),()=>{
    console.log("server on port",app.get("port"))
})