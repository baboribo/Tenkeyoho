import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [tenki, setTenki] = useState(null);
    const [daily, setDaily] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_KEY = "";

    useEffect(() => {
        Promise.all([
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${API_KEY}&units=metric&lang=kr`),
            axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&appid=${API_KEY}&units=metric&lang=kr`),
        ])
            .then(([currentRes, dailyRes]) => {
                setTenki(currentRes.data);
                setDaily(dailyRes.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("날씨 정보를 불러오지 못했습니다:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <h1>로딩 중...</h1>;
    if (!tenki && !daily) return <h1>날씨 정보를 불러오지 못했습니다.</h1>;

    return (
        <div>
            <h1>{tenki.name}</h1>
            <h2>온도: {tenki.main.temp}°C</h2>
            <p>날씨 상태: {tenki.weather[0].description}</p>
        </div>
    );
}

export default App;