
import { useEffect, useState } from "react";
import axios from "axios";

export default function CatBreedsTable() {
  const [apidata, setApiData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get("https://catfact.ninja/breeds").then((res) => {
      setApiData(res.data.data);
      setLoading(false); 
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
          {loading ? (
            <tr>
              <td colSpan="2">Please wait...</td>
            </tr>
          ) : (
            apidata.map((ele, i) => (
              <tr key={i}>
                <td>{ele.breed}</td>
                <td>{ele.country}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
