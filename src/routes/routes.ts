import salesRoutes from "./Sales/SalesRoute";
import purchaseRoutes from "./Purchase/PurchaseRoute";
import dasheRoutes from "./DashBoardRoute/DashBoard";
import contactRoutes from "./ContactRoute/ContactRoute";
import reportRoutes from "./ReportRoute/ReportRoute";
import productRoute from "./Productroute/ProductRoute";

const allRoutes = [
    ...salesRoutes,
    ...purchaseRoutes,
    ...dasheRoutes,
    ...contactRoutes,
    ...reportRoutes,
    ...productRoute,    
];

export default allRoutes;