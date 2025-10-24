import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './Weather.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCityName, setWeather, setError, setLoading } from './redux/weatherSlice'

function Weather() {
    const dispatch = useDispatch();
    const { cityName, weather, error, loading } = useSelector(state => state.weather);

    let BASE_URL = 'https://api.openweathermap.org/data/2.5/'
    let API_KEY = '0d4e3dd5876abf06dd20a9d9a1f604ed'

    const getWeather = async () => {
        if (!cityName.trim()) {
            dispatch(setWeather(null));
            dispatch(setError('Please enter a city name'));
            return;
        }
        dispatch(setLoading(true));
        dispatch(setError(''));
        dispatch(setWeather(null));
        try {
            const response = await axios.get(`${BASE_URL}weather?q=${cityName}&appid=${API_KEY}&units=metric`);
            if (response.data.cod === 200) {
                dispatch(setWeather(response.data));
            } else {
                dispatch(setWeather(null));
                dispatch(setError('City not found'));
            }
        } catch (error) {
            console.error('Error:', error);
            dispatch(setWeather(null));
            dispatch(setError('Something went wrong'));
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        localStorage.setItem('city', JSON.stringify(cityName))
    }, [cityName]);

    useEffect(() => {
        localStorage.setItem('weather', JSON.stringify(weather))
    }, [weather]);

    useEffect(() => {
        localStorage.setItem('error', JSON.stringify(error))
    }, [error]);

    useEffect(() => {
        localStorage.setItem('loading', JSON.stringify(loading))
    }, [loading]);

  return (
    <div className='weatherDiv'>

        <h3 className='header'>Weather App</h3>

        <div className='inputDiv'>
            <input type='text' placeholder='Enter a city...' value={cityName} onChange={(e) => {dispatch(setCityName(e.target.value))}} onKeyDown={(e) => {if (e.key === 'Enter') {getWeather()}}} className='input'/>
            <button onClick={() => getWeather()} className='button'>Get Weather</button>
        </div>

        {weather && (
        <div className='weather'>
            <h2 className='name'>{weather.name}, {weather.sys.country}</h2>
            <h4 className='temp'>Temperature : {weather.main.temp}, (Max: {weather.main.temp_max}, Min: {weather.main.temp_min})</h4>
            <p className='otherInfo'>Wind Speed : {weather.wind.speed}</p>
            <p className='otherInfo'>Humidity : {weather.main.humidity}</p>
        </div>
        )}

        {error && (
            <p className='error'>{error}</p>
        )}

        {loading && (
            <p className='loading'>Loading...</p>
        )}
    </div>
  )
}

export default Weather