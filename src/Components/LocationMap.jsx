import { useEffect, useRef, useState } from "react";


export default function LocationMap({ city, latitude, longitude, setShowChangeCity, setCity, fetchWeatherData, setLatitude, setLongitude }) {
    const defaultLocation = [latitude, longitude];
    const [tempCity, setTempCity] = useState(city)  
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        // initialize map only once
        if (!mapRef.current) {
        mapRef.current = L.map("map").setView(defaultLocation, 12);
        markerRef.current = L.marker(defaultLocation).addTo(mapRef.current);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
        }

        // Event listener for map clicks
        mapRef.current.on('click', onMapClick);

        return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
        };
    }, []);

    function onMapClick(e) {
       markerRef.current.setLatLng(e.latlng)
       getMarkerDetails()
       console.log(latitude,longitude)
    }

    function searchCity(cityName) {
        if (!mapRef.current || !markerRef.current) return; // guard

        if (cityName.trim() === "") {
            alert("Please enter a city name")
            return
        }

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`;

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                setLatitude(lat)
                setLongitude(lon)
                const newLocation = [lat, lon];
                mapRef.current.setView(newLocation, 12);
                markerRef.current.setLatLng(newLocation);
            } else {
                alert("City not found. Please try another name.");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            alert("An error occurred while searching. Please try again.");
        });
    }

    async function getMarkerDetails() {
        const coords = markerRef.current.getLatLng();
        const lat = coords.lat.toFixed(4);
        const lng = coords.lng.toFixed(4);
        setLatitude(lat)
        setLongitude(lng)
        // Use the Nominatim reverse geocoding service to get the city name
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            let cityname = 'Unknown';
            if (data && data.address) {
                cityname = data.address.city || data.address.town || data.address.village || data.address.hamlet || 'Unknown'
                setTempCity(cityname)
            }

        } catch (error) {
            console.error('Error fetching city name:', error);

        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        searchCity(tempCity)
    };


  return (
    <div>
      <div className="flex h-1/5 w-full mt-2 items-center mb-3">
        <div className="relative mr-2 w-2/5 md:mr-8">
          <input
            id="city-input"
            type="text"
            placeholder="Enter a city name"
            value={tempCity}
            onChange={(e) => setTempCity(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                handleSearch(e);
                }
            }}
            className="peer w-full px-4 py-3 bg-gray-900 text-gray-100 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          <label
            htmlFor="city"
            className="absolute left-4 top-3 text-transparent peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-blue-500 peer-focus:font-medium peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 transition-all"
          >
            City
          </label>
        </div>
        <button className="text-xs md:text-base text-black bg-[#ADD8E6] rounded-xl h-10  w-22 p-2 mr-2 md:mr-4" onClick={handleSearch}>
          Search City
        </button>
        <button className="text-xs md:text-base text-black bg-[#ADD8E6] rounded-xl h-10  w-22 p-2 mr-auto" onClick={()=>
            {
                fetchWeatherData()
                setCity(tempCity)
            }}>
          Get Weather
        </button>
        <i
          className="fa-solid fa-xmark text-white text-2xl md:text-3xl "
          onClick={() => setShowChangeCity((prev) => !prev)}
        ></i>
      </div>
      <div id="map" className="rounded-xl shadow-inner w-full h-full"></div>
    </div>
  );
}
