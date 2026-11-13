import { apiClient } from './apiClient'

export const bookingApi = {
  createEnquiry: (data) =>
    apiClient.post('/bookings', data).then((res) => res.data),
}
