
const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors')

const app = express();

const corsConfig = {};

  Object.assign(corsConfig, {
    origin: [
      "https://victorious-water-0e737791e.5.azurestaticapps.net"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use('/api', todoRoutes);
app.get("/", (req, res) => res.status(200).send("Welcome to My todo"));



app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export for testing
