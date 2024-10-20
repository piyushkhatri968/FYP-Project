import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(import.meta.env.VITE_SERVER_URL);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);
  return (
    <div className="text-3xl font-extrabold text-gray-700 text-center mt-7 underline">
      {data}
    </div>
  );
};

export default App;
