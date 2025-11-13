import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";

const FoodRequestsTable = ({ food }) => {
  const { user } = use(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (food?._id) {
      fetch(`http://localhost:3000/food-requests/${food._id}`)
        .then((res) => res.json())
        .then((data) => setRequests(data));
    }
  }, [food]);

  const handleStatusChange = (id, status) => {
    fetch(`http://localhost:3000/food-request/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, foodId: food._id }),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success!", `Request ${status}`, "success");
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status } : r))
        );
      });
  };

  // Only owner can see this
  if (user?.email !== food?.donator_email) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4 text-yellow-600">
        Food Requests
      </h3>
      <table className="table w-full border">
        <thead className="bg-yellow-400 text-black">
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Reason</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.name}</td>
              <td>{req.location}</td>
              <td>{req.reason}</td>
              <td>{req.contactNo}</td>
              <td className="capitalize">{req.status}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(req._id, "accepted")}
                  disabled={req.status !== "pending"}
                  className="btn btn-sm bg-green-500 text-white"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(req._id, "rejected")}
                  disabled={req.status !== "pending"}
                  className="btn btn-sm bg-red-500 text-white"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodRequestsTable;
