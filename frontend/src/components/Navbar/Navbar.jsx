
import logo from "../../assets/logo.png";
import {Navbar, Typography} from "@material-tailwind/react";
import ProfileMenu from "../Profile/ProfileMenu";
import { useSelector } from "react-redux";
import { useEffect } from "react";
 
export function ComplexNavbar() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userData){
      // console.log("token", userData?.stsTokenManager.accessToken);
    }    
  }, [userData]);
    

  return (
    <Navbar className="mx-auto max-w-screen-xl flex flex-row justify-between p-2 lg:rounded-xl lg:pl-6">
      <div className="relative flex justify-start md:justify-between">
        <img 
            src={logo}
            alt="logo"
            className="w-14"
        />
        <Typography          
          className="text-[#333] text-[18px] font-bold cursor-pointer my-auto"
        >
          TASKS
        </Typography>
      </div>
      {isLoggedIn && <ProfileMenu userData={userData} /> }
        
    </Navbar>
  );
}