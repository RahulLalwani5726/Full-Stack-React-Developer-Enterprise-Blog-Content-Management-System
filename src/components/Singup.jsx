import { useDispatch } from "react-redux";
import AuthService from "../Appwrite/auth";
import { useState } from "react";
import { login } from "../store/Features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button, Logo, Loader } from "./index";
export default function Singup() {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const CreateAccount = async (data) => {
    setError("");
    try {
      setLoader(true);
      const CreateReq = await AuthService.sing_Up(data);
      if (CreateReq) {
        await AuthService.getUser().then(userData => {
          if (userData) {
          dispatch(login({userData}));
          navigate("/");
        }
        });
      }
    } catch (error) {
      setError(error.message);
    }
    setLoader(false);
  };
  return (
    <>
      <Loader isEnabled={loader} />
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(CreateAccount)}>
            <div className='space-y-5' >
              <Input
                label="Full Name: "
                type="text"
                placeholder="Enter Your Full Name: "
                {...register("name", {
                  required: true,
                })}
              />
              <Input
                label="Email: "
                type="email"
                placeholder="Enter Your Email: "
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <div style={{ position: "relative" }}>
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  {...register("password", {
                    required: true,
                  })}
                  style={{ paddingRight: "40px" }} // 👈 important
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    right: 12,
                    top: "70%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    padding: 0,
                    width: "24px",
                    height: "24px",
                  }}
                >
                  <img
                  className="m-auto"
                    src={
                      !showPassword
                        ? "https://cdn-icons-png.flaticon.com/512/159/159604.png"
                        : "https://cdn-icons-png.flaticon.com/512/10812/10812267.png"
                    }
                    alt="Toggle Password"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </button>
              </div>

              <Button child="Submit" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
