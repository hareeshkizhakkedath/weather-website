 //jshint esversion:6



const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message_One');
const messageTwo=document.querySelector('#message_Two');



//event listener to fetch response from forcast API
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    messageOne.textContent="";
    messageTwo.textContent="Loading...";
    //fetch below link and get forcast
    fetch("/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        //if we get error <p></p>in index.hbs will print it
        if(data.error){
            messageOne.innerHTML=data.error;
            messageTwo.innerHTML="";

        }//else print data
        else{
            messageOne.innerHTML="Temprature: "+data.forcast_temprature+" degree  ,"+" forecast: "+data.weather_description[0];
            messageTwo.innerHTML=data.location;
        
        }
    });
});
});

// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     });
// });