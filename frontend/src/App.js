import './App.css';
import Header from "./component/layout/Header/Header.js"
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from 'axios';
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";

function App() {
   const { isAuthenticated, user } = useSelector((state) => state.user);
 const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  
    useEffect(() => {
      WebFont.load({
        google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
        },
      });

      store.dispatch(loadUser());

      getStripeApiKey();
    }, []);

    window.addEventListener("contextmenu",(e)=>e.preventDefault())
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route
          exact
          path="/account"
          element={<ProtectedRoute component={Profile} />}
        />

        <Route
          exact
          path="/me/update"
          element={<ProtectedRoute component={UpdateProfile} />}
        />
        <Route
          exact
          path="/password/update"
          element={<ProtectedRoute component={UpdatePassword} />}
        />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/shipping"
          element={<ProtectedRoute component={Shipping} />}
        />

        <Route element={<ProtectedRoute />} />
        {stripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}

        <Route
          exact
          path="/success"
          element={<ProtectedRoute component={OrderSuccess} />}
        />
        <Route
          exact
          path="/orders"
          element={<ProtectedRoute component={MyOrders} />}
        />

        <Route
          exact
          path="/order/confirm"
          element={<ProtectedRoute component={ConfirmOrder} />}
        />
        <Route
          exact
          path="/order/:id"
          element={<ProtectedRoute component={OrderDetails} />}
        />
        <Route
          isAdmin={true}
          exact
          path="/admin/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          isAdmin={true}
          exact
          path="/admin/products"
          element={<ProtectedRoute component={ProductList} />}
        />
        <Route
          isAdmin={true}
          exact
          path="/admin/product"
          element={<ProtectedRoute component={NewProduct} />}
        />
        <Route
          isAdmin={true}
          exact
          path="/admin/product/:id"
          element={<ProtectedRoute component={UpdateProduct} />}
        />
        <Route
          isAdmin={true}
          exact
          path="/admin/orders"
          element={<ProtectedRoute component={OrderList} />}
        />
        <Route
          isAdmin={true}
          exact
          path="/admin/order/:id"
          element={<ProtectedRoute component={ProcessOrder} />}
        />
        <Route
          isAdmin={true}
          exact
          path="/admin/users"
          element={<ProtectedRoute component={UsersList} />}
        />
        <Route
          isAdmin={true}
          exact
          path="/admin/user/:id"
          element={<ProtectedRoute component={UpdateUser} />}
        />
        <Route
          isAdmin={true}
          exact
          path="/admin/reviews"
          element={<ProtectedRoute component={ProductReviews} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
