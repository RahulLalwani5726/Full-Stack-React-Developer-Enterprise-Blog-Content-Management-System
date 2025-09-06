import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import AuthService from "./Appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/Features/authSlice";
import { Header, Footer, Loader } from "./components/index";
import { Outlet } from "react-router-dom";
function App() {
  const [loding, setLoding] = useState(true);
  const Dispatch = useDispatch();
  useEffect(() => {
    setLoding(true);
    AuthService.getUser()
      .then((userData) => {
        if (userData) {
          Dispatch(login({ userData }));
        } else useDispatch(null);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoding(false));
  }, []);
  return (
    <>
      <Loader isEnabled={loding} />
      <div className="h-auto min-h-screen flex flex-col justify-between bg-zinc-900">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
