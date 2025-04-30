import { getWeatherInfo } from './hooks/getWeatherInfo.js';

const API_URL = "https://api.open-meteo.com/v1/forecast?" +
  "latitude=35.6785&longitude=139.6823" +
  "&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
  "&hourly=precipitation_probability,weather_code" +
  "&timezone=Asia%2FTokyo";

const dayName = ["日", "月", "火", "水", "木", "金", "土"];

const getDayLabel = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日 (${dayName[d.getDay()]})`;
};

const get6HourBlocks = (date, hourly) => {
  const timeRanges = [
    { label: "0-6時", from: 0, to: 5 },
    { label: "6-12時", from: 6, to: 11 },
    { label: "12-18時", from: 12, to: 17 },
    { label: "18-24時", from: 18, to: 23 },
  ];

  return timeRanges.map(({ label, from, to }) => {
    const blockValues = hourly.time.map((t, idx) => {
      const tDate = t.slice(0, 10);
      const hour = new Date(t).getHours();
      return (tDate === date && hour >= from && hour <= to)
        ? hourly.precipitation_probability[idx]
        : null;
    }).filter(v => v !== null);

    const max = blockValues.length ? Math.max(...blockValues) : "-";
    return `<div>${label}<br>${max}%</div>`;
  }).join("");
};

const renderTodayTomorrow = (daily, hourly) => {
  const output = [0, 1].map(i => {
    const date = daily.time[i];
    const label = i === 0 ? "今日" : "明日";
    const weather = getWeatherInfo(daily.weathercode[i]);

    // 差分計算
    const maxDiff = i === 0 ? "-" : (daily.temperature_2m_max[i] - daily.temperature_2m_max[i - 1]).toFixed(1);
    const minDiff = i === 0 ? "-" : (daily.temperature_2m_min[i] - daily.temperature_2m_min[i - 1]).toFixed(1);
    const maxSign = maxDiff > 0 ? "+" : "";
    const minSign = minDiff > 0 ? "+" : "";

    return `
      <div class="day_item day_${i}">
        <div class="day_date">${label}の天気</div>
        <div class="day_weather">${weather.label}</div>
        <div class="day_weather_icon"><img src="${weather.icon}" alt="${weather.label}"></div>

        <div class="day_temperature">
          <div class="day_temperature_max"><span class="day_temperature_num">${daily.temperature_2m_max[i]}</span>&#8451;<br>[${maxSign}${maxDiff}]</div>
          <div class="day_temperature_min"><span class="day_temperature_num">${daily.temperature_2m_min[i]}</span>&#8451;<br>[${minSign}${minDiff}]</div>
        </div>

        <div class="day_precipitation">
          <div>時間<br>降水</div>
          ${get6HourBlocks(date, hourly)}
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("today-tomorrow").innerHTML = output;
};


const renderWeekly = (daily) => {
  const output = daily.time
    .slice(2, 7) // 明後日から5日間
    .map((date, i) => {
      const idx = i + 2; // 元のdaily配列でのインデックス
      const weather = getWeatherInfo(daily.weathercode[idx]);

      const maxDiff = idx === 0 ? "--" : (daily.temperature_2m_max[idx] - daily.temperature_2m_max[idx - 1]).toFixed(1);
      const minDiff = idx === 0 ? "--" : (daily.temperature_2m_min[idx] - daily.temperature_2m_min[idx - 1]).toFixed(1);
      const maxSign = maxDiff > 0 ? "+" : "";
      const minSign = minDiff > 0 ? "+" : "";

      return `
        <div class="day_item day_${idx}">
          <div class="day_date">${getDayLabel(date)}</div>
          <div class="day_weather">${weather.label}</div>
          <div class="day_weather_icon"><img src="${weather.icon}" alt="${weather.label}"></div>

          <div class="day_temperature">
            <div class="day_temperature_max"><span class="day_temperature_num">${daily.temperature_2m_max[i]}</span>&#8451;<br>[${maxSign}${maxDiff}]</div>
            <div class="day_temperature_min"><span class="day_temperature_num">${daily.temperature_2m_min[i]}</span>&#8451;<br>[${minSign}${minDiff}]</div>
          </div>


        </div>
      `;
    }).join("");

  document.getElementById("weekly").innerHTML = output;
};


fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    renderTodayTomorrow(data.daily, data.hourly);
    renderWeekly(data.daily);
  })
  .catch(err => {
    console.error("天気データ取得エラー:", err);
    document.body.innerHTML += "<p>天気データの取得に失敗しました。</p>";
  });
