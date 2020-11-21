const express = require("express");
//START SERVER
const app = express();

//SET PUBLIC AS STATIC FORLDER WITH EXPRESS.STATIC MIDDLEWARE
app.use(express.static("public"));

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
