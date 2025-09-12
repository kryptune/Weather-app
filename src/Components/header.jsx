export default function header({name, setShowChangeCity}) {

    return(
    <div className="flex mb-6 mt-4">
        <div className="mr-auto ml-2 flex flex-col md:ml-10">
            <h1 className="text-sm text-[#D3D3D3]">Welcome home,</h1>
            <h2 className="text-lg font-bold text-[#ffffff] ml-2">{name === "" ? "Guest" : name}</h2>
        </div>
        <button 
        onClick={() => {setShowChangeCity(prev => !prev)}}
        aria-label="Change City"
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-800"
        >
        <i className="fa-solid fa-location-dot text-white"></i>
        </button>
    </div>
    )
}
