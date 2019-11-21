import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import ToppingList from "./ToppingList";
import Modal from "@material-ui/core/Modal";
import AddIcon from "@material-ui/icons/Add";

const sizeList = [
  { size: "Small", price: "0.00" },
  { size: "Medium", price: "1.20" },
  { size: "Large", price: "2.50" }
];

const sugarList = [
  { sugarLevel: "No Sugar" },
  { sugarLevel: "50% Sugar" },
  { sugarLevel: "Standard Sugar" },
  { sugarLevel: "Extra Sugar" }
];

const OrderCard = props => {
  const useStyles = makeStyles(theme => ({
    card: {
      width: 400,
      marginTop: 30,
      marginBottom: 30,
      height: 200,
      marginLeft: "5%",

    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    },
    price: {
      marginLeft: "20px"
    },
    content: {
      padding: "0"
    },
    contentHeader: {
      backgroundColor: "rgb(246, 246, 246)",
      padding: "10px 0 1px 10px"
    },
    title: {
      marginBottom: "8px",
      marginTop: "0"
    },
    choiceRoot: {
      display: "flex"
    },
    formControl: {
      margin: theme.spacing(1),
      width: "100%"
    },
    labelPrice: {
      marginTop: "13px",
      float: "right"
    },
    button: {
      margin: theme.spacing(1),
      float: "right"
    },
    paper: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      position: "absolute",
      width: "70%",
      maxHeight: "60%",
      backgroundColor: theme.palette.background.paper,
      // border: "1px solid black",
      borderRadius: "15px",
      boxShadow: "0 0 100px black",
      outline: 0,
      padding: theme.spacing(2, 4, 3),
      overflow: "scroll"
    },
    marginBelow: {
      marginBottom: "40px"
    }
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  // const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectSize, setSelectSize] = useState(sizeList[0]);
  const [selectSugar, setSelectSugar] = useState(sugarList[2].sugarLevel);
  const [selectToppings, setSelectToppings] = useState([]);

  // Open the Modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle Selection
  const handleSelectSize = e => {
    const choice = sizeList.filter(item => item.size === e.target.value);
    setSelectSize(choice[0]);
  };

  const handleSelectSugar = e => {
    setSelectSugar(e.target.value);
  };

  const handleSelectToppings = e => {
    if (e.target.checked) {
      const choice = ToppingList.filter(item => item.name === e.target.value);
      setSelectToppings(prev => [...prev, choice[0]]);
    } else {
      setSelectToppings(prev => prev.filter(item => item.name !== e.target.value));
    }
  };

  // Handle Submit --- Add to Shopping Cart
  const handleAddToCart = () => {
    // calculate the total price of one item
    const totalPrice = selectToppings.reduce(
      (acum, curr) => acum + Number(curr.price),
      Number(selectSize.price) + Number(props.price)
    );
    // console.log(totalPrice);
    // change the state of Order Reducer
    dispatch(
      addToCartAction({
        name: props.name,
        size: selectSize.size,
        sugar: selectSugar,
        toppings: selectToppings.map(item => item.name),
        totalPrice: totalPrice
      })
		);
		
		handleClose()
  };

  // Render Modal when add button click
  const renderModal = (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <CardContent className={classes.content}>
          <div className={classes.contentHeader}>
            <Typography paragraph className={classes.title}>
              Choice of Serving:
            </Typography>
          </div>
          <div className={classes.choiceRoot}>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup arial-label="select size" name="select size" onChange={handleSelectSize}>
                {sizeList.map(item => (
                  <div key={item.size}>
                    <FormControlLabel
                      value={item.size}
                      checked={item.size === selectSize.size}
                      control={<Radio />}
                      label={item.size}
                    />
                    <FormLabel className={classes.labelPrice}>+${item.price}</FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classes.contentHeader}>
            <Typography paragraph className={classes.title}>
              Choice of Sugar Level:
            </Typography>
          </div>
          <div>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup onChange={handleSelectSugar}>
                {sugarList.map(item => (
                  <FormControlLabel
                    checked={item.sugarLevel === selectSugar}
                    value={item.sugarLevel}
                    control={<Radio />}
                    label={item.sugarLevel}
                    key={item.sugarLevel}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classes.contentHeader}>
            <Typography paragraph className={classes.title}>
              Add Toppings:
            </Typography>
          </div>
          <div className={classes.choiceRoot}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup onChange={handleSelectToppings}>
                {ToppingList.map(item => (
                  <div key={item.name}>
                    <FormControlLabel
                      control={<Checkbox value={item.name} display="inline-block" />}
                      label={item.name}
                    />
                    <FormLabel className={classes.labelPrice}>+${item.price}</FormLabel>
                  </div>
                ))}
              </FormGroup>
              <FormHelperText>Choose up to 6</FormHelperText>
            </FormControl>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleAddToCart}
          >
            Add to Order
          </Button>
        </CardContent>
      </div>
    </Modal>
  );

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="h4">
            {props.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.marginBelow}
          >
            {props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography variant="h6" color="textPrimary" component="p" className={classes.price}>
            ${props.price}
          </Typography>
          <IconButton
            className={classes.expand}
            // 	clsx(classes.expand, {
            //   [classes.expandOpen]: expanded
            // })}
            color="primary"
            onClick={handleOpen}
          >
            <AddIcon />
          </IconButton>
        </CardActions>
      </Card>

      {renderModal}
    </React.Fragment>
  );
};

export default OrderCard;
