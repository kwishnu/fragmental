import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import 'animate.css';
import colors from '../config/colors';
import { extractNumbersFromString } from '../config/functions';
const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    element.classList.add(`${prefix}animated`, animationName);
    const handleAnimationEnd = (event) => {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }
    element.addEventListener('animationend', handleAnimationEnd, {once: true});
  });


class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beingDragged: false,
      bgColor: colors.text_white,
      zIndex: 0,
      show: true,
      shadow: null,
      boxShadow: "inset 0.14em 0.14em 0.14em 0 rgba(255,255,255,0.5), inset -0.14em -0.14em 0.14em 0 rgba(0,0,0,0.5)"
    };
    this.tileRefs = [];
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.z !== prevProps.z) {
    //   this.setState({zIndex: this.props.z});
    // }
  }
  
  showSolved(ref){
    const coords = extractNumbersFromString(ref);
    const animElement = this.tileRefs[ref];
    animElement.style.setProperty('--animate-duration', '0.8s');
    const timeout = coords[0] * 100 + coords[1] * 50;
    setTimeout(() => {
      animateCSS(animElement, 'tada');
    }, timeout);
    setTimeout(() => {
      this.setState({boxShadow: null});
    }, 5000);
  }

  indicateBadMove(){
    this.setState({bgColor: colors.dark_pink});
  }

  resetBgColor(){
    this.setState({bgColor: colors.text_white});
  }

  render() {
    const { letter, tileHeight, delay, myRef } = this.props;

    return (
      <AnimatePresence>
        {this.state.show && 
          <motion.div
            initial={{ x: 750, y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ boxShadow: null }}
            transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.4, delay: delay }}
          >
            <div ref={(ref) => this.tileRefs[myRef] = ref} style={{display: "flex", position: "relative"}}>
              <div
                style=
                  {{
                    ...tile_styles.tile, 
                    backgroundColor: this.state.bgColor, 
                    height: tileHeight - 4, 
                    width: tileHeight - 4,
                    // zIndex: this.props.z,
                    boxShadow: this.state.boxShadow
                  }}
              >
              <div style={{...tile_styles.text, fontSize: tileHeight * 0.6, color: colors.off_black}}>
                {letter.toUpperCase()}
                {/* {this.state.zIndex} */}
                {/* {this.props.id} */}
              </div>
            </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    );
  }

}

const tile_styles = {
  tile: {
    display: "flex",
    margin: 1.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: "inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)"
  },
  text: {
    fontFamily: 'system-ui',
    fontWeight: 'bold',
    userSelect: 'none'
  }
}

export default Tile;