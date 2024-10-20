import { Button } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutsuccess } from "../Redux/User/UserSlice";
const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      const res = await fetch(
        "https://fyp-project-tiest-backend.vercel.app/api/auth/signout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      } else {
        dispatch(signoutsuccess());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {currentUser && (
        <div className="text-center">
          <p className="text-center mt-10 font-bold text-3xl">
            Welcome {currentUser.fullName} !
          </p>
          <Button className="mx-auto mt-5" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
