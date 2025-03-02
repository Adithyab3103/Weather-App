import React, { useState } from 'react';
import { Sun, Cloud, Wind, Thermometer, Droplets, Gauge, Eye } from "lucide-react";

const api = {
    base: "https://api.openweathermap.org/data/2.5/",
};

function User() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState(null);

    const searchPlace = async () => {
        if (!search) return;
        try {
            const response = await fetch(
                `${api.base}weather?q=${search}&units=metric&APPID=${import.meta.env.VITE_WEATHER_API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            const result = await response.json();
            setWeather(result);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeather(null);
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
        });
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search a City..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={searchPlace}>Search</button>

            </div>
            {weather && weather.main && (
                <div className="weather-info bg-white shadow-lg p-6 rounded-lg mt-4 w-80">

                    <p className="text-xl font-bold flex items-center gap-2">
                        <Cloud /> City: {weather.name}
                    </p>
                    <p className="text-lg flex items-center gap-2">
                        <Thermometer /> Temperature: {weather.main.temp}°C
                    </p>
                    <p className="text-lg flex items-center gap-2">
                        <Thermometer /> Feels like: {weather.main.feels_like}°C
                    </p>
                    <p className="text-lg flex items-center gap-2">
                        <Droplets /> Humidity: {weather.main.humidity}%
                    </p>
                    <p className="text-lg flex items-center gap-2">
                        <Gauge /> Pressure: {weather.main.pressure} hPa
                    </p>
                    <p className="text-lg flex items-center gap-2">
                        <Wind /> Wind Speed: {weather.wind.speed} m/s
                    </p>
                    <p className="text-lg flex items-center gap-2">
                        <Eye /> Visibility: {weather.visibility / 1000} km
                    </p>
                    <p className="text-lg flex items-center gap-2">
                        <Sun /> Sunrise: {formatTime(weather.sys.sunrise)}
                    </p>
                    <p className="text-lg flex items-center gap-2">
                        <Sun /> Sunset: {formatTime(weather.sys.sunset)}
                    </p>
                </div>
            )}

        </div>
    );
}

export default User;
