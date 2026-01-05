// models/city.model.js

const db = require('../db.js');

// Get all cities with filters and sorted by ID ASC
const getAllCities = (filters = {}, callback) => {
  let sql = 'SELECT * FROM city WHERE 1=1';
  let params = [];

  if (filters.name) {
    sql += ' AND Name LIKE ?';
    params.push(`%${filters.name}%`);
  }
  if (filters.country) {
    sql += ' AND CountryCode = ?';
    params.push(filters.country.toUpperCase());
  }
  if (filters.district) {
    sql += ' AND District LIKE ?';
    params.push(`%${filters.district}%`);
  }
  if (filters.population) {
    sql += ' AND Population = ?';
    params.push(parseInt(filters.population));
  }

  sql += ' ORDER BY ID ASC';
  db.query(sql, params, callback);
};

// Get by ID
const getCityById = (id, callback) => {
  db.query('SELECT * FROM city WHERE ID = ?', [id], callback);
};

// Create
const createCity = (cityData, callback) => {
  if (!cityData || !cityData.Name || !cityData.CountryCode || !cityData.District) {
    return callback(new Error('Name, CountryCode, and District are required'));
  }
  db.query(
    'INSERT INTO city (Name, CountryCode, District, Population) VALUES (?, ?, ?, ?)',
    [cityData.Name, cityData.CountryCode, cityData.District, cityData.Population || 0],
    callback
  );
};

// Update
const updateCity = (id, cityData, callback) => {
  const fields = [];
  const values = [];
  if (cityData.Name) { fields.push('Name = ?'); values.push(cityData.Name); }
  if (cityData.CountryCode) { fields.push('CountryCode = ?'); values.push(cityData.CountryCode); }
  if (cityData.District) { fields.push('District = ?'); values.push(cityData.District); }
  if (cityData.Population !== undefined) { fields.push('Population = ?'); values.push(cityData.Population); }

  if (fields.length === 0) return callback(new Error('No data to update'));

  values.push(id);
  const sql = `UPDATE city SET ${fields.join(', ')} WHERE ID = ?`;
  db.query(sql, values, callback);
};

// Delete
const deleteCity = (id, callback) => {
  db.query('DELETE FROM city WHERE ID = ?', [id], callback);
};

// EXPORT ALL AS OBJECT — THIS IS THE KEY
module.exports = {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity
};