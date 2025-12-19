import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PreRegistrationPage from "./pages/registration/PreRegistrationPage";
import Registration from "./pages/registration/Registration";
;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
        <Route path="/" element={<Registration />} />
		<Route path="/registration-details" element={<PreRegistrationPage />}/>
		<Route path="/registration" element={<Registration />} />
		{/* other routes */}
        </Route>
	  </Routes>
    </BrowserRouter>
  );
}





