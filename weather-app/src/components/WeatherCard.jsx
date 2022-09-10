import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import styles from './WeatherCard.module.scss'
import { calcAverage } from "../hooks/calcAverage";
import { calcRainChanceIcon } from "../hooks/calcRainChanceIcon";
import { useNavigate } from "react-router-dom";

function WeatherCard({ day, grid }) {

    const [averageTemp, setAverageTemp] = useState('');
    const [averageRain, setAverageRain] = useState('');
    const [icon, setIcon] = useState('');
    
    const getCalcs = useCallback( () => {
        calcAverage(day.hourly_temperature, setAverageTemp);
        calcAverage(day.hourly_rain_chance, setAverageRain)
        setIcon(calcRainChanceIcon(averageRain))
    }, [averageRain, day.hourly_temperature, day.hourly_rain_chance])

    const navigate = useNavigate()

    
    useEffect(() => {
        getCalcs()
    }, [getCalcs]);

    const handleDay = () => {
       navigate(`/day?date=${day.date}`)
    }


    return (
        <div className={styles.card} style={grid &&{gridColumn: 'span 2', }} onClick={handleDay}>
            <h4 style={grid &&{alignSelf: 'center', }}>{moment(day.date).format("dddd")} </h4>
            <h5 style={grid &&{alignSelf: 'center', }}>{moment(day.date).format("MMM DD")}</h5>
            <div style={grid &&{gap: '60px', }} className={styles.containerRain}>
                <img  src={`assets/svg-weather/${icon}.svg`} alt="" />
                <div className={styles.rightRain}>
                    <p>{averageRain}%</p>
                    <small className={styles.textRain}>rain chance</small>                  
                </div>
            </div>
            <h3>{averageTemp -10 + 14}º<span>/</span><strong>{averageTemp -4}º</strong></h3>
        </div>
    );
}

export default WeatherCard;
