import React, { useState } from 'react';

import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];


import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../app/features/auth/authSlice';
import { removeFromLocalStorage } from '../../app/features/localStorage';
import api from '../../utils/baseURL';


export default function ProfileMenu({ userData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = userData?.stsTokenManager.accessToken;

  const logout = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Make API request to add task
      const response = await api.get('/api/users/logout', { headers });
      if (response.data.success == true) {
        console.log("Logged out successfully");
        dispatch(logoutAction());
        removeFromLocalStorage();
        navigate('/login')
      }

    } catch (error) {
      console.error(error);
    }

  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full pr-2 pl-0.5 px-2 lg:ml-auto"
        >
          {userData && userData.photoURL ? (
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={userData.photoURL}
            />
          ) : (
            <Typography
              className="text-[#333] text-[16px] font-bold cursor-pointer"
            >
              {userData && userData.displayName ? userData.displayName.slice(0, 2).toUpperCase() : ''}
            </Typography>
          )}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={(label === 'Sign Out') ? logout : closeMenu}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
} 