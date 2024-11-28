import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const Logout = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt");
  if (!token) {
    alert("Re-login Error");
  } else {
    (await cookieStore).delete("jwt");
    redirect("/login");
  }

  return <div>Logout-page</div>;
};
export default Logout;
