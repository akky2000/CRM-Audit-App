import React from "react";
import Contact from "./dataQuality/Contacts";
import Company from "./dataQuality/Companies";
import Deal from "./dataQuality/Deals";
import Ticket from "./dataQuality/Tickets";

const MissingData = ({ selectedItem }) => {
  const contacts_score_data = {
    junk_data: {
      internal_team_members: {
        count: 3,
        global_average: 40,
        inference: "No inference available",
        percent: 1.02,
        risk: "No Risk",
      },
      no_activity_in_last_180_days: {
        count: 6,
        global_average: 60,
        inference:
          "Contacts are actively engaged, ensuring continued interaction.",
        percent: 2.05,
        risk: "No Risk",
      },
    },
    missing_data: {
      with_lifecycle_stage: {
        count: 85,
        global_average: null,
        inference: "No inference available",
        percent: 29.01,
        risk: "Unknown (no config)",
      },
      without_associated_company: {
        count: 223,
        global_average: 18,
        inference:
          "Contacts cannot be associated with companies, leading to disjointed account management, poor reporting, and ineffective B2B outreach.",
        percent: 76.11,
        risk: "High Risk",
      },
      without_deals: {
        count: 4,
        global_average: 8,
        inference:
          "Deals are properly linked, ensuring revenue tracking and sales efficiency.",
        percent: 1.37,
        risk: "No Risk",
      },
      without_email: {
        count: 34,
        global_average: 10,
        inference:
          "Some missing emails may cause occasional gaps in engagement. Consider implementing data validation at lead capture points to improve completeness over time.",
        percent: 11.6,
        risk: "Low Risk",
      },
      without_first_name: {
        count: 206,
        global_average: 8,
        inference:
          "A critical gap in data integrity. First names personalize communication, and missing data reduces engagement and response rates.",
        percent: 70.31,
        risk: "High Risk",
      },
      without_hubspotscore: {
        count: 292,
        global_average: 50,
        inference:
          "Missing lead scores prevent prioritization and reduce efficiency in sales efforts.",
        percent: 99.66,
        risk: "High Risk",
      },
      without_job_title: {
        count: 275,
        global_average: 28,
        inference:
          "Without job titles, personalization and segmentation suffer, making outreach less relevant and effective.",
        percent: 93.86,
        risk: "High Risk",
      },
      without_lastname: {
        count: 230,
        global_average: 18,
        inference:
          "A critical gap in data integrity. Last names personalize communication, and missing data reduces engagement and response rates.",
        percent: 78.5,
        risk: "High Risk",
      },
      without_lead_source: {
        count: 0,
        global_average: null,
        inference: "No inference available",
        percent: 0,
        risk: "Unknown (no config)",
      },
      without_lead_status: {
        count: 291,
        global_average: 40,
        inference:
          "Lead status is crucial for tracking engagement progress. Missing data makes it difficult to assess where contacts stand in the sales funnel.",
        percent: 99.32,
        risk: "High Risk",
      },
      without_lifecycle_stage: {
        count: 208,
        global_average: 35,
        inference:
          "Lack of lifecycle stage prevents accurate pipeline tracking and prioritization of leads based on their journey.",
        percent: 70.99,
        risk: "High Risk",
      },
      without_marketing_contact_status: {
        count: 253,
        global_average: 50,
        inference:
          "Lack of marketing status can prevent targeted marketing efforts and reduce lead qualification accuracy.",
        percent: 86.35,
        risk: "High Risk",
      },
      without_owner: {
        count: 225,
        global_average: 22,
        inference:
          "Unassigned contacts result in lack of accountability, lost opportunities, and breakdowns in sales processes.",
        percent: 76.79,
        risk: "High Risk",
      },
      without_phone: {
        count: 114,
        global_average: 25,
        inference:
          "Phone numbers aid in conversion, but other communication channels like email may still be available.",
        percent: 38.91,
        risk: "Moderate Risk",
      },
    },
    total_contacts: 293,
  };
  const company_score_data = {
    junk_data: {
      no_activity_in_last_180_days: {
        count: 440,
        global_average: 40,
        inference:
          "Minor inactivity gaps may be manageable with re-engagement campaigns.",
        percent: 49.05,
        risk: "Low Risk",
      },
      without_name_and_domain: {
        count: 0,
        global_average: 10,
        inference:
          "Names and domains are well-maintained, ensuring complete and accurate records.",
        percent: 0,
        risk: "No Risk",
      },
    },
    missing_data: {
      without_associated_contacts: {
        count: 819,
        global_average: 35,
        inference:
          "Lack of associated contacts makes outreach ineffective, leading to poor engagement, missed opportunities, and broken sales processes.",
        percent: 91.3,
        risk: "High Risk",
      },
      without_associated_deals: {
        count: 0,
        global_average: 50,
        inference:
          "Deals are properly linked, improving revenue tracking and sales efficiency.",
        percent: 0,
        risk: "No Risk",
      },
      without_country_region: {
        count: 664,
        global_average: 25,
        inference:
          "Missing country/region affects geographic segmentation, making location-based targeting and compliance difficult.",
        percent: 74.02,
        risk: "High Risk",
      },
      without_domain: {
        count: 374,
        global_average: 20,
        inference:
          "Missing domain affects marketing campaigns and lead tracking, but manual research can sometimes fill the gap.",
        percent: 41.69,
        risk: "Moderate Risk",
      },
      without_industry: {
        count: 715,
        global_average: 40,
        inference:
          "Without Industry data, it becomes difficult for your marketing & sales team to get to your ICP.",
        percent: 79.71,
        risk: "High Risk",
      },
      without_lifecycle_stage: {
        count: 462,
        global_average: 45,
        inference:
          "General segmentation can still function, though not optimally.",
        percent: 51.51,
        risk: "Low Risk",
      },
      without_linkedin_url: {
        count: 703,
        global_average: 70,
        inference:
          "Social engagement is impacted, but other outreach methods are still available.",
        percent: 78.37,
        risk: "Moderate Risk",
      },
      without_name: {
        count: 4,
        global_average: 5,
        inference:
          "Company names are well-maintained, ensuring accurate records and segmentation.",
        percent: 0.45,
        risk: "No Risk",
      },
      without_num_of_employees: {
        count: 490,
        global_average: 55,
        inference:
          "Employee data is well-maintained, supporting targeted outreach.",
        percent: 54.63,
        risk: "No Risk",
      },
      without_owner: {
        count: 611,
        global_average: 30,
        inference:
          "Unassigned companies result in accountability gaps, leading to missed opportunities and inefficient follow-ups.",
        percent: 68.12,
        risk: "High Risk",
      },
      without_phone_number: {
        count: 768,
        global_average: 35,
        inference:
          "Without phone numbers, direct outreach is impossible, reducing conversion rates and sales efficiency.",
        percent: 85.62,
        risk: "High Risk",
      },
      without_revenue: {
        count: 505,
        global_average: 65,
        inference:
          "Revenue data is properly tracked, enabling effective prioritization.",
        percent: 56.3,
        risk: "No Risk",
      },
    },
    total_companies: 897,
  };
  const deals_score_data = {
    junk_data: {
      no_activity_in_last_180_days: {
        count: 1265,
        global_average: 40,
        inference:
          "Deals with no activity in 180 days indicate stagnation and potential loss.",
        percent: 92.67,
        risk: "High Risk",
      },
      without_name_and_owner: {
        count: 0,
        global_average: 10,
        inference: "No inference available",
        percent: 0,
        risk: "No Risk",
      },
    },
    missing_data: {
      lost_without_reason: {
        count: 65,
        global_average: 50,
        inference:
          "Lost reasons are consistently recorded, supporting sales improvement efforts.",
        percent: 4.76,
        risk: "No Risk",
      },
      without_amount: {
        count: 1,
        global_average: 35,
        inference:
          "Deal amounts are properly recorded, ensuring accurate revenue forecasting.",
        percent: 0.07,
        risk: "No Risk",
      },
      without_associated_company: {
        count: 131,
        global_average: 30,
        inference:
          "Deals are well-associated with companies, enabling effective tracking and reporting.",
        percent: 9.6,
        risk: "No Risk",
      },
      without_associated_contacts: {
        count: 1315,
        global_average: 22,
        inference:
          "Without an associated contact, outreach becomes ineffective, leading to poor engagement and lost opportunities.",
        percent: 96.34,
        risk: "High Risk",
      },
      without_closing_date: {
        count: 150,
        global_average: 40,
        inference:
          "Close dates are well-defined, ensuring accurate sales forecasting.",
        percent: 10.99,
        risk: "No Risk",
      },
      without_deal_type: {
        count: 1322,
        global_average: 45,
        inference:
          "Without deal types, segmentation and reporting become difficult, reducing sales team efficiency.",
        percent: 96.85,
        risk: "High Risk",
      },
      without_name: {
        count: 0,
        global_average: 7,
        inference:
          "Deal names are well-maintained, ensuring clear tracking and pipeline visibility.",
        percent: 0,
        risk: "No Risk",
      },
      without_owner: {
        count: 61,
        global_average: 12,
        inference:
          "Deals have clear ownership, ensuring timely follow-ups and accountability.",
        percent: 4.47,
        risk: "No Risk",
      },
    },
    total_deals: 1365,
  };
  const tickets_score_data = {
    junk_data: {
      no_activity_in_last_180_days: {
        count: 5,
        global_average: 40,
        inference:
          "All tickets have been actively managed within the last 180 days.",
        percent: 5.68,
        risk: "No Risk",
      },
      without_name_and_owner: {
        count: 0,
        global_average: 10,
        inference: "No inference available",
        percent: 0,
        risk: "No Risk",
      },
    },
    missing_data: {
      without_associated_contacts_email_phone: {
        count: 55,
        global_average: 25,
        inference:
          "Tickets lack associated contact details, limiting follow-ups and resolution.",
        percent: 62.5,
        risk: "High Risk",
      },
      without_description: {
        count: 35,
        global_average: 35,
        inference:
          "Some missing descriptions may cause minor inefficiencies but can be resolved through follow-ups.",
        percent: 39.77,
        risk: "Low Risk",
      },
      without_name: {
        count: 0,
        global_average: 10,
        inference:
          "Ticket names are well-maintained, ensuring clear tracking and efficient resolution.",
        percent: 0,
        risk: "No Risk",
      },
      without_num_associated_company: {
        count: 43,
        global_average: 30,
        inference:
          "Company-based reporting becomes challenging, but ticket resolution may still proceed.",
        percent: 48.86,
        risk: "Moderate Risk",
      },
      without_owner: {
        count: 10,
        global_average: 18,
        inference:
          "Tickets have clear ownership, ensuring timely resolution and accountability.",
        percent: 11.36,
        risk: "No Risk",
      },
      without_pipeline_name: {
        count: 0,
        global_average: 50,
        inference:
          "Lost tickets are properly categorized in pipelines, ensuring accurate reporting and process refinement.",
        percent: 0,
        risk: "No Risk",
      },
      without_priority: {
        count: 64,
        global_average: 40,
        inference:
          "Without priority levels, urgent issues may not be handled on time, leading to poor customer experience and SLA breaches.",
        percent: 72.73,
        risk: "High Risk",
      },
      without_status: {
        count: 0,
        global_average: 20,
        inference:
          "Ticket statuses are well-maintained, ensuring smooth workflow tracking and issue resolution.",
        percent: 0,
        risk: "No Risk",
      },
    },
    total_tickets: 88,
  };
  const renderComponent = () => {
    switch (selectedItem) {
      case "Contacts":
        return <Contact score_data={contacts_score_data} />;
      case "Companies":
        return <Company score_data={company_score_data} />;
      case "Deals":
        return <Deal score_data={deals_score_data} />;
      case "Tickets":
        return <Ticket score_data={tickets_score_data} />;
      default:
        return <Contact score_data={contacts_score_data} />;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default MissingData;
