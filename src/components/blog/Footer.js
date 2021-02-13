import React from 'react';
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFontColor } from "../../utils/index";

export const Footer = ({ izOffHrs }) => {
  return (
    <div className="footer flex justify-center items-center flex-col mt-auto mt-10">
      <div className="svgs">
        <a href="https://github.com/MaxwellKendall">
          <FontAwesomeIcon icon={faGithub} className="text-6xl mx-2"/>
        </a>
        <a href="https://www.linkedin.com/in/maxwellkendall/">
          <FontAwesomeIcon icon={faLinkedinIn} className="text-6xl mx-2"/>
        </a>
      </div>
      <a href="https://maxwell-kendall-resume.s3.amazonaws.com/MAXWELL_KENDALL_Resume.PDF" className="pt-10"> Check out My Resume</a>
      <p className="p-2">&#169; {`Copyright Maxwell Kendall ${new Date().getFullYear()}`}</p>
    </div>
  );
}