import React from "react";

const PatientDashboard = () => {
  return <div>PatientDashboard</div>;
};

export default PatientDashboard;

// import { checkRole } from "@/utils/roles";

// export default async function PatientDashboard() {
//   const isAdmin = await checkRole("admin");
//   const isDoctor = await checkRole("doctor");
//   const isPatient = await checkRole("patient");

//   if (!isPatient) {
//     return <p>You are not authorized to view this page.</p>;
//   }

//   return <div>patient</div>;
// }
