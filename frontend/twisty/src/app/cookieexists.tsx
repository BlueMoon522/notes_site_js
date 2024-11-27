import { useEffect } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const CookiesExist = () => {
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("jwt");
        console.log(token);
        if (!token) {
          console.log("Redirecting to /login...");
          redirect("/login"); // Ensure no content renders before this call
        } // Set the ID
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserId();
  }, []);
  return;
};
export default CookiesExist;
