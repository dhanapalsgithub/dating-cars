import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FleetPage from "./pages/FleetPage";
import AboutPage from "./pages/AboutPage";
import TrackPage from "./pages/TrackPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<FleetPage />} />
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
