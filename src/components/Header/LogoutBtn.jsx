import { logout } from "../../store/Features/authSlice";
import { useDispatch } from "react-redux";
import AuthService from "../../Appwrite/auth";
export default function Logout() {
  const Dispatch = useDispatch();
  async function onLogout() {
    await AuthService.logout()
      .then(() => Dispatch(logout))
      .catch(() => console.log("Error in logout at logoutBtn"));
    window.location.reload();
  }
  return (
    <button
      className="inline-bock px-6 py-2 my-auto text-2xl duration-200 hover:bg-zinc-700 hover:text-zinc-400 rounded-full font-mono"
      onClick={onLogout} 
    >
      Logout
    </button>
  );
}
