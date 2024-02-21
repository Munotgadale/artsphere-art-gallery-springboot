import React from "react";
import "./dashboard.css";
import { AdminNavigationbar } from "../components/AdminNavigationBar";
import videoFile from '../img_art/video/2.mp4'; 
import videoFile1 from '../img_art/video/3.mp4'; 

const AdminDashboard = () => {
  return (
    <div className="temp">
      <AdminNavigationbar />
      <h1>Welcome Admin...</h1>
      <div>
      <video src={videoFile} className="mt-4" autoPlay loop muted playsInline />
      <video src={videoFile1} className="mt-4" autoPlay loop muted playsInline />
      </div>
    </div>
  );
};

export default AdminDashboard;
