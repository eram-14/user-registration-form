import React from "react";
import { AppBar, Tabs, Tab } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const activeTab = location.pathname === '/' ? 0 : 1;

  return (
    <AppBar position="static" sx={{ backgroundColor: 'teal' }}>
      <Tabs value={activeTab}>
        <Tab
          label="Home"
          to="/"
          component={Link}
          sx={{
            color: 'black',
            fontWeight: 'bold',
            '&.Mui-selected': {
              color: 'white',
              fontWeight: 'bold',
            },
            '&:hover': {
              backgroundColor: 'teal', 
              color: 'white',
            },
          }}
        />
        <Tab
          label="User Data"
          to="/user-data"
          component={Link}
          sx={{
            color: 'black',
            fontWeight: 'bold',
            '&.Mui-selected': {
              color: 'white',
              fontWeight: 'bold',
            },
            '&:hover': {
              backgroundColor: 'teal', 
              color: 'white',
            },
          }}
        />
      </Tabs>
    </AppBar>
  );
};

export default Navbar;
