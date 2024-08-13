document.getElementById('fetchWeather').addEventListener('click', fetchWeatherData);

function fetchWeatherData() {
    const apiKey = '2befaeb67ace7b69fc53cc55b93bcec4';
    const cities = ['London', 'New York', 'Tokyo'];

    const requests = cities.map(city => 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
    );

    Promise.all(requests)
        .then(responses => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Limpa os resultados anteriores
            responses.forEach(response => {
                const cityWeather = `
                    <div>
                        <h2>${response.name}</h2>
                        <p>Temperature: ${(response.main.temp - 273.15).toFixed(2)}°C</p>
                        <p>Weather: ${response.weather[0].description}</p>
                    </div>
                    <hr>
                `;
                resultsDiv.innerHTML += cityWeather;
            });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('results').innerHTML = `<p style="color:red;">Error fetching weather data: ${error.message}</p>`;
        });
}
