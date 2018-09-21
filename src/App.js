import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form"
import Weather from "./components/Weather"


const API_KEY = "4039e9fff7f3e23acccf716334872069";

class App extends React.Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        wind:undefined,
        description: undefined,
        error: undefined
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        //const api_call = await fetch(`https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`);
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        console.log(data);
        if (city && country) {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                wind:data.wind.speed,
                description: data.weather[0].description,
                error: ""
            });
        }
        else{
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                wind:undefined,
                description: undefined,
                error: "please enter Some value"
            });

        }
    }

    render() {

        return (
            <div>
                <Titles/>
                <Form imakeoneprop={this.getWeather}/>
                <Weather
                    temperature={ this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    wind={this.state.wind}
                    description={this.state.description}
                    error={this.state.error}

                />
            </div>

        );
    }


}

export  default  App;