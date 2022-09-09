import axios from 'axios'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";
import { calcAverage } from '../hooks/calcAverage'
import { calcRainChanceIcon } from '../hooks/calcRainChanceIcon';

function Day({ children, drop }) {
    const [day, setDay] = useState("");
    const [icon, setIcon] = useState('');
    const [averageRain, setAverageRain] = useState("");
    const [searchParams] = useSearchParams();

    const getDay = useCallback(async () => {

        const date = searchParams.get('date')
  
          const response = await axios.get(`http://localhost:5000/weather-api-7c25c/us-central1/app/api/weather/find?date=${date}&location=${drop}`)
          const day = response.data.resultado[0].doc
          calcAverage(day.hourly_rain_chance, setAverageRain)
          setDay(day)
          setIcon(calcRainChanceIcon(averageRain))
          console.log(day)
      }, [averageRain, drop, icon])

      useEffect(() => {
        getDay()
        console.log(searchParams.get('date'))
      }, [getDay]);

  return (
    <div>
        {children}
        {day.date}
        <img  src={`assets/svg-weather/${icon}.svg`} alt="" />
    </div>
  )
}

export default Day