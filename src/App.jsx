import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ThemeProviderWrapper } from "./theme/ThemeContext";
import { TabsProvider } from "./stores/TabsContex";

const App = () => {
  return (
    <ThemeProviderWrapper>
      <TabsProvider>
        <RouterProvider router={router} />
      </TabsProvider>
    </ThemeProviderWrapper>
  );
};
export default App;
