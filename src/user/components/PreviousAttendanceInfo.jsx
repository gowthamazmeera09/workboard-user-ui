import React, { useEffect, useState } from "react";

const PreviousAttendanceInfo = ({ userId }) => {
  const [lastWorkingDays, setLastWorkingDays] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const allAttendance = JSON.parse(localStorage.getItem(`attendance_${userId}`)) || [];
    const paidAt = parseInt(localStorage.getItem(`monthly_paid_${userId}`), 10);

    if (paidAt) {
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      const expired = Date.now() - paidAt > oneMonth;
      setIsExpired(expired);

      if (expired) {
        // Filter only attendance dates before the expiry
        const expiryTime = paidAt + oneMonth;
        const pastWorkingDays = allAttendance.filter(date => {
          const time = new Date(date).getTime();
          return time <= expiryTime;
        });
        setLastWorkingDays(pastWorkingDays.length);
      }
    }
  }, [userId]);

  return (
    isExpired && (
      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 mb-2 rounded shadow text-sm">
        <strong>Previous Working Days:</strong> {lastWorkingDays}
      </div>
    )
  );
};

export default PreviousAttendanceInfo;
