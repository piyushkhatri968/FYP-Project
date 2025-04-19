import axios from "axios";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { LuLoaderCircle } from "react-icons/lu";

const AllEmployees = ({ totalUsers, setTotalUsers }) => {
  const onlyClients = totalUsers?.filter(
    (user) => user.userType === "employee"
  );
  const [searchFilter, setSearchFilter] = useState("");

  const filteredClients = onlyClients?.filter((user) =>
    user?.username?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const formatdDateAndTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const formatedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;

    const formatedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    const result = `${formatedDate} ${formatedTime}`;
    return result;
  };

  const [deletingUserId, setDeletingUserId] = useState(null);

  const handleDelete = async (userId) => {
    if (deletingUserId) return;

    if (window.confirm("Are you sure you want to delete this Employee?")) {
      try {
        setDeletingUserId(userId);
        const response = await axios.delete(
          `http://localhost:8080/api/admin/deleteUser`,
          {
            data: { userId },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert(response.data.message);
          setTotalUsers((prev) => prev.filter((user) => user._id !== userId));
        }
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete user");
      } finally {
        setDeletingUserId(null);
      }
    }
  };

  return (
    <div
      className="w-full mt-6 flex flex-col rounded-md overflow-hidden bg-[#0D1B2A] p-4 text-white"
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="flex items-end w-full justify-end">
        <input
          type="text"
          placeholder="Search by username"
          className="outline-none border p-2 rounded-md text-black"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>
      {filteredClients && filteredClients.length === 0 ? (
        <div className="text-center mt-4 text-lg font-medium">
          No Any Employees available.
        </div>
      ) : (
        <>
          <div className="overflow-auto">
            <h1 className="mb-2 text-2xl font-medium">Employees</h1>
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left">No.</th>
                  <th className="px-3 py-3 text-left">Name</th>
                  <th className="px-3 py-3 text-left">Username</th>
                  <th className="px-3 py-3 text-left">Email</th>
                  <th className="px-3 py-3 text-left">Phone Number</th>
                  <th className="px-3 py-3 text-left">City</th>
                  <th className="px-3 py-3 text-left">position</th>
                  <th className="px-3 py-3 text-left">Age</th>
                  <th className="px-3 py-3 text-left">Resume</th>
                  <th className="px-3 py-3 text-left">Created On</th>
                  <th className="px-3 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients?.map((user, index) => (
                  <tr
                    key={user._id}
                    className={(index + 1) % 2 === 0 ? "bg-BlueColor" : ""}
                  >
                    <td className="px-3 py-3">{index + 1}</td>
                    <td className="px-3 py-3">{user?.name}</td>
                    <td className="px-3 py-3">{user?.username}</td>
                    <td className="px-3 py-3">{user?.email}</td>
                    <td className="px-3 py-3">
                      {user?.candidateDetails?.phone || "N/A"}
                    </td>
                    <td className="px-3 py-3">
                      {user?.candidateDetails?.location?.city || "N/A"}
                    </td>
                    <td className="px-3 py-3">
                      {user?.candidateDetails?.position || "N/A"}
                    </td>
                    <td className="px-3 py-3">
                      {user?.candidateDetails?.age || "N/A"}
                    </td>
                    <td className="px-3 py-3">
                      {user?.candidateDetails?.resume ? (
                        <a
                          href={user?.candidateDetails?.resume}
                          target="_blank"
                        >
                          Resume
                        </a>
                      ) : (
                        <p>N/A</p>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      {formatdDateAndTime(user?.createdAt)}
                    </td>
                    {deletingUserId === user._id ? (
                      <td>
                        <LuLoaderCircle size={24} className="animate-spin" />
                      </td>
                    ) : (
                      <td
                        className="px-3 py-3 cursor-pointer"
                        title="Delete Client"
                        onClick={() => handleDelete(user._id)}
                      >
                        <span>
                          <MdDelete className="text-red-600" size={24} />
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AllEmployees;
