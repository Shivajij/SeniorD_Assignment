import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CatBreedsTree() {
  const [apidata, setApiData] = useState([]);

  useEffect(() => {
    axios.get("https://catfact.ninja/breeds").then((res) => {
      setApiData(res.data.data);
    });
  }, []);

  // Group the data by country
  const groupedData = apidata.reduce((acc, ele) => {
    if (!acc[ele.country]) {
      acc[ele.country] = [];
    }
    acc[ele.country].push(ele.breed);
    return acc;
  }, {});

  return (
    <div className="App">
      <ul>
        {Object.entries(groupedData).map(([country, breeds]) => (
          <li key={country}>
            <h3>{country}</h3>
            <ul>
              {breeds.map((breed, i) => (
                <li key={i}>{breed}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
