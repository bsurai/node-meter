import * as React from 'react';
import { Fade } from 'reactstrap';
import './BallClimbingDot.css';

const Loader = () => {
  return (
  <Fade in tag="div" className="la-ball-climbing-dot la-dark la-3x">
    <div/>
    <div/>
    <div/>
    <div/>
  </Fade>
  )
};

export default Loader;
