import { Logo, Logout, Container, Button } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const UserStatus = useSelector((state) => state.auth.status);
  const NavItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: true,
    },
    {
      name: "All Post",
      slug: "/all-posts",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !UserStatus,
    },
    {
      name: "Sing in",
      slug: "/singup",
      active: !UserStatus,
    },
  ];
  return (
    <>
      <Container className = 'bg-zinc-800 text-zinc-100 mt-5 h-max py-2 px-3 rounded-3xl border-zinc-700'>
        <nav className="flex justify-around">
          <div className="mr-4">
            <Link to="/">
              <Logo className={`w-20 bg-zinc-200 rounded-full`} />
            </Link>
          </div>
          <ul className="flex ml-auto h-full w-max text-2xl my-auto font-mono">
            {NavItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-zinc-700 hover:text-zinc-400 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {UserStatus && <Logout />}
          </ul>
        </nav>
      </Container>
    </>
  );
}
