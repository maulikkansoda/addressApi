const express = require('express');
const cors = require('cors');
const cityRoutes = require('./routes/city.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: "City CRUD API is running!",
    endpoints: "/cities"
  });
});

app.use('/cities', cityRoutes);

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
