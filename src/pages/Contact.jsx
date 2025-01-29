import { Link, Route, Routes } from "react-router-dom";

const Contact = () => {
  // Step Components
  const StepOne = () => (
    <div>
      <h2>Step 1: Enter your details</h2>
      {/* Your Step 1 content goes here */}
    </div>
  );

  const StepTwo = () => (
    <div>
      <h2>Step 2: Choose your options</h2>
      {/* Your Step 2 content goes here */}
    </div>
  );

  const StepThree = () => (
    <div>
      <h2>Step 3: Confirm your information</h2>
      {/* Your Step 3 content goes here */}
    </div>
  );

  return (
    <div>
      <h2>Contact Page</h2>
      <p>Feel free to reach out to us through this page.</p>
      <Link to="/contact">Step -1 </Link>|{" "}
      <Link to="/contact/step-2">Step -2 </Link>|{" "}
      <Link to="/contact/step-3">Step -3 </Link>|
      <Routes>
        <Route index element={<StepOne />} />
        <Route path="step-2" element={<StepTwo />} />
        <Route path="step-3" element={<StepThree />} />
      </Routes>
    </div>
  );
};

export default Contact;
