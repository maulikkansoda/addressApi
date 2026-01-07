// routes/addressRoutes.js
const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/addressController');

/* const authMiddleware = require('../middleware/authMiddleware');
const tableAccessMiddleware = require('../middleware/tableAccessMiddleware');
const permissionMiddleware = require('../middleware/permissionMiddleware');
 */
// All routes require authentication + access to addresses table
/* const baseMiddleware = [
  authMiddleware,
  tableAccessMiddleware, // assuming you have a table entry for addresses
]; */

// GET all addresses (paginated + date filters)
router.get('/', /* [...baseMiddleware, permissionMiddleware('read')],  */AddressController.getAllAddresses);

// GET single address by ID
router.get('/:id',/*  [...baseMiddleware, permissionMiddleware('read')],  */AddressController.getAddress);

// CREATE new address
router.post('/',/*  [...baseMiddleware, permissionMiddleware('write')], */ AddressController.createAddress);

// UPDATE address
router.put('/:id',/*  [...baseMiddleware, permissionMiddleware('update')], */ AddressController.updateAddress);

// DELETE address (soft delete via SP)
router.delete('/:id', /* [...baseMiddleware, permissionMiddleware('delete')],*/ AddressController.deleteAddress);

module.exports = router;