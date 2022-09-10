import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DayCard from "../components/DayCard";
import Loading from "../components/Loading";
import { TbArrowBackUp } from 'react-icons/tb';

function Day({ children, drop, city, country, loading, setLoading }) {
    const [day, setDay] = useState("");
    const [searchParams] = useSearchParams();
    const [dayName, setDayName] = useState("");
    const navigate = useNavigate()

    const getDay = useCallback(async () => {
        try {
            setLoading(true);
            const date = searchParams.get("date");
            setDayName(moment(date).format("dddd"));

            const response = await axios.get(
                `http://localhost:5000/weather-api-7c25c/us-central1/app/api/weather/find?date=${date}&location=${drop}`
            );
            const day = response.data.resultado[0].doc;

            setDay(day);
            setLoading(false)
        } catch (error) {
            console.log('Error -->', error)
        }
       

    }, [drop, searchParams, setLoading]);

    useEffect(() => {
        getDay();
    }, [getDay]);

    const goBack = () => {
        navigate('/week')
    }

    
    if (loading) {
        return <Loading/>
    }

    return (
        <div className="day">
            {children}
            <TbArrowBackUp className="back" onClick={goBack} /> 
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
