import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import PackageComparisonChart from '../Charts/PackageComparisonChart';

function CollegeData() {
const { id } = useParams();
const [collegeData, setCollegeData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const navigate  = useNavigate();
async function FetchCollegeData() {
try {
setLoading(true);
const response = await axios.get(
`https://hirelens-9o7y.onrender.com/collegedetail/fetchcollege/${id}`,
{ withCredentials: true }
);
setCollegeData(response.data.Record);
} catch (err) {
setError("Failed to fetch college details. Please try again later.");
alert("Please Login or Register");
navigate("/login");
} finally {
setLoading(false);
}
}

useEffect(() => {
FetchCollegeData();
}, [id]);

if (loading) return <div className="text-center mt-5 fs-3 text-primary">🚀 Discovering College Facts...</div>;
if (error) return <div className="alert alert-danger m-5">{error}</div>;
if (!collegeData) return <div className="alert alert-warning m-5">No data found.</div>;

return (
<div className="container-fluid bg-light min-vh-100 p-4">
{/* 1. Hero Header Section */}
<div className="card shadow-sm border-0 rounded-4 mb-4" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)'}}>
<div className="card-body p-5">
<span className="badge bg-primary-subtle text-primary rounded-pill mb-3">Official Partner</span>
<h1 className="display-5 fw-bold text-dark mb-2">{collegeData.name}</h1>
<div className="d-flex align-items-center text-muted fs-5">
<span className="me-3">📍 {collegeData.city}, {collegeData.state}</span>
<span className="me-3">|</span>
<span>🏢 Private University</span>
</div>
</div>
</div>

<div className="row g-4">

<div className="col-lg-4">
<div className="card shadow-sm border-0 rounded-4 mb-4">
<div className="card-body p-4">
<h5 className="card-title text-dark mb-3 fw-bold">About Institution</h5>
<p className="card-text text-secondary lh-lg">
{collegeData.description || "This institution is known for its diverse academic programs and campus life. Our data focus remains on its placement transparency and industry relations."}
</p>
<div className="d-flex flex-wrap gap-2 mt-3">
<span className="badge bg-light text-primary border">#NAAC_A+</span>
<span className="badge bg-light text-primary border">#PlacementTransparency</span>
</div>
</div>
</div>

<div className="card shadow-sm border-0 rounded-4">
<div className="card-body p-4">
<h5 className="card-title text-dark mb-3 fw-bold">Quick Insights</h5>
<ul className="list-group list-group-flush text-secondary">
<li className="list-group-item ps-0">✅ Verified Placement Reports</li>
<li className="list-group-item ps-0">⚠️ Package Discrepancy Alert active</li>
<li className="list-group-item ps-0">📊 200+ Student Reviews analyzed</li>
</ul>
</div>
</div>
</div>

{/* Right Side: Charts */}
<div className="col-lg-8">
<div className="card shadow-sm border-0 rounded-4 h-100">
<div className="card-body p-4">
<div className="d-flex justify-content-between align-items-center mb-4 border-start border-primary border-4 ps-3">
<div>
<h4 className="fw-bold text-dark">Placement Reality Check</h4>
<p className="text-muted mb-0">Comparison of promised vs actual compensation packages.</p>
</div>
</div>
{/* Aapka Chart Component */}
<div className='mt-2'>
<PackageComparisonChart collegeId={collegeData._id} />
</div>
</div>
</div>
</div>

</div>
</div>
);
}

export default CollegeData;