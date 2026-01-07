// models/addressModel.js
const poolPromise = require('../config/db.config');

class AddressModel {
  static async manageAddress(action, addressData) {
    try {
      const pool = await poolPromise;

      const queryParams = [
        action,
        addressData.AddressID ? parseInt(addressData.AddressID) : null,
        addressData.AddressTitle || null,
        addressData.AddressName || null,
        addressData.AddressTypeID ? parseInt(addressData.AddressTypeID) : null,
        addressData.AddressLine1 || null,
        addressData.AddressLine2 || null,
        addressData.City ? parseInt(addressData.City) : null,
        addressData.County || null,
        addressData.State || null,
        addressData.PostalCode || null,
        addressData.Country ? parseInt(addressData.Country) : null,
        addressData.PreferredBillingAddress != null ? addressData.PreferredBillingAddress : 0,
        addressData.PreferredShippingAddress != null ? addressData.PreferredShippingAddress : 0,
        addressData.Longitude ? parseFloat(addressData.Longitude) : null,
        addressData.Latitude ? parseFloat(addressData.Latitude) : null,
        addressData.Disabled != null ? addressData.Disabled : 0,
        addressData.CreatedByID ? parseInt(addressData.CreatedByID) : null,
      ];

      console.log(`Executing SP_ManageAddresses with action: ${action}`, queryParams);

      const [result] = await pool.query(
        'CALL SP_ManageAddresses(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_Result, @p_Message)',
        queryParams
      );

      const [[outParams]] = await pool.query(
        'SELECT @p_Result AS result, @p_Message AS message'
      );

      const success = outParams.result === 1;

      return {
        success,
        message: outParams.message || (success ? `${action} successful` : 'Operation failed'),
        data: action === 'SELECT' ? (result[0]?.[0] || null) : null,
        addressId: addressData.AddressID || null,
        newAddressId: action === 'INSERT' ? result.insertId || null : null, // not directly returned by SP, but we can fetch if needed
      };
    } catch (error) {
      console.error(`Database error in Address ${action}:`, error);
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async getAllAddresses(paginationData) {
    try {
      const pool = await poolPromise;

      let pageNumber = parseInt(paginationData.PageNumber) || 1;
      let pageSize = parseInt(paginationData.PageSize) || 10;

      if (pageNumber < 1) throw new Error('PageNumber must be > 0');
      if (pageSize < 1 || pageSize > 100) throw new Error('PageSize must be 1-100');

      const fromDate = paginationData.FromDate || null;
      const toDate = paginationData.ToDate || null;

      const queryParams = [pageNumber, pageSize, fromDate, toDate];

      console.log('Executing SP_GetAllAddresses with params:', queryParams);

      const [result] = await pool.query(
        'CALL SP_GetAllAddresses(?, ?, ?, ?, @p_Result, @p_Message)',
        queryParams
      );

      const [[outParams]] = await pool.query(
        'SELECT @p_Result AS result, @p_Message AS message'
      );

      const rows = result[0] || [];
      const totalRecordsRow = result[1]?.[0] || { TotalRecords: 0 };
      const totalRecords = totalRecordsRow.TotalRecords;

      return {
        success: true,
        message: totalRecords === 0 ? 'No addresses found.' : 'Addresses retrieved successfully.',
        data: rows,
        totalRecords,
      };
    } catch (error) {
      console.error('Error in getAllAddresses:', error);
      throw new Error(`Database error: ${error.message}`);
    }
  }

  // CRUD wrappers
  static async createAddress(addressData) {
    return this.manageAddress('INSERT', addressData);
  }

  static async updateAddress(addressData) {
    if (!addressData.AddressID) {
      return { success: false, message: 'AddressID is required for UPDATE' };
    }
    return this.manageAddress('UPDATE', addressData);
  }

  static async deleteAddress(addressData) {
    if (!addressData.AddressID) {
      return { success: false, message: 'AddressID is required for DELETE' };
    }
    return this.manageAddress('DELETE', addressData);
  }

  static async getAddress(addressData) {
    if (!addressData.AddressID) {
      return { success: false, message: 'AddressID is required for SELECT' };
    }
    return this.manageAddress('SELECT', addressData);
  }
}

module.exports = AddressModel;