// jshint esversion:6
//geocode API, request will fetch the url
const request=require("postman-request");
const geoCode=(address, callback)=>{
    const URL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiaGFyZWVzaGttMDkiLCJhIjoiY2tmMHJyem51MHhpdTMwcGhyMDdsam1rNCJ9.nhTFDDt7QfYLrFuKvACEuQ&limit=1";
    request({url:URL,json:true},(error,response)=>{
        //if any error it will giive below error message as input to the callback 
        if(error){
            callback("unable to connect to the internet");
        }else if(response.body.features.length===0){
            callback("unable to find location");
        }else{
            //if no error then lattitude longitude and location as input to the callback
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name

            });
            }
            
    });
};

module.exports=geoCode;