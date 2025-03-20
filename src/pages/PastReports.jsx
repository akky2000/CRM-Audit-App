import React from "react";
import Sidebar from "../components/SideBar";

const PastReports = () => {
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
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto h-screen">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center">Past Reports</h2>

          <div className="mt-4 text-center flex justify-center items-center gap-4 text-gray-700">
            <p className="underline text-sm hover:cursor-pointer">Previous</p>
            <span>Page 1 of 2</span>
            <p className="underline text-sm hover:cursor-pointer">Next</p>
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
              {reports.map((report, index) => (
                <tr key={report.id} className="bg-gray-100 text-center">
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">
                    {report.domain}
                  </td>
                  <td className="p-2 border border-gray-300">{report.date}</td>
                  <td className="p-2 border border-gray-300">{report.score}</td>
                  <td className="p-2 border border-gray-300">
                    <button>View Report</button>
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
