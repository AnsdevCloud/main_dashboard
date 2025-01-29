import RoleBasedSettings from "../components/RoleBasedAccess";

const About = () => {
  return (
    <div>
      <h2>About Page</h2>
      <p>Learn more about us on this page.</p>
      <RoleBasedSettings />
    </div>
  );
};

export default About;
