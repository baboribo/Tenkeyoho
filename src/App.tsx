import { useState, useEffect } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import axios from 'axios';
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

function App() {
    const [emblaRef] = useEmblaCarousel({dragFree: true});
    const [tenki, setTenki] = useState<any>(null);
    const [forecast, setForecast] = useState<any>(null);
    const [air_pollution, setAir_pollution] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [coords, setCoords] = useState<any>(null);

    const transition: Transition = {
        duration: 0.44,
        ease: [.17,.02,.05,.98],
    }
    const transition2: Transition = {
        duration: 0.37,
        delay: 0.27,
        ease: [.17,.02,.05,.98],
    }

    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

    useEffect(() => { // 위치 얻기
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => {
                switch(error.code) {
                    case 1:
                        console.error("권한이 거부되었습니다.", error);
                        break;
                    case 2:
                        console.error("위치 정보를 가져올 수 없습니다.", error);
                        break;
                    case 3:
                        console.error("시간이 초과되었습니다.", error);
                        break;
                    default:
                        console.error(error);
                        break;
                }
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    }, []); // 한 번만 실행

    useEffect(() => {
        if (!coords) return;
        const {lat, lon} = coords;

        Promise.all([
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`),
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`),
            axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        ])
            .then(([currentRes, forecastRes, air_pollutionRes]) => {
                setTenki(currentRes.data);
                setForecast(forecastRes.data);
                setAir_pollution(air_pollutionRes.data.list[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("날씨 정보를 불러오지 못했습니다:", error);
                setLoading(false);
            });
    }, [coords]);

    if (loading) return <motion.p transition={transition} initial={{ opacity: 0, y: 40, x: 40, scale: 0.9 }} animate={{ opacity: 1, y: 20, scale: 1 }} exit={{ opacity: 0 }}>로딩 중...</motion.p>;
    if (!tenki || !forecast) return <motion.p transition={transition} initial={{ opacity: 0, y: 40, x: 40, scale: 0.9 }} animate={{ opacity: 1, y: 20, scale: 1 }}>날씨 정보를 불러오지 못했습니다. 인터넷 상태를 확인하거나 기기에 GPS가 있는지 확인하세요.</motion.p>;

    return (
        <motion.div transition={transition} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="app-container flex flex-col gap-6 p-6">
            <main>
                <section className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2 w-full items-center">
                        <h3>{tenki.name}</h3>
                        <p>{tenki.sys.country}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-flex">
                            <h4 className="text-lg">현재 날씨</h4>
                            <h1 className="font-bold">{tenki.weather[0].description}</h1>
                            <h3 className="text-3xl">{tenki.main.temp}°C</h3>
                        </div>
                        <motion.img transition={transition2} initial={{opacity: 0}} animate={{opacity: 1}} className="w-40 h-40" src={`https://openweathermap.org/img/wn/${tenki.weather[0].icon}@2x.png`} alt="weather icon"/>
                    </div>
                    <ul className="flex gap-6 justify-items-center w-full">
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
                <section className="flex flex-col gap-1 w-full">
                    <h4 className="text-lg font-semibold">대기질</h4>
                    <ul className="flex flex-row gap-4 w-full">
                        <li className="flex flex-col">
                            <p>공기질</p>
                            <h4 className="text-2xl font-bold">{air_pollution.main.aqi}</h4>
                        </li>
                        <li className="flex flex-col">
                            <p>pm2.5</p>
                            <h4 className="text-2xl font-bold">{air_pollution.components.pm2_5}</h4>
                        </li>
                        <li className="flex flex-col">
                            <p>pm10</p>
                            <h4 className="text-2xl font-bold">{air_pollution.components.pm10}</h4>
                        </li>
                    </ul>
                </section>
                <motion.section transition={transition2} initial={{opacity: 0, y: 60}} animate={{opacity: 1, y: 0}} className="embla" ref={emblaRef}>
                    <div className="item">
                        {forecast?.list?.map((item: any) => (
                            <ul className="tenki-list-item" key={item.dt_txt}>
                                <li>{item.dt_txt}</li>
                                <li className="flex flex-col">
                                    <motion.img transition={transition2} initial={{opacity: 0}} animate={{opacity: 1}} className="w-20 h-20" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="weather icon"/>
                                    <div>
                                        <h2 className="text-2xl font-bold">{item.weather[0].description}</h2>
                                        <h3 className="text-xl">{item.main.temp}°C</h3>
                                    </div>
                                </li>
                                <li>
                                    <p>체감 온도</p>
                                    <h4 className="text-lg">{item.main.feels_like}°C</h4>
                                </li>
                            </ul>
                        ))}
                    </div>
                </motion.section>
            </main>
        </motion.div>
    );
}

export default App;