import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Cookies from "js-cookie";
import { CiSearch } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { Link } from "react-router-dom";
import "./index.css";

const Profile = () => {
  const jwtToken = Cookies.get("jwt-token");
  const [profileData, setProfileData] = useState(null);

  const fetchProfile = () => {
    const formatingData = (data) => {
      const profile = data.profile_details;
      const formatedData = {
        profileImageUrl: profile.profile_image_url,
        name: profile.name,
        shortBio: profile.short_bio,
      };
      setProfileData(formatedData);
    };

    const fetchFunction = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("https://apis.ccbp.in/profile", options);
      const data = await response.json();
      if (response.ok === true) {
        formatingData(data);
      } else {
        console.log("response failed");
      }
    };

    fetchFunction();
  };

  useEffect(fetchProfile, []);

  return (
    <div
      className="profile-con"
      style={{
        backgroundImage: `url("https://assets.ccbp.in/frontend/react-js/profile-bg.png")`,
      }}
    >
      <img
        src={profileData && profileData.profileImageUrl}
        className="profile-image"
      />
      <h1 className="profile-name">
        {" "}
        {profileData === null ? "" : profileData.name}
      </h1>
      <p className="profile-bio">{profileData && profileData.shortBio}</p>
    </div>
  );
};

const TypesOfEmployement = (props) => {
  const { updateFullTime, updatePartime, updatefreelance, updateinternship } =
    props;

  return (
    <div>
      <h2>Type of Employment</h2>
      <div>
        <div className="checkBox-con">
          <input
            type="checkbox"
            id="full_time"
            className="check-box"
            onClick={updateFullTime}
          />
          <label htmlFor="full_time">Full Time</label>
        </div>
        <div className="checkBox-con">
          <input
            type="checkbox"
            id="partime"
            className="check-box"
            onClick={updatePartime}
          />
          <label htmlFor="partime">partime</label>
        </div>
        <div className="checkBox-con">
          <input
            type="checkbox"
            id="freelance"
            className="check-box"
            onClick={updatefreelance}
          />
          <label htmlFor="freelance">freelance</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="internship"
            className="check-box"
            onClick={updateinternship}
          />
          <label htmlFor="internship">internship</label>
        </div>
      </div>
    </div>
  );
};

const SalaryRange = (props) => {
  const { updateTen, updateTwenty, updateThirty, updateForty } = props;
  return (
    <div>
      <h2>Salary Range</h2>
      <div>
        <div className="checkBox-con">
          <input
            type="checkbox"
            id="10"
            className="check-box"
            onClick={updateTen}
          />
          <label htmlFor="10">10 LPA and more</label>
        </div>
        <div className="checkBox-con">
          <input
            type="checkbox"
            id="20"
            className="check-box"
            onClick={updateTwenty}
          />
          <label htmlFor="20">20 LPA and more</label>
        </div>
        <div className="checkBox-con">
          <input
            type="checkbox"
            id="30"
            className="check-box"
            onClick={updateThirty}
          />
          <label htmlFor="30">30 LPA and more</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="40"
            className="check-box"
            onClick={updateForty}
          />
          <label htmlFor="40">40 LPA and more</label>
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ updateSearchValue, searchValue }) => {
  const updateSerachInChild = (event) => {
    updateSearchValue(event.target.value);
  };

  return (
    <div className="searchBar-icon-con ">
      <input
        className="search-bar"
        placeholder="search..."
        value={searchValue}
        onChange={updateSerachInChild}
      />
      <div className="icon-con">
        <CiSearch fontSize={30} />
      </div>
    </div>
  );
};

const MainJobs = ({
  searchValue,
  fullTimeValue,
  partimeValue,
  freelancevalue,
  internshipValue,
  tenLPAValue,
  twentyLPAValue,
  thirtyLPAValue,
  fortyPAValue,
}) => {
  const jwtToken = Cookies.get("jwt-token");
  const [arrayOfJobs, setOfArrayJobs] = useState([]);

  const fetchingJobs = () => {
    const formatinghJobsData = (data) => {
      const jobs = data.jobs;
      const formateddata = jobs.map((ele) => {
        return {
          companyLogoUrl: ele.company_logo_url,
          employmentType: ele.employment_type,
          id: ele.id,
          jobDescription: ele.job_description,
          location: ele.location,
          packagePerAnnum: ele.package_per_annum,
          rating: ele.rating,
          title: ele.title,
        };
      });
      setOfArrayJobs(formateddata);
    };

    const asynchjobsFetching = async () => {
      let apiForTypesOFEmplyment = "";
      if (fullTimeValue) {
        apiForTypesOFEmplyment += "FULLTIME";
      }
      if (partimeValue) {
        if (apiForTypesOFEmplyment.length > 0) {
          apiForTypesOFEmplyment += ",PARTTIME";
        } else {
          apiForTypesOFEmplyment += "PARTTIME";
        }
      }
      if (freelancevalue) {
        if (apiForTypesOFEmplyment.length > 0) {
          apiForTypesOFEmplyment += ",FREELANCE";
        } else {
          apiForTypesOFEmplyment += "FREELANCE";
        }
      }
      if (internshipValue) {
        if (apiForTypesOFEmplyment.length > 0) {
          apiForTypesOFEmplyment += ",INTERNSHIP";
        } else {
          apiForTypesOFEmplyment += "INTERNSHIP";
        }
      }

      let apiSalryRange = "";
      if (tenLPAValue) {
        apiSalryRange += "1000000";
      }
      if (twentyLPAValue) {
        if (apiSalryRange.length > 0) {
          apiSalryRange += ",2000000";
        } else {
          apiSalryRange += "2000000";
        }
      }
      if (thirtyLPAValue) {
        if (apiSalryRange.length > 0) {
          apiSalryRange += ",3000000";
        } else {
          apiSalryRange += "3000000";
        }
      }

      if (fortyPAValue) {
        if (apiSalryRange.length > 0) {
          apiSalryRange += ",4000000";
        } else {
          apiSalryRange += "4000000";
        }
      }

      const url =
        "https://apis.ccbp.in/jobs?employment_type=" +
        apiForTypesOFEmplyment +
        "&minimum_package=" +
        apiSalryRange +
        "&search=" +
        searchValue;
      console.log(url);
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      };

      const reposnse = await fetch(url, options);
      const data = await reposnse.json();
      if (reposnse.ok === true) {
        formatinghJobsData(data);
      } else {
        console.log("not okay");
      }
    };
    asynchjobsFetching();
  };

  useEffect(fetchingJobs, [
    searchValue,
    fullTimeValue,
    partimeValue,
    freelancevalue,
    internshipValue,
    tenLPAValue,
    twentyLPAValue,
    thirtyLPAValue,
    fortyPAValue,
  ]);

  let lenthOfarray = arrayOfJobs.length;

  if (lenthOfarray === 0) {
    return (
      <div className="no-jobs-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no-jobs-found-image"
          className="no-jobs-image"
        />
        <h2>No jobs found</h2>
        <p>We couldn't find any jobs , try other filters </p>
      </div>
    );
  }
  return (
    <div className="jobs-main-main-con">
      {arrayOfJobs.map((job) => {
        return (
          <div key={job.id} className="job-con">
            <Link className="link-job" to={`/job/${job.id}`}>
              <div className="image-rating-desc-con">
                <img src={job.companyLogoUrl} className="company-job-logo" />
                <div className="desc-rating-con">
                  <p>{job.title}</p>
                  <div className="rating-con">
                    <TiStarFullOutline color="orange" size={20} />
                    <span>{job.rating}</span>
                  </div>
                </div>
              </div>

              <div className="sec-con">
                <div className="sec-con-first">
                  <div className="loc-icon-con">
                    <FaMapMarkerAlt />
                    {job.location}
                  </div>
                  <div className="loc-icon-con">
                    <MdWork />
                    <span>{job.employmentType}</span>
                  </div>
                </div>
                <span>{job.packagePerAnnum}</span>
              </div>

              <hr />

              <h3>Description</h3>
              <p>{job.jobDescription}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

const Jobs = () => {
  const [fullTimeValue, setFullTimeValue] = useState(false);
  const [partimeValue, setPartTimeValue] = useState(false);
  const [freelancevalue, setFreelanceValue] = useState(false);
  const [internshipValue, setInternshipValue] = useState(false);

  const [tenLPAValue, setTenLPAValue] = useState(false);
  const [twentyLPAValue, setTwentyLPAValue] = useState(false);
  const [thirtyLPAValue, setThirtyLPAValue] = useState(false);
  const [fortyPAValue, setFortyLPAValue] = useState(false);

  const [searchValue, setSearchvalue] = useState("");

  const updateSearchValue = (value) => {
    setSearchvalue(value);
  };

  const updateFullTime = () => {
    setFullTimeValue(!fullTimeValue);
  };

  const updatePartime = () => {
    setPartTimeValue(!partimeValue);
  };

  const updatefreelance = () => {
    setFreelanceValue(!freelancevalue);
  };

  const updateinternship = () => {
    setInternshipValue(!internshipValue);
  };

  const updateTen = () => {
    setTenLPAValue(!tenLPAValue);
  };

  const updateTwenty = () => {
    setTwentyLPAValue(!twentyLPAValue);
  };

  const updateThirty = () => {
    setThirtyLPAValue(!thirtyLPAValue);
  };

  const updateForty = () => {
    setFortyLPAValue(!fortyPAValue);
  };

  return (
    <div>
      <Navbar />
      <div className="jobs-main-con">
        <SearchBar
          updateSearchValue={updateSearchValue}
          searchValue={searchValue}
        />
        <div className="left-side">
          <Profile />
          <hr className="line-ele" />
          <TypesOfEmployement
            updateFullTime={updateFullTime}
            updatePartime={updatePartime}
            updatefreelance={updatefreelance}
            updateinternship={updateinternship}
          />
          <hr className="line-ele" />
          <SalaryRange
            updateTen={updateTen}
            updateTwenty={updateTwenty}
            updateThirty={updateThirty}
            updateForty={updateForty}
          />
        </div>
        <MainJobs
          searchValue={searchValue}
          fullTimeValue={fullTimeValue}
          partimeValue={partimeValue}
          freelancevalue={freelancevalue}
          internshipValue={internshipValue}
          tenLPAValue={tenLPAValue}
          twentyLPAValue={twentyLPAValue}
          thirtyLPAValue={thirtyLPAValue}
          fortyPAValue={fortyPAValue}
        />
      </div>
    </div>
  );
};

export default Jobs;
