import React, { useEffect, useState } from "react";

const AttendanceBox = ({ userId }) => {
  const [attendance, setAttendance] = useState([]);
  const [hasMarkedToday, setHasMarkedToday] = useState(false);
  const [isPaymentActive, setIsPaymentActive] = useState(false);
  const [paymentExpired, setPaymentExpired] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`attendance_${userId}`)) || [];
    setAttendance(stored);

    const today = new Date().toISOString().split("T")[0];
    setHasMarkedToday(stored.includes(today));

    const paymentTime = localStorage.getItem(`monthly_paid_${userId}`);
    if (paymentTime) {
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      const isValid = Date.now() - Number(paymentTime) < oneMonth;
      setIsPaymentActive(isValid);
      setPaymentExpired(!isValid);
    } else {
      setPaymentExpired(true);
    }
  }, [userId]);

  const markAttendance = () => {
    const today = new Date().toISOString().split("T")[0];
    if (!attendance.includes(today)) {
      const updated = [...attendance, today];
      localStorage.setItem(`attendance_${userId}`, JSON.stringify(updated));
      setAttendance(updated);
      setHasMarkedToday(true);
    }
  };

  const handleMonthlyPayment = () => {
    const razorpay = new window.Razorpay({
      key: "rzp_live_OqzosWrCVboRcu",
      amount: 9900,
      currency: "INR",
      name: "WorkBoard",
      description: "Monthly Access for Attendance",
      handler: function () {
        localStorage.setItem(`monthly_paid_${userId}`, Date.now());
        window.location.reload();
      },
      prefill: {
        email: "user@example.com",
        contact: "9876543210",
      },
      theme: { color: "#6D28D9" },
    });

    razorpay.open();
  };

  return (
    <div className="bg-white p-4 mt-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-2">Attendance</h3>

      {/* If expired: show only working days count */}
      {paymentExpired && (
        <>
          <p className="text-yellow-600 font-semibold mb-2">
            Your monthly access has expired.
          </p>
          <p className="text-gray-700 font-medium mb-2">
            Last Month's Working Days: <span className="text-indigo-600">{attendance.length}</span>
          </p>
          <button
            onClick={handleMonthlyPayment}
            className="bg-yellow-500 text-black px-4 py-2 rounded shadow hover:bg-yellow-600"
          >
            Pay ₹99 to Renew Access
          </button>
        </>
      )}

      {/* If valid: mark attendance and show date list */}
      {isPaymentActive && (
        <>
          {hasMarkedToday ? (
            <p className="text-green-600 mb-2">Today's attendance is already marked.</p>
          ) : (
            <button
              onClick={markAttendance}
              className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 mb-2"
            >
              Mark Attendance
            </button>
          )}

          <div className="mt-4">
            <p className="font-semibold text-gray-800 mb-1">
              Total Working Days: <span className="text-indigo-600">{attendance.length}</span>
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-600">
              {attendance.map((date, idx) => (
                <li key={idx}>{date}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceBox;
