/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();

  const navitage = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: "https://lacha.s2tek.net/v1/Auth",
      headers: {
        "Content-Type": "application/json",
      },
      data: { username: email, password },
    })
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.data.roleId);
        const user = userCredential.data;
        dispatch({ type: "LOGIN", payload: { ...user, email } });
        user.roleId === 3
          ? navitage("/")
          : user.roleId === 2 
          ? navitage("/request")
          : navitage("/products");
      })
      .catch((error) => {
        setError(true);
        navitage("/Unauthorized");
      });
  };

  const SignInGoogle = async () => {
    const { user } = await signInWithPopup(auth, provider);
    const { providerData, accessToken } = user;

    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    console.log(accessToken);

    const postData = accessToken;

    axios({
      method: "POST",
      url: `https://lacha.s2tek.net/api/CustomToken/TokenWeb?token=${postData}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data.roleId);
        dispatch({ type: "LOGIN", payload: response.data });
        response.data.roleId === 3
          ? navitage("/")
          : response.data.roleId === 2 
          ? navitage("/request")
          : navitage("/products");
      })
      .catch((error) => {
        console.log(error);
        navitage("/Unauthorized");
      });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <img
        className="absolute top-0 left-0 w-screen h-screen object-cover bg-black bg-opacity-50"
        src="https://anhdepfree.com/wp-content/uploads/2018/11/animated-sky-wallpaper-hinh-nen-bau-troi-09.jpg"
      />
      <div className="w-full p-6 m-auto z-10 bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">
          LaCha
        </h1>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href="#" className="text-xs text-green-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
              Login
            </button>
            {error && (
              <span className="text-red-700">Wrong email or password!</span>
            )}
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>
        <div className="flex mt-4 gap-x-2">
          <button
            type="button"
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-green-600"
            onClick={SignInGoogle}
          >
            <FcGoogle className="w-8 h-6 fill-current" /> Login with Google
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a href="#" className="font-medium text-green-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;