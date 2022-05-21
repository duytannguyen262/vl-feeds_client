import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Collapse, Input } from "reactstrap";
import { Button, IconButton, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";

import logo from "../../assets/logo.png";
import searchIcon from "../../assets/icons/search-outline 1.svg";
import userIcon from "../../assets/icons/user.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import logOutIcon from "../../assets/icons/sign-out.svg";
import userImg from "../../assets/user.png";
import angleSmallImg from "../../assets/icons/angle-small-right.svg";
import { logout } from "../../pages/auth/authSlice";
import { searchFilterChange } from "./filterSlice";

import "./styles.scss";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../../util/graphql";

const RegisterButton = styled(Button)({
  background: "#fe4445",
  "&:hover": {
    background: "#fe4445",
  },
});
const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const { refetch } = useQuery(FETCH_POSTS_QUERY, {
    variables: {
      limit: 15,
    },
  });
  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorElUser);

  const { pathname } = useLocation();
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

  const [searchValues, setSearchValues] = useState("");
  const handleSearchChange = (e) => {
    setSearchValues(e.target.value);
    dispatch(searchFilterChange(e.target.value));
  };

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
    if (window.scrollY === 0) {
      refetch();
    }
  };

  return (
    <>
      <div className="topBar">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="topBar-logo" onClick={handleLogoClick}>
            <img src={logo} alt="" />
            <h1 className="topBar-title">Văn Lang Feeds</h1>
          </Link>
          {pathname === "/" && (
            <div className="topBar-search_mobile">
              <IconButton type="button" onClick={toggle}>
                <img src={searchIcon} alt="" />
              </IconButton>
            </div>
          )}
        </div>
        {pathname === "/" && (
          <div className="topBar-search">
            <Input
              type="text"
              placeholder="Tìm kiếm theo danh mục"
              value={searchValues}
              onChange={handleSearchChange}
            />
            <img src={searchIcon} alt="" />
          </div>
        )}

        <div className="topBar-account">
          {user !== null ? (
            <div className="topBar-account_authed">
              <div onClick={handleOpenUserMenu}>
                <img src={angleSmallImg} alt="" className="profile-more_img" />
                <h3>{user.username}</h3>
                <img src={user.avatar.url ? user.avatar.url : userImg} alt="" />
              </div>
              <Menu
                anchorEl={anchorElUser}
                open={open}
                onClose={handleCloseUserMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                style={{
                  transform: "translateX(-20px)",
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate(`/user/${user.id}`);
                  }}
                  className="topBar-account_menu-item"
                >
                  <img src={userIcon} alt="" />
                  <span>Trang cá nhân</span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/user/profile");
                  }}
                  className="topBar-account_menu-item"
                >
                  <img src={settingsIcon} alt="" />
                  <span>Cài đặt người dùng</span>
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
              <Link to="/auth/register">
                <RegisterButton type="button" variant="contained">
                  Đăng kí
                </RegisterButton>
              </Link>
            </div>
          )}
        </div>
        <Collapse className="topBar-search_mobile--input" isOpen={isOpen}>
          <Input
            type="text"
            placeholder="Tìm kiếm theo danh mục"
            value={searchValues}
            onChange={handleSearchChange}
          />
        </Collapse>
      </div>
    </>
  );
};

export default TopBar;
