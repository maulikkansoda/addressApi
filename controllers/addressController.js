// controllers/addressController.js
const AddressModel = require('../models/addressModel');

class AddressController {
  static async createAddress(req, res) {
    try {
      const addressData = {
        AddressTitle: req.body.AddressTitle,
        AddressName: req.body.AddressName,
        AddressTypeID: req.body.AddressTypeID ? parseInt(req.body.AddressTypeID) : null,
        AddressLine1: req.body.AddressLine1,
        AddressLine2: req.body.AddressLine2,
        City: req.body.City ? parseInt(req.body.City) : null,
        County: req.body.County,
        State: req.body.State,
        PostalCode: req.body.PostalCode,
        Country: req.body.Country ? parseInt(req.body.Country) : null,
        PreferredBillingAddress: req.body.PreferredBillingAddress != null ? Boolean(req.body.PreferredBillingAddress) : 0,
        PreferredShippingAddress: req.body.PreferredShippingAddress != null ? Boolean(req.body.PreferredShippingAddress) : 0,
        Longitude: req.body.Longitude ? parseFloat(req.body.Longitude) : null,
        Latitude: req.body.Latitude ? parseFloat(req.body.Latitude) : null,
        Disabled: req.body.Disabled != null ? Boolean(req.body.Disabled) : 0,
        CreatedByID: parseInt(req.body.CreatedByID) || req.user.personId,
      };

      const result = await AddressModel.createAddress(addressData);

      return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
      console.error('Create Address error:', error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  }

  static async updateAddress(req, res) {
    try {
      const addressId = parseInt(req.params.id);
      if (isNaN(addressId)) {
        return res.status(400).json({ success: false, message: 'Invalid AddressID' });
      }

      const addressData = {
        AddressID: addressId,
        AddressTitle: req.body.AddressTitle,
        AddressName: req.body.AddressName,
        AddressTypeID: req.body.AddressTypeID ? parseInt(req.body.AddressTypeID) : null,
        AddressLine1: req.body.AddressLine1,
        AddressLine2: req.body.AddressLine2,
        City: req.body.City ? parseInt(req.body.City) : null,
        County: req.body.County,
        State: req.body.State,
        PostalCode: req.body.PostalCode,
        Country: req.body.Country ? parseInt(req.body.Country) : null,
        PreferredBillingAddress: req.body.PreferredBillingAddress != null ? Boolean(req.body.PreferredBillingAddress) : undefined,
        PreferredShippingAddress: req.body.PreferredShippingAddress != null ? Boolean(req.body.PreferredShippingAddress) : undefined,
        Longitude: req.body.Longitude ? parseFloat(req.body.Longitude) : null,
        Latitude: req.body.Latitude ? parseFloat(req.body.Latitude) : null,
        Disabled: req.body.Disabled != null ? Boolean(req.body.Disabled) : undefined,
        CreatedByID: parseInt(req.body.CreatedByID) || req.user.personId,
      };

      const result = await AddressModel.updateAddress(addressData);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Update Address error:', error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  }

  static async deleteAddress(req, res) {
    try {
      const addressId = parseInt(req.params.id);
      if (isNaN(addressId)) {
        return res.status(400).json({ success: false, message: 'Invalid AddressID' });
      }

      const addressData = {
        AddressID: addressId,
        CreatedByID: parseInt(req.body.CreatedByID) || req.user.personId,
      };

      const result = await AddressModel.deleteAddress(addressData);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      console.error('Delete Address error:', error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  }

  static async getAddress(req, res) {
    try {
      const addressId = parseInt(req.params.id);
      if (isNaN(addressId)) {
        return res.status(400).json({ success: false, message: 'Invalid AddressID' });
      }

      const result = await AddressModel.getAddress({ AddressID: addressId });
      return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      console.error('Get Address error:', error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  }

  static async getAllAddresses(req, res) {
    try {
      const paginationData = {
        PageNumber: req.query.pageNumber ? parseInt(req.query.pageNumber) : 1,
        PageSize: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
        FromDate: req.query.fromDate || null,
        ToDate: req.query.toDate || null,
      };

      const result = await AddressModel.getAllAddresses(paginationData);

      return res.status(200).json({
        ...result,
        pagination: {
          pageNumber: paginationData.PageNumber,
          pageSize: paginationData.PageSize,
          totalRecords: result.totalRecords || 0,
          totalPages: Math.ceil((result.totalRecords || 0) / paginationData.PageSize),
        },
      });
    } catch (error) {
      console.error('Get All Addresses error:', error);
      return res.status(500).json({
        success: false,
        message: `Server error: ${error.message}`,
      });
    }
  }
}

module.exports = AddressController;