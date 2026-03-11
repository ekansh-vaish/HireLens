import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Tooltip,
Legend,
Title,
} from "chart.js";
import { useNavigate } from "react-router-dom";


ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Tooltip,
Legend,
Title
);

const PackageComparisonChart = ({ collegeId }) => {
const [insights, setInsights] = useState(null);
const [loading, setLoading] = useState(true);
const navigate  = useNavigate();
useEffect(() => {
const fetchData = async () => {
try {
const res = await axios.get(
`https://hirelens-9o7y.onrender.com/placementrecord/collegeinsights/${collegeId}`,
{
    withCredentials :true
}
);
setInsights(res.data);

} catch (err) {
alert("Authentication Error");
navigate("/collegequery")
} finally {
setLoading(false);
}
};

if (collegeId) fetchData();
}, [collegeId]);

if (loading)
return (
<div className="text-center p-5">
<div className="spinner-border text-primary"></div>
<p className="mt-2">Analyzing College Reality...</p>
</div>
);

if (!insights || !insights.companies)
return <div className="text-center text-danger">No Data Found</div>;

const totalOffers = insights.companies.reduce(
(acc, c) => acc + c.totalOffers,
0
);

const weightedAdvertised = insights.companies.reduce(
(acc, c) => acc + c.avgAdvertisedPackage * c.totalOffers,
0
 );

const weightedActual = insights.companies.reduce(
(acc, c) => acc + c.avgActualPackage * c.totalOffers,
0
);

const avgAdvertised =
totalOffers > 0 ? (weightedAdvertised / totalOffers).toFixed(1) : 0;

const avgActual =
totalOffers > 0 ? (weightedActual / totalOffers).toFixed(1) : 0;

const realityGap =
avgAdvertised > 0
? (((avgAdvertised - avgActual) / avgAdvertised) * 100).toFixed(1)
: 0;

const sectorCounts = { Sales: 0, Tech: 0, Marketing: 0, Others: 0 };

insights.companies.forEach((c) => {

let mapped = false;
c.roles.forEach((role) => {
const r = role.toLowerCase();
if (r.includes("sales") || r.includes("bd") || r.includes("business")) {
sectorCounts.Sales += c.totalOffers;
mapped = true;
} else if (
r.includes("tech") ||
r.includes("eng") ||
r.includes("dev") ||
r.includes("it")
) {
sectorCounts.Tech += c.totalOffers;
mapped = true;
} else if (r.includes("market")) {
sectorCounts.Marketing += c.totalOffers;
mapped = true;
}
});

// 2. If no role matched, check Company Name (for ICICI BANK etc.)
if (!mapped) {
const name = c.companyName.toLowerCase();
if (name.includes("tech") || name.includes("systems")) {
sectorCounts.Tech += c.totalOffers;
} else if (name.includes("bank") || name.includes("sales") || name.includes("finance")) {
sectorCounts.Sales += c.totalOffers;
} else {
sectorCounts.Others += c.totalOffers;
}
}
});

const techPercent =
totalOffers > 0
? ((sectorCounts.Tech / totalOffers) * 100).toFixed(1)
: 0;

const barData = {
labels: insights.companies.map((c) => c.companyName),
datasets: [
{
label: "Advertised (LPA)",
data: insights.companies.map((c) => c.avgAdvertisedPackage),
backgroundColor: "rgba(99,102,241,0.7)", // Indigo
},
{
label: "Actual (LPA)",
data: insights.companies.map((c) => c.avgActualPackage),
backgroundColor: "rgba(239,68,68,0.7)", // Red
},
],
};

const doughnutData = {
labels: Object.keys(sectorCounts),
datasets: [
{
data: Object.values(sectorCounts),
backgroundColor: [
"#dc2626", // Sales - Dark Red
"#2563eb", // Tech - Blue
"#f59e0b", // Marketing - Yellow
"#6b7280" // Others - Gray
],
hoverOffset: 10
},
],
};

if (!insights || !insights.companies || insights.companies.length === 0) {
return (
<div className="container mt-5 pt-1 gap-1">
<div className="card shadow-sm border-0 rounded-4 p-5 text-center">
<div className="mb-4">
<span style={{ fontSize: "50px" }}>🚫</span>
</div>
<h3 className="fw-bold text-dark">No Placement Data Found</h3>
<p className="text mx-auto" style={{ maxWidth: "400px", color:"red" }}>
Currently, our Transparency Database does not contain verified placement insights for this specific institution. Our platform relies on cross-verified reports from alumni and recruiters to expose the 'Reality Gap' between advertised packages and actual in-hand offers. Since no records have been submitted or verified for this college yet, we cannot generate accurate salary analytics or sector distributions at this time. We maintain a strict verification protocol to ensure that no misleading information is displayed, prioritizing data integrity over incomplete statistics.
</p>
<div className="mt-3">
<button className="btn btn-primary rounded-pill px-4" onClick={() => window.location.reload()}>
Try Refreshing
</button>
</div>
</div>
</div>
);
}
return (
<div className="container-fluid" style={{ background: "#f1f5f9" }}>
<h2 className="text-center fw-bold mb-4 mt-5">
📊 Placement Intelligence Dashboard
</h2>

{/* KPI CARDS */}
<div className="row g-3 mb-4">
{[
{ title: "Total Offers", value: totalOffers, color: "text-dark" },
{ title: "Avg Advertised", value: `${avgAdvertised} LPA`, color: "text-indigo" },
{ title: "Avg Actual", value: `${avgActual} LPA`, color: "text-danger" },
{ title: "Reality Gap", value: `${realityGap}%`, color: "text-danger" },
{ title: "Tech Roles", value: `${techPercent}%`, color: "text-primary" },
].map((item, i) => (
<div className="col-md-6 col-lg" key={i}>
<div className="card shadow-sm rounded-4 border-0 h-100">
<div className="card-body text-center">
<small className="text-muted fw-bold text-uppercase" style={{fontSize: '0.7rem'}}>{item.title}</small>
<h4 className={`fw-bold mt-2 ${item.color || 'text-dark'}`}>{item.value}</h4>
</div>
</div>
</div>
))}
</div>

{/* CHARTS */}
<div className="row g-4">
<div className="col-lg-8">
<div className="card shadow-sm rounded-4 border-0">
<div className="card-body">
<h5 className="fw-bold mb-3">Salary Gap Analysis: Promised vs Actual</h5>
<Bar data={barData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
</div>
</div>
</div>

<div className="col-lg-4">
<div className="card shadow-sm rounded-4 border-0">
<div className="card-body">
<h5 className="fw-bold mb-3">Sector Distribution</h5>
<Doughnut data={doughnutData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
</div>
</div>
</div>
</div>

{/* COMPANY TABLE */}
<div className="card shadow-sm rounded-4 border-0 mt-4">
<div className="card-body">
<h5 className="fw-bold mb-3">Detailed Company Breakdown</h5>
<div className="table-responsive">
<table className="table table-hover align-middle">
<thead className="table-light">
<tr>
<th>Company</th>
<th>Role Type</th>
<th>Advertised</th>
<th>Actual</th>
<th>Offers</th>
</tr>
</thead>
<tbody>
{insights.companies.map((c, i) => (
<tr key={i}>
<td className="fw-semibold">{c.companyName}</td>
<td><span className="badge bg-secondary">{c.roles.join(", ")}</span></td>
<td className="text-indigo fw-bold">{c.avgAdvertisedPackage} LPA</td>
<td className="text-danger fw-bold">{c.avgActualPackage} LPA</td>
<td>{c.totalOffers}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
</div>
);
};

export default PackageComparisonChart;