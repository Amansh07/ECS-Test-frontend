import { Route } from "react-router-dom";
import { CropProduction } from "../pages/productionDetails/cropProduction/CropProduction";
import { CommodityProduction } from "../pages/productionDetails/commodityProduction/CommodityProduction";
import { ProductionDetails } from "../pages/productionDetails/ProductionDetails";

const ProductionDetailsRoutes = () => (
    <Route path="production-details">
        <Route index element={<ProductionDetails />} />
        <Route path="crop-production" element={<CropProduction />} />
        <Route path="commodity-production" element={<CommodityProduction />} />
    </Route>
);

export default ProductionDetailsRoutes;
