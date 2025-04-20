import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewListings({ onClose }) {
    const [listings, setListings] = useState([]);
    const [sortedListings, setSortedListings] = useState([]);
    const [showDateInput, setShowDateInput] = useState(false);
    const [dateFilter, setDateFilter] = useState('');
    const [showStudents, setShowStudents] = useState(false);
    const [showSponsors, setShowSponsors] = useState(false);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/research/all');
                setListings(response.data);
                setSortedListings(response.data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };
        fetchListings();
    }, []);

    const handleDateSort = () => {
        setShowDateInput(!showDateInput);
        if (!showDateInput) {
            setShowStudents(false);
            setShowSponsors(false);
        }
    };

    const handleDateFilter = (date) => {
        let filtered = listings;
        if (date) {
            filtered = filtered.filter(listing => listing.start_date === date);
        }
        if (showStudents) {
            filtered = filtered.filter(listing => listing.needs_students);
        }
        if (showSponsors) {
            filtered = filtered.filter(listing => listing.needs_sponsors);
        }
        setSortedListings(filtered);
    };

    const handleStudentsSort = () => {
        setShowStudents(!showStudents);
        let filtered = listings;
        
        if (!showStudents) {
            filtered = filtered.filter(listing => listing.needs_students);
        }
        if (showSponsors) {
            filtered = filtered.filter(listing => listing.needs_sponsors);
        }
        if (dateFilter) {
            filtered = filtered.filter(listing => listing.start_date === dateFilter);
        }
        setSortedListings(filtered);
    };

    const handleSponsorsSort = () => {
        setShowSponsors(!showSponsors);
        let filtered = listings;
        
        if (!showSponsors) {
            filtered = filtered.filter(listing => listing.needs_sponsors);
        }
        if (showStudents) {
            filtered = filtered.filter(listing => listing.needs_students);
        }
        if (dateFilter) {
            filtered = filtered.filter(listing => listing.start_date === dateFilter);
        }
        setSortedListings(filtered);
    };

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            width: '80%',
            maxHeight: '80vh',
            overflowY: 'auto'
        }}>
            <h2>Research Listings</h2>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '20px' }}>
                    <input 
                        type="checkbox" 
                        onChange={handleDateSort}
                        checked={showDateInput}
                    /> Sort by Date
                </label>
                <label style={{ marginRight: '20px' }}>
                    <input 
                        type="checkbox" 
                        onChange={handleStudentsSort}
                        checked={showStudents}
                    /> Show Needs Students
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        onChange={handleSponsorsSort}
                        checked={showSponsors}
                    /> Show Needs Sponsors
                </label>
                {showDateInput && (
                    <input 
                        type="date" 
                        onChange={(e) => handleDateFilter(e.target.value)}
                        value={dateFilter}
                        style={{ marginLeft: '10px' }}
                    />
                )}
            </div>
            
            {sortedListings.length === 0 ? (
                <p>No listings found</p>
            ) : (
                sortedListings.map((listing) => (
                    <div key={listing.listing_id} style={{
                        border: '1px solid #ddd',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '4px'
                    }}>
                        <h3>{listing.project_name}</h3>
                        <p>Description: {listing.description}</p>
                        <p>Start Date: {listing.start_date}</p>
                        <p>Needs Students: {listing.needs_students ? 'Yes' : 'No'}</p>
                        <p>Needs Sponsors: {listing.needs_sponsors ? 'Yes' : 'No'}</p>
                    </div>
                ))
            )}
            <button onClick={onClose} style={{
                marginTop: '20px',
                padding: '8px 16px',
                backgroundColor: '#ddd',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>Close</button>
        </div>
    );
}

export default ViewListings; 