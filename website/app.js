// 1- Global Variables
const zip = document.querySelector('#zip');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');
const generate = document.querySelector('#generate');
const feelings = document.querySelector('#feelings');

// 2- Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// 3- Personal API Key for OpenWeatherMap API
const api_key = '8d3c8702e85a3a0be6ae96a7f12230f6';

// 4- Event listener and callback function
generate.addEventListener('click',callback);

function callback(){
    if(zip.value==''){
        alert("Please Enter Zipcode ")
    }
    else {
        let base_url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=${api_key}&units=metric`;
        get_temp(base_url)
        .then(function (data){
            // console.log(data)
            postData('/add_temp', {temp:data['main'].temp, zip_value:zip.value });
        })
        .then(function (){update_ui()})
    }
}

// 5- Function to GET Web API Data
const get_temp= async (base_url)=>{
        const res = await fetch(base_url)
        try {
            const data = await res.json();
            // console.log(data)
            return data;
        } catch (error) {
            console.log('error',error)
        }
}

// 6- Function to POST data
const postData = async (url='', data={})=>{
    const response = await fetch(url,{
        method:'POST',
        credentials: 'same-origin',
        headers:{'content-type':'application/json',},
        body:JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        // console.log(newData)
        return newData
    }catch (error){
        console.log("error",error);
    }
}

// 7- Function to GET Project Data

const update_ui= async ()=>{
    const request = await fetch('/all');
    try {
        const all_data = await request.json();
        temp.innerHTML = all_data.temp;
        date.innerHTML = newDate;
        content.innerHTML = feelings.value;
    }catch(error){
        console.log('error',error)
    }
}