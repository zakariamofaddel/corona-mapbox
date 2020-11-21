const mapbox_token =
	"pk.eyJ1IjoiemFrYXJpYTk3IiwiYSI6ImNraHFzZ3UxcjAzZTEycWxodHMyYzVzejMifQ.XnvDv4_zdedxUe9qtUF_dQ";

mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/navigation-preview-night-v4?optimize=true", // stylesheet location
	center: [12, 42], // starting position [lng, lat]
	zoom: 2, // starting zoom
});

fetch("./data600.json")
	.then((response) => response.json())
	.then((data) => {
		dataArray = data.data;

		dataArray
			.filter(
				(report) =>
					!report.invisible && (report.infected / report.pop) * 100 > 1
			)
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

				let marker = new mapboxgl.Marker()
					.setLngLat([longitude, latitude])
					.addTo(map);
			});
	});
