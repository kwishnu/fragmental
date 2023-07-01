import React, { Component } from 'react';
import 'animate.css';
import { motion,  } from "framer-motion";//AnimatePresence
import colors from '../config/colors';
import { extractNumbersFromString } from '../config/functions';
import '../styles/animations.css';
import { getColor, getDarkColor } from '../config/functions';
// const bevel = "inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)"
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


class CrosswordTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: 0,
      bgColor: getColor(),
      textColor: colors.text_white,
      boardTileColor: colors.gray_3,
      puzzleTileColor: colors.text_white,
      toColor: getDarkColor(),
      tileKey: this.props.myRef,
      tileKeyStored: this.props.myRef,
      animDelay: Math.random(),
      bevel: "inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)"
      // show: true,
      // zIndex: 0
    };
    this.tileRefs = [];
  }

  componentDidMount(){
    // const randColor = getColor();
    const randColor2 = getColor();
    // let tileColor = colors.text_white;
    let tileColor2 = colors.text_white;
    // tileColor = (this.props.letter === ".")?randColor:tileColor;
    tileColor2 = (this.props.letter === ".")?randColor2:tileColor2;
    this.setState({toColor: tileColor2});//bgColor: tileColor, 

  }

  showSolved(ref){
    if(this.props.letter !== "*")this.startColorCycling();
    // if(this.props.letter !== "*" && this.props.letter !== ".")this.setState({bgColor: colors.off_white});
    const coords = extractNumbersFromString(ref);
    this.setState({bevel: null, textColor: colors.off_black, bgColor: colors.text_white});
    if(this.props.letter !== "*" && this.props.letter !== "."){
      const animElement = this.tileRefs[ref];
      animElement.style.setProperty('--animate-duration', '0.8s');
      const timeout = coords[0] * 100 + coords[1] * 50;//Math.random() * 250;
      setTimeout(() => {
        animateCSS(animElement, 'tada');
      }, timeout);
      setTimeout(() => {
        this.setState({
          puzzleTileColor: colors.off_white, 
          bgColor: colors.text_white,
          tileKey: this.state.tileKeyStored
        });//show: false, zIndex: 10
      }, 5000);
    }
  }

  cycleBGColor(){
    if(this.state.tileKey !== this.state.tileKeyStored){
    let initialColor = this.state.toColor;
    let nextColor = getDarkColor();
    if(this.props.letter === '.'){
      this.setState({puzzleTileColor: initialColor, boardTileColor: initialColor, toColor: nextColor});
    }
    }else{
    clearInterval(this.state.intervalID);
  }
  }
  startColorCycling(){
    if(this.state.intervalID === 0){
      this.setState({tileKey: this.state.tileKey + 1});
      this.cycleBGColor();
      let intID = setInterval(() => {this.cycleBGColor()}, 1950);
      this.setState({intervalID: intID});
    }
  }
  toggleColorCycle(){
    if(this.state.intervalID !== 0){
      clearInterval(this.state.intervalID);
      setTimeout(() => {
        this.setState({intervalID: 0, tileKey: this.state.tileKeyStored});
      }, 250);
    }
  }

  render() {
    const { tileHeight, left, top, letter, myRef } = this.props;

    return (
      // <AnimatePresence>
      //   {this.state.show && 
          <motion.div 
            ref={(ref) => this.tileRefs[myRef] = ref}
            style=
              {{
                ...tile_styles.tile, 
                backgroundColor: letter === "."?this.state.boardTileColor:letter === "*"?this.state.puzzleTileColor:this.state.bgColor, 
                boxShadow: letter !== "." && letter !== "*"?this.state.bevel:null, 
                height: tileHeight - 4, 
                width: tileHeight - 4,
                top: top,
                left: left,
              }}
              animate={this.state.tileKey === this.state.tileKeyStored || (letter !== "*" && letter !== ".") ? 
                {} 
                : 
                { backgroundColor: [this.state.boardTileColor, this.state.toColor] }
              }
              transition={this.state.tileKey === this.state.tileKeyStored || (letter !== "*" && letter !== ".") ? 
                {}
                :
                { duration: 2, ease: "linear", repeat: Infinity }
              }
              // exit={{ y: 800, opacity: 0 }}
            >
            <div style={{...tile_styles.text, fontSize: tileHeight * 0.6, color: letter === "." || letter === "*"?colors.transparent:this.state.textColor}}>
              {letter.toUpperCase()}
            </div>
          </motion.div>
      //   }
      // </AnimatePresence>
    );
  }

}

const tile_styles = {
  tile: {
    position: "absolute",
    display: "flex",
    margin: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  bevel: {
    position: "absolute",
    display: "flex",
    margin: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderTop:"5px solid lightgrey",
    borderBottom:"5px solid grey",
    borderLeft:"5px solid lightgrey",
    borderRight:"5px solid grey",
  },
  flat: {
    position: "absolute",
    display: "flex",
    margin: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderWidth: 1,
    borderColor: colors.off_black, 
    borderStyle: 'solid',
  },
  text: {
    fontFamily: 'system-ui',
    fontWeight: 'bold',
    userSelect: 'none'
  }
}

export default CrosswordTile;