import React, { useContext, useEffect, useState , useRef} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../auth/Auth";

const Header = () => {
  const { userinfo, setUserinfo } = useContext(UserContext);
  const { setUser } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);

  const menuRef = useRef();
  const hamRef = useRef();

  useEffect(() => {
    if (menu === true) {
      document.body.style.height = "100dvh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "";
      document.body.style.overflow = "";
    }
  }, [menu]);

  useEffect(()=>{
    const handler = (e) =>{
      if(!menuRef.current.contains(e.target) && !hamRef.current.contains(e.target)){
        setMenu(false);
      }
    };
    document.addEventListener('mousedown',handler);

    return () =>{
       document.removeEventListener('mousedown',handler);
    };
  },[]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/profile", {
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setUserinfo({ username: data.username, id: data._id });
        setUser(data.username);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  async function logout() {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      setUserinfo(null);
      setUser(null);
    } catch (e) {
      console.log(e.message);
    }
  }

  const expanded = `w-[50%] transition linear delay-50 transform -translate-x-[50vw] [font-size:clamp(.75rem,1vw+.25rem,1.75rem)] bg-white  flex flex-col  md:gap-12 items-center h-[20rem] justify-center gap-8 fixed right-[-50vw] top-0 [z-index:100]`;
  const collapsed = `w-[50%] transition  [font-size:clamp(.75rem,1vw+.25rem,1.75rem)] bg-white  flex flex-col  md:gap-12 items-center h-[20rem] justify-center gap-8 fixed right-[-50vw] top-0 [z-index:100]`;
  return (
    <>
      <div className="mb-3 flex items-center justify-between text-[#333] max-[450px]:hidden sm:mb-5">
        <Link to="/" className="[font-size:clamp(1.5rem,3vw+.75rem,3.5rem)]">
          Bloggr.
        </Link>
        <div className="flex gap-4 [font-size:clamp(.75rem,1vw+.25rem,1.75rem)] md:gap-12 ">
          {userinfo ? (
            <Link
              to="/create"
              className="rounded-md border-2 border-white p-2 hover:border-black"
            >
              Create new post
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-md border-2 border-white p-2 hover:border-black"
            >
              Login
            </Link>
          )}
          {userinfo ? (
            <a
              onClick={logout}
              className="cursor-pointer rounded-md border-2 border-white p-2 hover:border-black"
            >
              Logout
            </a>
          ) : (
            <Link
              to="/register"
              className="rounded-md border-2 border-white p-2 hover:border-black"
            >
              Register
            </Link>
          )}
        </div>
      </div>
      <div className="min-[450px]:hidden w-[100%] overflow-hidden">
        <Link to="/" className="[font-size:clamp(1.5rem,3vw+.75rem,3.5rem)]">
          Bloggr.
        </Link>
        <button
          onClick={() => setMenu((prev) => !prev)}
          className="absolute right-[.5rem] top-[2rem] flex flex-col gap-1 [z-index:1000]"
          ref={hamRef}
        >
          <span className="block h-1 w-6 bg-[#333]"></span>
          <span className="block h-1 w-6 bg-[#333]"></span>
        </button>
        <div className={menu ? expanded : collapsed} ref={menuRef}>
          {userinfo ? (
            <Link
              to="/create"
              className="rounded-md border-2 border-white p-2 hover:border-black"
            >
              Create new post
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-md border-2 border-white p-2 hover:border-black"
            >
              Login
            </Link>
          )}
          {userinfo ? (
            <a
              onClick={logout}
              className="cursor-pointer rounded-md border-2 border-white p-2 hover:border-black"
            >
              Logout
            </a>
          ) : (
            <Link
              to="/register"
              className="rounded-md border-2 border-white p-2 hover:border-black "
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
