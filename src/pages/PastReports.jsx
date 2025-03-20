import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { fetchReportList } from "../api";
import { useUser } from "../context/UserContext";

const PastReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  const { token } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchReportList(token);
        setReports(response?.data);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch audit data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                    {report?.hub_domain}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {new Date(report.created_at).toLocaleDateString("en-US")}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {report?.score}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <button
                      onClick={() =>
                        navigate(`/past-reports/${report.report_id}`)
                      }
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
