import React, { useState } from 'react';

function AddResearchForm({ onClose }) {
    const [formData, setFormData] = useState({
        project_name: '',
        description: '',
        start_date: '',
        needs_students: false,
        needs_sponsors: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // We'll implement the submission logic later
        console.log('Form submitted:', formData);
        onClose();
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