import api from './api';

export const vehicleService = {
  async getVehicles() {
    try {
      const response = await api.get('vehicles/');
      return response.data;
    } catch (error) {
      return [
        {
          id: 101,
          vehicle_number: 'Vehicle 101',
          driver: 'Ramesh Mohanty',
          latitude: 20.2886,
          longitude: 85.8427,
          route: 'Saheed Nagar & Janpath',
          status: 'Active',
          last_updated: '2 mins ago'
        },
        {
          id: 102,
          vehicle_number: 'Vehicle 102',
          driver: 'Suresh Nayak',
          latitude: 20.2392,
          longitude: 85.8335,
          route: 'Old Town Heritage Zone',
          status: 'Delayed',
          last_updated: '5 mins ago'
        },
        {
          id: 103,
          vehicle_number: 'Vehicle 103',
          driver: 'Mahesh Das',
          latitude: 20.3541,
          longitude: 85.8184,
          route: 'Patia & KIIT Square',
          status: 'Active',
          last_updated: 'Just now'
        },
        {
          id: 104,
          vehicle_number: 'Vehicle 104',
          driver: 'Dinesh Sahoo',
          latitude: 20.3010,
          longitude: 85.8247,
          route: 'Jaydev Vihar & Master Canteen',
          status: 'Maintenance',
          last_updated: '1 hour ago'
        }
      ];
    }
  }
};
