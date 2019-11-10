import React, {Component} from 'react';
import Weather from "./components/weather";
import "bootstrap/dist/css/bootstrap.min.css"
import "weather-icons/css/weather-icons.css"
import Form from './components/form';
import {API_KEY} from "./api.json"
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      location: undefined,
      icon: undefined,
      main: undefined,
      fahrenheit: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    }

    this.icon =  {
      Thunderstorm: "wi-thunderstorm",
      Dizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  calcFahrenheit(temp) {
    let fahr = Math.floor((temp - 273.15) * 9/5 + 32);
    return fahr;
  }

  getWeatherIcon(theIcon, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
      this.setState({icon:theIcon.Thunderstorm});
      break;
      case rangeId >= 300 && rangeId <= 321:
      this.setState({icon:theIcon.Dizzle});
      break;
      case rangeId >= 500 && rangeId <= 531:
      this.setState({icon:theIcon.Rain});
      break;
      case rangeId >= 600 && rangeId <= 622:
      this.setState({icon:theIcon.Snow});
      break;
      case rangeId >= 701 && rangeId <= 781:
      this.setState({icon:theIcon.Atmosphere});
      break;
      case rangeId === 800:
      this.setState({icon:theIcon.Clear});
      break;
      case rangeId >= 801 && rangeId <= 804:
      this.setState({icon:theIcon.Clouds});
      break;
      default:
      this.setState({icon:theIcon.Clouds});
    }
  }

getWeather = async (e) => {

  e.preventDefault();

  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;

  if(city && country){
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
  const response = await api_call.json();
  console.log(response);
  
  this.setState({
    location: `${response.name}, ${response.sys.country}`,
    fahrenheit: this.calcFahrenheit(response.main.temp),
    temp_max: this.calcFahrenheit(response.main.temp_max),
    temp_min: this.calcFahrenheit(response.main.temp_min),
    description: response.weather[0].description,
    error: false

  })

  this.getWeatherIcon(this.icon, response.weather[0].id)

  } else {
    this.setState({error: true})
  }
}


  render() { 
    const {location, fahrenheit,temp_max, temp_min, description, icon} = this.state;

    return (  
    <div className="App">
      <Form loadWeather={this.getWeather} error={this.state.error}/>
    <Weather 
      location={location}
      temp_fahrenheit={fahrenheit} 
      temp_max={temp_max} 
      temp_min={temp_min}
      description={description}
      weatherIcon={icon}/>
    </div> );
  }
}
 
export default App;


