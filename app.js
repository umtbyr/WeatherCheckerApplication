
const getMapBtn = document.getElementById('get-map');

let locationData;
navigator.geolocation.getCurrentPosition((pos) => {locationData = pos.coords});

createMap = () => {
    const location = {
        lat: locationData.latitude,
        lng: locationData.longitude
    };
    console.log(location);
    const mapProp = {
    center: new google.maps.LatLng(location.lat, location.lng),
    zoom: 8,
    };
    const map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng)    
    });
    marker.setMap(map);
    
    getWeatherData()
    .then(res => {
        console.log(res.data[0].weather.description);
        createWeatherDescr(res.data[0].weather.description);
    })
};


getMapBtn.addEventListener('click', createMap);

getWeatherData = async () => {
    let data;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a1b5dce16fmsh6d2090b4e046487p190f49jsn55793eaedc3c',
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
      },
    };
    
    await fetch(
      `https://weatherbit-v1-mashape.p.rapidapi.com/current?lat=${+locationData.latitude.toFixed(
        1
      )}&lon=${+locationData.longitude.toFixed(1)}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {data = response;})
      .catch((err) => console.error(err));

      return data;

}

createWeatherDescr = (descr) => {
    const body = document.querySelector('body');
    const weatherDescriptionEl = document.createElement('h2');
    weatherDescriptionEl.textContent = `Weather condition is ${descr} right now!`;
    body.insertAdjacentElement('afterbegin', weatherDescriptionEl);
};