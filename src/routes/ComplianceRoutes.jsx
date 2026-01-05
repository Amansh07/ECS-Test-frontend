import { Route } from "react-router-dom";
import { AnnualTurnover } from "../pages/compliance/AnnualTurnover/AnnualTurnover";

const ComplianceRoutes = () => (
    <Route path="compliance">
        <Route path="annual-turnover" element={<AnnualTurnover />} />
    </Route>
);

export default ComplianceRoutes;
