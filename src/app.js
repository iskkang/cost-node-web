const express = require('express');
const cors = require('cors');
const priceRoutes = require('/routes/priceRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', priceRoutes);

module.exports = app;
