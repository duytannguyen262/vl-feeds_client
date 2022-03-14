import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Collapse, Input } from "reactstrap";

import logo from "../../assets/logo.png";
import searchIcon from "../../assets/icons/search-outline 1.svg";

import "./styles.scss";

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
          <div className="topBar-account_unauth">
            <Link to="/auth/login">Đăng nhập</Link>
            <span> / </span>
            <Link to="/auth/register">Đăng kí</Link>
          </div>
        </div>
        <Collapse className="topBar-search_mobile--input" isOpen={isOpen}>
          <Input type="text" placeholder="Tìm kiếm" />
        </Collapse>
      </div>
    </>
  );
};

export default TopBar;
