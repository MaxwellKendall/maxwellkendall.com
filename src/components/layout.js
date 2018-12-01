import React, { Component } from 'react'
import { Footer } from './Footer'

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

library.add(faCopyright, fab);

require('./base.css');

class Layout extends Component {
  render() {
    return (
      <div className="layout">
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Layout
