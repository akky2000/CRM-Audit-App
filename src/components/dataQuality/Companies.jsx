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
      <section className="report-details__subSection">
        <div className="report-details__section-header">
          <h3 className="report-details__subtitle">
            Missing Data - <h4 style={{ marginLeft: "4px" }}>Companies</h4>
          </h3>
          <button
            className="report-details__toggle-button"
            onClick={() => toggleSection("missingData")}
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
          </button>
        </div>
        {isMissingDataExpanded && (
          <>
            <div>
              <div className="report-details__missing_title">
                <p>Fix this first - fast!</p>
              </div>
              <div className="report-details__card">
                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === "without_name"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(missing_data?.without_name?.risk)}`}
                  onClick={() => {
                    setfirstRowSelectedItem("without_name");
                    handleFirstDataPointChange("name");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Name</p>
                      <Tooltip tooltipText="These company records do not have a name, making it difficult to identify them.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(missing_data?.without_name?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_name?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_name?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === "without_domain"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(missing_data?.without_domain?.risk)}`}
                  onClick={() => {
                    setfirstRowSelectedItem("without_domain");
                    handleFirstDataPointChange("domain");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Companies without Domain</p>
                      <Tooltip tooltipText="These companies do not have a domain associated, which limits online identification and outreach.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(missing_data?.without_domain?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_domain?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_domain?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === "without_associated_contacts"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(
                    missing_data?.without_associated_contacts?.risk
                  )}`}
                  onClick={() => {
                    setfirstRowSelectedItem("without_associated_contacts");
                    handleFirstDataPointChange("num_associated_contacts");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Associated Contact</p>
                      <Tooltip tooltipText="These companies do not have any associated contacts, which means no individuals are linked to them.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_associated_contacts?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_contacts?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_associated_contacts?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === "without_owner"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(missing_data?.without_owner?.risk)}`}
                  onClick={() => {
                    setfirstRowSelectedItem("without_owner");
                    handleFirstDataPointChange("hubspot_owner_id");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without an Owner</p>
                      <Tooltip tooltipText="These companies do not have an assigned owner, meaning no specific user is responsible for managing them.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(missing_data?.without_owner?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_owner?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_owner?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      graphData={graphData}
                      dataPoint={firstDatapoint}
                      missingData={missing_data}
                      inferenceKey={firstRowSelectedItem}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="report-details__missing_title">
                <p>Must-Have</p>
              </div>
              <div className="report-details__card">
                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === "without_associated_deals"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(
                    missing_data?.without_associated_deals?.risk
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem("without_associated_deals");
                    handleSecondDataPointChange("num_associated_deals");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Deals (Opportunity/Customer)</p>
                      <Tooltip tooltipText="These companies are not associated with any deals, indicating no recorded business opportunities linked to them.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_associated_deals?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_deals?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_associated_deals?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === "without_industry"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(missing_data?.without_industry?.risk)}`}
                  onClick={() => {
                    setSecondRowSelectedItem("without_industry");
                    handleSecondDataPointChange("industry");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Companies without Industry</p>
                      <Tooltip tooltipText="These companies do not have an industry classification, which is useful for segmentation and targeting.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_industry?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_industry?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_industry?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === "without_lifecycle_stage"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(
                    missing_data?.without_lifecycle_stage?.risk
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem("without_lifecycle_stage");
                    handleSecondDataPointChange("lifecyclestage");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Lifecycle Stage</p>
                      <Tooltip tooltipText="These companies do not have a lifecycle stage assigned, which is used to track their journey in the business pipeline.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_lifecycle_stage?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_lifecycle_stage?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_lifecycle_stage?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === "without_country_region"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(
                    missing_data?.without_country_region?.risk
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem("without_country_region");
                    handleSecondDataPointChange("country");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Country/Region</p>
                      <Tooltip tooltipText="These companies do not have a country or region specified, which makes geographic-based analysis and segmentation difficult.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_country_region?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_country_region?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_country_region?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      graphData={graphData}
                      dataPoint={secondDataPoint}
                      missingData={missing_data}
                      inferenceKey={secondRowSelectedItem}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="report-details__missing_title">
                <p>Good-to-Have</p>
              </div>
              <div className="report-details__card">
                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === "without_num_of_employees"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(
                    missing_data?.without_num_of_employees?.risk
                  )}`}
                  onClick={() => {
                    setThirdRowSelectedItem("without_num_of_employees");
                    handleThirdDataPointChange("numberofemployees");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Number of Employees</p>
                      <Tooltip tooltipText="These companies do not have the number of employees recorded, which can be a key indicator of company size.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_num_of_employees?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_num_of_employees?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_num_of_employees?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === "without_revenue"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(missing_data?.without_revenue?.risk)}`}
                  onClick={() => {
                    setThirdRowSelectedItem("without_revenue");
                    handleThirdDataPointChange("annualrevenue");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Companies without Revenue</p>
                      <Tooltip tooltipText="These companies do not have revenue information recorded, which helps in understanding their financial scale.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(missing_data?.without_revenue?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_revenue?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_revenue?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === "without_linkedin_url"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(
                    missing_data?.without_linkedin_url?.risk
                  )}`}
                  onClick={() => {
                    setThirdRowSelectedItem("without_linkedin_url");
                    handleThirdDataPointChange("linkedin_company_page");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without LinkedIn Page URL</p>
                      <Tooltip tooltipText="These companies do not have a LinkedIn page URL recorded, which can limit research and networking opportunities.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_linkedin_url?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_linkedin_url?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_linkedin_url?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    thirdRowSelectedItem === "without_phone_number"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(
                    missing_data?.without_phone_number?.risk
                  )}`}
                  onClick={() => {
                    setThirdRowSelectedItem("without_phone_number");
                    handleThirdDataPointChange("phone");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Companies without Phone No</p>
                      <Tooltip tooltipText="These companies do not have a phone number recorded, which can restrict direct communication.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_phone_number?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_phone_number?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_phone_number?.count.toLocaleString()}{" "}
                      <span>/ {total_companies.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="audit-report__chart-container">
                  <div className="audit-report__chart">
                    <BarChart
                      graphData={graphData}
                      dataPoint={thirdDataPoint}
                      missingData={missing_data}
                      inferenceKey={thirdRowSelectedItem}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="report-details__subSection">
        <div className="report-details__section-header">
          <h3 className="report-details__subtitle">Consider Deleting</h3>
          <button
            className="report-details__toggle-button"
            onClick={() => toggleSection("deletingData")}
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
          </button>
        </div>
        {isDeletingDataExpanded && (
          <>
            <div className="report-details__card">
              <div
                className={`report-details__duplicate-data-div  ${getBorderColor(
                  junk_data?.no_activity_in_last_180_days?.risk
                )} ${
                  lastDataPoint === "no_activity_in_last_180_days"
                    ? "selected-item"
                    : ""
                }  `}
                onClick={() => {
                  setLastDataPoint("no_activity_in_last_180_days");
                }}
              >
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p style={{ width: "inherit" }}>
                      Companies have no activity in the last 180 days
                    </p>
                    <Tooltip tooltipText="These companies have not had any recorded interactions or updates in the past 180 days.">
                      <img
                        className="info-image"
                        src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                      />
                    </Tooltip>
                    <img
                      src={findRiskImage(
                        junk_data?.no_activity_in_last_180_days?.risk
                      )}
                    ></img>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>
                      {junk_data?.no_activity_in_last_180_days?.count?.toLocaleString()}{" "}
                      /
                    </strong>
                    <span
                      style={{
                        fontSize: "large",
                        fontWeight: "100",
                        color: "#333",
                      }}
                    >
                      {total_companies?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              <div
                className={`report-details__duplicate-data-div  ${getBorderColor(
                  junk_data?.without_name_and_domain?.risk
                )}  ${
                  lastDataPoint === "without_name_and_domain"
                    ? "selected-item"
                    : ""
                }  `}
                onClick={() => {
                  setLastDataPoint("without_name_and_domain");
                }}
              >
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p style={{ width: "inherit" }}>
                      Companies without name and domain
                    </p>
                    <Tooltip tooltipText="These companies are missing both a name and a domain, making it nearly impossible to identify them.">
                      <img
                        className="info-image"
                        src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                      />
                    </Tooltip>
                    <img
                      src={findRiskImage(
                        junk_data?.without_name_and_domain?.risk
                      )}
                    ></img>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>
                      {junk_data?.without_name_and_domain?.count?.toLocaleString()}{" "}
                      /
                    </strong>
                    <span
                      style={{
                        fontSize: "large",
                        fontWeight: "100",
                        color: "#333",
                      }}
                    >
                      {total_companies?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="audit-report__chart-container">
                <div className="audit-report__chart">
                  <BarChart
                    graphData={graphData}
                    dataPoint={lastDataPoint}
                    missingData={junk_data}
                    inferenceKey={lastDataPoint}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      <section className={` ${page === "past" ? "blur-action-section" : ""} `}>
        {page === "past" && (
          <div className="past-overlay-message">
            Can't take action in past report
          </div>
        )}
        <div
          className="report-details__take-action report-details__subSection"
          id="take_action"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className="report-details__action-title">Take Bulk Action</h4>
            <button
              className="overall_audit_action"
              onClick={() =>
                document
                  .getElementById("overall_audit_section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Move to Top ↑
            </button>
          </div>
          <div className="report-details__action-group">
            <div className="report-details__list">
              <div className="report-details__checkbox-group">
                <h5>Fix this first - fast!</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={activeListSelections.group1.companies_without_name}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group1",
                        "companies_without_name",
                        e.target.checked
                      )
                    }
                  />
                  Companies without Name
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group1.companies_without_domain
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group1",
                        "companies_without_domain",
                        e.target.checked
                      )
                    }
                  />
                  Companies without Domain
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group1
                        .companies_without_num_associated_con
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group1",
                        "companies_without_num_associated_con",
                        e.target.checked
                      )
                    }
                  />
                  Companies without Associated Contact
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group1.companies_without_owner
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group1",
                        "companies_without_owner",
                        e.target.checked
                      )
                    }
                  />
                  Companies without an Owner
                </label>

                <button
                  onClick={() => handleCreateActiveList("group1")}
                  disabled={isGeneratingGraph}
                  style={{
                    cursor: isGeneratingGraph ? "not-allowed" : "pointer",
                  }}
                >
                  Create Active List
                </button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Must Fix</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group2
                        .companies_without_associated_deals
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group2",
                        "companies_without_associated_deals",
                        e.target.checked
                      )
                    }
                  />
                  Companies without Deals
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group2.companies_without_industry
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group2",
                        "companies_without_industry",
                        e.target.checked
                      )
                    }
                  />
                  Companies without Industry
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group2
                        .companies_without_lifecycle_stage
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group2",
                        "companies_without_lifecycle_stage",
                        e.target.checked
                      )
                    }
                  />
                  Companies without Lifecycle Stage
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group2
                        .companies_without_country_region
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group2",
                        "companies_without_country_region",
                        e.target.checked
                      )
                    }
                  />
                  Companies without Country/Region
                </label>

                <button
                  onClick={() => handleCreateActiveList("group2")}
                  disabled={isGeneratingGraph}
                  style={{
                    cursor: isGeneratingGraph ? "not-allowed" : "pointer",
                  }}
                >
                  Create Active List
                </button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Good to Fix</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group3
                        .companies_without_num_of_employee
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group3",
                        "companies_without_num_of_employee",
                        e.target.checked
                      )
                    }
                  />
                  Companies without Number of Employees
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group3.companies_without_revenue
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group3",
                        "companies_without_revenue",
                        e.target.checked
                      )
                    }
                  />
                  Companies without Revenue
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group3.companies_without_linkedin_url
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group3",
                        "companies_without_linkedin_url",
                        e.target.checked
                      )
                    }
                  />
                  Companies without LinkedIn Page URL
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group3.companies_without_phone_num
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group3",
                        "companies_without_phone_num",
                        e.target.checked
                      )
                    }
                  />
                  Companies without Phone No
                </label>

                <button
                  onClick={() => handleCreateActiveList("group3")}
                  disabled={isGeneratingGraph}
                  style={{
                    cursor: isGeneratingGraph ? "not-allowed" : "pointer",
                  }}
                >
                  Create Active List
                </button>
              </div>
            </div>
          </div>
          <div className="report-details__action-group">
            <div className="report-details__list">
              <div className="report-details__checkbox-group">
                <h5>Consider Deleting</h5>
                {/* <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group4
                        .companies_without_activity_180_days
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        'group4',
                        'companies_without_activity_180_days',
                        e.target.checked,
                      )
                    }
                  />
                  Company without activity in the last 180 days
                </label> */}
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group4
                        .companies_without_name_and_domain
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group4",
                        "companies_without_name_and_domain",
                        e.target.checked
                      )
                    }
                  />
                  Companies without name and domain
                </label>

                <button
                  onClick={() => handleCreateActiveList("group4")}
                  disabled={isGeneratingGraph}
                  style={{
                    cursor: isGeneratingGraph ? "not-allowed" : "pointer",
                  }}
                >
                  Create Active List
                </button>
              </div>
              <div className="report-details__checkbox-group">
                <h5>Delete Junk</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group5
                        .companies_with_no_activity_in_last_180_days
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group5",
                        "companies_with_no_activity_in_last_180_days",
                        e.target.checked
                      )
                    }
                  />
                  Company without activity in the last 180 days
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      activeListSelections.group5
                        .companies_without_name_and_domain
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        "group5",
                        "companies_without_name_and_domain",
                        e.target.checked
                      )
                    }
                  />
                  Companies without name and domain
                </label>
                <button
                  onClick={() => handleDeleteActiveList("group5")}
                  disabled={isGeneratingGraph}
                  style={{
                    cursor: isGeneratingGraph ? "not-allowed" : "pointer",
                  }}
                >
                  Delete Junk
                </button>
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

export default Company;
