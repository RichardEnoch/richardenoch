// src/main.jsx or src/index.jsx
import React from "react";
import ReactDom from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams,
} from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
const About = React.lazy(() => import("./pages/About.jsx"));

const Projects = React.lazy(() => import("./pages/Projects.jsx"));
const RateDetails = React.lazy(() => import("./pages/RateDetails.jsx"));
const GraphicDesignPage = React.lazy(() => import("./pages/GraphicDesignPage"));
const WebsiteDesignPage = React.lazy(() => import("./pages/WebsiteDesignPage.jsx"));
const YDpayPage = React.lazy(() => import("./pages/YDpayPage.jsx"));
const SavedupProject = React.lazy(() => import("./pages/SavedupProject.jsx"));
const SnotesProject = React.lazy(() => import("./pages/SnotesProject.jsx"));
const QuivProject = React.lazy(() => import("./pages/QuivProject.jsx"));
const TabStudioProject = React.lazy(() => import("./pages/TabStudioProject.jsx"));
const VerdeLuxeProject = React.lazy(() => import("./pages/VerdeLuxeProject.jsx"));
const CleansteadProject = React.lazy(() => import("./pages/CleansteadProject.jsx"));
const BookRionProject = React.lazy(() => import("./pages/BookRionProject.jsx"));
const ADLMStudioPage = React.lazy(() => import("./pages/ADLMStudioPage.jsx"));
const NiqsUIProject = React.lazy(() => import("./pages/NiqsUIProject.jsx"));
const YDpayBrandPage = React.lazy(() => import("./pages/YDpayBrandPage.jsx"));
const WhitespacePage = React.lazy(() => import("./pages/WhitespacePage.jsx"));
const YDpayDesignPage = React.lazy(() => import("./pages/YDpayDesignPage.jsx"));
const Contact = React.lazy(() => import("./pages/Contact.jsx"));
const PresentationDesignPage = React.lazy(() => import("./pages/PresentationDesignPage.jsx"));
const BookPlan = React.lazy(() => import("./pages/BookPlan.jsx"));
const TestimonialPage = React.lazy(() => import("./pages/TestimonialPage.jsx"));
const BookFlyer = React.lazy(() => import("./pages/BookFlyer.jsx"));
const BookWebsite = React.lazy(() => import("./pages/BookWebsite.jsx"));
const OfferPage = React.lazy(() => import("./pages/OfferPage.jsx"));

// Redirect component that preserves slug params
const RedirectWithSlug = ({ basePath }) => {
  const { slug } = useParams();
  return <Navigate to={slug ? `${basePath}/${slug}` : basePath} replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },

      { path: "projects", element: <Projects /> },
      { path: "projects/niqs", element: <Navigate to="/ui-projects/niqs" replace /> },
      { path: "projects/tabstudio", element: <TabStudioProject /> },
      { path: "projects/verde-luxe", element: <VerdeLuxeProject /> },
      { path: "projects/cleanstead", element: <CleansteadProject /> },
      { path: "projects/book-rion", element: <BookRionProject /> },
      { path: "projects/ydpay-brand", element: <YDpayBrandPage /> },
      { path: "graphic-design", element: <GraphicDesignPage /> },
      { path: "adlm-studio-designs", element: <ADLMStudioPage /> },
      { path: "whitespace-designs", element: <WhitespacePage /> },
      { path: "ydpay-designs", element: <YDpayDesignPage /> },
      { path: "website-design", element: <WebsiteDesignPage /> },
      { path: "rate-details", element: <RateDetails /> },
      { path: "book", element: <BookPlan /> },
      { path: "book-flyer", element: <BookFlyer /> },
      { path: "book-website", element: <BookWebsite /> },
      { path: "offer/:token", element: <OfferPage /> },
      { path: "contact", element: <Contact /> },
      { path: "testimonial", element: <TestimonialPage /> },
      { path: "presentation-design", element: <PresentationDesignPage /> },
      // Every case study now has its own route above. Anything else that used
      // to be served from the database falls back to the projects index.
      { path: "projects/:slug", element: <Navigate to="/projects" replace /> },

      // ✅ UI Projects (plural) — matches your navigate(`/ui-projects/${slug}`)
      { path: "ui-projects", element: <Navigate to="/projects" replace /> },
      { path: "ui-projects/ydpay-mobile-redesign", element: <YDpayPage /> },
      { path: "ui-projects/savedup", element: <SavedupProject /> },
      { path: "ui-projects/niqs", element: <NiqsUIProject /> },
      { path: "ui-projects/snotes", element: <SnotesProject /> },
      // Quiv deactivated until real screens exist — redirect to the projects index
      { path: "ui-projects/quiv", element: <Navigate to="/ui-projects" replace /> },
      { path: "ui-projects/:slug", element: <Navigate to="/projects" replace /> },

      // keep old links working by redirecting (preserving slug)
      { path: "ui-project", element: <Navigate to="/ui-projects" replace /> },
      {
        path: "ui-project/:slug",
        element: <RedirectWithSlug basePath="/ui-projects" />,
      },


      // 404 catch-all
      {
        path: "*",
        element: (
          <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-2 text-neutral-400">Page not found</p>
            <a href="/" className="mt-4 text-lime-400 hover:underline">Go home</a>
          </div>
        ),
      },
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* reducedMotion="user" makes every motion component on the site honour
          the visitor's OS setting: transform and layout animations are held at
          their target value, while opacity and colour still cross-fade. That
          matters here because ~55 files animate and only one of them checked
          the preference on its own — this covers all of them at the root
          rather than asking every future component to remember. */}
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </HelmetProvider>
  </React.StrictMode>,
);
