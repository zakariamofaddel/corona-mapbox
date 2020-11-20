const mapbox_token =
	"pk.eyJ1IjoiemFrYXJpYTk3IiwiYSI6ImNraHFzZ3UxcjAzZTEycWxodHMyYzVzejMifQ.XnvDv4_zdedxUe9qtUF_dQ";

fetch("/data600.json")
	.then((response) => response.json())
	.then((data) => {
		dataArray = data.data;

		dataArray
			.filter((report) => !report.invisible)
			.forEach((report) => {
				const {
					recovered,
					infected,
					dead,
					longitude,
					latitude,
					country,
					name,
				} = report;

				console.log(
					recovered,
					infected,
					longitude,
					latitude,
					name,
					dead,
					country
				);
			});
	});
