import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ReelMain from "./reels/ReelMain.js";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
// import UserProfile from "./components/userProfile/UserProfile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChannelDetail from "./components/ChannelDetail";
import Feed from "./components/Feed";
import SearchFeed from "./components/SearchFeed";
import VideoDetail from "./components/VideoDetail";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Message from "./pages/message/Message";

function App() {
    const { currentUser } = useContext(AuthContext);

    const { darkMode } = useContext(DarkModeContext);

    const queryClient = new QueryClient();

    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <div className={`theme-${darkMode ? "dark" : "light"}`}>
                    <Navbar />
                    <div style={{ display: "flex", flex: 4 }}>
                        <LeftBar />
                        <div style={{ flex: 4 }}>
                            <Outlet />
                        </div>
                        {/* <RightBar /> */}
                    </div>
                </div>
                <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />

            </QueryClientProvider>
        );
    };

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/profile/:id",
                    element: <Profile />,
                }
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/message",
            element: <Message />
        },

        {
            path: "/videohome",
            element: <Feed />
        },
        {
            path: "/profile",
            element: <Profile />
        },
        {
            path: "/video/:id",
            element: <VideoDetail />
        },
        {
            path: "/channel/:id",
            element: <ChannelDetail />
        },
        {
            path: "/reels",
            element: <ReelMain />
        },
        {
            path: "/search/:searchTerm",
            element: <SearchFeed />
        }
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;