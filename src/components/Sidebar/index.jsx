import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
} from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { data } from "./data";
import "./sideBar.scss";

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div className="sideBar_container">
      <nav>
        <ul className="sideBar_nav-list">
          {data.map((item) => (
            <Tooltip key={item.id} title={item.title} placement="left">
              <NavLink to={item.link}>
                <li className="sideBar_nav-item">
                  <img src={item.imgSrc} alt="" />
                  <span>{item.title} </span>
                </li>
              </NavLink>
            </Tooltip>
          ))}
        </ul>
      </nav>

      <SpeedDial
        ariaLabel="speedDial"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {data.map((action) => (
          <SpeedDialAction
            key={action.title}
            icon={<img src={action.imgSrc} alt="" style={{ width: "50%" }} />}
            tooltipTitle={action.title}
            onClick={() => {
              handleClose();
              navigate(action.link);
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default Sidebar;
