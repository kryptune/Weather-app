import {useState, useEffect} from 'react'

export default function ForecastPanel ({forecastData, data, capitalize}) {
  if (forecastData.length === 0 || !data) {
  return null; // or loading spinner
  }
  const threeDaysForecast = forecastData?.slice(0, 26);
  const adjustedThreeDaysForecast = threeDaysForecast?.map(item => {
      return {...item, dt: (item.dt + data?.timezone) * 1000}
  })
  const nowUTC = new Date();
  const timezoneOffset = data?.timezone;
  const localTime = new Date(nowUTC.getTime() + timezoneOffset * 1000);
  const todayNumber = localTime.getUTCDate();
  const tomorrowNumber = todayNumber + 1;
  const [updatedData, setUpdatedData] = useState([])
  const [activeTab, setActiveTab] = useState("today")
  const dataToday = adjustedThreeDaysForecast.filter(hourlyData => new Date(hourlyData.dt).getUTCDate() === todayNumber)
  const updatedDataToday = dataToday.length >= 3 ? dataToday : [...adjustedThreeDaysForecast.slice(0,3)]
  useEffect(()=> {
      if(adjustedThreeDaysForecast.length > 0){
          setUpdatedData(updatedDataToday)
      }
  }, [forecastData])
    
  const forecastDataArray = updatedData.map((forecast,i) => {
    let weatherIcon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    return (
      <div key={i} className="flex flex-col px-3 py-4 items-center justify-center bg-[#242424] w-[175px] rounded-lg"> 
          <p className="font-semibold text-base text-[#ffffff]">
              {new Date(forecast.dt).toLocaleString('en-US', {
                weekday: 'short',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'UTC' // key: prevent browser from re-shifting
              })}
          </p>
          <img src={weatherIcon} className="w-20 h-20"/>
          <div className="text-3xl text-[#ffffff] font-bold mb-2">{Math.round(forecast.main.temp)}°C </div>
          <div className="text-base text-[#ffffff] whitespace-nowrap">{capitalize(forecast.weather[0].description)} ({forecast.pop * 100}%)</div>
      </div>
    )
  })
  return(
    <div className='md:mx-10'>
        <div className="flex gap-3 mb-7 ml-2">
            <button className={`relative text-base bg-[#121212] mr-2 ${activeTab === "today"? "text-white": "text-[#D3D3D3]"}`} 
              onClick={() => {
                setActiveTab("today")
                setUpdatedData(updatedDataToday)}}>Today
              {activeTab === "today" && (
              <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-2 h-2 rounded-full bg-white "></span>)}              
            </button>
            <button className={`relative text-base bg-[#121212] mr-2 ${activeTab === "tomorrow"? "text-white": "text-[#D3D3D3]"}`} 
              onClick={() => {
                setActiveTab("tomorrow")
                setUpdatedData( adjustedThreeDaysForecast.filter(hourlyData => new Date(hourlyData.dt).getUTCDate() === tomorrowNumber ))}}>
              Tomorrow
              {activeTab === "tomorrow" && (
              <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-2 h-2 rounded-full bg-white "></span>)}
            </button>
            <button className={`relative text-base bg-[#121212] mr-2 ${activeTab === "next3"? "text-white": "text-[#D3D3D3]"}`}  
              onClick={() => {
                setActiveTab("next3")
                setUpdatedData(adjustedThreeDaysForecast)}}>Next 3days
              {activeTab === "next3" && (
              <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-2 h-2 rounded-full bg-white  "></span>)}
            </button>
        </div>
        <div className="grid grid-flow-col auto-cols-max overflow-x-auto gap-3 scrollbar-small">
              {forecastDataArray}
        </div>
    </div>
  )
}