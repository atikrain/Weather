import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css";
import search_bar from "../assets/search.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {

    const inputRef = useRef()

    const [weatherData , setWeatherData] = useState(false);

    const search = async (city) => {
        if(city === ""){
            alert("please enter a city name");
            return;
        }
        try{
            // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
            const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert("city not found");
                return;
            }

            console.log(data)
            setWeatherData({
                humidity : data.current.humidity,
                windSpeed : data.current.wind_kph,
                temperature : Math.floor(data.current.temp_c),
                location : data.location.name,
                icon : data.current.condition.icon
            })
        } catch(err){
            console.error("not found" , err)
        }
    }
    useEffect(() => {
        search("");
    },[])
  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='search' />
            <img src={search_bar} alt="" onClick={() => search(inputRef.current.value)} />
        </div>
        {weatherData ? <>
          <img className='weather-icon' src={weatherData.icon} alt="" />
        <p className='temperature'>{weatherData.temperature}℃</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
              <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km/hr</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </> : <></>}
      
    </div>
  )
}

export default Weather
