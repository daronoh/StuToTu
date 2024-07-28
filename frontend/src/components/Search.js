import SearchIcon from '@mui/icons-material/Search';
import { Grid, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import ProfileCard from './ProfileCard';
import ProfileFilter from './ProfileFilter';

const Search = () => {
    const { getRole, getToken } = useAuth();
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
                    headers: { 'Authorization': `Bearer ${getToken()}` },
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
            const token = getToken();
            const params = new URLSearchParams();
            if (filters.subjects) {
                params.append('subjects', filters.subjects);
            }
            if (filters.gender) {
                params.append('gender', filters.gender);
            }
            if (filters.educationLevel) {
                params.append('educationLevel', filters.educationLevel);
            }
            if (filters.location) {
                params.append('location', filters.location);
            }
            if (filters.rate) {
                params.append('rate', filters.rate.toString());
            }
            const response = await axios.get(`/api/profile/filter?${params.toString()}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            setFilteredProfiles(response.data);
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const profilesToDisplay = filteredProfiles.length > 0 ? filteredProfiles : searchResults;

    return (
        <>
        { getRole() === 'STUDENT' ? (
            //case for when the user is a student
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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" sx={{color : '#03a9f4'}} > 
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <ProfileFilter applyFilters={applyFilters} />
                </div>

                <div style={{ marginTop: '4rem' }}>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && profilesToDisplay.length === 0 && searchQuery !== '' && (
                        <p>Profile not found.</p>
                    )}
                    {profilesToDisplay.length > 0 && (
                        <Grid container spacing={2} sx={{ minWidth: '800px', width: '80%', maxWidth: '1500px', margin: '0 auto' }}>
                            {profilesToDisplay.slice(0, 6).map((result) => (
                                <Grid item key={result.id} xs={12}>
                                    <ProfileCard profile={result} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </div>
            </div>
        ) : (
            // case for when the user is a tutor
            <div>
                <p>I am a Tutor.</p>
            </div>
        )}
        </>
    );
};

export default Search;