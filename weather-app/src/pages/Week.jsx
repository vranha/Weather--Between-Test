import React from "react";
import Loading from "../components/Loading";
import WeatherCard from "../components/WeatherCard";

function Week({ children, days, city, country, loading }) {

    if (loading) {
        return <Loading/>
    }

    return (
        <div>
            {children}
            {days && (
                <div className="containerCard">
                    <div className="containerTitles">
                        <h2 className="city">{city}</h2>
                        <h3 className="country">{country}</h3>
                    </div>
                    <div className="cards">
                        {days.map((day, i, arr) => {
                            if (arr.length - 1 === i) {
                                const grid = "grid";
                                return <WeatherCard key={day.id} day={day.doc} grid={grid}/>;
                            }

                            return <WeatherCard key={day.id} day={day.doc} />;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Week;
