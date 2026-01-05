import { Route } from "react-router-dom";
import { AnnualTurnover } from "../pages/compliance/AnnualTurnover/AnnualTurnover";
import { BankDetails } from "../pages/compliance/BankDetails/BankDetails";

const ComplianceRoutes = () => (
    <Route path="compliance">
        <Route path="annual-turnover" element={<AnnualTurnover />} />
        <Route path="bank-details" element={<BankDetails />} />
    </Route>
);

export default ComplianceRoutes;
