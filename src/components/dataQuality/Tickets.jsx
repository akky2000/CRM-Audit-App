import React, { useState } from "react";
import BarChart from "../utils/BarChart";
import RequestModal from "../utils/RequestModal";
import { findRiskImage, getBorderColor } from "../../utils";
import { Tooltip } from "../utils/Tooltip";

const Ticket = ({
  token,
  score_data,
  graphData,
  isGeneratingGraph,
  hubId,
  page,
}) => {
  const { missing_data, junk_data, total_tickets } = score_data;
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] = useState("without_name");
  const [secondRowSelectedItem, setSecondRowSelectedItem] = useState("without_priority");
  const [firstDatapoint, setFirstDatapoint] = useState("subject");
  const [secondDataPoint, setSecondDataPoint] = useState("hs_ticket_priority");
  const [lastDataPoint, setLastDataPoint] = useState("no_activity_in_last_180_days");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestModalData, setRequestModalData] = useState({
    selectedItems: [],
    actionType: "",
  });

  const [ticketActiveListSelections, setTicketActiveListSelections] = useState({
    group1: {
      tickets_without_name: false,
      tickets_without_owner: false,
      tickets_without_num_associated_company: false,
    },
    group2: {
      tickets_without_priority: false,
      tickets_without_description: false,
      tickets_without_pipeline_name: false,
      tickets_without_status: false,
    },
    group3: {
      tickets_without_name_and_owner: false,
    },
    group4: {
      tickets_with_no_activity_in_last_180_days: false,
      tickets_without_name_and_owner: false,
    },
  });

  const handleTicketCheckboxChange = (group, key, checked) => {
    setTicketActiveListSelections((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: checked,
      },
    }));
  };

  const handleCreateActiveList = (group) => {
    const selectedKeys = Object.entries(ticketActiveListSelections[group])
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (!selectedKeys.length) {
      alert("Please select at least one property.");
      return;
    }

    setRequestModalData({ selectedItems: selectedKeys, actionType: "create" });
    setIsRequestModalOpen(true);
  };

  const handleDeleteActiveList = (group) => {
    const selectedKeys = Object.entries(ticketActiveListSelections[group])
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (!selectedKeys.length) {
      alert("Please select at least one property.");
      return;
    }

    setRequestModalData({ selectedItems: selectedKeys, actionType: "delete" });
    setIsRequestModalOpen(true);
  };

  const handleApiCall = async (item) => {
    const payload = {
      objectname: "tickets",
      propertynames: [item],
      hubId: hubId,
    };

    const url =
      requestModalData.actionType === "create"
        ? "https://hsaudit.boundaryhq.com/createlist"
        : "https://hsaudit.boundaryhq.com/deleterecords";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          state: token,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (requestModalData.actionType === "create") {
        if (response?.ok && data[item]?.success) {
          return {
            success: true,
            message: data[item].message || "List created successfully",
          };
        } else {
          return {
            success: false,
            message: data[item]?.error?.message || "Something went wrong",
          };
        }
      } else {
        if (response?.ok && data.success) {
          return {
            success: true,
            message: data.message || "Items Deleted successfully",
          };
        } else {
          return {
            success: false,
            message: data.error?.message || "Something went wrong",
          };
        }
      }
    } catch (error) {
      return {
        success: false,
        message: "Network error. Please try again later.",
      };
    }
  };

  const handleFirstDataPointChange = (dataPoint) => {
    setFirstDatapoint(dataPoint);
  };

  const handleSecondDataPointChange = (dataPoint) => {
    setSecondDataPoint(dataPoint);
  };

  const toggleSection = (section) => {
    if (section === "missingData") setIsMissingDataExpanded(!isMissingDataExpanded);
    if (section === "deletingData") setIsDeletingDataExpanded(!isDeletingDataExpanded);
  };

  if (!score_data) {
    return <div className="p-4">No data available for Tickets.</div>;
  }

  return (
    <div className="text-gray-700 rounded-lg border-gray-300">
      {/* Missing Data Section */}
      <section className="bg-white rounded-md mb-6">
        <div className="flex justify-between items-center px-6 py-4">
          <h3 className="text-xl font-bold">Missing Data - Tickets</h3>
          <p
            onClick={() => toggleSection("missingData")}
            className="cursor-pointer"
          >
            {isMissingDataExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                className="size-5"
                style={{ height: "15px" }}
              >
                <path
                  fillRule="evenodd"
                  d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                className="size-5"
                style={{ height: "15px" }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </p>
        </div>
        {isMissingDataExpanded && (
          <div className="space-y-12 p-4">
            {/* Fix This First */}
            <div>
              <h4 className="text-xl text-start font-semibold text-gray-900 mb-4 md:ml-2">
                Fix this first - fast!
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-4">
                {[
                  {
                    key: "without_name",
                    label: "Tickets without Name",
                    dataPoint: "subject",
                    inference: "These tickets do not have a subject or title, which is typically used to identify the issue being reported."
                  },
                  {
                    key: "without_owner",
                    label: "Tickets without Owner",
                    dataPoint: "hubspot_owner_id",
                    inference: "These tickets do not have an assigned owner, meaning no specific user is responsible for handling them."
                  },
                  {
                    key: "without_associated_contacts_email_phone",
                    label: "Tickets without Associated Contact",
                    dataPoint: "tickets_associated_contacts",
                    inference: "These tickets are not linked to any contact, this also contains those contains which neither have name nor email."
                  },
                  {
                    key: "without_num_associated_company",
                    label: "Tickets without Associated Company",
                    dataPoint: "hs_num_associated_companies",
                    inference: "These tickets are not linked to any company, meaning they do not have an associated business entity recorded."
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className={`relative p-4 border rounded-lg shadow cursor-pointer transition-transform duration-300 ${
                      firstRowSelectedItem === item.key
                        ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                        : "bg-white"
                    } ${getBorderColor(missing_data[item.key]?.risk)}`}
                    onClick={() => {
                      setfirstRowSelectedItem(item.key);
                      handleFirstDataPointChange(item.dataPoint);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-gray-600 pr-6 text-start min-h-12 max-w-60">
                        {item.label}
                      </p>
                      <Tooltip tooltipText={item.inference}>
                        <img
                          className="h-4"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                          alt="Info"
                        />
                      </Tooltip>
                    </div>

                    <div className="flex flex-col items-start gap-2 justify-start mt-2">
                      <p className="text-3xl font-bold text-gray-900">
                        {missing_data[item.key]?.percent}%
                      </p>
                      <p className="text-sm text-gray-500">
                        {missing_data[item.key]?.count.toLocaleString()}{" "}
                        <span className="text-gray-400">
                          / {total_tickets.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <img
                      className="absolute bottom-4 right-4 h-4"
                      src={findRiskImage(missing_data[item.key]?.risk)}
                      alt={missing_data[item.key]?.risk}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <BarChart
                  dataPoint={firstDatapoint}
                  graphData={graphData}
                  missingData={missing_data}
                  inferenceKey={firstRowSelectedItem}
                />
              </div>
            </div>

            {/* Must Fix */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4 text-start md:ml-2">
                Must Fix
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-4">
                {[
                  {
                    key: "without_priority",
                    label: "Tickets without Priority",
                    dataPoint: "hs_ticket_priority",
                    inference: "These tickets do not have a priority level assigned, which is used to indicate their level of urgency."
                  },
                  {
                    key: "without_description",
                    label: "Tickets without Description",
                    dataPoint: "content",
                    inference: "These tickets do not contain a description, which is typically used to provide details about the issue or request."
                  },
                  {
                    key: "without_pipeline_name",
                    label: "Tickets without Pipeline Name",
                    dataPoint: "hs_pipeline",
                    inference: "These tickets are not assigned to a specific pipeline, which is used to track the stage or progress of a ticket."
                  },
                  {
                    key: "without_status",
                    label: "Tickets without Status",
                    dataPoint: "hs_pipeline_stage",
                    inference: "These tickets do not have a status assigned, which is typically used to indicate whether they are open, in progress, or resolved."
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className={`relative p-4 border rounded-lg shadow cursor-pointer transition-transform duration-300 ${
                      secondRowSelectedItem === item.key
                        ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                        : "bg-white"
                    } ${getBorderColor(missing_data[item.key]?.risk)}`}
                    onClick={() => {
                      setSecondRowSelectedItem(item.key);
                      handleSecondDataPointChange(item.dataPoint);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-gray-600 pr-6 text-start min-h-12 max-w-48">
                        {item.label}
                      </p>
                      <Tooltip tooltipText={item.inference}>
                        <img
                          className="h-4"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                          alt="Info"
                        />
                      </Tooltip>
                    </div>

                    <div className="flex flex-col items-start gap-2 justify-start mt-2">
                      <p className="text-3xl font-bold text-gray-900">
                        {missing_data[item.key]?.percent}%
                      </p>
                      <p className="text-sm text-gray-500">
                        {missing_data[item.key]?.count.toLocaleString()}{" "}
                        <span className="text-gray-400">
                          / {total_tickets.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <img
                      className="absolute bottom-4 right-4 h-4"
                      src={findRiskImage(missing_data[item.key]?.risk)}
                      alt={missing_data[item.key]?.risk}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <BarChart
                  dataPoint={secondDataPoint}
                  graphData={graphData}
                  missingData={missing_data}
                  inferenceKey={secondRowSelectedItem}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Consider Deleting Section */}
      <section className="bg-white rounded-md shadow mb-6">
        <div className="flex justify-between items-center px-6 py-4">
          <h3 className="text-xl font-bold">Consider Deleting</h3>
          <p
            onClick={() => toggleSection("deletingData")}
            className="cursor-pointer"
          >
            {isDeletingDataExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                className="size-5"
                style={{ height: "15px" }}
              >
                <path
                  fillRule="evenodd"
                  d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                className="size-5"
                style={{ height: "15px" }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </p>
        </div>
        {isDeletingDataExpanded && (
          <div className="p-4 space-y-8">
            <div className="grid md:grid-cols-2 gap-4 mx-4">
              {[
                {
                  key: "no_activity_in_last_180_days",
                  label: "Tickets Without Activity in Last 180 Days",
                  dataPoint: "no_activity_in_last_180_days",
                  inference: "These tickets have been inactive for the last 180 days, with no recorded updates, communications, or engagement."
                },
                {
                  key: "without_name_and_owner",
                  label: "Tickets without Name and Owner",
                  dataPoint: "without_name_and_owner",
                  inference: "These tickets are missing both a subject/title and an assigned owner, making them incomplete in terms of identification and responsibility."
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className={`p-4 border rounded-lg shadow cursor-pointer ${getBorderColor(
                    junk_data[item.key]?.risk
                  )} ${
                    lastDataPoint === item.key
                      ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                      : "bg-white"
                  }`}
                  onClick={() => setLastDataPoint(item.key)}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-gray-600 pr-6 text-start">
                      {item.label}
                    </p>
                    <Tooltip tooltipText={item.inference}>
                      <img
                        className="h-4"
                        src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        alt="Info"
                      />
                    </Tooltip>
                  </div>
                  <p className="text-2xl font-bold my-2">
                    {junk_data[item.key]?.count?.toLocaleString()} / {total_tickets?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <BarChart
                dataPoint={lastDataPoint}
                graphData={graphData}
                missingData={junk_data}
                inferenceKey={lastDataPoint}
              />
            </div>
          </div>
        )}
      </section>
      

      {/* Take Bulk Action */}
      <section className={`bg-white rounded-md shadow p-6 ${page === "past" ? "opacity-50" : ""}`}>
        {page === "past" && (
          <div className="text-center text-gray-500 mb-4">
            Can't take action in past report
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Take Bulk Action</h4>
          <button 
            className=""
            onClick={() =>
              document
                .getElementById("overall_audit_section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Move to Top ↑
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Group 1: Fix this first - fast! */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg flex flex-col">
              <h5 className="font-medium">Fix this first - fast!</h5>
              <div className="space-y-3 flex-grow">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ticketActiveListSelections.group1.tickets_without_name}
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        "group1",
                        "tickets_without_name",
                        e.target.checked
                      )
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Tickets without Name</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ticketActiveListSelections.group1.tickets_without_owner}
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        "group1",
                        "tickets_without_owner",
                        e.target.checked
                      )
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Tickets without Owner</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ticketActiveListSelections.group1.tickets_without_num_associated_company}
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        "group1",
                        "tickets_without_num_associated_company",
                        e.target.checked
                      )
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Tickets without Associated Company</span>
                </label>
              </div>
              <button
                onClick={() => handleCreateActiveList("group1")}
                disabled={isGeneratingGraph}
                className={`w-full mt-auto py-2 px-4 rounded-md ${
                  isGeneratingGraph
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-black-600 hover:bg-black-600 text-white"
                }`}
              >
                Create Active List
              </button>
            </div>

            {/* Group 2: Must Fix */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg flex flex-col">
              <h5 className="font-medium">Must Fix</h5>
              <div className="space-y-3 flex-grow">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ticketActiveListSelections.group2.tickets_without_priority}
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        "group2",
                        "tickets_without_priority",
                        e.target.checked
                      )
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Tickets without Priority</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ticketActiveListSelections.group2.tickets_without_description}
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        "group2",
                        "tickets_without_description",
                        e.target.checked
                      )
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Tickets without Description</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ticketActiveListSelections.group2.tickets_without_pipeline_name}
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        "group2",
                        "tickets_without_pipeline_name",
                        e.target.checked
                      )
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Tickets without Pipeline Name</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ticketActiveListSelections.group2.tickets_without_status}
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        "group2",
                        "tickets_without_status",
                        e.target.checked
                      )
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Tickets without Status</span>
                </label>
              </div>
              <button
                onClick={() => handleCreateActiveList("group2")}
                disabled={isGeneratingGraph}
                className={`w-full mt-auto py-2 px-4 rounded-md ${
                  isGeneratingGraph
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-black-600 hover:bg-black-600 text-white"
                }`}
              >
                Create Active List
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg flex flex-col">
              <h5 className="font-medium">Consider Deleting</h5>
              <div className="space-y-3 flex-grow">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ticketActiveListSelections.group3.tickets_without_name_and_owner}
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        "group3",
                        "tickets_without_name_and_owner",
                        e.target.checked
                      )
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Tickets without Name and Owner</span>
                </label>
              </div>
              <button
                onClick={() => handleCreateActiveList("group3")}
                disabled={isGeneratingGraph}
                className={`w-full mt-auto py-2 px-4 rounded-md ${
                  isGeneratingGraph
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-black-600 hover:bg-black-600 text-white"
                }`}
              >
                Create Active List
              </button>
            </div>

           
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg flex flex-col">
              <h5 className="font-medium">Delete Junk</h5>
              <div className="space-y-3 flex-grow">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ticketActiveListSelections.group4.tickets_with_no_activity_in_last_180_days}
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        "group4",
                        "tickets_with_no_activity_in_last_180_days",
                        e.target.checked
                      )
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Tickets without activity in last 180 days</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ticketActiveListSelections.group4.tickets_without_name_and_owner}
                    onChange={(e) =>
                      handleTicketCheckboxChange(
                        "group4",
                        "tickets_without_name_and_owner",
                        e.target.checked
                      )
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Tickets without Name and Owner</span>
                </label>
              </div>
              <button
                onClick={() => handleDeleteActiveList("group4")}
                disabled={isGeneratingGraph}
                className={`w-full mt-auto py-2 px-4 rounded-md ${
                  isGeneratingGraph
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-black-600 hover:bg-black-600 text-white"
                }`}
              >
                Delete Junk
              </button>
            </div>
          </div>
        </div>
      </section>

      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        selectedItems={requestModalData.selectedItems}
        actionType={requestModalData.actionType}
        handleApiCall={handleApiCall}
      />
    </div>
  );
};

export default Ticket;