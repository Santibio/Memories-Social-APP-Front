import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import decode from 'jwt-decode'
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch} from 'react-redux'

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch()
   const logout = () => {
     dispatch({ type: 'LOGOUT' });

     history.push("/auth");

     setUser(null);
   };
  useEffect(() => {
    const token = user?.token;
    if (token){
      const decodedToken = decode(token)

      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
     setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  console.log(user);
  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img src={memories} alt="" height="60" className={classes.image} />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
