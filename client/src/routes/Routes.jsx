import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import { lazy  , Suspense} from "react";
import PageNotFound from '../pages/PageNotFound';
import AppLayout from '../components/AppLayout';
import AboutPage from '../pages/AboutPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import ProtectedRoute from '../components/ProtectedRoute';
import Chat from '../pages/Chat';
import DevelopersInfo from '../pages/DeveloperInfo';
import ContactPage from '../pages/ContactPage';
import ProfilePage from '../pages/ProfilePage';
const HomePage = lazy(() => import("../pages/HomePage")) ;
function Routes() {
    const routes = createBrowserRouter(
        [
          {
            path : "/",
            element : <AppLayout/>,
            children : [
              {
                path : "",
                element : <HomePage/>
              },
              {
                path : "about",
                element : <AboutPage/>
              },
              {
                path : "chat",
                element : (
                <ProtectedRoute>
                  <Chat/>
                </ProtectedRoute>
                )
              },
              {
                path : "contact",
                element : <ContactPage/>
              },
              {
                path : "signIn",
                element : <SignInPage/>
              },
              {
                path : "signUp",
                element : <SignUpPage/>
              },
              {
                path : "developerInfo",
                element : <DevelopersInfo/>
              },
              {
                path : "profile",
                element : <ProfilePage/>
              },

            ]
          },
          {
            path : "*",
            element : <PageNotFound/>,
          }
        ]
      )
    return (
        <Suspense>
            <RouterProvider router={routes}/>
        </Suspense>
    )
}

export default Routes
