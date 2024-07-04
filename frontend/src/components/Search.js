import SearchIcon from '@mui/icons-material/Search';
import { Grid, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

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
            const params = new URLSearchParams({
                gender: filters.gender,
                educationLevel: filters.educationLevel,
                location: filters.location,
                rate: filters.rate
            });
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
                        <Grid container spacing={2}>
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