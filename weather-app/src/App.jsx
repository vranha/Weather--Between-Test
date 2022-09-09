import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import WeatherCard from "./components/WeatherCard";
import DropdownComponent from "./components/DropdownComponent";
import axios from "axios";
import { calcAverage } from "./hooks/calcAverage";
import { calcRainChanceIcon } from "./hooks/calcRainChanceIcon";
import moment from "moment";

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


    // TODO Hacer la llamada para pintar las horas al hacer click en un dia

    const getDay = useCallback(async () => {

      const date = (moment().format("yyyy-MM-DD"))

        const response = await axios.get(`http://localhost:5000/weather-api-7c25c/us-central1/app/api/weather/find?date=${date}&location=${drop}`)
        const day = response.data.resultado[0].doc
        calcAverage(day.hourly_rain_chance, setAverageRain)
        setDay(day)
        setIcon(calcRainChanceIcon(averageRain))
        console.log(icon)
    }, [averageRain, drop, icon])

    useEffect(() => {
        getDays();
        console.log(day);
    }, [getDays, drop]);

    return (
        <div className="App">
            <DropdownComponent setDrop={setDrop} drop={drop} />
            {days && (
                <div className="containerCard">
                    <div className="containerTitles">
                        <h2 className="city">{city}</h2>
                        <h3 className="country">{country}</h3>
                    </div>
                    <div className="cards">
                        {days.map((day, i , arr) => {
                          if (arr.length -1 === i) {
                            const grid = 'grid'
                            return  <WeatherCard key={day.id} day={day.doc} grid={grid} />
                          }

                          return  <WeatherCard key={day.id} day={day.doc}  />
                      })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
