import api from "@/lib/api";
import { useEffect, useState } from "react";

const Health = () => {
  const [health, setHealth] = useState<{ ok: true } | null>(null);

  useEffect(() => {
    // Fetch health data from the server or perform any necessary setup
    const fetchHealthData = async () => {
      try {
        const {data, success} = await api.get<{ ok: true }>("/health");
        if(success) setHealth(data?.ok ? data : null);
      } catch (error) {
        console.error('Error fetching health data:', error);
      }
    };

    fetchHealthData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Health Check</h1>
      {health ? (
        <div className="p-4 bg-green-100 text-green-800 rounded">
          <p>Service is healthy!</p>
        </div>
      ) : (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <p>Service is unhealthy!</p>
        </div>
      )}
    </div>
  );
}

export default Health;