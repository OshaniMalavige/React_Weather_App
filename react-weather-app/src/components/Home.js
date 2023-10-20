import React from 'react';
import '../App.css';
import WeatherBox from "./WeatherBox";
import WeeklyWeather from "./WeeklyWeather";
import MainWeatherWindow from "./MainWeatherWindow";
import CityInput from "./CityInput";

class Home extends React.Component {
    state = {
        city: undefined,
        days: new Array(4),
        weekDays: new Array(5),
    };

    /* next three days */
    updateState = data => {
        const city = data.city.name;
        const days = [];
        const dayIndices = this.getDayIndices(data);

        for (let i = 0; i < 4; i++) {
            days.push({
                date: data.list[dayIndices[i]].dt_txt,
                weather_desc: data.list[dayIndices[i]].weather[0].description,
                icon: data.list[dayIndices[i]].weather[0].icon,
                temp: data.list[dayIndices[i]].main.temp
            });
        }

        this.setState({
            city: city,
            days: days
        });
    };

    makeApiCall = async city => {
        const api_data = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
        ).then(resp => resp.json());

        if (api_data.cod === '200') {
            await this.updateState(api_data);
            return true;
        } else return false;
    };

    getDayIndices = data => {
        let dayIndices = [];
        dayIndices.push(0);

        let index = 0;
        let tmp = data.list[index].dt_txt.slice(8, 10);

        for (let i = 0; i < 3; i++) {
            while (
                tmp === data.list[index].dt_txt.slice(8, 10) ||
                data.list[index].dt_txt.slice(11, 13) !== '15'
                ) {
                index++;
            }
            dayIndices.push(index);
            tmp = data.list[index].dt_txt.slice(8, 10);
        }
        return dayIndices;
    };

    /* Weekly Weather */
    updateWeeklyState = dataW => {
        const city = dataW.city.name;
        const weekDays = [];
        const weekDayIndices = this.getWeekDayIndices(dataW);

        for (let i = 0; i < 5; i++) {
            weekDays.push({
                date: dataW.list[weekDayIndices[i]].dt_txt,
                weather_desc: dataW.list[weekDayIndices[i]].weather[0].description,
                icon: dataW.list[weekDayIndices[i]].weather[0].icon,
                temp: dataW.list[weekDayIndices[i]].main.temp
            });
        }

        this.setState({
            city: city,
            weekDays: weekDays
        });
    };

    getWeekDayIndices = dataW => {
        let weekDayIndices = [];
        weekDayIndices.push(0);

        let indexW = 0;
        let tmpW = dataW.list[indexW].dt_txt.slice(8, 10);

        for (let i = 0; i < 4; i++) {
            while (
                tmpW === dataW.list[indexW].dt_txt.slice(8, 10) ||
                dataW.list[indexW].dt_txt.slice(11, 13) !== '15'
                ) {
                indexW++;
            }
            weekDayIndices.push(indexW);
            tmpW = dataW.list[indexW].dt_txt.slice(8, 10);
        }
        return weekDayIndices;
    };

    WeeklyWeatherFunc = async city => {
        const api_dataW = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
        ).then(resp => resp.json());

        if (api_dataW.cod === '200') {
            await this.updateWeeklyState(api_dataW);
            return true;
        } else return false;
    };


    render() {
        const WeatherBoxes = () => {
            const weatherBoxes = this.state.days.slice(1).map(day => (
                <li>
                    <WeatherBox {...day} />
                </li>
            ));

            return <ul className='weather-box-list'>{weatherBoxes}</ul>;
        };

        const WeeklyWeatherBoxes = () => {
            const weeklyWeatherBoxes = this.state.weekDays.slice(1).map(weekDay => (
                <>
                    <li>
                        <WeeklyWeather {...weekDay} />
                    </li>
                </>
            ));

            return <><br/><ul className='weather-box-list'>{weeklyWeatherBoxes}</ul></>;
        };

        return (
            <div className='App'>
                <div className='App-header'>
                    <MainWeatherWindow data={this.state.days[0]} city={this.state.city}>
                        <CityInput city={this.state.city} makeApiCall={this.makeApiCall.bind(this)} WeeklyWeatherFunc={this.WeeklyWeatherFunc.bind(this)}/>
                        <WeatherBoxes />
                        <WeeklyWeatherBoxes/>
                    </MainWeatherWindow>
                </div>
            </div>
        );
    }
}

export default Home;
