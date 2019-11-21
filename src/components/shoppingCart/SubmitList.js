import React from "react";
import { useSelector } from "react-redux";
import history from "../../history";
import SubmitItem from "./SubmitItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  title: {
    padding: "8px 0 1px 24px"
  },
  orderIcon: {
    display: "flex"
  },
  checkout: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 20px",
    marginTop: "5px"
  },
  inTotal: {
    marginTop: "10px",
    fontSize: "20px",
    color: "grey",
    marginRight: "15px"
  }
});

const SubmitList = () => {
  const classes = useStyles();

  const ordersList = useSelector(state => state.orders);

  const handleClick = () => {
    if (ordersList.length !== 0) {
      history.push("/checkout");
    }
  };

  return (
    <React.Fragment>
      <div className={classes.orderIcon}>
        <Typography className={classes.title} gutterBottom variant="h6">
          Your Order
        </Typography>
      </div>
      <hr />
      {ordersList.map((item, index) => (
        <SubmitItem key={index} {...item} />
      ))}
      <div className={classes.checkout}>
        <Typography className={classes.inTotal}>
          In Total: ${ordersList.reduce((acum, curr) => acum + curr.totalPrice, 0).toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Checkout
        </Button>
      </div>
    </React.Fragment>
  );
};

export default SubmitList;
