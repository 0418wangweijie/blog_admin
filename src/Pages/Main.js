import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";
// import Article from './ArticleList'
// import AddArticle from './AddArticle';
function Main() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/index/" component={AdminIndex} />
      </Router>
    </div>
  );
}
export default Main;
