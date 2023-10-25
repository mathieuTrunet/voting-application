import { useState } from "react";
import NavigationBar from "./components/navigationBar";
import UserPage from "./pages/UserPage/userPage";
import AdministrationPage from "./pages/administrationPage";

export default function App() {
  const [status, setStatus] = useState<"user" | "administrator">("administrator");

  return (
    <>
      <NavigationBar />
      {status === "user" ? <UserPage /> : <AdministrationPage />}
    </>
  );
}
