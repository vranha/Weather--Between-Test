import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import DropdownComponent from "./components/DropdownComponent";
import axios from "axios";
import { calcAverage } from "./hooks/calcAverage";
import { calcRainChanceIcon } from "./hooks/calcRainChanceIcon";
import moment from "moment";
import { Navigate, Route, Routes } from "react-router-dom";
import Week from "./pages/Week";
import Day from "./pages/Day";

function App() {
    const [day, setDay] = useState("");

    const [days, setDays] = useState([]);

    const [drop, setDrop] = useState("Madrid");
    const [averageRain, setAverageRain] = useState("");
    const [icon, setIcon] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    const getDays = useCallback(async () => {
        const response = await axios.get(
            `http://localhost:5000/weather-api-7c25c/us-central1/app/api/weather/findWeek?&location=${drop}`
        );
        const daysResponse = response.data.resultado;
        setDays(daysResponse);
        setCountry(daysResponse[0].doc.location.country);
        setCity(daysResponse[0].doc.location.city);

        // calcAverage(day.hourly_rain_chance, setAverageRain)
        // setIcon(calcRainChanceIcon(averageRain))
        // console.log(icon)
    }, [averageRain, drop, icon]);


    useEffect(() => {
        getDays();
        console.log(day);
    }, [getDays, drop]);

    return (
        <div className="App">
            <Routes>
                <Route path="*" element={<Navigate replace to="/" />} />
                <Route path="/" element={<Navigate to="/week" />} />
                <Route path="/week" element={
                    <Week days={days} city={city} country={country}>
                        <DropdownComponent  setDrop={setDrop} drop={drop} /> 
                    </Week>} />
                <Route path="/day" element={
                    <Day city={city} country={country} drop={drop}>
                        <DropdownComponent  setDrop={setDrop} drop={drop} /> 
                    </Day>} />
            </Routes>
        </div>
    );
}

export default App;
