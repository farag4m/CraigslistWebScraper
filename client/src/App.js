import { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [zipCode, setZipCode] = useState("");
    const [carModel, setCarModel] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/scrape`, {
                params: { zipCode, carModel }
            });
            console.log(response.data);  // Log the response data
            setResults(response.data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="App">
            <h1>Craigslist Car Scraper</h1>
            <input
                type="text"
                placeholder="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
            />
            <input
                type="text"
                placeholder="Car Model"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <div>
                {results.map((car, index) => (
                    <div key={index}>
                        <h3>{car.title}</h3>
                        <p>Price: {car.price}</p>
                        <a href={car.link} target="_blank" rel="noopener noreferrer">View Listing</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;