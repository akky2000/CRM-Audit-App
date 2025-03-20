import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { useUser } from "../context/UserContext";
import { fetchAuditDataByID } from "../api";

const PastReportDetail = () => {
  const { reportID } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, token } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAuditDataByID(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6ImFua2l0QGJvdW5kYXJ5LmFnZW5jeSIsInVzZXJfaWQiOjEsInNlc3Npb25faWQiOjQ2LCJodWJkYl9pZCI6MSwiZ2VuZXJhdGVfcmVwb3J0Ijp0cnVlfQ.1ro1QfaGq2Bs71kP-cf9Km7oDsgZSjpCDBpZi84auEw",
          reportID
        );
        setData(response);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch audit data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto h-screen">
        <Header user={user} />
        <MainContent data={data} />
      </main>
    </div>
  );
};

export default PastReportDetail;
