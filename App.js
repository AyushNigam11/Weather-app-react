import React, { useState } from 'react';
import './index.css'

const api = {
  key: "059d1e009545c29a5df38cc553a0bce8" ,
  base: "https://home.openweathermap.org/api_keys" 
}

function App() {
  const [query , setQuery] = useState('');
  const [weather , setWeather] = useState({});
  const search = evt =>{
    if(evt.key === "enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('')
        console.log(result);
      })
    }
  }

  const dateBuilder = (d) =>{
     let months = ["january" , "february", "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , " November" , "December"];
     let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
  
     let day = days[d.getDay()];
     let date = d.getDate();
     let month = months[d.getMonth()];
     let year = d.getFullYear();
     
     return `${day} ${date} ${month} ${year}`
   }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp>16) ? 'app warm' : 'app') : 'app'}>
       <main>
         <div className="search-box">
           <input type="text" 
           className="search-bar"
           placeholder="search..."
           onChange= {e => setQuery(e.target.value)}
           value={query}
           onKeyPress={search}
           />
         </div>
         {(typeof weather.main != "undefined") ?(
         <div>
            <div className="location-box">
              <div className="location">{weather.name} , {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
           </div>
           <div className="weather-box">
              <div className="temp">
               {Math.round(weather.temp.main)} degree celsius
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
           </div>
         </div>
         ) : ('')}
       </main>
    </div>
  );
}

export default App;
