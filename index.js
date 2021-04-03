const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();
const port = 8080;
const APPID = "23991482a5c53b4c47cc0a6a4d305094";

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Healthcheck: OK");
});

app.get("/api/current-weather/:lat/:lon", async (req, res) => {
  console.log(req.params);
  try {
    const { lat, lon } = req.params;
    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${parsedLat}&lon=${parsedLon}&appid=${APPID}`
    );

    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
