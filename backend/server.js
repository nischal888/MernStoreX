const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/userRoutes')

mongoose
  .connect(
    'mongodb+srv://nischalrajbudhathoki:8yrNfUi4eDq4kjCd@cluster0.h3yn6.mongodb.net/'
  )
  .then(() => console.log('DB Connected'))
  .catch((error) => console.log(error));
const app = express();
const PORT = process.env.PORT || 6000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api', router)
app.listen(PORT, () => console.log(`Server is now running in port ${PORT}`));
