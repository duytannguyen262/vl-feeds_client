import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Collapse, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";

import logo from "../../assets/logo.png";
import searchIcon from "../../assets/icons/search-outline 1.svg";
import userIcon from "../../assets/icons/user.svg";
import logOutIcon from "../../assets/icons/sign-out.svg";
import userImg from "../../assets/user.png";
import angleSmallImg from "../../assets/icons/angle-small-right.svg";
import { logout } from "../../pages/auth/authSlice";

import "./styles.scss";

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();
  const open = Boolean(anchorElUser);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("persist:root");
    const action = logout();
    dispatch(action);
    navigate("/");
  };
  return (
    <>
      <div className="topBar">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="topBar-logo">
            <img src={logo} alt="" />
            <h1 className="topBar-title">Văn Lang Feeds</h1>
          </Link>
          <div className="topBar-search_mobile">
            <Button type="button" onClick={toggle}>
              <img src={searchIcon} alt="" />
            </Button>
          </div>
        </div>
        <div className="topBar-search">
          <Input type="text" placeholder="Tìm kiếm" />
          <img src={searchIcon} alt="" />
        </div>

        <div className="topBar-account">
          {user !== null ? (
            <div className="topBar-account_authed">
              <div onClick={handleOpenUserMenu}>
                <img src={angleSmallImg} alt="" className="profile-more_img" />
                <h3>{user.username}</h3>
                <img src={user.avatar ? user.avatar : userImg} alt="" />
              </div>
              <Menu
                anchorEl={anchorElUser}
                open={open}
                onClose={handleCloseUserMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                style={{ transform: "translateX(-20px)" }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                  className="topBar-account_menu-item"
                >
                  <img src={userIcon} alt="" />
                  <span>Tài khoản</span>
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  className="topBar-account_menu-item"
                >
                  <img src={logOutIcon} alt="" />
                  <span>Đăng xuất</span>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="topBar-account_unauth">
              <Link to="/auth/login">Đăng nhập</Link>
              <span> / </span>
              <Link to="/auth/register">Đăng kí</Link>
            </div>
          )}
        </div>
        <Collapse className="topBar-search_mobile--input" isOpen={isOpen}>
          <Input type="text" placeholder="Tìm kiếm" />
        </Collapse>
      </div>
    </>
  );
};

export default TopBar;
