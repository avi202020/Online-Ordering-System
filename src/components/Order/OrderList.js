import React from "react";
import OrderCard from "./OrderCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import BubbleTeaList from "./BubbleTeaList";
import StyleLink from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  
  }
}));

const OrderList = () => {
  const classes = useStyles();

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <StyleLink color="inherit" href="https://material-ui.com/">
          Bubble Tea Shop
        </StyleLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        {BubbleTeaList.map(item => (
          <OrderCard
            key={item.name}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </Grid>
      <Box mt={5} ml={62}>
        <Copyright />
      </Box>
    </React.Fragment>
  );
};

export default OrderList;
