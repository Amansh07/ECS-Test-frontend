import { Route } from "react-router-dom";
import { Compliance } from "../pages/compliance/Compliance";
import { AnnualTurnover } from "../pages/compliance/AnnualTurnover/AnnualTurnover";
import { Capital } from "../pages/compliance/Capital";
import { BankDetails } from "../pages/compliance/BankDetails/BankDetails";
import { AGMMeeting } from "../pages/compliance/AGMMeeting/AGMMeeting";
import { LicenseUpdate } from "../pages/compliance/LicenseUpdate/LicenseUpdate";

const ComplianceRoutes = () => (
  <Route path="compliance">
    <Route index element={<Compliance />} />
    <Route path="annual-turnover" element={<AnnualTurnover />} />
    <Route path="fpo-capital" element={<Capital />} />
    <Route path="agm-meeting" element={<AGMMeeting />} />
    <Route path="bank-details" element={<BankDetails />} />
	<Route path="license-update" element={<LicenseUpdate />} />
  </Route>
);

export default ComplianceRoutes;

