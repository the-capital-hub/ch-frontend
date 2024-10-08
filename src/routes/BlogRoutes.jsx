import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import SuspenseLoader from "../components/SuspenseLoader/SuspenseLoader";

const Blog = lazy(() => import("../components/Blog/Blog"));

const MeeshoBlog = lazy(() => import("../pages/Blogs/MeeshoBlog/MeeshoBlog"));
const GoodDotBlog = lazy(() =>
  import("../pages/Blogs/GoodDotBlog/GoodDotBlog")
);
const MyKareBlog = lazy(() => import("../pages/Blogs/MyKareBlog/MyKareBlog"));
const UXBlog = lazy(() => import("../pages/Blogs/UXBlog/UXBlog"));
const BlogDetailed = lazy(() =>
  import("../components/Blog/BlogDetailed/BlogDetailed")
);
const StartUpBlogOne = lazy(() =>
  import("../components/Blog/StartUpBlog/StartUpBlogOne")
);
const StartUpBlogTwo = lazy(() =>
  import("../components/Blog/StartUpBlog/StartUpBlogTwo")
);
const StartUpBlogThree = lazy(() =>
  import("../components/Blog/StartUpBlog/StartUpBlogThree")
);
const StartUpBlogFour = lazy(() =>
  import("../components/Blog/StartUpBlog/StartUpBlogFour")
);
const StartUpBlogFive = lazy(() =>
  import("../components/Blog/StartUpBlog/StartUpBlogFive")
);

function BlogRoutes() { 
  return (
    <>
      <Route
        index
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <Blog />
          </Suspense>
        }
      />
      <Route
        path="meesho-revolutionising-e-commerce-for-entrepreneurs"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <MeeshoBlog />
          </Suspense>
        }
      />
      <Route
        path="sustainable-alternative-to-traditional-meat-products-gooddot-as-example"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <GoodDotBlog />
          </Suspense>
        }
      />
      <Route
        path="empowering-patient-care-mykare-health-innovative-approach-to-healthtech"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <MyKareBlog />
          </Suspense>
        }
      />
      <Route
        path="webdevlopment"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <BlogDetailed />
          </Suspense>
        }
      />
      <Route
        path="startupOne"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <StartUpBlogOne />
          </Suspense>
        }
      />
      <Route
        path="startupTwo"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <StartUpBlogTwo />
          </Suspense>
        }
      />
      <Route
        path="startupThree"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <StartUpBlogThree />
          </Suspense>
        }
      />
      <Route
        path="telemedicine-health-revolution-at-your-fingertips-medtel-health-care-company-leading-the-way"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <StartUpBlogFour />
          </Suspense>
        }
      />
      <Route
        path="how-zomato-is-revolutionising-the-food-supply-chain-through-food-technology"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <StartUpBlogFive />
          </Suspense>
        }
      />
      <Route
        path="ux-how-it-can-be-a-differentiator-in-a-crowded-marketplace"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <UXBlog />
          </Suspense>
        }
      />
    </>
  );
}

export default BlogRoutes;
