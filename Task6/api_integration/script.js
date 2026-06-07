// ================= GET WEATHER =================

async function getWeather() {

    // GET CITY

    const city = document.getElementById("cityInput").value.trim();

    // ELEMENTS

    const loading = document.getElementById("loading");

    const error = document.getElementById("error");

    const result = document.getElementById("weatherResult");

    // VALIDATION

    if(city === ""){

        alert("Please enter city name");

        return;
    }

    // SHOW LOADING

    loading.style.display = "block";

    error.style.display = "none";

    result.style.display = "none";

    try{

        // ================= FETCH WEATHER =================

        const response = await fetch(

            `https://wttr.in/${city}?format=j1`

        );

        // CONVERT TO JSON

        const data = await response.json();

        // GET WEATHER DATA

        const current = data.current_condition[0];

        // DISPLAY DATA

        document.getElementById("cityName").innerText =
            city;

        document.getElementById("temperature").innerText =
            `${current.temp_C}°C`;

        document.getElementById("description").innerText =
            `Weather: ${current.weatherDesc[0].value}`;

        document.getElementById("humidity").innerText =
            `Humidity: ${current.humidity}%`;

        document.getElementById("wind").innerText =
            `Wind Speed: ${current.windspeedKmph} km/h`;

        // SHOW RESULT

        result.style.display = "block";

    }

    catch(err){

        // SHOW ERROR

        error.style.display = "block";

        error.innerText = "Unable to fetch weather data!";
    }

    finally{

        // HIDE LOADING

        loading.style.display = "none";
    }
}