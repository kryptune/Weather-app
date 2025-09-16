import { useState, useEffect } from "react";
export default function MainPanel ({city,data,capitalize}){
    const [hour, setHour] = useState("1h")
    const [rain ,setRain] = useState(0)
    const temperature = data?.main?.temp || "";
    const country = data?.sys?.country || "";
    const textSize = city.length > 8 ? "text-2xl" : "text-3xl"
    const currentDate = new Date();
    const options = {
    day: '2-digit',      // Two-digit day (e.g., 05)
    month: 'long',       // Full month name (e.g., September)
    };
    // Create a formatter object. You can specify a locale (e.g., 'en-US').
    const formatter = new Intl.DateTimeFormat('en-US', options);
    // Format the current date using the formatter.
    const formattedDate = formatter.format(currentDate);
    useEffect( ()=> {
        if(data?.rain?.["3h"]){
            setHour("3h")
            setRain(data?.rain?.["3h"])
        }
        setRain(data?.rain?.[hour])
    }, [data] )

    console.log( data?.rain?.["1h"] )

    return(
        <div className="flex rounded-3xl bg-[#242424] p-5 items-center justify-evenly md:px-7 md:py-10 md:h-[200px] md:mr-4">
            <div className="flex flex-col mr-3">
                <h1 className="text-base text-[#D3D3D3] mb-1 md:text-xl">{formattedDate}</h1>
                <h2 className={`${textSize} text-[#ffffff] font-bold md:text-5xl`}>{capitalize(city)}, {country} </h2>
            </div>
            <div className="text-4xl text-[#ffffff] font-bold mr-4 md:text-6xl md:ml-4">{Math.round(temperature)}°C </div>
            <div className="flex flex-col justify-center p-2">
                <p className="text-xl text-[#ffffff]">Rain({hour})</p>
                <h3 className="text-2xl text-[#ffffff] font-bold">{rain} mm</h3>
            </div>
        </div>
        
    )
}