// controllers/city.controller.js

const City = require('../models/city.model.js');

// GET all with search
exports.getAllCities = (req, res) => {
  const filters = {

  };

  City.getAllCities(filters, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);  // Only the array of cities
  });
};

// GET by ID
exports.getCityById = (req, res) => {
  City.getCityById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0) return res.status(404).json({ error: 'City not found' });
    res.json({ success: true, city: data[0] });
  });
};

// POST - Create
exports.createCity = (req, res) => {
  City.createCity(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ success: true, id: result.insertId });
  });
};

// PUT - Update
exports.updateCity = (req, res) => {
  City.updateCity(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'City not found' });
    res.json({ success: true, message: 'City updated' });
  });
};

// DELETE
exports.deleteCity = (req, res) => {
  City.deleteCity(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'City not found' });
    res.json({ success: true, message: 'City deleted' });
  });
};