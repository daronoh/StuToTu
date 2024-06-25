import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProfileCard from './ProfileCard';
import ProfileFilter from './ProfileFilter';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
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

    const applyFilters = async (filters) => {
        setLoading(true);
        try {
            const response = await axios.get('/api/profile/filter', {
                params: {
                    subjects: JSON.stringify(filters.subjects),  // Encode array as JSON
                    gender: filters.gender,
                    educationLevel: filters.educationLevel,
                    location: filters.location,
                    rate: filters.rate,
                },
                paramsSerializer: params => {
                    return new URLSearchParams(params).toString();
                }
            });
            setFilteredProfiles(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const profilesToDisplay = filteredProfiles.length > 0 ? filteredProfiles : searchResults;

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
                <ProfileFilter applyFilters={applyFilters} />
            </div>

            <div style={{ marginTop: '4rem'}}>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {profilesToDisplay.length > 0 ? (
                    <Grid container spacing={2}>
                        {profilesToDisplay.slice(0, 6).map((result) => (
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