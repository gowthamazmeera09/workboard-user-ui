import React, { useEffect, useState } from "react";

const AttendanceBox = ({ userId }) => {
  const [attendance, setAttendance] = useState([]);
  const [hasMarkedToday, setHasMarkedToday] = useState(false);
  const [isPaymentActive, setIsPaymentActive] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`attendance_${userId}`)) || [];
    setAttendance(stored);

    const today = new Date().toISOString().split("T")[0];
    setHasMarkedToday(stored.includes(today));

    const paymentTime = localStorage.getItem(`monthly_paid_${userId}`);
    if (paymentTime) {
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      const isValid = Date.now() - paymentTime < oneMonth;
      setIsPaymentActive(isValid);
    }
  }, [userId]);

  const markAttendance = () => {
    const today = new Date().toISOString().split("T")[0];
    const updated = [...attendance, today];
    localStorage.setItem(`attendance_${userId}`, JSON.stringify(updated));
    setAttendance(updated);
    setHasMarkedToday(true);
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

      {!isPaymentActive && (
        <>
          <p className="text-yellow-600 font-semibold mb-2">
            Your monthly access has expired. Please pay ₹99 to renew attendance access.
          </p>
          <button
            onClick={handleMonthlyPayment}
            className="bg-yellow-500 text-black px-4 py-2 rounded shadow hover:bg-yellow-600 mb-4"
          >
            Pay ₹99 to Renew Access
          </button>
        </>
      )}

      {isPaymentActive ? (
        hasMarkedToday ? (
          <p className="text-green-600">Today's attendance is already marked.</p>
        ) : (
          <button
            onClick={markAttendance}
            className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
          >
            Mark Attendance
          </button>
        )
      ) : (
        <p className="text-gray-600 italic mb-2">You can't mark attendance until payment is renewed.</p>
      )}

      <div className="mt-3">
        <p className="font-semibold text-gray-700">Previous Working Days:</p>
        <ul className="list-disc ml-5 text-sm text-gray-600">
          {attendance.length === 0 ? (
            <li>No days marked yet.</li>
          ) : (
            attendance.map((date, idx) => <li key={idx}>{date}</li>)
          )}
        </ul>
      </div>
    </div>
  );
};

export default AttendanceBox;
