import React, { useState } from 'react'
import './WeatherApp.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import mist_icon from '../Assets/mist.png'


const WeatherApp = () => {

    let api_key ="e45f39703251bda09d60fd23096c4a03";

    const [wicon,setWicon] = useState(cloud_icon);

    const search = async() =>{
      const element = document.getElementsByClassName("cityInput");
      if(element[0].value==="")
      {
        return 0;
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

      let response = await fetch(url);
      let data = await response.json();
      console.log("Weather icon code:", data.weather[0].icon);

      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location= document.getElementsByClassName("weather-location");
      
      humidity[0].innerHTML = data.main.humidity+" %";
      wind[0].innerHTML = data.wind.speed+ " km/h";
      temperature[0].innerHTML = data.main.temp+" °c";
      location[0].innerHTML = data.name;
      
      
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud_icon);
    } else if (data.weather[0].icon.startsWith("03")) {
        setWicon(cloud_icon); // Considering all codes starting with "03" as cloudy
    } else if (data.weather[0].icon.startsWith("04")) {
        setWicon(drizzle_icon); // Considering all codes starting with "04" as cloudy
    } else if (data.weather[0].icon.startsWith("09")) {
        setWicon(rain_icon); // Considering all codes starting with "09" as rain
    } else if (data.weather[0].icon.startsWith("10")) {
        setWicon(rain_icon); // Considering all codes starting with "10" as rain
    } else if (data.weather[0].icon.startsWith("13")) {
        setWicon(snow_icon); // Considering all codes starting with "13" as snow
    }  else if (data.weather[0].icon.startsWith("50")) {
      setWicon(mist_icon); // Considering all codes starting with "13" as snow
  } 
    
    }
    
  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={()=>{search()}}>
            <img src={search_icon} alt=''/>
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24° C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className='icon'/>
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" className='icon'/>
          <div className="data">
            <div className="wind-rate">18 kmph</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
