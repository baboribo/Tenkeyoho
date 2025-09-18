import { useState, useEffect } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import axios from 'axios';

function App() {
    const [emblaRef] = useEmblaCarousel()
    const [tenki, setTenki] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_KEY = "";

    useEffect(() => {
        Promise.all([
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${API_KEY}&units=metric&lang=kr`), // 1 현재 날씨
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=seoul&appid=${API_KEY}&units=metric&lang=kr`), // 2 예보
        ])
            .then(([currentRes, forecastRes]) => {
                setTenki(currentRes.data);
                setForecast(forecastRes.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("날씨 정보를 불러오지 못했습니다:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <h1>로딩 중...</h1>;
    if (!tenki && !forecast) return <h1>날씨 정보를 불러오지 못했습니다.</h1>;

    return (
        <body>
            <main>
                <header>
                    <h3>{tenki.name}</h3>
                    <div className="text-flex">
                        <p>현재 날씨 상태는</p>
                        <h1>{tenki.weather[0].description}</h1>
                    </div>
                    <img src={`https://openweathermap.org/img/wn/${tenki.weather.icon}@2x.png`} alt="weather icon"/>
                    <p>온도: {tenki.main.temp}°C</p>
                    <h3>체감 온도: {tenki.main.feels_like}°C</h3>
                </header>
                <section className="embla" ref={emblaRef}>
                    <div className="item">
                        {forecast.list.map((item, index) => (
                            <span key={index}>
                        <ul className="tenki-list-item">
                            <li>{item.dt_txt}</li>
                            <li>
                                <h2>{item.main.feels_like}°C</h2>
                            </li>
                            <li>{item.main.temp}°C</li>
                            <li>{item.weather[0].description}</li>
                        </ul>
                    </span>
                        ))}
                    </div>
                </section>
            </main>
        </body>

    );
}

export default App;