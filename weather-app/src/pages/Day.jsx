import axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DayCard from "../components/DayCard";
import Loading from "../components/Loading";
import { TbArrowBackUp } from 'react-icons/tb';
import { useFirebase } from "../context/firebaseContext";
import WeatherCard from "../components/WeatherCard";
import Lottie from 'react-lottie'
import change from "../lotties/change.json";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional


const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }


function Day({ children, drop, city, country, loading, setLoading }) {
    const [day, setDay] = useState("");
    const [searchParams] = useSearchParams();
    const [dayName, setDayName] = useState("");
    const navigate = useNavigate()
    const [realtime, setRealtime] = useState(true);
    const [realData, setRealData] = useState('');

    const { getData } = useFirebase();


    const getDay = useCallback(async () => {
        try {
            setLoading(true);
            const date = searchParams.get("date");
            setDayName(moment(date).format("dddd"));

            const response = await axios.get(
                `https://us-central1-weather-api-7c25c.cloudfunctions.net/app/api/weather/find?date=${date}&location=${drop}`
            );
            const day = response.data.resultado[0].doc;

            setDay(day);
            setLoading(false)
        } catch (error) {
            console.log('Error -->', error)
        }
       

    }, [drop, searchParams, setLoading]);

    

    useEffect(() => {
        
        if (!realtime) {
            getDay();
        } else {
            const date = searchParams.get("date");
            getData(date, drop, setRealData)
        }
        
        console.log(realData)
       
    }, [getDay, getData, realtime]);

    const goBack = () => {
        navigate('/week')
    }

    
    if (loading) {
        return <Loading/>
    }

    return (
        <div className={!realtime && "day"} style={{marginTop: '-30px'}}>
            {children}
                <TbArrowBackUp className="back" onClick={goBack} /> 
                <Tippy content={<span>{!realtime ? "Go Realtime": "Go Hours"}</span>}>
                <div onClick={() => setRealtime(!realtime)} className="change">
                    <Lottie  options={{ animationData: change, ...defaultOptions }} width={100} height={100} />
                </div>
                </Tippy>
            <div className="containerTitles">
                <h4 className="dayName">{dayName}</h4>
                <h2 className="city">{city}</h2>
                <h3 className="country">{country}</h3>
            </div>

            {
                !realtime ?
                <>
            {day && (
                <DayCard day={day}/>
                )}
                </>
                : realData &&
                <div className="containerRealtime">
                    <WeatherCard key={uuidv4()} day={realData[0]} />
                </div>

            }
            
        </div>
    );
}

export default Day;

