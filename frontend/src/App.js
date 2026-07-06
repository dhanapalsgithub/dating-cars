import "./App.css";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import FleetPage from "./pages/FleetPage";
import AboutPage from "./pages/AboutPage";
import TrackPage from "./pages/TrackPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [cars] = useState([
    { id: 'Tata', name: 'Tata tiago xt', category: 'Hatchback', transmission: 'Manual', fuel: 'Petrol', seats: 5, pricePerDay: 2500, image: '...', tag: 'Popular' },
    { id: 'toyota', name: 'toyota tiasor', category: 'Hatchback', transmission: 'Automatic', fuel: 'Petrol', seats: 5, pricePerDay: 2600, image: '...', tag: 'New' },
    { id: 'city-1', name: 'Honda City', category: 'Sedan', transmission: 'Automatic', fuel: 'Petrol', seats: 5, pricePerDay: 2800, image: '...', tag: 'Premium' },
    { id: 'baleno-1', name: 'Hyundai Verna', category: 'Sedan', transmission: 'Manual', fuel: 'petrol and CNG', seats: 5, pricePerDay: 2800, image: '...', tag: '' },
    { id: 'baleno-2', name: 'baleno', category: 'SUV', transmission: 'Automatic', fuel: 'petrol', seats: 5, pricePerDay: 2300, image: '...', tag: 'Popular' },
  ]);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<FleetPage cars={cars} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/track" element={<TrackPage />} />
        </Routes>
        <Footer />
        <WhatsappFloat />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
