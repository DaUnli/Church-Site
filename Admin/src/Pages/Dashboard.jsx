import React, { useState, useEffect } from "react";
import { getInitials } from "../utils/getInitials";
import { MdDelete, MdEdit } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", role: "Member", profile: "" });
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);


  const fetchMembers = async () => {
    try {
      const response = await axiosInstance.get("/members");
      setMembers(response.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember({ ...newMember, profile: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!newMember.name) {
      setError("Full Name is required.");
      return;
    }

    setLoading(true);
    setError("");

    const memberData = {
      name: newMember.name,
      role: newMember.role,
      profileImage: newMember.profile,
    };

    try {
      if (editingMember) {
        // Update existing member
        await axiosInstance.put(`/members/${editingMember._id}`, memberData);
      } else {
        // Add new member
        await axiosInstance.post("/members", memberData);
      }
      fetchMembers(); // Refresh the list
      setNewMember({ name: "", role: "Member", profile: "" }); // Reset form
      setEditingMember(null); // Exit editing mode
    } catch (err) {
      setError("Failed to save member. Please try again.");
      console.error("Error saving member:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setNewMember({
      name: member.name,
      role: member.role,
      profile: member.profileImage || "",
    });
    document.getElementById("member-form-section").scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
      try {
        await axiosInstance.delete(`/delete-member/`);
        fetchMembers(); // Refresh the list
        // If the deleted member was being edited, reset the form
        if (editingMember && editingMember._id === id) {
            setNewMember({ name: "", role: "Member", profile: "" });
            setEditingMember(null);
        }
      } catch (err) {
        console.error("Error deleting member:", err);
        setError("Failed to delete member.");
      }
  };
  
  const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/home"; 
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <div className="w-64 bg-gray-900 text-gray-200 flex flex-col shadow-2xl">
        <div className="p-5 border-b border-gray-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Admin</h1>
            <p className="text-xs text-gray-400">Dashboard Panel</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#roles"
            className="flex items-center gap-3 py-2.5 px-4 rounded-lg bg-gray-700 text-white transition-colors"
          >
            <TagIcon />
            Roles
          </a>
          <a
            href="#settings"
            className="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <CogIcon />
            Settings
          </a>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 bg-red-600/90 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition w-full"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-10">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Role Management</h2>
          <p className="text-gray-500 mt-1">Add, edit, and manage member roles.</p>
        </header>

        {/* Add/Edit Form */}
        <div id="member-form-section" className="bg-white shadow-lg rounded-2xl p-6 mb-10">
          <h3 className="text-xl font-semibold mb-5 text-gray-700 border-b pb-3">
            {editingMember ? "Edit Member" : "Add New Member"}
          </h3>
          <form onSubmit={handleAddOrUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name Input */}
              <div>
                <label className="block font-medium mb-1.5 text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newMember.name}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="e.g., John Doe"
                />
              </div>

              {/* Role Select */}
              <div>
                <label className="block font-medium mb-1.5 text-gray-600">Role</label>
                <select
                  name="role"
                  value={newMember.role}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="President">President</option>
                  <option value="VPresident">Vice President</option>
                  <option value="Secretary">Secretary</option>
                  <option value="PIO">PIO</option>
                  <option value="Sargent of arms">Sargent of Arms</option>
                  <option value="Muse">Muse</option>
                  <option value="Escort">Escort</option>
                  <option value="Member">Member</option>
                </select>
              </div>
            </div>

            {/* Profile Image Input */}
            <div>
              <label className="block font-medium mb-1.5 text-gray-600">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />

              {newMember.profile && (
                <img
                  src={newMember.profile}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover mt-3 border-2 border-gray-200 shadow-sm"
                />
              )}
            </div>
            
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <div className="flex items-center gap-4 pt-2">
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center justify-center text-white px-5 py-2.5 rounded-lg transition-all duration-300 font-semibold ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                }`}
              >
                {loading 
                  ? (editingMember ? "UPDATING..." : "ADDING...")
                  : (editingMember ? "Update Member" : "Add Member")
                }
              </button>
              
              {/* Cancel Edit Button */}
              {editingMember && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingMember(null);
                    setNewMember({ name: "", role: "Member", profile: "" });
                    setError("");
                  }}
                  className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Member List Table */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <h3 className="text-xl font-semibold p-5 border-b border-gray-200 text-gray-700">Member List ({members.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 font-semibold text-left">Profile</th>
                <th className="p-4 font-semibold text-left">Name</th>
                <th className="p-4 font-semibold text-left">Role</th>
                <th className="p-4 font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id || member.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    {member.profileImage ? (
                      <img
                        src={member.profileImage} 
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
                        {getInitials(member.name)}
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-800">{member.name}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        member.role === "President"
                          ? "bg-red-100 text-red-700"
                          : member.role === "VPresident"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label="Edit"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(member._id || member.id)}
                      className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label="Delete"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {members.length === 0 && (
            <p className="text-center py-6 text-gray-500">No members found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- ICONS ---
const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5a.997.997 0 01.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
);

const CogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
);

export default Dashboard;