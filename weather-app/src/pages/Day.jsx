import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DayCard from "../components/DayCard";
import { calcAverage } from "../hooks/calcAverage";

function Day({ children, drop, city, country }) {
    const [day, setDay] = useState("");
    const [averageRain, setAverageRain] = useState("");
    const [searchParams] = useSearchParams();
    const [dayName, setDayName] = useState("");

    const getDay = useCallback(async () => {
        const date = searchParams.get("date");
        setDayName(moment(date).format("dddd"));

        const response = await axios.get(
            `http://localhost:5000/weather-api-7c25c/us-central1/app/api/weather/find?date=${date}&location=${drop}`
        );
        const day = response.data.resultado[0].doc;
        calcAverage(day.hourly_rain_chance, setAverageRain);
        setDay(day);
        console.log(day);
    }, [averageRain, drop]);

    useEffect(() => {
        getDay();
        console.log(searchParams.get("date"));
    }, [getDay]);

    return (
        <div className="day">
            {children}
            <div className="containerTitles">
                <h4 className="dayName">{dayName}</h4>
                <h2 className="city">{city}</h2>
                <h3 className="country">{country}</h3>
            </div>
            {day && (
                <DayCard day={day}/>
            )}
        </div>
    );
}

export default Day;
