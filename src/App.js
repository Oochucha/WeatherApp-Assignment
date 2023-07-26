import { useState } from "react";
import "./App.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [foreCast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResp = await response[0].json();
        const forecastResp = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResp });
        setForecast({ city: searchData.label, ...forecastResp });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(foreCast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {foreCast && <Forecast data={foreCast} />}
    </div>
  );
}

export default App;
