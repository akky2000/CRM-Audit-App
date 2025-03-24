import React, { useEffect, useState } from "react";

const RequestModal = ({
  isOpen,
  onClose,
  selectedItems,
  actionType,
  handleApiCall,
}) => {
  const [loadingStatus, setLoadingStatus] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen && selectedItems.length > 0) {
      processRequests();
    }
  }, [isOpen]);

  const processRequests = async () => {
    setIsProcessing(true);
    const newStatus = {};

    for (const item of selectedItems) {
      newStatus[item] = { status: "loading", message: "" };
      setLoadingStatus({ ...newStatus });

      const response = await handleApiCall(item);
      newStatus[item] = {
        status: response.success ? "success" : "failed",
        message: response.message,
      };

      setLoadingStatus({ ...newStatus });
    }

    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="request-modal-overlay">
      <div className="request-modal-content">
        <h2>
          {actionType === "create"
            ? "Creating Active List"
            : "Deleting Junk Data"}
        </h2>
        <table className="audit-report__table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr key={item}>
                <td>{item.replace(/_/g, " ")}</td>
                <td>
                  {loadingStatus[item]?.status === "failed" ? (
                    <span className="error-icon">❌</span>
                  ) : loadingStatus[item]?.status === "success" ? (
                    <span className="success-icon">✅</span>
                  ) : (
                    <span className="loading-bar"></span>
                  )}
                </td>
                <td>{loadingStatus[item]?.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onClose}
          disabled={isProcessing}
          style={{ cursor: isProcessing ? "not-allowed" : "pointer" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RequestModal;
