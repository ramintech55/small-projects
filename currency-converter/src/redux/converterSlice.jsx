import { createSlice } from '@reduxjs/toolkit';

const getInitial = (key, defaultValue) => {
    const restoredData = localStorage.getItem(key);
    return restoredData !== null ? JSON.parse(restoredData) : defaultValue;
}

const initialState = {
    amount: getInitial('amount', 0),
    fromCurrency: getInitial('fromCurrency', 'USD'),
    toCurrency: getInitial('toCurrency', 'TRY'),
    result: getInitial('result', 0)
};

export const converterSlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        setFromCurrency: (state, action) => {
            state.fromCurrency = action.payload;
        },
        setToCurrency: (state, action) => {
            state.toCurrency = action.payload;
        },
        setResult: (state, action) => {
            state.result = action.payload;
        }
    }
});

export const { setAmount, setFromCurrency, setToCurrency, setResult } = converterSlice.actions;
export default converterSlice.reducer;