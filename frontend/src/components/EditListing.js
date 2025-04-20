import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditListing({ onClose, userId }) {
    const [userListings, setUserListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [editForm, setEditForm] = useState({
        project_name: '',
        description: '',
        start_date: '',
        needs_students: false,
        needs_sponsors: false
    });

    useEffect(() => {
        // Fetch only the user's listings
        const fetchUserListings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/research/all');
                const filteredListings = response.data.filter(listing => listing.user_id === userId);
                setUserListings(filteredListings);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };
        fetchUserListings();
    }, [userId]);

    const handleListingSelect = (listing) => {
        setSelectedListing(listing);
        setEditForm({
            project_name: listing.project_name,
            description: listing.description,
            start_date: listing.start_date,
            needs_students: listing.needs_students,
            needs_sponsors: listing.needs_sponsors
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/research/update/${selectedListing.listing_id}`, editForm);
            onClose();
        } catch (error) {
            console.error('Error updating listing:', error);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffebee',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            width: '80%',
            maxHeight: '80vh',
            overflowY: 'auto'
        }}>
            <h2>Edit Research Listing</h2>
            
            <select 
                onChange={(e) => handleListingSelect(userListings[e.target.value])}
                style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
            >
                <option value="">Select a listing to edit</option>
                {userListings.map((listing, index) => (
                    <option key={listing.listing_id} value={index}>
                        {listing.project_name} (ID: {listing.listing_id})
                    </option>
                ))}
            </select>

            {selectedListing && (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Project Name:</label>
                        <input
                            type="text"
                            value={editForm.project_name}
                            onChange={(e) => setEditForm({...editForm, project_name: e.target.value})}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Description:</label>
                        <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={editForm.start_date}
                            onChange={(e) => setEditForm({...editForm, start_date: e.target.value})}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={editForm.needs_students}
                                onChange={(e) => setEditForm({...editForm, needs_students: e.target.checked})}
                            /> Needs Students
                        </label>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={editForm.needs_sponsors}
                                onChange={(e) => setEditForm({...editForm, needs_sponsors: e.target.checked})}
                            /> Needs Sponsors
                        </label>
                    </div>
                    <button type="submit" style={{
                        padding: '8px 16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        marginRight: '10px',
                        cursor: 'pointer'
                    }}>Update</button>
                    <button type="button" onClick={onClose} style={{
                        padding: '8px 16px',
                        backgroundColor: '#ddd',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>Cancel</button>
                </form>
            )}
        </div>
    );
}

export default EditListing; 