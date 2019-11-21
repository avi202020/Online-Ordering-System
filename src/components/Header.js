import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SubmitList from "./shoppingCart/SubmitList";
import BubbleChartOutlinedIcon from "@material-ui/icons/BubbleChartOutlined";
import { Link } from "react-router-dom";
import history from "../history";
import { logInOut } from "../actions";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  bubble: {
    color: "white"
  }
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorSc, setAnchorSc] = React.useState(null);

  const { isSignedIn } = useSelector(state => state.auth);

  const dispath = useDispatch();

  const isMenuOpen = Boolean(anchorEl);
  const isShoppingCartOpen = Boolean(anchorSc);

  // onclick
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleShopCartMenuOpen = event => {
    setAnchorSc(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorSc(null);
  };

  const menuId = "primary-search-account-menu";
  const shoppingCartMenuId = "primary-shopping-cart-menu";

  const renderLogInOut = () => {
    if (isSignedIn) {
      return (
        <div>
          <MenuItem component={Link} to="/myorder" onClick={handleMenuClose}>My Order</MenuItem>
          <MenuItem
            onClick={() => {
              dispath(logInOut({status:false,token: null}));
              handleMenuClose();
            }}
          >
            Log Out
          </MenuItem>
        </div>
      );
    } else {
      return (
        <div>
          <MenuItem
            onClick={() => {
              history.push("/login");
              handleMenuClose();
            }}
          >
            Log In
          </MenuItem>
        </div>
      );
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {renderLogInOut()}
    </Menu>
  );

  const shoppingCart = (
    <Menu
      anchorEl={anchorSc}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={shoppingCartMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isShoppingCartOpen}
      onClose={handleMenuClose}
    >
      <div>
        <SubmitList />
      </div>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} aria-label="open drawer">
            <Link to="/">
              <BubbleChartOutlinedIcon fontSize="large" className={classes.bubble} />
            </Link>
          </IconButton>
          <Typography variant="h6" noWrap>
            Bubble Tea Shop
          </Typography>
          <div className={classes.grow} />
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={shoppingCartMenuId}
              aria-haspopup="true"
              onClick={handleShopCartMenuOpen}
              color="inherit"
            >
              <ShoppingCartIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {shoppingCart}
    </div>
  );
};

export default Header;
