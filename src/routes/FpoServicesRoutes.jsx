import { Route } from "react-router-dom";
import { FertilizerDetails } from "../pages/fpoServices/fertilizerDetails/FertilizerDetails";
import { InsecticideOrPesticideDetails } from "../pages/fpoServices/insecticideOrPesticideDetails/InsecticideOrPesticideDetails";
import { FpoServices } from "../pages/fpoServices/FpoServices";

const FpoServicesRoutes = () => (
  <Route path="fpo-services">
    <Route index element={<FpoServices />} />
    <Route path="fertilizer-details" element={<FertilizerDetails />} />
    <Route path="insecticide-or-pesticide-details" element={<InsecticideOrPesticideDetails />} />
  </Route>
);

export default FpoServicesRoutes;
