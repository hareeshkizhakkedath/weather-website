//jshint esversion:6
const path= require("path");
const express=require("express");
const app=express();
const port=process.env.PORT || 3000;//when we deploy the port value is automatically assigned by heroku
const hbs=require("hbs");

const request = require("postman-request");
const geoCode=require("../util/geocode");
const forcast=require("../util/forecast");
//for hbs
const viewsPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.use("/static", express.static('./static/'));
//load home page
app.get('',(req,res)=>{
    res.render('index',{
        title:"weather app",
        name:"Hareesh"
    });
});
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"about",
        about:"this is a page wich deals",
        name:"Hareesh"
    });
});

//help page
app.get('/help',(req,res)=>{
    res.render('help',{
        about:"entho",
        title:"help",
        name:"Hareesh"
    });
});
//get method for weather route
app.get("/weather",(req,res)=>{
    //if address is not provided in the search
    if(!req.query.address){
        return res.send({
            error:"location is must"
           
        });
    }
    //to get lattitude and longitudewe are using geocode API.first parameter is address, second parameter is callback
    //we are passing destructured object as second parameter and giving default value for the object using empty object

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
      
        forcast(latitude,longitude,(error,forecastData)=>{
            
            if(error){
                return res.send({error});
            }
            res.send({
                forcast_temprature:forecastData.temperature,
                weather_description:forecastData.weather_descriptions,
                location,
                address:req.query.address,
                weather_icon:forecastData.weather_icons
            });
        });
    });
});

//404 page

app.get("*",(req,res)=>{
    res.render("f404",{
        title:"error 404"
    });
});


app.listen(port,()=>{
    console.log("server is up on port"+port);
});