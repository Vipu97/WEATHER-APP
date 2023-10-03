import ReactAnimatedWeather from 'react-animated-weather';

export default function ({ data, setCity, city, onSearch }) {
    const weather = data.weatherType
    let icon;
    switch (weather) {
        case "Haze":
            icon = 'CLEAR_DAY'
            break;
        case "Clouds":
            icon = 'CLOUDY'
            break;
        case "Rain":
            icon = 'RAIN'
            break;
        case "Snow":
            icon = 'SNOW'
            break;
        case "Dust":
            icon = 'WIND'
            break;
        case "Drizzle":
            icon = 'SLEET'
            break;
        case "Fog":
            icon = 'FOG'
            break;
        case "Smoke":
            icon = 'FOG'
            break;
        case "Tornado":
            icon = 'WIND'
            break;
        default:
            icon = 'CLEAR_DAY'
    }
    
    return (
        <div className="search-part">
            <ReactAnimatedWeather
                icon={icon}
                color='#FFF'
                size='80'
                animate='true'
            />
            <h1>{data.weatherType}</h1>
            <hr />
            <div className='search'>
                <input type="text" placeholder='Search any city' value={city}
                    onChange={(e) => setCity(e.target.value)} />
                <i class="fa-solid fa-magnifying-glass search-icon" onClick={onSearch}></i>
            </div>
            <p>{data.city} , {data.country}</p>
            <ul>
                <li>
                    <span>Temperature</span>
                    <span>{data.temperature}<sup>o</sup>c ({data.weatherType})</span>
                </li>
                <li>
                    <span>Humidity</span>
                    <span>{data.humidity}%</span>
                </li>
                <li>
                    <span>Visibility</span>
                    <span>{data.visibility} mi</span>
                </li>
                <li>
                    <span>Wind Speed</span>
                    <span>{data.windSpeed} Km/h</span>
                </li>
            </ul>
        </div>
    )
}