import { useState, useEffect } from 'react'
import { Container, Row, Col, Dropdown } from 'react-bootstrap'
import { ProvinceData } from '../assets/data/ProvinceData';
import $ from 'jquery'

const CollectData = () => {

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                
                const settings = {
                    url: 'https://api.openweathermap.org/data/2.5/',
                    apiKey: '8f6c5713af63cd3608451d75c5b03773',
                    icon: 'http://openweathermap.org/img/wn/'
                };
        
                fetch(`${settings.url}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${settings.apiKey}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    $('.icon-weather').empty();                    
                    const weatherIconCode = data.weather[0].icon;
                    
                    const iconUrl = `${settings.icon}${weatherIconCode}@2x.png`;
                    const iconImg = $('<img>').attr('src', iconUrl).addClass('weather-icon');
        
                    const tempFormat = Math.floor(data.main.temp);
        
                    $('.city').text(`${data.name}, ${data.sys.country}`)
                    $('.icon-weather').append(iconImg)
                    $('.weather-description').text(data.weather[0].description)
                    $('.temperature').text(`${tempFormat} °C`)
                    $('.temp-min').text(`${data.main.temp_min} °C`)
                    $('.temp-max').text(`${data.main.temp_max} °C`)
                    $('.temp-feel').text(`${data.main.feels_like}`)
                    $('.humidity').text(`${data.main.humidity} %`)
                    $('.pressure').text(`${data.main.pressure} hPA`)
                    $('.wind').text(`${Math.floor(data.wind.speed)} m/s`)
                })
            });
        } else {
            console.log("Geolocation is not available in this browser.");
        }
    }, [])

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {

            const cityName = e.target.value;

            const settings = {
                url: 'https://api.openweathermap.org/data/2.5/',
                apiKey: '8f6c5713af63cd3608451d75c5b03773',
                icon: 'http://openweathermap.org/img/wn/'
            };

            $('.icon-weather').empty();

            fetch(`${settings.url}weather?q=${cityName}&units=metric&appid=${settings.apiKey}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                const weatherIconCode = data.weather[0].icon;
                const iconUrl = `${settings.icon}${weatherIconCode}@2x.png`;
                const iconImg = $('<img>').attr('src', iconUrl).addClass('weather-icon');

                const tempFormat = Math.floor(data.main.temp);

                $('.city').text(`${data.name}, ${data.sys.country}`)
                $('.icon-weather').append(iconImg)
                $('.weather-description').text(data.weather[0].description)
                $('.temperature').text(`${tempFormat} °C`)
                $('.temp-min').text(`${data.main.temp_min} °C`)
                $('.temp-max').text(`${data.main.temp_max} °C`)
                $('.temp-feel').text(`${data.main.feels_like}`)
                $('.humidity').text(`${data.main.humidity} %`)
                $('.pressure').text(`${data.main.pressure} hPA`)
                $('.wind').text(`${Math.floor(data.wind.speed)} m/s`)
            })
        }
    };

    const handleRegion = (value, text) => {
        setSelectedRegion(value);
        setSelectedCity(null);
        $('#dropdown-region').text(text)
    };

    const handleCity = (city) => {
        setSelectedCity(city);
        console.log(city)
        $('.input').val("")
        $('#dropdown-province').text(city)
        const settings = {
            url: 'https://api.openweathermap.org/data/2.5/',
            apiKey: '8f6c5713af63cd3608451d75c5b03773',
            icon: 'http://openweathermap.org/img/wn/'
        };

        $('.icon-weather').empty();

        fetch(`${settings.url}weather?q=${city}&units=metric&appid=${settings.apiKey}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            const weatherIconCode = data.weather[0].icon;
            const iconUrl = `${settings.icon}${weatherIconCode}@2x.png`;
            const iconImg = $('<img>').attr('src', iconUrl).addClass('weather-icon');

            const tempFormat = Math.floor(data.main.temp);

            $('.city').text(`${data.name}, ${data.sys.country}`)
            $('.icon-weather').append(iconImg)
            $('.weather-description').text(data.weather[0].description)
            $('.temperature').text(`${tempFormat} °C`)
            $('.temp-min').text(`${data.main.temp_min} °C`)
            $('.temp-max').text(`${data.main.temp_max} °C`)
            $('.temp-feel').text(`${data.main.feels_like}`)
            $('.humidity').text(`${data.main.humidity} %`)
            $('.pressure').text(`${data.main.pressure} hPA`)
            $('.wind').text(`${Math.floor(data.wind.speed)} m/s`)
        })
    }

    return (
        <Container fluid className='pt-5'>
            <Row className='justify-content-center'>
                <div className="welcome-text mb-4 text-center">
                    <h1 className='text-uppercase fw-bold'>
                        Weather <span style={{color: '#EB6E4B'}}>Forecast</span> (TH)
                    </h1>
                    <h6>
                        APIs from <a href="https://openweathermap.org" target='_blank' rel='noreferrer' className='link-api'>openweathermap.org</a> 
                    </h6>
                </div>
                <Col xs={12} lg={3}>
                    <input 
                        type="search" 
                        className='w-100 form-control input' 
                        placeholder='Enter city...'
                        onKeyDown={handleInputKeyPress}
                    />
                </Col>
                <Col xs={6} lg={3} className='mt-3 mt-lg-0'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-region" className='w-100 dropdown-btn'>
                            Region
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleRegion(1, "Northern (9)")}>Northern (9)</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRegion(2, "Northeastern (20)")}>Northeastern (20)</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRegion(3, "Central (22)")}>Central (22)</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRegion(4, "Eastern (7)")}>Eastern (7)</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRegion(5, "Western (5)")}>Western (5)</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRegion(6, "Southern (14)")}>Southern (14)</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={6} lg={3} className='mt-3 mt-lg-0'>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-province" className='w-100 dropdown-btn'>
                            Province
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {selectedRegion &&
                                ProvinceData[selectedRegion].map((city, index) => (
                                <Dropdown.Item key={index} selectedCity={selectedCity} onClick={() => handleCity(city)}>
                                    {city}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className='justify-content-center mt-5'>
                <Col xs={12} md={9}>
                    <div className="box-weather text-center">
                        <Row>
                            <Col xs={12} md={6}>
                                <h3 className='city'></h3>
                                <div className='icon-weather'></div>
                                <div className="weather-description pb-3"></div>
                            </Col>
                            <Col xs={12} md={6} className='temp-box'>
                                <h1 className='temperature'></h1>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row className='justify-content-center mt-5'>
                <Col xs={12} lg={9} className='d-flex'>
                    <Col xs={4}>
                        <div className="box-temp-sub">
                            <i className="fa-solid fa-arrow-down"></i>
                            <h2 className='temp-min py-2'></h2>
                            <p className='mb-0'>MIN</p>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="box-temp-sub ms-2">
                            <i className="fa-solid fa-arrow-up"></i>
                            <h2 className='temp-max py-2'></h2>
                            <p className='mb-0'>MAX</p>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="box-temp-sub ms-2">
                            <i className="fa-regular fa-face-smile-wink"></i>
                            <h2 className='temp-feel py-2'></h2>
                            <p className='mb-0'>Feel Likes</p>
                        </div>
                    </Col>
                </Col>
            </Row>
            <Row className='justify-content-center mt-3 pb-3'>
                <Col xs={12} lg={9} className='d-flex'>
                    <Col xs={4}>
                        <div className="box-detail text-center">
                            <i className="fa-solid fa-droplet"></i>
                            <h2 className='humidity py-3'></h2>
                            <p className='mb-0'>Humidity</p>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="box-detail text-center mx-2">
                            <i className="fa-solid fa-gauge-high"></i>
                            <h2 className='pressure py-3'></h2>
                            <p className='mb-0'>Pressure</p>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div className="box-detail text-center">
                            <i className="fa-solid fa-wind"></i>
                            <h2 className='wind py-3'></h2>
                            <p className='mb-0'>Wind Speed</p>
                        </div>
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default CollectData;