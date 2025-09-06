import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Singup from './Pages/Singup.jsx'
import AllPosts from './Pages/Allpost.jsx'
import EditPost from './Pages/Editpost.jsx'
import Post from './Pages/post.jsx'
import AddPost from './Pages/Addpost.jsx'
import { AuthLayout } from './components/index.js'
const Router = createBrowserRouter(
  [
    {
      path : '/',
      element : <App/>,
      children : [
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/login',
          element:
          <AuthLayout>
            <Login/>
          </AuthLayout>
        },
        {
          path:'/singup',
          element:
            <Singup/>
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
      ]
    },
  ],
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={Router}/>
    </Provider>
  </StrictMode>,
)
