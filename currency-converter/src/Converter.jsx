import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { FaLongArrowAltRight } from "react-icons/fa";
import './converter.css'
import { useSelector, useDispatch } from 'react-redux'
import { setAmount, setFromCurrency, setToCurrency, setResult } from './redux/converterSlice';

function Converter() {
  const dispatch = useDispatch();
  const { amount, fromCurrency, toCurrency, result } = useSelector(state => state.currency);

  useEffect(() => {
    localStorage.setItem('amount', JSON.stringify(amount))
  }, [amount])

  useEffect(() => {
    localStorage.setItem('fromCurrency', JSON.stringify(fromCurrency))
  }, [fromCurrency])

  useEffect(() => {
    localStorage.setItem('toCurrency', JSON.stringify(toCurrency))
  }, [toCurrency])

  useEffect(() => {
    localStorage.setItem('result', JSON.stringify(result))
  }, [result])

  let BASE_URL = 'https://api.freecurrencyapi.com/v1/latest'
  let API_KEY = 'fca_live_hlI5lvRwCbmI9JUsbZwBfHICMExCvkm13jyRUWFe'

  const getCurrency = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
      const money = (response.data.data[toCurrency] * parseFloat(amount)).toFixed(2);
      dispatch(setResult(money));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='converterDiv'>
      <h3 className='headline'>Currency Converter</h3>

      <div className='mainArea'>
        <input type='number' value={amount} onChange={(e) => dispatch(setAmount(e.target.value))} className='currencyInput' onKeyDown={(e) => {if (e.key === 'Enter') {getCurrency()}}}/>

        <select value={fromCurrency} onChange={(e) => dispatch(setFromCurrency(e.target.value))} className='selector'>
          <option className='option'>USD</option>
          <option className='option'>EUR</option>
          <option className='option'>TRY</option>
          <option className='option'>GBP</option>
          <option className='option'>JPY</option>
          <option className='option'>CHF</option>
        </select>

        <FaLongArrowAltRight style={{ fontSize: '2.5rem'}} />

        <select value={toCurrency} onChange={(e) => dispatch(setToCurrency(e.target.value))} className='selector'>
          <option className='option'>USD</option>
          <option className='option'>EUR</option>
          <option className='option'>TRY</option>
          <option className='option'>GBP</option>
          <option className='option'>JPY</option>
          <option className='option'>CHF</option>
        </select>

        <input type='number' readOnly value={result} className='currencyInput'/>
      </div>

      <div>
        <button onClick={() => getCurrency()} className='convertBtn'>Convert</button>
      </div>
    </div>
  )
}

export default Converter
