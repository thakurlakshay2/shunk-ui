"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wallet, CalendarDays, Mail, DollarSign } from "lucide-react";
import { ProfileProps } from "./typings";

const ProfilePage: React.FC<ProfileProps> = ({
  name,
  email,
  walletAddress,
  dateOfBirth,
  joinDate,
  portfolioValue,
  profileImage,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="relative">
            {profileImage && (
              <Image
                src={profileImage}
                alt={`${name}'s profile`}
                width={150}
                height={150}
                className="rounded-full border-4 border-blue-200 shadow-lg"
              />
            )}
            <motion.div
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <DollarSign size={20} />
            </motion.div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <ProfileDetail
            icon={<Mail className="text-blue-500" />}
            label="Email"
            value={email}
          />
          <ProfileDetail
            icon={<Wallet className="text-blue-500" />}
            label="Wallet Address"
            value={walletAddress}
          />
          <ProfileDetail
            icon={<CalendarDays className="text-blue-500" />}
            label="Date of Birth"
            value={dateOfBirth}
          />
          <ProfileDetail
            icon={<CalendarDays className="text-blue-500" />}
            label="Join Date"
            value={joinDate}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 rounded-xl p-4 text-center"
        >
          <div className="flex items-center justify-center space-x-2">
            <DollarSign className="text-blue-600" />
            <span className="text-xl font-bold text-gray-800">
              Total Portfolio Value
            </span>
          </div>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">
            ${portfolioValue.toLocaleString()}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const ProfileDetail: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-xl">
    <div className="bg-white p-2 rounded-full shadow-md">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default ProfilePage;
