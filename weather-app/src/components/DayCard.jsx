import React from "react";
import { v4 as uuidv4 } from "uuid";
import { calcRainChanceIcon } from "../hooks/calcRainChanceIcon";
import styles from './DayCard.module.scss'

function DayCard({ day }) {

    let count = 0
    

    return (

            <div className={styles.containerDay}>
                {day.hourly_rain_chance.map((chance, i) => {
                    const icon = calcRainChanceIcon(chance);
                    count += 1

                    const temp = day.hourly_temperature.map((temp, j) => {
                        if (i === j) {
                            return <span key={uuidv4()} style={temp > 20 ? {color:'var(--red)'}: {color:'var(--blue)'}}>{temp}</span>
                        }
                        return null
                    })
                    return (
                        <div className={styles.hour} key={uuidv4()}>
                            <h4>{count}h</h4>
                            <img src={`assets/svg-weather/${icon}.svg`} alt="" />
                            <div className={styles.chance}>
                                <p>{chance}%</p>
                                <p className={styles.chanceText}>rain chance</p>
                            </div>
                            <p ><strong>{temp}</strong>ºC</p>
                        </div>
                    );
                })}
            </div>

    );
}

export default DayCard;
