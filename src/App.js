import { useEffect, useState } from 'react';
import './App.css';
import Loader from './Loader';
import Weather from './Weather';

const KEY = "7efc66e8afa7a5986b9eae5e974ecb9d"

async function getCoordinates(city) {
  try {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${KEY}`)
    if (!res.ok) {
      console.log(`City not found: ${city}`);
      return;
    }
    const [data] = await res.json()
    const lat = data.lat
    const lon = data.lon
    return [lat, lon]
  } catch (err) {
    console.log(err)
  }
}
async function fetchWeather(lat, lon) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`)
  const weather = await res.json()
  //console.log(weather)
  const details = {};
  details.city = weather.name;
  details.country = weather.sys.country;
  details.visibility = weather.visibility
  details.windSpeed = Math.round(weather.wind.speed * (18 / 5))
  details.temperature = Math.round(weather.main.temp - 273.15)
  details.weatherType = weather.weather[0].main
  details.humidity = weather.main.humidity
  details.timezone = weather.timezone
  return details
}

const getUsersLocation = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by your browser.'));
    }
  });
};

function App() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [city, setCity] = useState('')

  useEffect(() => {
    async function fetchData() {
      getUsersLocation()
        .then(async (coords) => {
          const lat = await coords.latitude;
          const lon = await coords.longitude;
          const weather = await fetchWeather(lat, lon)
          setData(weather)
          setIsLoading(false)
        }).catch(async () => {
          setTimeout(() => {
            alert("Please provide location access to get weather of your current location")
          },2000)
          setCity('Delhi')
          const [lat, lon] = await getCoordinates('Delhi')
          const newData = await fetchWeather(lat, lon)
          setData(newData)
          setIsLoading(false)
        })
    }
    fetchData()
  }, [])

  const onSearch = async () => {
    setCity(city)
    getCoordinates(city)
    .then(async (coords) => {
        setIsLoading(true)
        if (coords) {
          const [lat, lon] = coords;
          const newData = await fetchWeather(lat, lon);
          setData(newData)
        } else {
          alert('City not Found!');
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="App">
      <main className="container">
        {isLoading ? <Loader /> : <Weather data={data} setCity={setCity} onSearch={onSearch}
        />}
      </main>
    </div>
  );
}

export default App;
