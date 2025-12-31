import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { TiStarFullOutline } from "react-icons/ti";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { BallTriangle } from "react-loader-spinner";
import "./index.css";

import Navbar from "../Navbar/index.jsx";

const SimlarJobs = (props) => {
  const { job } = props;

  return (
    <div className="simlarJOb-con">
      <div className="first-con-simlar-job">
        <img src={job.companyLogoUrl} className="company-logo-image-similar" />
        <div className="first-first-simlar-jon-con">
          <h2>{job.title}</h2>
          <div className="first-first-second-con">
            <TiStarFullOutline color="orange" fontSize={25} />
            <span className="rating-simlar-job">{job.rating}</span>
          </div>
        </div>
      </div>
      <h2>Description</h2>

      <p className="description-para">{job.jobDescription}</p>

      <div>
        <FaMapMarkerAlt fontSize={20} color="red" />
        <span className="location-em-type">{job.location}</span>
        <MdWork fontSize={20} />
        <span className="location-em-type">{job.employmentType}</span>
      </div>
    </div>
  );
};

const JobDetailed = () => {
  const { id } = useParams();
  const [detailedJobDetails, setDetailedobDetailails] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchDetailedJobs = () => {
    const fetching = async () => {
      const jwtToken = Cookies.get("jwt-token");
      let url = "https://apis.ccbp.in/jobs/" + id;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === true) {
        const formatedData = {
          jobDetails: {
            companyLogoUrl: data.job_details.company_logo_url,
            companyWebsiteUrl: data.job_details.company_website_url,
            employmentType: data.job_details.employment_type,
            id: data.job_details.id,
            jobDescription: data.job_details.job_description,
            lifeAtCompany: {
              description: data.job_details.life_at_company.description,
              imageUrl: data.job_details.life_at_company.image_url,
            },
            location: data.job_details.location,
            packagePerAnnum: data.job_details.package_per_annum,
            rating: data.job_details.rating,
            skills: data.job_details.skills.map((job) => {
              return {
                imageUrl: job.image_url,
                name: job.name,
              };
            }),
            title: data.job_details.title,
          },
          similarJobs: data.similar_jobs.map((jobEle) => {
            return {
              companyLogoUrl: jobEle.company_logo_url,
              employmentType: jobEle.employment_type,
              id: jobEle.id,
              jobDescription: jobEle.job_description,
              location: jobEle.location,
              rating: jobEle.rating,
              title: jobEle.title,
            };
          }),
        };
        setDetailedobDetailails(formatedData);
        setIsSuccess(true);
      }
    };
    fetching();
  };
  useEffect(fetchDetailedJobs, []);

  return (
    <div>
      <Navbar />
      {detailedJobDetails ? (
        <div className="main-detailed-job-con">
          <div className="detailed-job-con">
            <div className="logo-rating-con">
              <img
                className="logo-company"
                src={detailedJobDetails.jobDetails.companyLogoUrl}
              />
              <div className="title-rating-star-con">
                <h2>{detailedJobDetails.jobDetails.title}</h2>
                <div className="star-rating-con">
                  <TiStarFullOutline fontSize={25} color="yellow" />
                  <p className="rating-para">
                    {detailedJobDetails.jobDetails.rating}
                  </p>
                </div>
              </div>
            </div>

            <div className="second-con-detailed">
              <div className="first-second-con">
                <div className="location-icon-con">
                  <FaMapMarkerAlt />
                  <p className="location-para">
                    {detailedJobDetails.jobDetails.location}
                  </p>
                </div>
                <div className="md-employement-con">
                  <MdWork />
                  <p className="employment-type-para">
                    {detailedJobDetails.jobDetails.employmentType}
                  </p>
                </div>
              </div>

              <span className="package-span">
                {detailedJobDetails.jobDetails.packagePerAnnum}
              </span>
            </div>

            <hr />

            <div className="description-visit-con">
              <h2 className="desciption">Description</h2>
              <a
                href={detailedJobDetails.jobDetails.companyWebsiteUrl}
                className="company-webisite"
                target="blank_"
              >
                visit
              </a>
            </div>

            <p className="description-para">
              {detailedJobDetails.jobDetails.jobDescription}
            </p>

            <h2>Skills</h2>

            <div className="skills-con">
              {detailedJobDetails.jobDetails.skills.map((skill) => {
                return (
                  <div className="skill-logo-name-con" key={skill.name}>
                    <img className="image-skill" src={skill.imageUrl} />
                    <span className="skill-name">{skill.name}</span>
                  </div>
                );
              })}
            </div>

            <h2>Life at Company</h2>
            <div className="life-compnay-con">
              <p className="compnay-life-desciption">
                {detailedJobDetails.jobDetails.lifeAtCompany.description}
              </p>
              <img
                src={detailedJobDetails.jobDetails.lifeAtCompany.imageUrl}
                className="compnay-life-image"
              />
            </div>
          </div>

          <h1>Similar Jobs</h1>

          <div className="simlarJobs-main-con">
            {detailedJobDetails.similarJobs.map((job) => {
              return <SimlarJobs job={job} key={job.id} />;
            })}
          </div>
        </div>
      ) : (
        <div className="main-detailed-job-con">
          <div className="spinner-con">
            <BallTriangle  />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailed;




