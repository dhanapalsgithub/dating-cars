import axios from "axios";

export const api = axios.create({ 
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 10000 
});

export const carsApi = {
  list: () => api.get("/cars").then(res => res.data),
};

// விடுபட்ட இந்த API-களைச் சேர்க்கவும்:
export const bookingsApi = {
  create: (data) => api.post("/bookings", data),
};

export const hostsApi = {
  get: () => api.get("/hosts"),
};