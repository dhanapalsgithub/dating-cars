import { useEffect, useState } from "react";
import { carsApi } from "../lib/api";

export default function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useCars hook initialized!"); // இது கன்சோலில் வருகிறதா என்று பாருங்கள்
    carsApi.list()
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hook Error:", err);
        setLoading(false);
      });
  }, []);

  return { cars, loading };
}