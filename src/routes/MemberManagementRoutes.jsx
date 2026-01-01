import { Route } from "react-router-dom";
import { Farmers } from "../pages/memberManagement/Farmers/Farmers";
import { BoardMembers } from "../pages/memberManagement/boardMembers/BoardMembers";
import { Resources } from "../pages/memberManagement/resources/Resources";
import { Mentors } from "../pages/memberManagement/mentors/Mentors";
import MainLayout from "../layouts/MainLayout";
import { MemberManagement } from "../pages/memberManagement/MemberManagement";
import { BoardMembersCompanyAct } from "../pages/memberManagement/boardMembers/BoardMembersCompanyAct";

const MemberManagementRoutes = () => (
  <Route path="member-management">
    <Route index element={<MemberManagement />} />
    <Route path="farmers" element={<Farmers />} />
    <Route path="board-members" element={<BoardMembers />} />
    <Route path="board-members-company-act" element={<BoardMembersCompanyAct />} />
    <Route path="resources" element={<Resources />} />
    <Route path="mentors" element={<Mentors />} />
  </Route>
);

export default MemberManagementRoutes;
