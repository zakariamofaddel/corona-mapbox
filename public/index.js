//this key doesn't work anymore. Visit https://www.mapbox.com/, create a new account and get an access token.
const mapbox_token =
	"pk.eyJ1IjoiemFrYXJpYTk3IiwiYSI6ImNraHM4cGxxeTQ4MDEyemw2emJleDQ4NGwifQ.syhzvBYxi7VjXx6uos19-w";

mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/navigation-preview-night-v4?optimize=true", // stylesheet location
	center: [12, 42], // starting position [lng, lat]
	zoom: 2, // starting zoom
});

const getColorFromInfected = (count) => {
	if (count < 2) {
		return "green";
	}

	if (count >= 2 && count < 5) {
		return "yellow";
	}
	if (count >= 5 && count < 8) {
		return "orange";
	}
	if (count >= 8) {
		return "red";
	}
};

fetch("./data600.json")
	.then((response) => response.json())
	.then((data) => {
		dataArray = data.data;

		dataArray
			.filter((report) => !report.invisible)
			.forEach((report) => {
				const {
					pop,
					recovered,
					infected,
					dead,
					longitude,
					latitude,
					country,
					name,
				} = report;

				infectedPercentage = (infected / pop) * 100;

				let marker = new mapboxgl.Marker({
					color: getColorFromInfected(infectedPercentage),
				})
					.setLngLat([longitude, latitude])
					.addTo(map)
					.setPopup(
						new mapboxgl.Popup().setHTML(`
                    <ul>
                        <li><h3>Country: ${country}</h3></li>
                        <li><h3>Region: ${name}<h4></li>
                        <li>Population: ${pop}</li>
                        <li>Infected: ${infected}</li>
                        <li>Percentage: ${infectedPercentage.toFixed(2)}%</li>
                        <li>deaths: ${dead}</li>  
                    </ul>`)
					);

				if (infectedPercentage < 0.5) {
					marker.remove();
					return;
				}
			});
	});
