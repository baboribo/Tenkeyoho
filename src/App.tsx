import { useState, useEffect } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import axios from 'axios';
import { motion } from "motion/react"
import type { exit } from 'process';
import { animate, delay } from 'motion';

function App() {
    const [emblaRef] = useEmblaCarousel({dragFree: true});
    const [tenki, setTenki] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const query = 'danwon-gu';
    const transition = {
        duration: 0.42,
        ease: [.17,.02,.05,.98],
    }
    const transition2 = {
        duration: 0.32,
        delay: 0.27,
        ease: [.17,.02,.05,.98],
    }

    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

    useEffect(() => {
        Promise.all([
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric&lang=kr`), // 1 현재 날씨
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=metric&lang=kr`), // 2 예보
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

    if (loading) return <motion.p transition={transition} initial={{ opacity: 0, y: 40, x: 40, scale: 0.9 }} animate={{ opacity: 1, y: 20, scale: 1 }} exit={{ opacity: 0 }}>로딩 중...</motion.p>;
    if (!tenki && !forecast) return <p>날씨 정보를 불러오지 못했습니다.</p>;

    return (
        <motion.body transition={transition} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="app-container flex flex-col gap-6 p-6">
            <main>
                <section className="flex flex-col gap-4 size-100%">
                    <div className="flex gap-2 size-100%">
                        <h3>{tenki.name}</h3>
                        <p>{tenki.sys.country}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-flex">
                            <p>현재 날씨 상태</p>
                            <h1 className="font-bold">{tenki.weather[0].description}</h1>
                            <h3 className="text-3xl">{tenki.main.temp}°C</h3>
                        </div>
                        <motion.img transition={transition2} initial={{opacity: 0}} animate={{opacity: 1}} className="w-30 h-30" src={`https://openweathermap.org/img/wn/${tenki.weather[0].icon}@2x.png`} alt="weather icon"/>
                    </div>
                    <ul className="flex gap-6">
                        <li className="flex flex-col">
                            <p>체감 온도</p>
                            <h4 className="text-2xl font-bold">{tenki.main.feels_like}°C</h4>
                        </li>
                        <li className="flex flex-col">
                            <p>최고 온도</p>
                            <h4 className="text-2xl font-bold">{tenki.main.temp_max}°C</h4>
                        </li>
                        <li className="flex flex-col">
                            <p>최저 온도</p>
                            <h4 className="text-2xl font-bold">{tenki.main.temp_min}°C</h4>
                        </li>
                        <li className="flex flex-col">
                            <p>습도</p>
                            <h4 className="text-2xl font-bold">{tenki.main.humidity}%</h4>
                        </li>
                        <li className="flex flex-col">
                            <p>풍속</p>
                            <h4 className="text-2xl font-bold">{tenki.wind.speed}m/s</h4>
                        </li>
                    </ul>
                </section>
                <motion.section transition={transition2} initial={{opacity: 0, y: 60}} animate={{opacity: 1, y: 0}} className="embla" ref={emblaRef}>
                    <div className="item">
                        {forecast.list.map((item, index) => (
                            <span key={index}>
                        <ul className="tenki-list-item">
                            <li>{item.dt_txt}</li>
                            <li>
                                <h2 className="text-2xl font-bold">{item.weather[0].description}</h2>
                            </li>
                            <li className="text-xl">{item.main.temp}°C</li>
                            <li>
                                <motion.img transition={transition2} initial={{opacity: 0}} animate={{opacity: 1}} className="w-20 h-20" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="weather icon"/>
                                 <p>체감 온도</p>
                                 <h4 className="text-lg">{item.main.feels_like}°C</h4>
                            </li>
                        </ul>
                    </span>
                        ))}
                    </div>
                </motion.section>
            </main>
        </motion.body>

    );
}

export default App;