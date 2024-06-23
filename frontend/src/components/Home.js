import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProfileCard from './ProfileCard';
import { Grid, TextField } from '@mui/material';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/profile/search`, { 
                    params: { query: searchQuery }
                });
                setSearchResults(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (searchQuery.trim() !== '') {
            fetchData();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="AppNonCenter">
            <div style={{ marginTop: 100, backgroundColor: 'white', padding: '1rem', borderBottom: '1px solid #ccc' }}>
                <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search profiles..."
                    sx={{ marginBottom: 3 }}
                    autoComplete='off'
                />
            </div>

            <div style={{ marginTop: '4rem'}}>
                {error && <p>Error: {error}</p>}
                {searchResults.length > 0 ? (
                    <Grid container spacing={2}>
                        {searchResults.slice(0, 6).map((result) => (
                            <Grid item key={result.id} xs={12}>
                                <ProfileCard profile={result} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <p className={searchQuery ? "instructions" : "offscreen"}>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;