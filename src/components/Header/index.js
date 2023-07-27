import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/user.svg";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  function logout() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged out successfully !");
          navigate("/");
        })
        .catch((error) => {
          toast(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Financely.</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src={user?.photoURL ? user?.photoURL : userImg}
            width={user?.photoURL ? "32" : "24"}
            style={{ borderRadius: "50%" }}
            alt="user img"
          />
          <button
            className="link"
            onClick={logout}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <FaSignOutAlt style={{ fontSize: "20px", color: "white", fontWeight:"bold", marginRight: "1rem"}} ></FaSignOutAlt>
          
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
