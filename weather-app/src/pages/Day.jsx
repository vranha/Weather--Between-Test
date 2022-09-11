import axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DayCard from "../components/DayCard";
import Loading from "../components/Loading";
import { TbArrowBackUp } from "react-icons/tb";
import { useFirebase } from "../context/firebaseContext";
import WeatherCard from "../components/WeatherCard";
import Lottie from "react-lottie";
import change from "../lotties/change.json";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

function Day({ children, drop, city, country, loading, setLoading, realtime, setRealtime }) {
    const [day, setDay] = useState("");
    const [searchParams] = useSearchParams();
    const [dayName, setDayName] = useState("");
    const navigate = useNavigate();
    const [realData, setRealData] = useState("");

    const { getData, updateRain } = useFirebase();

    const id = searchParams.get("id");

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
            setLoading(false);
        } catch (error) {
            console.log("Error -->", error);
        }
    }, [drop, searchParams, setLoading]);

    const changeStats = () => {
        try {
            setInterval(async () => {
                const hours = [];
                for (let i = 0; i < 24; i++) {
                    hours.push(Math.floor(Math.random() * (100 - 0 + 1) + 0));
                }
                const id = searchParams.get("id");
                await axios.patch(`https://us-central1-weather-api-7c25c.cloudfunctions.net/app/api/weather/${id}`, {
                    hourly_rain_chance: hours,
                });
            }, 60000);
        } catch (error) {
            console.log("Error -->", error);
        }
    };

    useEffect(() => {
        if (!realtime) {
            getDay();
        } else {
            const date = searchParams.get("date");
            getData(date, drop, setRealData);
            changeStats();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getDay, getData, realtime]);

    const goBack = () => {
        navigate("/week");
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={!realtime ? "day" : ""} style={{ marginTop: "-30px" }}>
            {children}
            <TbArrowBackUp className="back" onClick={goBack} />
            <Tippy content={<span>{!realtime ? "Go Realtime" : "Go Hours"}</span>}>
                <div onClick={() => setRealtime(!realtime)} className="change">
                    <Lottie options={{ animationData: change, ...defaultOptions }} width={100} height={100} />
                </div>
            </Tippy>
            <div className="containerTitles">
                <h4 className="dayName">{dayName}</h4>
                <h2 className="city">{city}</h2>
                <h3 className="country">{country}</h3>
            </div>

            {!realtime ? (
                <>{day && <DayCard day={day} />}</>
            ) : (
                realData && (
                    <div className="containerRealtime">
                        <WeatherCard
                            key={uuidv4()}
                            day={realData[0]}
                            noNavigate={"no"}
                            updateRain={updateRain}
                            id={id}
                        />
                        <h3 className="click">Click the card to change the DB</h3>
                        <p className="also">(It also changes automatically every 60 seconds 😋)</p>
                    </div>
                )
            )}
        </div>
    );
}

export default Day;
