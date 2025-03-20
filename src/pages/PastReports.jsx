import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { fetchReportList } from "../api";

const PastReports = () => {
  const navigate = useNavigate();
  const [reportsData, setReports] = useState([]);

  const reports = [
    {
      id: 1,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/8/2025",
      score: 72.5,
    },
    {
      id: 2,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/8/2025",
      score: 58.5,
    },
    {
      id: 3,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/8/2025",
      score: 58.5,
    },
    {
      id: 4,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/7/2025",
      score: 58.5,
    },
    {
      id: 5,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/7/2025",
      score: 70.1,
    },
    {
      id: 6,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/8/2025",
      score: 72.5,
    },
    {
      id: 7,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/8/2025",
      score: 58.5,
    },
    {
      id: 8,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/8/2025",
      score: 58.5,
    },
    {
      id: 9,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/7/2025",
      score: 58.5,
    },
    {
      id: 10,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/7/2025",
      score: 70.1,
    },
    {
      id: 11,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/7/2025",
      score: 58.5,
    },
    {
      id: 12,
      domain: "hubspot-demo-account.contentninja.in",
      date: "3/7/2025",
      score: 70.1,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto h-screen">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center">Past Reports</h2>

          <div className="mt-4 text-center flex justify-center items-center gap-4 text-gray-700">
            <p
              className={`underline text-sm ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:cursor-pointer"
              }`}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </p>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <p
              className={`underline text-sm ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:cursor-pointer"
              }`}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </p>
          </div>

          <table className="w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-2 border border-gray-300">S. No.</th>
                <th className="p-2 border border-gray-300">Hub Domain</th>
                <th className="p-2 border border-gray-300">Create Date</th>
                <th className="p-2 border border-gray-300">Score</th>
                <th className="p-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report, index) => (
                <tr key={report.id} className="bg-gray-100 text-center">
                  <td className="p-2 border border-gray-300">
                    {indexOfFirstReport + index + 1}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {report.domain}
                  </td>
                  <td className="p-2 border border-gray-300">{report.date}</td>
                  <td className="p-2 border border-gray-300">{report.score}</td>
                  <td className="p-2 border border-gray-300">
                    <button
                      onClick={() => navigate(`/past-reports/${report.id}`)}
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PastReports;
