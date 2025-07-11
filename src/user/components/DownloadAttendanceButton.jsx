import React, { useEffect, useState } from "react";

const DownloadAttendanceButton = ({ userId }) => {
  const [canDownload, setCanDownload] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const attendance = JSON.parse(localStorage.getItem(`attendance_${userId}`)) || [];
    const paymentTime = localStorage.getItem(`monthly_paid_${userId}`);

    if (paymentTime) {
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      const isExpired = Date.now() - Number(paymentTime) >= oneMonth;
      if (isExpired && attendance.length > 0) {
        setCanDownload(true);
        setAttendanceData(attendance);
      }
    }
  }, [userId]);

  const downloadFile = () => {
    const content = `Previous Working Days:\n\n${attendanceData.join("\n")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "attendance_list.txt";
    link.click();
  };

  if (!canDownload) return null;

  return (
    <div className="mt-3">
      <button
        onClick={downloadFile}
        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
      >
        📄 Download Previous Working Days
      </button>
    </div>
  );
};

export default DownloadAttendanceButton;
