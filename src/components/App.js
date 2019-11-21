import React from "react";
import { Provider } from 'react-redux';
import Header from './Header';
import OrderList from './Order/OrderList';
import { Router, Route, Switch} from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Checkout from './checkout/Checkout';
import history from '../history';
import MyOrders from "./MyOrders/MyOrders";

const App = ({store}) => {
	return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={OrderList} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/myorder" exact component={MyOrders} />
          </Switch>
        </div>
      </Router>
    </Provider>

  );
};
export default App;
