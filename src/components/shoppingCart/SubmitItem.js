import React from "react";
import { useDispatch } from 'react-redux';
import { removeFromCartAction } from '../../actions'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles({
  card: {
    width: 350
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 24,
    paddingLeft: 12
  },
  pos: {
    marginBottom: 1
  },
  orderInfo: {
    display: "flex",
    justifyContent: "space-between"
  }
});

const SubmitItem = props => {
	const classes = useStyles();
	const dispatch = useDispatch()

	const handleDelete = () => {
		dispatch(removeFromCartAction(props.name))
	}

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.orderInfo}>
          <Typography component="h2">{props.name}</Typography>
          <Typography component="h2">${props.totalPrice}</Typography>
        </div>
        <Typography className={classes.pos} variant="body2">
          Choice of Serving
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          {props.size}
        </Typography>
        <Typography className={classes.pos} variant="body2">
          Choice of Sugar Level
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          {props.sugar}
        </Typography>
        <Typography className={classes.pos} variant="body2">
          Add Toppings
        </Typography>
        <div className={classes.orderInfo}>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            style={{ overflowWrap: "break-word", width: "60%" }}
          >
            {props.toppings.join(",")}
          </Typography>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};
export default SubmitItem;
