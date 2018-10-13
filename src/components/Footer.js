import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

require("./footer.module.css");

class Footer extends Component {
  render() {
    return <div className="footer">
        <p>&#169;{`Copyright Maxwell Kendall ${new Date().getFullYear()}`}
        </p>
        <FontAwesomeIcon icon={["fab", "linkedin"]} />
        <FontAwesomeIcon icon={["fab", "github"]} />
      </div>;
  }
}

export default Footer;