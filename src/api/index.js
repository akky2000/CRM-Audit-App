const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const requestOTP = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error requesting OTP:", error);
    throw error;
  }
};

export const validateOTP = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: otp, page: "signin" }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error validating OTP:", error);
    throw error;
  }
};

export const resendOTP = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error;
  }
};

export const fetchAuditDataByID = async (token, reportId) => {
  try {
    const response = await fetch(`${BASE_URL}/fetchreport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        state: token,
      },
      body: JSON.stringify({ reportId: reportId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching report:", error);
    throw error;
  }
};

export const fetchReportList = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/pastreports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        state: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return data;
  } catch (error) {
    console.error("Error fetching report list:", error);
    throw error;
  }
};

export const triggerCheckReport = async (token, hubID) => {
  try {
    const response = await fetch(`${BASE_URL}/checkreport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        state: token,
      },
      body: JSON.stringify({ hub_id: hubID }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while triggering check report:", error);
    throw error;
  }
};

export const triggerReportGeneration = async (token, hubID) => {
  try {
    const response = await fetch(`${BASE_URL}/getreport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        state: token,
      },
      body: JSON.stringify({ hub_id: hubID }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while triggering report genearation:", error);
    throw error;
  }
};

export const fetchGraphData = async (token, reportId) => {
  try {
    const response = await fetch(`${BASE_URL}/checkandfetchgraph`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        state: token,
      },
      body: JSON.stringify({
        report_id: reportId,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching graph data:`, error);
    throw error;
  }
};

export const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/gethubinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        state: token,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error while fetching user data:`, error);
    throw error;
  }
};

export const generateNewReport = async (token, hubId) => {
  try {
    const response = await fetch(`${BASE_URL}/generatenewreport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        state: token,
      },
      body: JSON.stringify({ hub_id: hubId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error while fetching user data:`, error);
    throw error;
  }
};

export const addNewAccount = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/addnewaccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        state: token,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(`Error while adding new hubspot porta:`, error);
    throw error;
  }
};

export const triggerGraphGeneration = async (token, reportId, hubId) => {
  try {
    const response = await fetch(`${BASE_URL}/savegraphs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        state: token,
      },
      body: JSON.stringify({ report_id: reportId, hub_id: hubId }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(`Error while adding new hubspot porta:`, error);
    throw error;
  }
};

export const triggerEmailNotification = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/sendemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        state: token,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(`Error while sending email notification:`, error);
    throw error;
  }
};
