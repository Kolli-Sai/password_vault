// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styles from "./styles.module.css";
import { NavLink, Link } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

function Navbar({ handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { token } = useSelector((store) => store.isAuthenticated);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav>
        <div className={styles.container}>
          <div className={styles.sub3}>
            <IconButton onClick={handleClick}>
              <MenuIcon style={{ color: "var(--text)" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to={"/"}>Home</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to={"/dashboard"}>Dashboard</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {token ? (
                  <Link onClick={handleLogout}>Logout</Link>
                ) : (
                  <Link to={"/login"}>Login</Link>
                )}
              </MenuItem>
            </Menu>
          </div>
          <div className={styles.sub1}>
            <div className={styles.logo}>
              <NavLink to={"/"} className={styles.logo}>
                LOGO
              </NavLink>
            </div>
            <div>
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            </div>
          </div>
          <div className={styles.sub2}>
            <div className={styles.login}>
              {token ? (
                <Link className="primary-button" onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <Link to={"/login"} className={"primary-button"}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
