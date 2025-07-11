import React, { useEffect, useState } from "react";

const ExpiredAttendanceBox = ({ userId }) => {
  const [expiredAttendance, setExpiredAttendance] = useState([]);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const attendance = JSON.parse(localStorage.getItem(`attendance_${userId}`)) || [];
    const paymentTime = localStorage.getItem(`monthly_paid_${userId}`);

    if (paymentTime) {
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      const expired = Date.now() - Number(paymentTime) >= oneMonth;

      setIsExpired(expired);

      if (expired) {
        setExpiredAttendance(attendance);
      }
    }
  }, [userId]);

  if (!isExpired || expiredAttendance.length === 0) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-800 p-4 mt-4 rounded-md">
      <h3 className="text-lg font-bold mb-2">Previous Attendance (After One Month)</h3>
      <p className="mb-2">
        <strong>Total Days Marked:</strong> {expiredAttendance.length}
      </p>
      <ul className="list-disc ml-5 text-sm">
        {expiredAttendance.map((date, idx) => (
          <li key={idx}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpiredAttendanceBox;
