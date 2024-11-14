import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutsuccess } from "../Redux/User/UserSlice";
import bannerImg from "../assets/Images/Home/banner-img.png";
const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      } else {
        dispatch(signoutsuccess());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      {/* HERO SECTION  */}


      {/* Sign out  */}
      {/* <div>
        {currentUser && (
          <div className="text-center">
            <p className="text-center mt-10 font-bold text-3xl">
              Welcome {currentUser.name} !
            </p>
            <Button
              className="mx-auto mt-5"
              gradientDuoTone="purpleToPink"
              type="submit"
              onClick={handleSignOut}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Signing out ...</span>
                </>
              ) : (
                "Sign Out"
              )}
            </Button>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Home;
