// src/router/index.tsx

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Changed Switch to Routes
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { GlobalStyle } from "../styles/global";

const Router = () => {
  return (
    <Suspense fallback={null}>
      <GlobalStyle />
      <Header />

      <Routes>
        {routes.map((routeItem) => {
          const Page = lazy(() =>
            import(`../pages/${routeItem.component}`)
          );

          return (
            <Route
              key={routeItem.path}
              path={routeItem.path}
              // exact is not needed in v6
              element={<Page />} // ✅ v6 Syntax
            />
          );
        })}
      </Routes>

      <Footer />
    </Suspense>
  );
};

export default Router;