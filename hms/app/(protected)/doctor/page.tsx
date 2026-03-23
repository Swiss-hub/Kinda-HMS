import React from "react";

const DoctorDashboard = () => {
  return <div>DoctorDashboard</div>;
};

export default DoctorDashboard;

// import { checkRole } from "@/utils/roles";

// export default async function DoctorDashboard() {
//   const isAdmin = await checkRole("admin");
//   const isDoctor = await checkRole("doctor");

//   if (!isDoctor) {
//     return <p>You are not authorized to view this page.</p>;
//   }

//   return (
//     <p>
//       This is the protected doctor dashboard restricted to users with the
//       'doctor' Role.
//     </p>
//   );
// }
