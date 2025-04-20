import React, { useState } from 'react';
import axios from 'axios';

function AddResearchForm({ onClose, user }) {
    const [formData, setFormData] = useState({
        project_name: '',
        description: '',
        start_date: '',
        needs_students: false,
        needs_sponsors: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('User object:', user);  // Log the entire user object
            const dataToSend = {
                project_name: formData.project_name,
                description: formData.description,
                start_date: formData.start_date,
                needs_students: formData.needs_students,
                needs_sponsors: formData.needs_sponsors,
                email: user.email
            };
            console.log('Data being sent:', JSON.stringify(dataToSend, null, 2));  // Pretty print the data
            
            await axios.post('http://localhost:8080/api/research/add', dataToSend);
            alert('Research listing added successfully!');
            onClose();
        } catch (error) {
            console.error('Full error object:', error);
            console.error('Error response:', error.response?.data);
            alert('Error adding research listing: ' + error.message);
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2>Add Research Listing</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Project Name:</label>
                        <input
                            type="text"
                            value={formData.project_name}
                            onChange={(e) => setFormData({...formData, project_name: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={formData.needs_students}
                                onChange={(e) => setFormData({...formData, needs_students: e.target.checked})}
                            />
                            Needs Students
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={formData.needs_sponsors}
                                onChange={(e) => setFormData({...formData, needs_sponsors: e.target.checked})}
                            />
                            Needs Sponsors
                        </label>
                    </div>
                    <div className="button-group">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddResearchForm; 