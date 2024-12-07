import { useState } from 'react';
import './App.css';

const App = () => {

    // Variable states
    const [zipCode, setZipCode] = useState("");
    const [carModel, setCarModel] = useState("");
    const [results, setResults] = useState({ message: "" });

    // Handle the search when the button or Enter is clicked
    const handleSearch = async () => {
        if (!zipCode || !carModel) {
            alert("Both Zip Code and Car Model are required");
            return;
        }

        // Send a GET request to the backend with the paramaters
        try {
            //const response = await fetch(/scrape?zipCode=${zipCode}&carModel=${carModel});
            //const data = await response.json();
            //setResults(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="App">
            <h1>Craigslist Scraper</h1>

            {/* Zip code input */}
            <input
                type="text"
                placeholder="Enter Zip Code"
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            {/* Car Model input */}
            <input
                type="text"
                placeholder="Enter Car Model"
                value={carModel}
                onChange={e => setCarModel(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            {/* Search button */}
            <button onClick={handleSearch}>Search</button>

            {/* Display search results */}
            <ul>
                {/* If there's a message, show it */}
                {results.message ? (
                    <li>{results.message}</li>
                ) : (
                    <li>No results found</li>
                )}
            </ul>
        </div>
    );
}

export default App;