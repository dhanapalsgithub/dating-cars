# QuzeeDrive – Backend Contracts

## 1. Data currently mocked in `frontend/src/mock.js`
| Frontend usage | Mock const | Backend replacement |
|---|---|---|
| Fleet grid on Home & /fleet | `CARS` | `GET /api/cars` |
| Categories section | `CATEGORIES`, `CATEGORY_IMAGES` | Kept in FE (static content) |
| FAQ section | `FAQS` | Kept in FE (static content) |
| Nav links | `NAV_LINKS` | Kept in FE (static content) |
| Booking form submit | `toast()` only | `POST /api/bookings` |
| Become-a-host submit | `toast()` only | `POST /api/hosts` |
| Track ride status | Hard-coded steps | `GET /api/bookings/track/{code}` |

## 2. REST API Endpoints (all prefixed `/api`)

### Cars
- `GET /api/cars` → `[Car]`  (public list; supports optional `?category=` filter)
- `GET /api/cars/{id}` → `Car`
- `POST /api/cars` → create car (used internally / admin – no auth for MVP)

### Bookings
- `POST /api/bookings`  
  body: `{ name, phone, start_date (ISO), end_date (ISO), car_id | car_name }`  
  → `{ booking_code, status:"confirmed", ...booking }`
- `GET /api/bookings` → list (admin)
- `GET /api/bookings/track/{booking_code}` → `{ booking_code, status, steps:[{title,time,ok}] }`

### Host applications
- `POST /api/hosts` body `{ name, phone, city, car_model }` → `{ id, status:"received" }`
- `GET /api/hosts` → list (admin)

## 3. MongoDB collections
- `cars` — id, name, category, transmission, fuel, seats, pricePerDay, image, tag
- `bookings` — id, booking_code, name, phone, start_date, end_date, car_id, car_name, status, created_at
- `hosts` — id, name, phone, city, car_model, status, created_at

## 4. Frontend integration plan
1. Add lightweight `api.js` helper using `REACT_APP_BACKEND_URL`.
2. `Fleet.jsx` and `FleetPage.jsx` – fetch `/api/cars` on mount, fall back to `CARS` mock if request fails.
3. `Hero.jsx` – on submit POST `/api/bookings`, on success show toast with returned `booking_code` (user can use it in tracker).
4. `BecomeHost.jsx` – convert JOIN NOW into a small dialog with name/phone/city/car; POST `/api/hosts`.
5. `TrackPage.jsx` – fetch `/api/bookings/track/{code}`; if not found, show friendly empty state.
6. On backend startup, seed `cars` collection from the same list currently in `mock.js` so the site is populated from day one.
