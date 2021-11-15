import React, { Component } from 'react'
import Header from '../components/Header'

import Arrow from "../static/img/icon-awesome-arrow-alt-circle-right-1@1x.png";
import "./memberships.css"
import "../globals.css"
import "../styleguide.css"

export class memberships extends Component {
  render() {
    return (
      <div>
        <Header/> 
        <div className="container">
          <div className="a">
            <span className="impact-regular-normal-white-50px">
              PRICING
            </span>
            <p/>
            <span className="text-1">
              <span className="sourcesanspro-normal-white-30px">
                We have an in-person or on-line option depending on your needs.  
              </span>&nbsp;&nbsp;
              <span className="sourcesanspro-semi-bold-white-25px">
                Sign up now to get started.
              </span>
            </span>
          </div>

          <div className="b">
            <p className="sourcesanspro-bold-white-45px">
              Once/week
            </p>
            <span className="sourcesanspro-normal-white-35px">
              Weekly check-ins<p/>
              Nutritional guidance<p/>
              Virtual/In-person meeting<p/>
            </span>
          </div>

          <div className="c">
            <p className="sourcesanspro-bold-white-45px">
              Twice/week
            </p>
            <span className="sourcesanspro-normal-white-35px">
              Weekly check-ins<p/>
              Nutritional guidance<p/>
              Virtual/In-person meeting<p/>
            </span>
          </div>

          <div className="d">
            <p className="sourcesanspro-bold-white-45px">
              Thrice/week
            </p>
            <span className="sourcesanspro-normal-white-35px">
              Weekly check-ins<p/>
              Nutritional guidance<p/>
              Virtual/In-person meeting<p/>
            </span>
          </div>

          <div className="e">
            <span className="sourcesanspro-bold-sea-green-35px">
              $80/session
            </span>
            <p className="sourcesanspro-light-white-25px">
              Learn More
            </p>
            <img className="arrow" src={Arrow} alt=""/>
          </div>

          <div className="f">
            <span className="sourcesanspro-bold-sea-green-35px">
              $70/session
            </span>
            <p className="sourcesanspro-light-white-25px">
              Learn More
            </p>
            <img className="arrow" src={Arrow} alt=""/>
          </div>

          <div className="g">
            <span className="sourcesanspro-bold-sea-green-35px">
              $60/session
            </span>
            <p className="sourcesanspro-light-white-25px">
              Learn More
            </p>
            <img className="arrow" src={Arrow} alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

export default memberships