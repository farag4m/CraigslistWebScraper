import { useState } from 'react';
import './App.css';

function App() {

    // Sample Data
    const items = [
        { id: 1, title: "Bicycle for sale", description: "Brand new mountain bike", location: "New York" },
        { id: 2, title: "Used laptop", description: "Good condition laptop", location: "Chicago" },
        { id: 3, title: "Sofa for free", description: "Just moved, need to get rid of a sofa", location: "San Francisco" },
        { id: 4, title: "Coffee table", description: "Wooden coffee table for sale", location: "Los Angeles" }
    ];

    // State for the query (search term) and results
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // Handle the search when the button or Enter is clicked
    const handleSearch = () => {
        const filteredItems = items.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredItems);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="App">
            <h1>Hello Craigslist</h1>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search items..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            {/* Search button */}
            <button onClick={handleSearch}>Search</button>

            {/* Display search results */}
            <ul>
                {results.map(item => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>{item.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;