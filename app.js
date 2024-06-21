
const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors')

const app = express();

const corsConfig = {};

  Object.assign(corsConfig, {
    origin: [
      "https://todofe-p4u8.onrender.com"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use('/api', todoRoutes);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export for testing
