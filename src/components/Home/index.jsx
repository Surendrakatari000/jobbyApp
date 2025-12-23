import "./index.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-con-main">
      <div className="content-con">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="para">
          Millions of peoples are searching for jobs , salary information
          ,company reviews.Find the jobs that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="button-jobs">
          Find Jobs
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
};

export default Home;
