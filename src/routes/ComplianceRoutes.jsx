import { Route } from "react-router-dom";
import { Compliance } from "../pages/compliance/Compliance";
import { AnnualTurnover } from "../pages/compliance/AnnualTurnover/AnnualTurnover";
import { BankDetails } from "../pages/compliance/BankDetails/BankDetails";

const ComplianceRoutes = () => (
  <Route path="compliance">
    <Route index element={<Compliance />} />
    <Route path="annual-turnover" element={<AnnualTurnover />} />
    <Route path="bank-details" element={<BankDetails />} />
  </Route>
);

export default ComplianceRoutes;

