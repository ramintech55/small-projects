import { createSlice } from '@reduxjs/toolkit';

const getInitial = (key, defaultValue) => {
    const storedData = localStorage.getItem(key);
    return storedData !== null ? JSON.parse(storedData) : defaultValue;
}

const initialState = {
    cityName: getInitial('city', ''),
    weather: getInitial('weather', null),
    error: getInitial('error', ''),
    loading: getInitial('loading', false)
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCityName: (state, action) => {
            state.cityName = action.payload;
        },
        setWeather: (state, action) => {
            state.weather = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setCityName, setWeather, setError, setLoading } = weatherSlice.actions;
export default weatherSlice.reducer;