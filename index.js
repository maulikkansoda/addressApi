const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


const addressRoutes = require('./routes/addressRoutes');

app.use('/api/addresses', addressRoutes);



app.get('/', (req, res) => {
  res.json({
    message: 'API is running!',
    endpoints: {
      addresses: '/api/addresses',
      // cities: '/api/cities'
    }
  });
});

/* ---------- Server ---------- */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
