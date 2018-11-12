import React, { Component } from 'react'
import Container from './container'
import Footer from './Footer'

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

library.add(faCopyright, fab);

require('./base.css');
class Layout extends Component {
  render() {
    return (
      <Container>
        {this.props.children}
        <Footer />
      </Container>
    )
  }
}

export default Layout
