import { useState } from 'react';

export default function CompanyProfile({ data, onChange }) {
  const handleChange = (e) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="page-title">Company profile</h2>
      <p className="page-subtitle">Tell us about your company so we can recommend relevant compliance frameworks.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '2rem', maxWidth: '700px' }}>
        <div>
          <label>Company Name *</label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Acme Corp"
            required
          />
        </div>
        <div>
          <label>Industry</label>
          <input
            name="industry"
            value={data.industry}
            onChange={handleChange}
            placeholder="Technology"
          />
        </div>
        <div>
          <label>Company Size</label>
          <select name="size" value={data.size} onChange={handleChange}>
            <option value="">Select size...</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>
        <div>
          <label>Country</label>
          <select name="country" value={data.country} onChange={handleChange}>
            <option value="">Select country...</option>
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="SG">Singapore</option>
            <option value="AE">UAE</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
