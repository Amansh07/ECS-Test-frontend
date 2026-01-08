import { Route } from "react-router-dom";
import { Compliance } from "../pages/compliance/Compliance";
import { AnnualTurnover } from "../pages/compliance/AnnualTurnover/AnnualTurnover";
import { BankDetails } from "../pages/compliance/BankDetails/BankDetails";
import { LicenseUpdate } from "../pages/compliance/LicenseUpdate/LicenseUpdate";

const ComplianceRoutes = () => (
  <Route path="compliance">
    <Route index element={<Compliance />} />
    <Route path="annual-turnover" element={<AnnualTurnover />} />
    <Route path="bank-details" element={<BankDetails />} />
	<Route path="license-update" element={<LicenseUpdate />} />
  </Route>
);

export default ComplianceRoutes;

