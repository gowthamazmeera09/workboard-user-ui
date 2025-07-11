import React, { useEffect, useState } from "react";

const PreviousAttendanceInfo = ({ userId }) => {
  const [lastWorkingDays, setLastWorkingDays] = useState(0);

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${userId}`)) || [];
    const lastPaymentTime = localStorage.getItem(`monthly_paid_${userId}`);

    if (!lastPaymentTime) return;

    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    const expiredAt = parseInt(lastPaymentTime);
    const now = Date.now();

    // Only calculate if the previous payment is expired
    if (now - expiredAt > oneMonth) {
      const monthEnd = expiredAt + oneMonth;
      const count = storedAttendance.filter((dateStr) => {
        const timestamp = new Date(dateStr).getTime();
        return timestamp >= expiredAt && timestamp <= monthEnd;
      }).length;

      setLastWorkingDays(count);
    }
  }, [userId]);

  if (lastWorkingDays === 0) return null;

  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-md mt-4">
      <p className="font-semibold">Last Working Days: {lastWorkingDays}</p>
    </div>
  );
};

export default PreviousAttendanceInfo;
