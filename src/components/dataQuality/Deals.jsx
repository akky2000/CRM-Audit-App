import React, { useState } from "react";
import BarChart from "../utils/BarChart";
import RequestModal from "../utils/RequestModal";
import { findRiskImage, getBorderColor } from "../../utils";
import { Tooltip } from "../utils/Tooltip";

const Deal = ({
  token,
  score_data,
  graphData,
  isGeneratingGraph,
  hubId,
  page,
}) => {
  const { missing_data, junk_data, total_deals } = score_data;
  const [firstDatapoint, setFirstDatapoint] = useState("dealname");
  const [secondDataPoint, setSecondDataPoint] = useState("closedate");
  const [isMissingDataExpanded, setIsMissingDataExpanded] = useState(true);
  const [isDeletingDataExpanded, setIsDeletingDataExpanded] = useState(true);
  const [firstRowSelectedItem, setfirstRowSelectedItem] =
    useState("without_name");
  const [secondRowSelectedItem, setSecondRowSelectedItem] = useState(
    "without_closing_date"
  );
  const [lastDataPoint, setLastDataPoint] = useState(
    "no_activity_in_last_180_days"
  );

  const [dealActiveListSelections, setDealActiveListSelections] = useState({
    group1: {
      deals_without_name: false,
      deals_without_owner: false,
      deals_without_num_associated_con: false,
      deals_without_num_associated_comp: false,
    },
    group2: {
      deals_without_closing_date: false,
      deals_without_amount: false,
      deals_lost_without_lost_reason: false,
      deals_without_deal_type: false,
    },
    group3: {
      deals_without_name_and_owner: false,
      deals_with_no_activity_in_last_180_days: false,
    },
    group4: {
      deals_without_name_and_owner: false,
      deals_with_no_activity_in_last_180_days: false,
    },
  });
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestModalData, setRequestModalData] = useState({
    selectedItems: [],
    actionType: "",
  });

  const handleDealCheckboxChange = (group, key, checked) => {
    setDealActiveListSelections((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: checked,
      },
    }));
  };

  const handleCreateActiveList = (group) => {
    const selectedKeys = Object.entries(dealActiveListSelections[group])
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
    const selectedKeys = Object.entries(dealActiveListSelections[group])
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
      objectname: "deals",
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
        <p>No data available for Deals.</p>
      </div>
    );
  }

  return (
    <div className="report-details">
      {/* Missing Data Section */}
      <section className="report-details__subSection">
        <div className="report-details__section-header">
          <h3 className="report-details__subtitle">
            Missing Data - <h4 style={{ marginLeft: "4px" }}>Deals</h4>
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
                    handleFirstDataPointChange("dealname");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Name</p>
                      <Tooltip tooltipText="These deals are missing a deal name, which is typically used to identify and reference them within the CRM.">
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
                      {missing_data?.without_name?.count?.toLocaleString()}{" "}
                      <span>/ {total_deals?.toLocaleString()}</span>
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
                      <p> Deals without Owner</p>
                      <Tooltip tooltipText="These deals do not have an assigned owner, meaning no specific user is responsible for managing or progressing them.">
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
                      {missing_data?.without_owner?.count?.toLocaleString()}{" "}
                      <span>/ {total_deals?.toLocaleString()}</span>
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
                      <p>Deals without Associated Contact</p>
                      <Tooltip tooltipText="These deals are not linked to any contacts, meaning there is no individual associated with the deal for communication or follow-ups.">
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
                      {missing_data?.without_associated_contacts?.count?.toLocaleString()}{" "}
                      <span>/ {total_deals?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    firstRowSelectedItem === "without_associated_company"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(
                    missing_data?.without_associated_company?.risk
                  )}`}
                  onClick={() => {
                    setfirstRowSelectedItem("without_associated_company");
                    handleFirstDataPointChange("associations.company");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Associated Company</p>
                      <Tooltip tooltipText="These deals do not have an associated company, making it unclear which organization the deal is connected to.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_associated_company?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_associated_company?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_associated_company?.count?.toLocaleString()}{" "}
                      <span>/ {total_deals?.toLocaleString()}</span>
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
                    secondRowSelectedItem === "without_closing_date"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(
                    missing_data?.without_closing_date?.risk
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem("without_closing_date");
                    handleSecondDataPointChange("closedate");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Close Date</p>
                      <Tooltip tooltipText="These deals lack a closing date, which is used to track when the deal is expected to be finalized.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_closing_date?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_closing_date?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_closing_date?.count?.toLocaleString()}{" "}
                      <span>/ {total_deals?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === "without_amount"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(missing_data?.without_amount?.risk)}`}
                  onClick={() => {
                    setSecondRowSelectedItem("without_amount");
                    handleSecondDataPointChange("amount");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p> Deals without Amount</p>
                      <Tooltip tooltipText="These deals do not have a specified monetary value, which is typically used to estimate revenue potential.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(missing_data?.without_amount?.risk)}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>{missing_data?.without_amount?.percent}%</strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_amount?.count?.toLocaleString()}{" "}
                      <span>/ {total_deals?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === "lost_without_reason"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(
                    missing_data?.lost_without_reason?.risk
                  )}`}
                  onClick={() => {
                    setSecondRowSelectedItem("lost_without_reason");
                    handleSecondDataPointChange("without_lost_reason");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Lost Deals without Lost Reason</p>
                      <Tooltip tooltipText="These deals are marked as lost but do not include a reason for the loss, which is often recorded to analyze deal performance.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.lost_without_reason?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.lost_without_reason?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.lost_without_reason?.count?.toLocaleString()}{" "}
                      <span>/ {total_deals?.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`report-details__data-div ${
                    secondRowSelectedItem === "without_deal_type"
                      ? "selected-item"
                      : ""
                  }  ${getBorderColor(missing_data?.without_deal_type?.risk)}`}
                  onClick={() => {
                    setSecondRowSelectedItem("without_deal_type");
                    handleSecondDataPointChange("dealtype");
                  }}
                >
                  <div className="report-details__data-item">
                    <p className="report-details__data-div-heading">
                      <p>Deals without Deal Type</p>
                      <Tooltip tooltipText="These deals do not have a deal type assigned, which is used to categorize them based on their nature or purpose.">
                        <img
                          className="info-image"
                          src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                        />
                      </Tooltip>
                      <img
                        src={findRiskImage(
                          missing_data?.without_deal_type?.risk
                        )}
                      ></img>
                    </p>
                    <p className="report-details__data-div-score">
                      <strong>
                        {missing_data?.without_deal_type?.percent}%
                      </strong>
                    </p>
                    <p className="report-details__data-div-total">
                      {missing_data?.without_deal_type?.count?.toLocaleString()}{" "}
                      <span>/ {total_deals?.toLocaleString()}</span>
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
                      Deals have no activity in the last 180 days
                    </p>
                    <Tooltip tooltipText="These deals have been inactive for the last 180 days, with no recorded updates, communications, or engagement.">
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
                      {total_deals?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              <div
                className={`report-details__duplicate-data-div  ${getBorderColor(
                  junk_data?.without_name_and_owner?.risk
                )} ${
                  lastDataPoint === "without_name_and_owner"
                    ? "selected-item"
                    : ""
                } `}
                onClick={() => {
                  setLastDataPoint("without_name_and_owner");
                }}
              >
                <div className="report-details__data-item">
                  <p className="report-details__data-div-heading">
                    <p style={{ width: "inherit" }}>
                      Deals without name and owner
                    </p>
                    <Tooltip tooltipText="These deals are missing both a name and an assigned owner, making them incomplete in terms of basic identification and responsibility assignment.">
                      <img
                        className="info-image"
                        src="https://6343592.fs1.hubspotusercontent-na1.net/hubfs/6343592/info.png"
                      />
                    </Tooltip>
                    <img
                      src={findRiskImage(
                        junk_data?.without_name_and_owner?.risk
                      )}
                    ></img>
                  </p>
                  <p className="report-details__data-div-score">
                    <strong>
                      {junk_data?.without_name_and_owner?.count?.toLocaleString()}{" "}
                      /
                    </strong>
                    <span
                      style={{
                        fontSize: "large",
                        fontWeight: "100",
                        color: "#333",
                      }}
                    >
                      {total_deals?.toLocaleString()}
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
            <div className="report-details__list_main">
              <div className="report-details__checkbox-group">
                <h5>Fix this first - fast!</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={dealActiveListSelections.group1.deals_without_name}
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        "group1",
                        "deals_without_name",
                        e.target.checked
                      )
                    }
                  />
                  Deals without Name
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group1.deals_without_owner
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        "group1",
                        "deals_without_owner",
                        e.target.checked
                      )
                    }
                  />
                  Deals without Owner
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group1
                        .deals_without_num_associated_con
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        "group1",
                        "deals_without_num_associated_con",
                        e.target.checked
                      )
                    }
                  />
                  Deals without Associated Contact
                </label>
                {/* <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group1
                        .deals_without_num_associated_comp
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group1',
                        'deals_without_num_associated_comp',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without Associated Company
                </label> */}
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

              {/* Group 2: Must Fix */}
              <div className="report-details__checkbox-group">
                <h5>Must Fix</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group2.deals_without_closing_date
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        "group2",
                        "deals_without_closing_date",
                        e.target.checked
                      )
                    }
                  />
                  Deals without Closing Date
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group2.deals_without_amount
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        "group2",
                        "deals_without_amount",
                        e.target.checked
                      )
                    }
                  />
                  Deals without Amount
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group2
                        .deals_lost_without_lost_reason
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        "group2",
                        "deals_lost_without_lost_reason",
                        e.target.checked
                      )
                    }
                  />
                  Lost Deals without Lost Reason
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group2.deals_without_deal_type
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        "group2",
                        "deals_without_deal_type",
                        e.target.checked
                      )
                    }
                  />
                  Deals without Deal Type
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
            </div>
          </div>
          <div className="report-details__action-group">
            <div className="report-details__list_main">
              {/* Group 3: Consider Deleting */}
              <div className="report-details__checkbox-group">
                <h5>Consider Deleting</h5>
                {/* <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group3.deals_with_no_activity_in_last_180_days
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        'group3',
                        'deals_with_no_activity_in_last_180_days',
                        e.target.checked,
                      )
                    }
                  />
                  Deals without activity in the last 180 days
                </label> */}
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group3
                        .deals_with_no_activity_in_last_180_days
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        "group3",
                        "deals_with_no_activity_in_last_180_days",
                        e.target.checked
                      )
                    }
                  />
                  Deals without Name and Owner
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
              <div className="report-details__checkbox-group">
                <h5>Delete Junk</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group4
                        .deals_with_no_activity_in_last_180_days
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        "group4",
                        "deals_with_no_activity_in_last_180_days",
                        e.target.checked
                      )
                    }
                  />
                  Deals without activity in the last 180 days
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      dealActiveListSelections.group4
                        .deals_without_name_and_owner
                    }
                    onChange={(e) =>
                      handleDealCheckboxChange(
                        "group4",
                        "deals_without_name_and_owner",
                        e.target.checked
                      )
                    }
                  />
                  Deals without Name and Owner
                </label>
                <button
                  onClick={() => handleDeleteActiveList("group4")}
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

export default Deal;
