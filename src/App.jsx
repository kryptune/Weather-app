import { useEffect, useState } from 'react'
import Header from  './Components/header'
import MainPanel from './Components/MainPanel'
import SidePanel from './Components/SidePanel'
import LocationMap from './Components/LocationMap'
import ForecastPanel from './Components/ForecastPanel'
import { motion } from 'framer-motion';


function App() {
    const [city, setCity] = useState("Manila")
    const [latitude, setLatitude] = useState(14.59)
    const [longitude, setLongitude] = useState(120.98)
    const [name, setName] = useState("Guest")
    const [currentData, setCurrentData] = useState(null)
    const [forecastData, setForecastData] = useState([])
    const [error, setError] = useState("")
    const [showChangeCity, setShowChangeCity] = useState(false)
    const API_KEY = "5a08e2e34a40d8046fa491ad838ae95e"
    // The API URL for the 5-day / 3-hour forecast
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    // The API URL for the current weather
    const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    const fetchWeatherData = async () => {
        setError(null);
        setCurrentData(null);
        setForecastData([]);
        console.log(currentData)
        if(!city.trim()){
            alert("Please enter a city")
        }

        try{
            const weatherResponse = await fetch(CURRENT_WEATHER_URL)
            const weatherJSON = await weatherResponse.json()

            if(weatherResponse.ok){
              setCurrentData(weatherJSON)
              const forecastResponse = await fetch(FORECAST_URL)
              const foreCastJSON = await forecastResponse.json()
              if(forecastResponse.ok){
                  setForecastData(foreCastJSON.list)
              }else {
                  setError(foreCastJSON.message || "Failed to fetch 5-day forecast data")
              }
            }else {
              setError(weatherJSON.message || "Failed to fetch current weather data")
            }
        } catch (err) {
            setError('Failed to fetch data. Please check your network connection.');
            console.error(err);
        }
        console.log(forecastData)     
    }

    const capitalize = (str) => {
      if (!str) return '';
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    useEffect(() => { fetchWeatherData() }, []);

    return (
      <div className='bg-[#121212] p-6 min-h-screen md:p-12'>
        <Header name={name} setShowChangeCity={setShowChangeCity} />
        {showChangeCity && <motion.div
                        initial={{ x: '100%' }} // Start off-screen to the right
                        animate={{ x: showChangeCity ? 0 : '100%' }} // Animate to 0 (on-screen) or 100% (off-screen)
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }} // Smooth spring animation
                        className=" grid absolute top-0 right-0 h-1/2 w-full rounded-xl shadow-xl z-10 bg-[#121212] p-6 md:h-[80%]"
                    >
                        <LocationMap 
                            city={city}
                            latitude={latitude}
                            longitude={longitude}
                            setShowChangeCity={setShowChangeCity}
                            setCity={setCity}
                            fetchWeatherData={fetchWeatherData}
                            setLatitude={setLatitude}
                            setLongitude={setLongitude}
                        />
                    </motion.div>}
        <div className='md:flex md:justify-center md:mb-6'>
          <MainPanel data={currentData} city={city} capitalize={capitalize}/>
          <SidePanel data={currentData} capitalize={capitalize}/>
        </div>
        <ForecastPanel forecastData={forecastData} data={currentData} capitalize={capitalize}/>
        <footer className='flex text-xs text-[#D3D3D3] justify-center items-center mt-12'>Copyright © 2025 Kryptune - All Rights Reserved</footer>
      </div>
    )
}

export default App
