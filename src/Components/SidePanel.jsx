export default function SidePanel ({data, capitalize}) {
    const icon = data?.weather?.[0]?.icon || "01d";
    let weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`
    const description = data?.weather?.[0]?.description || "";
    const details = ["Sunrise","Sunset","Wind","Humidity" ]
    const sunriseDate = new Date((data?.sys?.sunrise + data?.timezone) * 1000);
    const sunsetDate = new Date((data?.sys?.sunset + data?.timezone) * 1000);
    const sunrise = sunriseDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true,
                timeZone: 'UTC' // key: prevent browser from re-shifting
            });
    const sunset = sunsetDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true,
                timeZone: 'UTC' // key: prevent browser from re-shifting
            });
    const windspeed = data?.wind?.speed + " m/s"
    const humidity = data?.main?.humidity + "%"
    const detailsIcon = ["fa-solid fa-sun text-yellow-400", "fa-solid fa-cloud-sun text-orange-400", "fa-solid fa-wind text-green-400",  "fa-solid fa-droplet text-blue-400"]
    const detailsColor = ["text-yellow-400", "text-orange-400", "text-green-400", "text-blue-400"]
    const dataDetails = [sunrise, sunset, windspeed , humidity ] 
    const detailsArray = details.map((detail,i) => {
        return (
            <div key={i} className="md:flex md:flex-col md:items-center">
                <label className={`whitespace-nowrap text=lg text-[#ffffff] ${detailsColor[i]}`}>
                    {detail} <i className={detailsIcon[i]}/>
                </label>
                <div className="whitespace-nowrap text=2xl text-[#ffffff]">{dataDetails[i]} </div>
            </div>
        )
    } )

    return (
        <div className="md:flex  mb-9 md:mb-0">   
            <div className="relative flex flex-col w-full h-1/3 justify-center items-center mb-4 md:h-full md:order-1 md:ml-4 md:w-[200px]">
                <img src={weatherIcon} className="md:absolute w-1/2 h-25 md:h-full md:w-[200px] md:top-[-10px] "/>
                <div className={`flex absolute justify-center items-center top-3/4 text-lg text-[#ffffff]`}>{capitalize(description)}</div>
            </div>
            <div className="flex rounded-3xl bg-[#242424] p-4 items-center justify-around md:inline-grid md:grid-cols-2 md:grid-rows-2 md:gap-4 md:min-w-[240px] md:px-7 md:py-10 md:h-[200px]">
                {detailsArray}
            </div>
        </div>
    )
}