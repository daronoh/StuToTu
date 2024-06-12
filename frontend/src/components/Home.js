import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const LOGIN_URL = '/home';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch data from backend based on searchQuery
                const response = await axios.get(`/search?query=${searchQuery}`);
                setSearchResults(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        // Fetch data only if searchQuery is not empty
        if (searchQuery.trim() !== '') {
            fetchData();
        } else {
            // Clear searchResults if searchQuery is empty
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
             <p>Home</p>
             <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholders="Search profiles..."
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {searchResults.length > 0 ? (
                searchResults.map((result) => (
                    <div key={result.id}>
                        {/* Display search results */}
                        <p>{result.name}</p>
                        {/* Display other result details as needed */}
                    </div>
                ))
            ) : (
                <p>No results found.</p>
            )}
            <a href="/unauthorized">test</a>
             </div>
    
    );

}

export default Home