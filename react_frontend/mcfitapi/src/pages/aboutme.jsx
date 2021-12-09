import React, { Component } from 'react'
import Footer from '../components/FooterW'
//Components
import Header from '../components/HeaderW'
import img from "../static/img/mikebw@1x.png"
import sig from "../static/img/signature.png"
//Style sheet
import "./aboutme.css"

export class aboutme extends Component {
    render() {
        return (
            <div style={{backgroundColor: "white", minHeight: "100vh"}}>
                <Header/>
                <div className="about-container">
                    <div className="top-text">
                        About Me
                    </div>
                    <div className="pic-area">
                        <img src={img} alt=""/>
                    </div>
                    <div className="about-text">
                        <div className="mike-text">
                            Hi, I'm Mike!
                        </div>
                        <div className="par-text">
                            “It is with great pleasure that I say I am a NAIT Personal Fitness Trainer Program graduate, which has helped me
                             earn my CSEP Certified Personal Trainer and NASM Corrective Exercise Specialist certifications. <br />
                            <br />
                            Being active and playing sports has always been a huge part of my life. When I started my fitness journey, I was
                            inspired to work hard in the gym when I began to see rewarding results. I want to be able to support that type of
                            experience for others as I work beside them, and guide them on their own personal path to starting or maintaining
                            a healthy lifestyle. <br />
                            <br />I take pride in being a compassionate, well educated personal trainer who loves motivating people to work
                            toward their goals while not just focusing on their physical goals, but to focus on improving their mindset and
                            challenging them to grow in all aspects of their lives. Join me on a path to help you accomplish your goals,
                            realize your full potential, and celebrate your successes.”
                        </div>
                        <div>
                            <img style={{float: 'right', marginTop: "15%"}} src={sig} alt=""/>
                        </div>
                    </div>
                    
                </div>
                <Footer/>
            </div>
        )
    }
}

export default aboutme
