import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ThemeProviderWrapper } from "./theme/ThemeContext";
const App = () => {
  return (
    <ThemeProviderWrapper>
      <RouterProvider router={router} />
    </ThemeProviderWrapper>
  );
};
export default App;
