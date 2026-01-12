import { Route } from "react-router-dom";
import { FertilizerDetails } from "../pages/fpoServices/fertilizerDetails/FertilizerDetails";
import { InsecticideOrPesticideDetails } from "../pages/fpoServices/insecticideOrPesticideDetails/InsecticideOrPesticideDetails";
import { FpoServices } from "../pages/fpoServices/FpoServices";
import { Machinery } from "../pages/fpoServices/machinery/Machinery";
import { Infrastructure } from "../pages/fpoServices/fpoServices/infrastructure/Infrastructure";

const FpoServicesRoutes = () => (
  <Route path="fpo-services">
    <Route index element={<FpoServices />} />
    <Route path="fertilizer-details" element={<FertilizerDetails />} />
    <Route path="insecticide-or-pesticide-details" element={<InsecticideOrPesticideDetails />} />
    <Route path="machinery" element={<Machinery />} />
    <Route path="infrastructure" element={<Infrastructure />} />
  </Route>
);

export default FpoServicesRoutes;
