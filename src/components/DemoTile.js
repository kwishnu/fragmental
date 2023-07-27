import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import colors from '../config/colors';


class DemoTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: colors.text_white,
      textColor: colors.off_black,
      zIndex: 0,
      boxShadow: "inset 0.14em 0.14em 0.14em 0 rgba(255,255,255,0.5), inset -0.14em -0.14em 0.14em 0 rgba(0,0,0,0.5)"
    };
    this.tileRefs = [];
  }

  render() {
    const { letter, tileHeight, id } = this.props;

    return (
      <AnimatePresence>
          <motion.div
            // initial={{ x: 750, y: 0 }}
            // animate={{ x: 0, y: 0 }}
            // exit={{ boxShadow: null }}
            // transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.4, delay: delay }}
            // onAnimationComplete={() => this.props.setBgColor()}
          >
            <div ref={(ref) => this.tileRefs[id] = ref} style={{display: "flex", position: "relative"}}>
              <div
                style=
                  {{
                    ...tile_styles.tile, 
                    backgroundColor: this.state.bgColor, 
                    height: tileHeight - 4, 
                    width: tileHeight - 4,
                    boxShadow: this.state.boxShadow
                  }}
              >
              <div style={{...tile_styles.text, fontSize: tileHeight * 0.6, color: this.state.textColor}}>
                {letter.toUpperCase()}
                {/* {this.state.zIndex} */}
                {/* {this.props.id} */}
              </div>
            </div>
            </div>
          </motion.div>
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
    // boxShadow: "inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)"
  },
  text: {
    fontFamily: 'system-ui',
    fontWeight: 'bold',
    userSelect: 'none'
  }
}

export default DemoTile;