import React, { useState } from "react";
import BarChart from "../utils/BarChart";
import RequestModal from "../utils/RequestModal";
import { findRiskImage, getBorderColor } from "../../utils";
import { Tooltip } from "../utils/Tooltip";

const Contact = ({
  token,
  score_data,
  graphData,
  isGeneratingGraph,
  hubId,
  page,
}) => {
  const { missing_data, junk_data, total_contacts } = score_data;

  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] =
    useState("without_first_name");
  const [secondRowSelectedItem, setSecondRowSelectedItem] =
    useState("without_deals");
  const [thirdRowSelectedItem, setThirdRowSelectedItem] =
    useState("without_job_title");
  const [firstDatapoint, setFirstDatapoint] = useState("firstname");
  const [secondDataPoint, setSecondDataPoint] = useState(
    "num_associated_deals"
  );
  const [thirdDataPoint, setThirdDataPoint] = useState("jobtitle");
  const [lastDataPoint, setLastDataPoint] = useState(
    "no_activity_in_last_180_days"
  );

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestModalData, setRequestModalData] = useState({
    selectedItems: [],
    actionType: "",
  });



  const [contactActiveListSelections, setContactActiveListSelections] = useState({
    group1: {
      no_firstname: false,
      no_email: false,
      no_associated_company: false,
      no_owner: false,
    },
    group2: {
      no_associated_deals: false,
      no_lead_source: false,
      no_lifecycle_stage: false,
      no_lead_status: false,
    },
    group3: {
      no_jobtitle: false,
      no_market_status: false,
      no_hubspotscore: false,
      no_phone: false,
    },
    group5: {
      contacts_with_no_activity_in_last_180_days: false,
      internal_team_members: false,
    },
  });
  
  const handleContactCheckboxChange = (group, key, checked) => {
    setContactActiveListSelections(prev => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: checked,
      },
    }));
  };
  

  const toggleSection = (section) => {
    if (section === "missingData")
      setIsMissingDataExpanded(!isMissingDataExpanded);
    if (section === "deletingData")
      setIsDeletingDataExpanded(!isDeletingDataExpanded);
  };

  if (!score_data)
    return <div className="p-4">No data available for Contacts.</div>;

  return (
    <div className="text-gray-700  rounded-lg  border-gray-300">
      {/* Missing Data Section */}
      <section className="bg-white rounded-md mb-6">
        <div className="flex justify-between items-center px-6 py-4">
          <h3 className="text-xl font-bold">Missing Data - Contacts</h3>
          <p
            onClick={() => toggleSection("missingData")}
            className="cursor-pointer"
          >
            {isMissingDataExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                class="size-5"
                style={{ height: "15px" }}
              >
                <path
                  fill-rule="evenodd"
                  d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                class="size-5"
                style={{ height: "15px" }}
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
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
                    key: "without_first_name",
                    label: "Contacts without First Name",
                    dataPoint: "firstname",
                  },
                  {
                    key: "without_email",
                    label: "Contacts without Email ID",
                    dataPoint: "email",
                  },
                  {
                    key: "without_associated_company",
                    label: "Contacts without Associated Company",
                    dataPoint: "associatedcompanyid",
                  },
                  {
                    key: "without_owner",
                    label: "Contacts without Owners",
                    dataPoint: "hubspot_owner_id",
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
                      <Tooltip tooltipText={missing_data[item.key]?.inference}>
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
                          / {total_contacts.toLocaleString()}
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
                    key: "without_deals",
                    label: "Contacts without Deals (Opportunity/Customer)",
                    dataPoint: "num_associated_deals",
                  },
                  {
                    key: "without_lastname",
                    label: "Contacts without Last Name",
                    dataPoint: "lastname",
                  },
                  {
                    key: "without_lifecycle_stage",
                    label: "Contacts without Lifecycle Stage",
                    dataPoint: "lifecyclestage",
                  },
                  {
                    key: "without_lead_status",
                    label: "Contacts without Lead status",
                    dataPoint: "hs_lead_status",
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
                      <Tooltip tooltipText={missing_data[item.key]?.inference}>
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
                          / {total_contacts.toLocaleString()}
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

            {/* Good to Fix */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4 md:ml-2 text-start">
                Good to Fix
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-4">
                {[
                  {
                    key: "without_job_title",
                    label: "Contacts without Job Title",
                    dataPoint: "jobtitle",
                  },
                  {
                    key: "without_marketing_contact_status",
                    label: "Contacts without Marketing Status",
                    dataPoint: "hs_marketable_status",
                  },
                  {
                    key: "without_hubspotscore",
                    label: "Contacts without Lead Score",
                    dataPoint: "hubspotscore",
                  },
                  {
                    key: "without_phone",
                    label: "Contacts without Phone No",
                    dataPoint: "phone",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className={`relative p-4 border rounded-lg shadow cursor-pointer transition-transform duration-300 ${
                      thirdRowSelectedItem === item.key
                        ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                        : "bg-white"
                    } ${getBorderColor(missing_data[item.key]?.risk)}`}
                    onClick={() => {
                      setThirdRowSelectedItem(item.key);
                      handleThirdDataPointChange(item.dataPoint);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-gray-600 pr-6 text-start min-h-12 max-w-48">
                        {item.label}
                      </p>
                      <Tooltip tooltipText={missing_data[item.key]?.inference}>
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
                          / {total_contacts.toLocaleString()}
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
                  dataPoint={thirdDataPoint}
                  graphData={graphData}
                  missingData={missing_data}
                  inferenceKey={thirdRowSelectedItem}
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
                class="size-5"
                style={{ height: "15px" }}
              >
                <path
                  fill-rule="evenodd"
                  d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                class="size-5"
                style={{ height: "15px" }}
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
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
                  label: "Contacts Without Activity in Last 180 Days",
                  dataPoint: "no_activity_in_last_180_days",
                },
                {
                  key: "internal_team_members",
                  label: "Internal Team Members",
                  dataPoint: "internal_team_members",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className={`p-4 border rounded-lg shadow cursor-pointer ${getBorderColor(
                    junk_data[item.key].risk
                  )} ${
                    lastDataPoint === item.key
                      ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                      : "bg-white"
                  } `}
                  onClick={() => setLastDataPoint(item.key)}
                >
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-2xl font-bold my-2">
                    {junk_data[item.key].count} / {total_contacts}
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
      <section className={`bg-white rounded-md shadow p-6 ${page === 'past' ? 'filter blur-sm' : ''}`}>
  {page === 'past' && (
    <div className="text-center text-gray-500 mb-4">Can't take action in past report</div>
  )}

  <div className="flex justify-between items-center mb-4">
    <h4 className="text-lg font-semibold">Take Bulk Action</h4>
    <button 
      className="bg-black text-white px-4 py-2 rounded-md"
      onClick={() => document.getElementById("overall_audit_section").scrollIntoView({ behavior: "smooth" })}
    >
      Move to Top ↑
    </button>
  </div>

  {/* Grid Layout for Proper Alignment */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Left Column */}
    <div className="space-y-6">
      
      {/* Fix this first - fast! */}
      <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[220px]">
        <h5 className="font-medium mb-3 text-center">Fix this first - fast!</h5>
        <div className="space-y-2 mb-3">
          {['Contacts without First Name', 'Contacts without Email', 'Contacts without Owner'].map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <button className="w-full bg-black text-white text-sm rounded py-2">Create Active List</button>
      </div>

      {/* Consider Deleting */}
      <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[220px]">
        <h5 className="font-medium mb-3 text-center">Consider Deleting</h5>
        <div className="space-y-2">
          {['Contacts without Name and Email'].map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <button className="w-full bg-black text-white text-sm rounded py-2">Create Active List</button>
      </div>

    </div>

    {/* Right Column */}
    <div className="space-y-6">
      
      {/* Must Fix */}
      <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[220px]">
        <h5 className="font-medium mb-3 text-center">Must Fix</h5>
        <div className="space-y-2">
          {['Contacts without Phone Number', 'Contacts without Company', 'Contacts without Lifecycle Stage', 'Contacts without Lead Status'].map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <button className="w-full bg-black text-white text-sm rounded py-2">Create Active List</button>
      </div>

      {/* Delete Junk */}
      <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between min-h-[220px]">
        <h5 className="font-medium mb-3 text-center">Delete Junk</h5>
        <div className="space-y-2">
          {['Contacts without activity in last 180 days'].map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <button className="w-full bg-black text-white text-sm rounded py-2">Delete Junk</button>
      </div>

    </div>

  </div>
</section>




      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        selectedItems={requestModalData.selectedItems}
        actionType={requestModalData.actionType}
        handleApiCall={async (item) => {
          const url =
            requestModalData.actionType === "create"
              ? "https://hsaudit.boundaryhq.com/createlist"
              : "https://hsaudit.boundaryhq.com/deleterecords";
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", state: token },
            body: JSON.stringify({
              objectname: "contact",
              propertynames: [item],
              hubId,
            }),
          });
          const data = await response.json();
          return response.ok
            ? { success: true, message: data[item]?.message || data.message }
            : {
                success: false,
                message: data[item]?.error?.message || data.error?.message,
              };
        }}
      />
    </div>
  );
};

export default Contact;
