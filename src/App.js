import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  withRouter
} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

import HeaderComponent from './HeaderComponent';
import Home from './Home';
import Cinemas from './Cinemas';
import Movie from './Movie';
import Booking from './Booking';

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    let body = document.getElementById("body-content");
    body.scrollTo(0, 0);
  }, [pathname]);
  return props.children
}
const ScrollToTop = withRouter(_ScrollToTop)

function App(props) {
  return (
    <div style={{ padding: "1px" }}>
      <Router>
        <ScrollToTop>
          <HeaderComponent />
          <div id="body-content" className="body-content">
            <Switch>
              <Route path="/Booking" component={Booking} />
              <Route path="/Movies" component={Movie} />
              <Route path="/Cinemas" component={Cinemas} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
