import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getInitials } from "../utils/Helper";
import axiosInstance from "../utils/axiosInstance";

const MemberCard = ({ member }) => (
  <div className="bg-gray-900/80 backdrop-blur-sm border border-yellow-600/20 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-yellow-500/30 hover:-translate-y-1 hover:border-yellow-600/50">
    <div className="p-6 flex flex-col items-center text-center">
      {member.profileImage ? (
        <img
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 shadow-md mb-4"
          src={member.profileImage}
          alt={member.name}
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-gray-400 mb-4 border-4 border-gray-700 shadow-md">
          {getInitials(member.name)}
        </div>
      )}
      <h3 className="text-xl font-bold text-white truncate w-full" title={member.name}>
        {member.name}
      </h3>
      <p className="text-yellow-400 font-semibold text-sm mt-1">{member.role}</p>
    </div>
  </div>
);

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axiosInstance.get("/members");
        const sortedMembers = response.data.sort((a, b) => {
          if (a.role === "President") return -1;
          if (b.role === "President") return 1;
          if (a.role === "VPresident") return -1;
          if (b.role === "VPresident") return 1;
          return a.name.localeCompare(b.name);
        });
        setMembers(sortedMembers);
      } catch (err) {
        setError("Failed to fetch members. Please try again later.");
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: "url('/images/image.jpg')" }}
    >
      <div className="absolute inset-0 bg-neutral-900/80"></div>
      <Navbar />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-500 tracking-tight">
            Our Valued Members
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-300">
            Meet the dedicated individuals who form the heart of our church community.
          </p>
        </header>

        {loading && (
          <div className="text-center py-10 text-lg text-yellow-400">
            Loading members...
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-lg text-red-400 bg-red-900/50 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && members.length === 0 && (
          <div className="text-center py-10 text-lg text-gray-400">
            No members to display at the moment.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
