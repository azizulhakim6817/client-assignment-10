import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { signInWithGoogle, singInUser, error, setError } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Optional password validation (usually for register)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    // Call your login function
    singInUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        toast.success("Login successful!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Please register first or check your credentials!");
      });
  };

  //! signInWithGoogle
  const handlerSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-[300px]  md:w-[400px] shrink-0 shadow-xl">
            <div className="card-body ">
              <h1 className="text-xl md:text-2xl font-bold text-center text-yellow-600">
                Login Now!
              </h1>

              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Email :</label>
                  <input
                    type="email"
                    name="email"
                    className="input w-full"
                    placeholder="Email"
                    required
                  />

                  <label className="label">Password :</label>
                  <input
                    type="password"
                    name="password"
                    className="input w-full"
                    placeholder="Password"
                    required
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}

                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn bg-yellow-400 text-black mt-4">
                    Login
                  </button>
                </fieldset>
              </form>
              {/* Google----------*/}
              <button
                onClick={handlerSignInWithGoogle}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
              {/* redirect to login form*/}
              <p className="mt-2 text-center">
                <span>Already have an account? Please </span>
                <Link
                  to="/register"
                  className="text-blue-500 font-bold underline decoration-yellow-600 hover:text-blue-700"
                >
                  <span className="text-yellow-600 hover:text-blue-500">
                    Register
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
