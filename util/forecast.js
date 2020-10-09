//jshint esversion:6
//forcast API, request will fetch the url
const request=require("postman-request");
const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=3f17a03d32f7428b6943a19a5d152c3a&query="+latitude+","+longitude;
    request({url,json:true},(error,response)=>{
        //below datas will give input to the call back accordingly
        if(error){
            callback("unable to connect internet");
        }else if(response.body.error){
            callback("unable to connect");
        }else{
            callback(undefined,response.body.current);
        }
    });
};
module.exports=forecast;