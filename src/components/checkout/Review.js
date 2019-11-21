import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing(2)
  }
}));

const Review = () => {
  const orders = useSelector(state => state.orders);
  const payment = useSelector(state => state.payment);
  const address = useSelector(state => state.address);

  var products = [];

  orders.forEach(item => {
    const desc = `SERVING SIZE: ${item.size};   SUGAR LEVEL: ${item.sugar};   TOPPINGS: ${item.toppings.join(',')}`
    products.push({ name: item.name, desc: desc, price: `$${item.totalPrice}` });
  });
  products.push({ name: "Shipping", desc: "", price: "Free" });

  var addresses = [
    address.address1 || "Carlton",
    address.address2,
    address.city || "Melbourne",
    address.zip || "3000",
    address.state || "VIC",
    address.country || "Australia"
  ];
  addresses = addresses.filter(item => item!=="")
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: `Mr ${payment.cardName}` },
    { name: "Card number", detail: `${payment.cardNumber}` },
    { name: "Expiry date", detail: `${payment.expDate}` }
  ];

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${orders.reduce((acum, curr) => acum + curr.totalPrice, 0).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.fn + ' ' + address.ln}</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
