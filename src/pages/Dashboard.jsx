import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="/dashboard/profile">Profile</Link> |
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default Dashboard;
