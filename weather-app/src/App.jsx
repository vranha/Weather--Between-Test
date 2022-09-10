import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import DropdownComponent from "./components/DropdownComponent";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Week from "./pages/Week";
import Day from "./pages/Day";

function App() {
    const [days, setDays] = useState([]);
    // const [drop, setDrop] = useState("Barcelona");
    const [drop, setDrop] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("selectedCity");
        const initialValue = JSON.parse(saved);
        return initialValue || "Barcelona";
      }); ;
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

    const getDays = useCallback(async () => {
        try {
        setLoading(true)
        const response = await axios.get(
            `http://localhost:5000/weather-api-7c25c/us-central1/app/api/weather/findWeek?&location=${drop}`
        );
        const daysResponse = response.data.resultado;
        setDays(daysResponse);
        setCountry(daysResponse[0].doc.location.country);
        setCity(daysResponse[0].doc.location.city);
        localStorage.setItem("selectedCity", JSON.stringify(daysResponse[0].doc.location.city));
        console.log(localStorage.fav);

        setLoading(false)

        } catch (error) {
            console.log('Error -->', error)
        }

    }, [drop]);


    useEffect(() => {
        getDays();
    }, [getDays, drop]);


    return (
        <div className="App">
            <Routes>
                <Route path="*" element={<Navigate replace to="/" />} />
                <Route path="/" element={<Navigate to="/week" />} />
                <Route path="/week" element={
                    <Week days={days} city={city} country={country} loading={loading}>
                        <DropdownComponent  setDrop={setDrop} drop={drop} /> 
                    </Week>} />
                <Route path="/day" element={
                    <Day city={city} country={country} drop={drop}  loading={loading} setLoading={setLoading}>
                        <DropdownComponent  setDrop={setDrop} drop={drop} /> 
                    </Day>} />
            </Routes>
        </div>
    );
}

export default App;
