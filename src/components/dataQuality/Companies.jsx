import React, { useState } from "react";
import BarChart from "../utils/BarChart";
import RequestModal from "../utils/RequestModal";
import { findRiskImage, getBorderColor } from "../../utils";
import { Tooltip } from "../utils/Tooltip";
const Company = ({
  token,
  score_data,
  graphData,
  isGeneratingGraph,
  hubId,
  page,
}) => {
  const { missing_data, junk_data, total_companies } = score_data;
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] =
    useState("without_name");
  const [secondRowSelectedItem, setSecondRowSelectedItem] = useState(
    "without_associated_deals"
  );
  const [thirdRowSelectedItem, setThirdRowSelectedItem] = useState(
    "without_num_of_employees"
  );
  const [firstDatapoint, setFirstDatapoint] = useState("name");
  const [secondDataPoint, setSecondDataPoint] = useState(
    "num_associated_deals"
  );
  const [thirdDataPoint, setThirdDataPoint] = useState("numberofemployees");
  const [lastDataPoint, setLastDataPoint] = useState(
    "no_activity_in_last_180_days"
  );
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestModalData, setRequestModalData] = useState({
    selectedItems: [],
    actionType: "",
  });

  const [activeListSelections, setActiveListSelections] = useState({
    group1: {
      companies_without_name: false,
      companies_without_domain: false,
      companies_without_num_associated_con: false,
      companies_without_owner: false,
    },
    group2: {
      companies_without_associated_deals: false,
      companies_without_industry: false,
      companies_without_lifecycle_stage: false,
      companies_without_country_region: false,
    },
    group3: {
      companies_without_num_of_employee: false,
      companies_without_revenue: false,
      companies_without_linkedin_url: false,
      companies_without_phone_num: false,
    },
    group4: {
      companies_without_name_and_domain: false,
      companies_without_activity_180_days: false,
    },
    group5: {
      companies_without_name_and_domain: false,
      companies_with_no_activity_in_last_180_days: false,
    },
  });

  const handleFirstDataPointChange = (dataPoint) => {
    setFirstDatapoint(dataPoint);
  };

  const handleSecondDataPointChange = (dataPoint) => {
    setSecondDataPoint(dataPoint);
  };

  const handleThirdDataPointChange = (dataPoint) => {
    setThirdDataPoint(dataPoint);
  };

  const handleCheckboxChange = (group, property, checked) => {
    setActiveListSelections((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [property]: checked,
      },
    }));
  };

  const handleCreateActiveList = (group) => {
    const selectedKeys = Object.entries(activeListSelections[group])
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
    const selectedKeys = Object.entries(activeListSelections[group])
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
      objectname: "companies",
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

  const toggleSection = (section) => {
    switch (section) {
      case "missingData":
        setIsMissingDataExpanded(!isMissingDataExpanded);
        break;
      case "deletingData":
        setIsDeletingDataExpanded(!isDeletingDataExpanded);
        break;
    }
  };

  if (!score_data) {
    return (
      <div className="report-details">
        <p>No data available for Companies.</p>
      </div>
    );
  }

  return (
    <div className="report-details">
      {/* Missing Data Section */}
      <section className="mb-[30px] bg-white rounded-md">
        <div className="flex justify-between items-center mb-2.5">
          <h3 className="text-xl font-bold flex items-center p-[15px] text-black">
            Missing Data - <h4 className="ml-1 text-black">Companies</h4>
          </h3>
          <button
            className="bg-inherit shadow-none text-black border-none rounded px-2.5 py-1 text-base cursor-pointer transition-colors duration-300"
            onClick={() => toggleSection("missingData")}
          >
            {isMissingDataExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                className="h-[15px]"
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
                className="h-[15px]"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {isMissingDataExpanded && (
          <>
            {/* First Block: Fix this first */}
            <div>
              <div className="flex my-4 mx-10 font-semibold text-lg text-black">
                <p>Fix this first - fast!</p>
              </div>

              <div className="mb-4 pb-4 flex justify-evenly flex-wrap">
                {/* Repeatable card items */}
                {[
                  {
                    key: "without_name",
                    label: "Companies without Name",
                    tooltip:
                      "These company records do not have a name, making it difficult to identify them.",
                    field: "name",
                  },
                  {
                    key: "without_domain",
                    label: "Companies without Domain",
                    tooltip:
                      "These companies do not have a domain associated, which limits online identification and outreach.",
                    field: "domain",
                  },
                  {
                    key: "without_associated_contacts",
                    label: "Companies without Associated Contact",
                    tooltip:
                      "These companies do not have any associated contacts, which means no individuals are linked to them.",
                    field: "num_associated_contacts",
                  },
                  {
                    key: "without_owner",
                    label: "Companies without an Owner",
                    tooltip:
                      "These companies do not have an assigned owner, meaning no specific user is responsible for managing them.",
                    field: "hubspot_owner_id",
                  },
                ].map(({ key, label, tooltip, field }) => (
                  <div
                    key={key}
                    className={`bg-white border border-gray-200 rounded-lg h-36 text-left w-[16vw] transition duration-300 ease-in-out shadow cursor-pointer ${
                      firstRowSelectedItem === key
                        ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                        : "bg-white"
                    } ${getBorderColor(missing_data?.[key]?.risk)}`}
                    onClick={() => {
                      setfirstRowSelectedItem(key);
                      handleFirstDataPointChange(field);
                    }}
                  >
                    <div className="flex flex-col items-start p-0 whitespace-nowrap relative">
                      <div className="text-sm m-0 py-2 w-full h-[50px] flex items-center gap-2 px-2">
                        <p className="w-[14vw] mt-[6px]">{label}</p>
                        <Tooltip tooltipText={tooltip}>
                          <img
                            className="h-4"
                            src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                            alt="Info"
                          />
                        </Tooltip>
                        <img
                          className="absolute bottom-4 right-4 h-4"
                          src={findRiskImage(missing_data[key]?.risk)}
                          alt={missing_data[key]?.risk}
                        />
                      </div>
                      <p className="text-black font-bold text-2xl leading-8 mt-3 ml-2">
                        <strong>{missing_data?.[key]?.percent}%</strong>
                      </p>
                      <p className="text-gray-600 text-sm ml-2">
                        {missing_data?.[key]?.count.toLocaleString()}{" "}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <div className="h-[27rem] flex justify-start m-4 mb-[8rem]">
                  <BarChart
                    graphData={graphData}
                    dataPoint={firstDatapoint}
                    missingData={missing_data}
                    inferenceKey={firstRowSelectedItem}
                  />
                </div>
              </div>
            </div>

            {/* 🟡 Repeat for "Must-Have" and "Good-to-Have" the same way */}
            {/* Must-Have Section */}
            <div>
              <div className="flex my-4 mx-10 font-semibold text-lg text-black">
                <p>Must-Have</p>
              </div>

              <div className="mb-4 pb-4 flex justify-evenly flex-wrap">
                {[
                  {
                    key: "without_associated_deals",
                    label: "Companies without Deals (Opportunity/Customer)",
                    tooltip:
                      "These companies are not associated with any deals, indicating no recorded business opportunities linked to them.",
                    field: "num_associated_deals",
                  },
                  {
                    key: "without_industry",
                    label: "Companies without Industry",
                    tooltip:
                      "These companies do not have an industry classification, which is useful for segmentation and targeting.",
                    field: "industry",
                  },
                  {
                    key: "without_lifecycle_stage",
                    label: "Companies without Lifecycle Stage",
                    tooltip:
                      "These companies do not have a lifecycle stage assigned, which is used to track their journey in the business pipeline.",
                    field: "lifecyclestage",
                  },
                  {
                    key: "without_country_region",
                    label: "Companies without Country/Region",
                    tooltip:
                      "These companies do not have a country or region specified, which makes geographic-based analysis and segmentation difficult.",
                    field: "country",
                  },
                ].map(({ key, label, tooltip, field }) => (
                  <div
                    key={key}
                    className={`bg-white border border-gray-200 rounded-lg h-36 text-left w-[16vw] transition duration-300 ease-in-out shadow cursor-pointer ${
                      secondRowSelectedItem === key
                        ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                        : "bg-white"
                    } ${getBorderColor(missing_data?.[key]?.risk)}`}
                    onClick={() => {
                      setSecondRowSelectedItem(key);
                      handleSecondDataPointChange(field);
                    }}
                  >
                    <div className="flex flex-col items-start p-0 whitespace-nowrap relative">
                      <div className="text-sm m-0 py-2 w-full h-[50px] flex items-center gap-2 px-2">
                        <p className="w-[14vw] mt-[6px]">{label}</p>
                        <Tooltip tooltipText={tooltip}>
                          <img
                            className="h-4"
                            src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                          />
                        </Tooltip>
                        <img
                          className="absolute bottom-4 right-4 h-4"
                          src={findRiskImage(missing_data[key]?.risk)}
                          alt={missing_data[key]?.risk}
                        />
                      </div>
                      <p className="text-black font-bold text-2xl leading-8 mt-3 ml-2">
                        <strong>{missing_data?.[key]?.percent}%</strong>
                      </p>
                      <p className="text-gray-600 text-sm ml-2">
                        {missing_data?.[key]?.count.toLocaleString()}{" "}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <div className="h-[27rem] flex justify-start m-4 mb-[8rem]">
                  <BarChart
                    graphData={graphData}
                    dataPoint={secondDataPoint}
                    missingData={missing_data}
                    inferenceKey={secondRowSelectedItem}
                  />
                </div>
              </div>
            </div>
            {/* Good-to-Have Section */}
            <div>
              <div className="flex my-4 mx-10 font-semibold text-lg text-black">
                <p>Good-to-Have</p>
              </div>

              <div className="mb-4 pb-4 flex justify-evenly flex-wrap">
                {[
                  {
                    key: "without_num_of_employees",
                    label: "Companies without Number of Employees",
                    tooltip:
                      "These companies do not have the number of employees recorded, which can be a key indicator of company size.",
                    field: "numberofemployees",
                  },
                  {
                    key: "without_revenue",
                    label: "Companies without Revenue",
                    tooltip:
                      "These companies do not have revenue information recorded, which helps in understanding their financial scale.",
                    field: "annualrevenue",
                  },
                  {
                    key: "without_linkedin_url",
                    label: "Companies without LinkedIn Page URL",
                    tooltip:
                      "These companies do not have a LinkedIn page URL recorded, which can limit research and networking opportunities.",
                    field: "linkedin_company_page",
                  },
                  {
                    key: "without_phone_number",
                    label: "Companies without Phone No",
                    tooltip:
                      "These companies do not have a phone number recorded, which can restrict direct communication.",
                    field: "phone",
                  },
                ].map(({ key, label, tooltip, field }) => (
                  <div
                    key={key}
                    className={`bg-white border border-gray-200 rounded-lg h-36 text-left w-[16vw] transition duration-300 ease-in-out shadow cursor-pointer ${
                      thirdRowSelectedItem === key
                        ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                        : "bg-white"
                    } ${getBorderColor(missing_data?.[key]?.risk)}`}
                    onClick={() => {
                      setThirdRowSelectedItem(key);
                      handleThirdDataPointChange(field);
                    }}
                  >
                    <div className="flex flex-col items-start p-0 whitespace-nowrap relative">
                      <div className="text-sm m-0 py-2 w-full h-[50px] flex items-center gap-2 px-2">
                        <p className="w-[14vw] mt-[6px]">{label}</p>
                        <Tooltip tooltipText={tooltip}>
                          <img
                            className="h-4"
                            src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                          />
                        </Tooltip>
                        <img
                          className="absolute bottom-4 right-4 h-4"
                          src={findRiskImage(missing_data[key]?.risk)}
                          alt={missing_data[key]?.risk}
                        />
                      </div>
                      <p className="text-black font-bold text-2xl leading-8 mt-3 ml-2">
                        <strong>{missing_data?.[key]?.percent}%</strong>
                      </p>
                      <p className="text-gray-600 text-sm ml-2">
                        {missing_data?.[key]?.count.toLocaleString()}{" "}
                        <span>/ {total_companies.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <div className="h-[27rem] flex justify-start m-4 mb-[8rem]">
                  <BarChart
                    graphData={graphData}
                    dataPoint={thirdDataPoint}
                    missingData={missing_data}
                    inferenceKey={thirdRowSelectedItem}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="mb-[30px] bg-white rounded-md my-5">
        <div className="flex justify-between items-center mb-2.5">
          <h3 className="text-sm font-bold flex items-center p-[15px] text-black">
            Consider Deleting
          </h3>
          <button
            className="bg-inherit shadow-none text-black border-none rounded px-2.5 py-1 text-base cursor-pointer transition-colors duration-300"
            onClick={() => toggleSection("deletingData")}
          >
            {isDeletingDataExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#333"
                className="h-[15px]"
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
                className="h-[15px]"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {isDeletingDataExpanded && (
          <>
            <div className="mb-4 pb-4 flex justify-evenly flex-wrap">
              {/* Card: No activity in last 180 days */}
              <div
                className={`bg-white rounded-lg text-center px-4 py-3 w-[34vw] transition duration-300 ease-in-out cursor-pointer ${
                  lastDataPoint === "no_activity_in_last_180_days"
                    ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                    : "bg-white"
                } ${getBorderColor(
                  junk_data?.no_activity_in_last_180_days?.risk
                )}`}
                onClick={() => setLastDataPoint("no_activity_in_last_180_days")}
              >
                <div className="flex flex-col items-start p-0 whitespace-nowrap relative">
                  <div className="text-sm m-0 py-2 w-full h-[50px] flex items-center gap-2 px-2">
                    <p className="w-full mt-[6px]">
                      Companies have no activity in the last 180 days
                    </p>
                    <Tooltip tooltipText="These companies have not had any recorded interactions or updates in the past 180 days.">
                      <img
                        className="h-4"
                        src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                      />
                    </Tooltip>
                    <img
                      className="absolute bottom-4 right-4 h-4"
                      src={findRiskImage(
                        junk_data?.no_activity_in_last_180_days?.risk
                      )}
                      alt={junk_data?.no_activity_in_last_180_days?.risk}
                    />
                  </div>
                  <p className="text-black font-bold text-2xl leading-8 mt-3 ml-2">
                    <strong>
                      {junk_data?.no_activity_in_last_180_days?.count?.toLocaleString()}{" "}
                      /
                    </strong>
                    <span className="text-base font-light text-gray-800">
                      {total_companies?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              {/* Card: Without name and domain */}
              <div
                className={`bg-white rounded-lg text-center px-4 py-3 w-[34vw] transition duration-300 ease-in-out cursor-pointer ${
                  lastDataPoint === "without_name_and_domain"
                    ? "bg-gradient-to-r from-[#e3ffff] to-[#e6e4ef]"
                    : "bg-white"
                } ${getBorderColor(junk_data?.without_name_and_domain?.risk)}`}
                onClick={() => setLastDataPoint("without_name_and_domain")}
              >
                <div className="flex flex-col items-start p-0 whitespace-nowrap relative">
                  <div className="text-sm m-0 py-2 w-full h-[50px] flex items-center gap-2 px-2">
                    <p className="w-full mt-[6px]">
                      Companies without name and domain
                    </p>
                    <Tooltip tooltipText="These companies are missing both a name and a domain, making it nearly impossible to identify them.">
                      <img
                        className="h-4"
                        src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                      />
                    </Tooltip>
                    <img
                      className="absolute bottom-4 right-4 h-4"
                      src={findRiskImage(
                        junk_data?.without_name_and_domain?.risk
                      )}
                      alt={junk_data?.without_name_and_domain?.risk}
                    />
                  </div>
                  <p className="text-black font-bold text-2xl leading-8 mt-3 ml-2">
                    <strong>
                      {junk_data?.without_name_and_domain?.count?.toLocaleString()}{" "}
                      /
                    </strong>
                    <span className="text-base font-light text-gray-800">
                      {total_companies?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-[27rem] flex justify-start m-4 mb-[8rem]">
                <BarChart
                  graphData={graphData}
                  dataPoint={lastDataPoint}
                  missingData={junk_data}
                  inferenceKey={lastDataPoint}
                />
              </div>
            </div>
          </>
        )}
      </section>

      <section
        className={`${
          page === "past" ? "blur-sm pointer-events-none relative" : ""
        }`}
      >
        {page === "past" && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-lg font-semibold text-gray-800 z-10">
            Can't take action in past report
          </div>
        )}

        <div
          className="bg-white rounded-md my-5 px-6 py-5 max-w-full"
          id="take_action"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-black font-semibold text-lg mb-2">
              Take Bulk Action
            </h4>
            <button
              onClick={() =>
                document
                  .getElementById("overall_audit_section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Move to Top ↑
            </button>
          </div>

          {/* Groups 1–3: Fix This, Must Fix, Good to Fix */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[95%] mx-auto">
              {/* Fix This First */}
              <div className="flex flex-col gap-3 shadow p-4 rounded-lg h-[16rem] relative w-full">
                <h5 className="font-bold text-black text-base mb-1">
                  Fix this first - fast!
                </h5>
                <CheckboxGroup
                  groupKey="group1"
                  options={[
                    {
                      label: "Companies without Name",
                      value: "companies_without_name",
                    },
                    {
                      label: "Companies without Domain",
                      value: "companies_without_domain",
                    },
                    {
                      label: "Companies without Associated Contact",
                      value: "companies_without_num_associated_con",
                    },
                    {
                      label: "Companies without an Owner",
                      value: "companies_without_owner",
                    },
                  ]}
                />
                <ActionButton
                  onClick={() => handleCreateActiveList("group1")}
                  disabled={isGeneratingGraph}
                  label="Create Active List"
                />
              </div>

              {/* Must Fix */}
              <div className="flex flex-col gap-3 shadow p-4 rounded-lg h-[16rem] relative w-full">
                <h5 className="font-bold text-black text-base mb-1">
                  Must Fix
                </h5>
                <CheckboxGroup
                  groupKey="group2"
                  options={[
                    {
                      label: "Companies without Deals",
                      value: "companies_without_associated_deals",
                    },
                    {
                      label: "Companies without Industry",
                      value: "companies_without_industry",
                    },
                    {
                      label: "Companies without Lifecycle Stage",
                      value: "companies_without_lifecycle_stage",
                    },
                    {
                      label: "Companies without Country/Region",
                      value: "companies_without_country_region",
                    },
                  ]}
                />
                <ActionButton
                  onClick={() => handleCreateActiveList("group2")}
                  disabled={isGeneratingGraph}
                  label="Create Active List"
                />
              </div>

              {/* Good to Fix */}
              <div className="flex flex-col gap-3 shadow p-4 rounded-lg h-[16rem] relative w-full">
                <h5 className="font-bold text-black text-base mb-1">
                  Good to Fix
                </h5>
                <CheckboxGroup
                  groupKey="group3"
                  options={[
                    {
                      label: "Companies without Number of Employees",
                      value: "companies_without_num_of_employee",
                    },
                    {
                      label: "Companies without Revenue",
                      value: "companies_without_revenue",
                    },
                    {
                      label: "Companies without LinkedIn Page URL",
                      value: "companies_without_linkedin_url",
                    },
                    {
                      label: "Companies without Phone No",
                      value: "companies_without_phone_num",
                    },
                  ]}
                />
                <ActionButton
                  onClick={() => handleCreateActiveList("group3")}
                  disabled={isGeneratingGraph}
                  label="Create Active List"
                />
              </div>
            </div>
          </div>

          {/* Groups 4–5: Consider Deleting & Delete Junk */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[95%] mx-auto">
              {/* Consider Deleting */}
              <div className="flex flex-col gap-3 shadow p-4 rounded-lg h-[16rem] relative w-full">
                <h5 className="font-bold text-black text-base mb-1">
                  Consider Deleting
                </h5>
                <CheckboxGroup
                  groupKey="group4"
                  options={[
                    {
                      label: "Companies without name and domain",
                      value: "companies_without_name_and_domain",
                    },
                  ]}
                />
                <ActionButton
                  onClick={() => handleCreateActiveList("group4")}
                  disabled={isGeneratingGraph}
                  label="Create Active List"
                />
              </div>

              {/* Delete Junk */}
              <div className="flex flex-col gap-3 shadow p-4 rounded-lg h-[16rem] relative w-full">
                <h5 className="font-bold text-black text-base mb-1">
                  Delete Junk
                </h5>
                <CheckboxGroup
                  groupKey="group5"
                  options={[
                    {
                      label: "Company without activity in the last 180 days",
                      value: "companies_with_no_activity_in_last_180_days",
                    },
                    {
                      label: "Companies without name and domain",
                      value: "companies_without_name_and_domain",
                    },
                  ]}
                />
                <ActionButton
                  onClick={() => handleDeleteActiveList("group5")}
                  disabled={isGeneratingGraph}
                  label="Delete Junk"
                />
              </div>
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

const CheckboxGroup = ({ groupKey, options }) => (
  <>
    {options.map(({ label, value }) => (
      <label key={value} className="flex items-center gap-2 text-sm text-black">
        <input
          type="checkbox"
          // checked={activeListSelections[groupKey]?.[value]}
          onChange={(e) =>
            handleCheckboxChange(groupKey, value, e.target.checked)
          }
          className=""
        />
        {label}
      </label>
    ))}
  </>
);

const ActionButton = ({ onClick, disabled, label }) => (
  <div className="absolute bottom-3 left-0 w-full flex justify-center">
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-[90%] px-4 py-2 text-sm font-medium text-white transition-all ${
        disabled ? "bg-gray-300 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  </div>
);

export default Company;
