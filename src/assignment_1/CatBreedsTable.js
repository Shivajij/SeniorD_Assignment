import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CatBreedsTable() {
  const [apidata, setApiData] = useState([]);

  useEffect(() => {
    axios.get("https://catfact.ninja/breeds").then((res) => {
      setApiData(res.data.data);
    });
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th style={{ fontSize: "20px" }}>Breed</th>
            <th style={{ fontSize: "20px" }}>Country</th>
          </tr>
        </thead>
        <tbody>
          {apidata.map((ele, i) => (
            <tr key={i}>
              <td>{ele.breed}</td>
              <td>{ele.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
