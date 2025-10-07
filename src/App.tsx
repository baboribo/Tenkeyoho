import { useState, useEffect } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import axios from 'axios';
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
// import { Application } from '@pixi/react'

export const koCityNames: Record<string, string> = {
        "Seoul": "서울",
        "Incheon": "인천",
        "Busan": "부산",
        "Daegu": "대구",
        "Daejeon": "대전",
        "Gwangju": "광주",
        "Ulsan": "울산",
        "Sejong": "세종",
        "Gyeonggi-do": "경기도",
        "Gangwon-do": "강원도",
        "Chungcheongbuk-do": "충청북도",
        "Chungcheongnam-do": "충청남도",
        "Jeollabuk-do": "전라북도",
        "Jeollanam-do": "전라남도",
        "Gyeongsangbuk-do": "경상북도",
        "Gyeongsangnam-do": "경상남도",
        "Jeju-do": "제주도",
        "Gimpo-si": "김포시",
        "Gimcheon-si": "김천시",
        "Ansan-si": "안산시",
        "Anyang-si": "안양시",
        "Bucheon-si": "부천시",
        "Cheonan-si": "천안시",
        "Goyang-si": "고양시",
        "Hwaseong-si": "화성시",
        "Namyangju-si": "남양주시",
        "Pyeongtaek-si": "평택시",
        "Suwon-si": "수원시",
        "Uijeongbu-si": "의정부시",
        "Yongin-si": "용인시",
        "Jeonju-si": "전주시",
        "Cheongju-si": "청주시",
        "Jeju-si": "제주시"
    }
export function getKoCityName(englishName: string): string {
    return koCityNames[englishName] || englishName;
}
export const koTenkiMain: Record<string, string> = {
    "Thunderstorm": "뇌우",
    "Drizzle": "이슬비",
    "Rain": "비",
    "Snow": "눈",
    "Mist": "엷은 안개",
    "Smoke": "연기",
    "Haze": "연무",
    "Dust": "황사",
    "Fog": "짙은 안개",
    "Sand": "모래바람",
    "Ash": "화산재",
    "Squall": "돌풍",
    "Tornado": "토네이도",
    "Clear": "맑음",
    "Clouds": "흐림",
}
export function getKoTenkiMain(englishMain: string): string {
    return koTenkiMain[englishMain] || englishMain;
}
export const koTenkiDescription: Record<string, string> = {
    // Group 2xx: Thunderstorm
    "thunderstorm with light rain": "조금의 비와 함께 천둥번개가 치고 있습니다.",
    "thunderstorm with rain": "비와 함께 천둥번개가 치고 있습니다.",
    "thunderstorm with heavy rain": "많은 비와 함께 천둥번개가 치고 있습니다.",
    "light thunderstorm": "약한 천둥번개가 발생하고 있습니다.",
    "thunderstorm": "천둥번개가 치고 있습니다.",
    "heavy thunderstorm": "천둥번개가 강하게 치고 있습니다.",
    "ragged thunderstorm": "불규칙한 천둥번개가 발생하고 있습니다.",
    "thunderstorm with light drizzle": "약한 이슬비와 함께 천둥번개가 치고 있습니다.",
    "thunderstorm with drizzle": "이슬비와 함께 천둥번개가 치고 있습니다.",

    // Group 3xx: Drizzle
    "light intensity drizzle": "약한 이슬비가 내리고 있습니다.",
    "drizzle": "이슬비가 내리고 있습니다.",
    "heavy intensity drizzle": "강한 이슬비가 내리고 있습니다.",
    "light intensity drizzle rain": "약한 비 또는 이슬비가 내리고 있습니다.",
    "drizzle rain": "비 또는 이슬비가 내리고 있습니다.",
    "heavy intensity drizzle rain": "강한 비 또는 이슬비가 내리고 있습니다.",
    "shower rain and drizzle": "소나기와 이슬비가 내리고 있습니다.",
    "heavy shower rain and drizzle": "강한 소나기와 이슬비가 내리고 있습니다.",
    "shower drizzle": "소나기성 이슬비가 내리고 있습니다.",

    // Group 5xx: Rain
    "light rain": "비가 조금씩 내리고 있어요.",
    "moderate rain": "비가 내리고 있네요, 우산 꼭 챙기세요!",
    "heavy intensity rain": "비가 많이 내리고 있으니 외출 시 조심하세요.",
    "very heavy rain": "비가 너무 많이 쏟아지고 있어요. 조심하세요!",
    "extreme rain": "폭우가 쏟아지고 있어요. 매우 위험하니 외출을 삼가세요!",
    "freezing rain": "어는비가 내리고 있어요.",
    "light intensity shower rain": "약한 소나기가 내리고 있어요.",
    "shower rain": "소나기가 내리고 있어요.",
    "heavy intensity shower rain": "강한 소나기가 내리고 있어요.",
    "ragged shower rain": "불규칙한 소나기가 내리고 있어요.",

    // Group 6xx: Snow
    "light snow": "눈이 조금씩 내리고 있어요.",
    "Snow": "눈이 내리고 있어요.",
    "Heavy snow": "눈이 좀 많이 내리고 있네요, 조심하세요.",
    "Sleet": "진눈깨비가 내리니, 다치지 않도록 조심하세요!",
    "Light shower sleet": "약한 소나기성 진눈깨비가 내리고 있어요.",
    "Shower sleet": "소나기성 진눈깨비가 내리고 있어요.",
    "Light rain and snow": "약한 비와 눈이 내리고 있어요.",
    "Rain and snow": "비와 눈이 함께 내리고 있어요.",
    "Light shower snow": "약한 소나기성 눈이 내리고 있습니다.",
    "Shower snow": "소나기성 눈이 내리고 있습니다.",
    "Heavy shower snow": "강한 소나기성 눈이 내리고 있습니다.",

    // Group 7xx: Atmosphere
    "mist": "엷은 안개가 끼어 있습니다.",
    "smoke": "연기가 퍼져 있습니다.",
    "haze": "연무가 나타나고 있습니다.",
    "sand/ dust whirls": "모래나 먼지 바람이 불고 있습니다.",
    "fog": "짙은 안개가 끼어 있습니다.",
    "sand": "모래바람이 불고 있습니다.",
    "dust": "먼지가 날리고 있습니다.",
    "volcanic ash": "화산재가 날리고 있습니다.",
    "squalls": "돌풍이 불고 있습니다.",
    "tornado": "토네이도가 일어나고 있다아아ㅏㅏㅏㅏ!!!!!!!!",

    // Group 800: Clear
    "clear sky": "하늘이 매우 맑네요!",

    // Group 80x: Clouds
    "few clouds": "하늘에 구름이 조금 끼어 있고, 맑은 날씨예요.",
    "scattered clouds": "하늘 곳곳에 구름이 껴 있네요.",
    "broken clouds": "구름이 많아 흐린 상태예요.",
    "overcast clouds": "하늘에.. 구름이 너무나 많네요. 매우 흐린 상태예요.",
}
export function getKoTenkiDescription(englishDescription: string): string {
    return koTenkiDescription[englishDescription] || englishDescription;
}

export const koForecastDescription: Record<string, string> = {
    // Group 2xx: Thunderstorm
    "thunderstorm with light rain": "약한 비와 천둥번개",
    "thunderstorm with rain": "비와 천둥번개",
    "thunderstorm with heavy rain": "강한 비와 천둥번개",
    "light thunderstorm": "약한 천둥번개",
    "thunderstorm": "천둥번개",
    "heavy thunderstorm": "강한 천둥번개",
    "ragged thunderstorm": "불규칙한 천둥번개",
    "thunderstorm with light drizzle": "약한 이슬비와 천둥번개",
    "thunderstorm with drizzle": "이슬비와 천둥번개",

    // Group 3xx: Drizzle
    "light intensity drizzle": "이슬비 조금",
    "drizzle": "이슬비",
    "heavy intensity drizzle": "많은 이슬비",
    "light intensity drizzle rain": "비 약간과 이슬비",
    "drizzle rain": "비와 이슬비",
    "heavy intensity drizzle rain": "많은 비와 이슬비",
    "shower rain and drizzle": "소나기와 이슬비",
    "heavy shower rain and drizzle": "강한 소나기와 이슬비",
    "shower drizzle": "소나기성 이슬비",

    // Group 5xx: Rain
    "light rain": "비가 조금 내릴 것 같네요.",
    "moderate rain": "비가 조금 많이 올 예정이에요.",
    "heavy intensity rain": "음, 비가 그냥 쏟아지겠네요.",
    "very heavy rain": "우와, 비가 엄청나게 쏟아질 것 같네요.",
    "extreme rain": "폭우가 쏟아질 것 같네요.",
    "freezing rain": "얼어붙는 비가 내릴 것 같네요.",
    "light intensity shower rain": "약한 소나기가 내릴 것 같네요.",
    "shower rain": "소나기가 내릴 것 같네요.",
    "heavy intensity shower rain": "강한 소나기가 내릴 것 같네요.",
    "ragged shower rain": "불규칙한 소나기",

    // Group 6xx: Snow
    "light snow": "눈이 조금 내릴 것 같네요.",
    "Snow": "눈이 내릴 것 같네요.",
    "Heavy snow": "많은 눈이 내릴 것 같네요.",
    "Sleet": "진눈깨비가 내릴 것 같네요.",
    "Light shower sleet": "약한 소나기성 진눈깨비가 내릴 것 같네요.",
    "Shower sleet": "소나기성 진눈깨비가 내릴 것 같네요.",
    "Light rain and snow": "약한 비와 눈이 내릴 것 같네요.",
    "Rain and snow": "비와 눈이 함께 내릴 것 같네요.",
    "Light shower snow": "약한 소나기성 눈이 내릴 것 같네요.",
    "Shower snow": "소나기성 눈이 내릴 것 같네요.",
    "Heavy shower snow": "강한 소나기성 눈이 내릴 것 같네요.",

    // Group 7xx: Atmosphere
    "mist": "엷은 안개",
    "smoke": "연기",
    "haze": "연무",
    "sand/ dust whirls": "모래나 먼지 바람",
    "fog": "짙은 안개",
    "sand": "모래바람",
    "dust": "먼지",
    "volcanic ash": "화산재",
    "squalls": "돌풍",
    "tornado": "토네이도",

    // Group 800: Clear
    "clear sky": "이 날에는 하늘이 맑을 예정이에요.",

    // Group 80x: Clouds
    "few clouds": "구름이 조금 낄 예정이에요.",
    "scattered clouds": "구름이 조금 많이 낄 예정이에요.",
    "broken clouds": "구름 많을 예정이에요.",
    "overcast clouds": "하늘에 구름이 많아 흐릴 것 같네요.",
}
export function getKoForecastDescription(englishDescription: string): string {
    return koForecastDescription[englishDescription] || englishDescription;
}

export function getPm25Status(pm25: number): string {
    if (pm25 <= 15) return "좋음";
    if (pm25 <= 35) return "보통";
    if (pm25 <= 75) return "나쁨";
    return "매우 나쁨";
}
export function getPm25StatusColor(pm25: number): string {
    if (pm25 <= 15) return "#4ADD85";
    if (pm25 <= 35) return "#E47734";
    if (pm25 <= 75) return "#ED3333";
    return "#F634C8";
}

export function getPm10Status(pm10: number): string {
    if (pm10 <= 30) return "좋음";
    if (pm10 <= 80) return "보통";
    if (pm10 <= 150) return "나쁨";
    return "매우 나쁨";
}
export function getPm10StatusColor(pm10: number): string {
    if (pm10 <= 30) return "#4ADD85";
    if (pm10 <= 80) return "#E47734";
    if (pm10 <= 150) return "#ED3333";
    return "#F634C8";
}

export const aqiKo: Record<number, string> = {
  1: "좋음",
  2: "보통",
  3: "나쁨",
  4: "많이 나쁨",
  5: "매우 나쁨"
};
export function getAqiStatus(aqi: number) {
  return aqiKo[aqi] || "알 수 없음";
}
export const aqiKoColor: Record<number, string> = {
  1: "#4ADD85",
  2: "#E47734",
  3: "#ED3333",
  4: "#F634C8",
  5: "#5D47A0"
};
export function getAqiStatusColor(aqi: number) {
  return aqiKoColor[aqi] || "none";
}


function App() {
    const [emblaRef] = useEmblaCarousel({dragFree: true});
    const [tenki, setTenki] = useState<any>(null);
    const [forecast, setForecast] = useState<any>(null);
    const [air_pollution, setAir_pollution] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [coords, setCoords] = useState<any>(null);

    const transition: Transition = {
        duration: 0.50,
        ease: [.17,.02,.05,.98],
    }
    const transition2: Transition = {
        duration: 0.50,
        delay: 0.2,
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
            // 끝에 &lang=kr 추가하면 한국어로 바뀜 - 그치만 직접 텍스트 대치(번역)을 위해 사용하지 않았음.(오역(실 비 같은 게 맞긴 하나 누가 실 비라고 함? 약한 비라고 하지.)으로 인해 가독성이 떨어진다고 생각함.)
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`), // 현재 날씨
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`), // 5일 예보 (3시간 간격)
            axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`) // 대기 오염
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

    if (loading) return <motion.p transition={transition} initial={{ opacity: 0, y: 80, x: 50, scale: 0.8 }} animate={{ opacity: 1, y: 50, scale: 1 }}>로딩 중...</motion.p>;
    if (!tenki || !forecast) return <motion.p transition={transition} initial={{ opacity: 0, y: 80, x: 50, scale: 0.8 }} animate={{ opacity: 1, y: 50, scale: 1 }}>날씨 정보를 불러오지 못했습니다.</motion.p>;

    return (
        <motion.div transition={transition} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="app-container flex flex-col gap-6 pl-10 pr-10 min-h-270px">
            {/* <Application autoStart sharedTicker /> */}
            <main className="flex flex-col lg:flex-row gap-6 w-full">
                <section className="top-0 lg:sticky lg:top-13 flex flex-col gap-2 w-full h-fit">
                    {/* --- 현재 날씨 텍스트와 상태, 온도, 현재 상태 아이콘이 포함된 div --- */}
                    <div className="flex gap-6 items-center pt-2"> 
                        <div className="text-flex">
                            <div className="flex gap-2 w-full items-center">
                                <h3>{getKoCityName(tenki.name)}</h3>
                            </div>
                            <div className="flex flex-row gap-0 w-full items-end">
                                <h1 className="font-bold">{tenki.main.temp}°</h1>
                                <h3 className="text-3xl font-bold pb-6">{getKoTenkiMain(tenki.weather[0].main)}</h3>
                            </div>
                            <p className="text-lg">{getKoTenkiDescription(tenki.weather[0].description)}</p>
                        </div>
                        <motion.img transition={transition2} initial={{opacity: 0, y: 40, x: 30}} animate={{opacity: 1, y: -6}} className="w-40 h-40" src={`https://openweathermap.org/img/wn/${tenki.weather[0].icon}@4x.png`} alt="weather icon"/>
                    </div>
                    {/* --- */}
                    <section className="flex flex-row items-center w-full">
                        <div className="flex flex-col gap-4 ml-0 mt-5 w-full">
                            <ul className="flex gap-6 ml-0 justify-items-center w-full">
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
                            <div className='flex flex-col gap-1'>
                                <h4 className="text-lg font-semibold">대기질</h4>
                                <ul className="flex flex-row gap-4 w-full">
                                    <li className="flex flex-col">
                                        <p>공기질 지수(AQI)</p>
                                        <div className='flex flex-row items-center gap-2'>
                                            <span
                                                style={{
                                                    width: "10px",
                                                    height: "10px",
                                                    background: getAqiStatusColor(air_pollution.main.aqi),
                                                    borderRadius: "50%",
                                                    display: "inline-block"
                                                }}
                                            />
                                            <h4 className="text-2xl font-bold">{getAqiStatus(air_pollution.main.aqi)}</h4>
                                            <p>{air_pollution.main.aqi}</p>
                                        </div>
                                    </li>
                                    <li className="flex flex-col">
                                        <p>미세먼지(PM10)</p>
                                        <div className='flex flex-row items-center gap-2'>
                                            <span
                                                style={{
                                                    width: "10px",
                                                    height: "10px",
                                                    background: getPm10StatusColor(air_pollution.components.pm10),
                                                    borderRadius: "50%",
                                                    display: "inline-block"
                                                }}
                                            />
                                            <h4 className="text-2xl font-bold">{getPm10Status(air_pollution.components.pm10)}</h4>
                                            <p>{air_pollution.components.pm10}</p>
                                        </div>
                                    </li>
                                    <li className="flex flex-col">
                                        <p>초미세먼지(PM2.5)</p>
                                        <div className='flex flex-row items-center gap-2'>
                                            <span
                                                style={{
                                                    width: "10px",
                                                    height: "10px",
                                                    background: getPm25StatusColor(air_pollution.components.pm2_5),
                                                    borderRadius: "50%",
                                                    display: "inline-block"
                                                }}
                                            />
                                            <h4 className="text-2xl font-bold">{getPm25Status(air_pollution.components.pm2_5)}</h4>
                                            <p>{air_pollution.components.pm2_5}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </section>
                <motion.section transition={transition2} initial={{opacity: 0, y: 60}} animate={{opacity: 1, y: 0}} className="embla" ref={emblaRef}>
                    <div className="item">
                        {forecast?.list?.map((item: any) => (
                            <ul className="tenki-list-item" key={item.dt_txt}>
                                <li className="flex w-full z-10">{item.dt_txt}</li>
                                <ul className="tenki-list-content flex flex-row items-center h-16">
                                    <li className="flex w-full">
                                        <div>
                                            <div className='flex flex-col'>
                                                <p className="text-2xl">{getKoTenkiMain(item.weather[0].main)}</p>
                                                <h4 className="text-xl font-bold">{item.main.temp}°C</h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='flex flex-col w-full'>
                                        <p>체감 온도</p>
                                        <h4 className="text-lg">{item.main.feels_like}°C</h4>
                                    </li>
                                    <li className='flex flex-col w-full'>
                                        <p>강수량</p>
                                        <h4 className="text-lg">
                                            {item?.rain?.["3h"] !== undefined
                                            ? `${item.rain["3h"]} mm`
                                            : "0 mm"}
                                        </h4>
                                    </li>
                                    <motion.img transition={transition2} initial={{opacity: 0}} animate={{opacity: 1}} className="w-22 h-22" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="weather icon"/>
                                </ul>
                                <p className="text-lg w-full pt-0.5 z-10">{getKoForecastDescription(item.weather[0].description)}</p>
                                <span className="tenki-list-bg"></span>
                            </ul>
                        ))}
                    </div>
                </motion.section>
            </main>
            <motion.div transition={transition} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className='flex flex-col w-full gap-4 mb-10'>
                <hr className="mt-6 flex flex-col gap-3 border-t border-gray-300 dark:border-gray-700 pt-3 mb-2 w-full"/>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <p>날씨 데이터 제공</p>
                        <a href='https://openweathermap.org/'>
                            <h4 className="text-[#213547] dark:text-[#eeecf4] font-bold opacity-86 hover:opacity-100 transition cursor-pointer">OpenWeather</h4>
                        </a>
                    </div>
                    <div className='flex flex-col'>
                        <p>법적 고지</p>
                        <div className='flex flex-row gap-4'>
                            <a href='https://slashpage.com/babo/ywk9j7298x1dzmgpqvnd'>
                                <h4 className="text-[#213547] dark:text-[#eeecf4] font-bold opacity-86 hover:opacity-100 transition cursor-pointer">이용약관</h4>
                            </a>
                            <a href='https://slashpage.com/babo/xjqy1g2vwgrkvm6vd54z'>
                                <h4 className="text-[#213547] dark:text-[#eeecf4] font-bold opacity-86 hover:opacity-100 transition cursor-pointer">개인정보처리방침</h4>
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default App;
