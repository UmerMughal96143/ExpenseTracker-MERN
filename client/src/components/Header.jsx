import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import {NavLink} from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color : 'white',
  },
}));

function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="./" className={classes.title}>
            Home
          </NavLink>
          <Typography variant="h6" className={classes.title}>
            DeDev
          </Typography>
          <NavLink className={classes.title} to="/signin" color="inherit">
            Login
          </NavLink>
          <NavLink className={classes.title} to="/signup" color="inherit">
            SignUp
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default ButtonAppBar;