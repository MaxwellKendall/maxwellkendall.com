import React, { Component } from 'react'
import Container from '../components/container'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

library.add(faCopyright, fab);

require('./base.css');
class Template extends Component {
  render() {
    return (
      <Container>
        <Header />
        {this.props.children()}
        <Footer />
      </Container>
    )
  }
}

export default Template
