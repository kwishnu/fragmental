import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import colors from '../config/colors';
import config from '../config/config';
import { getColor } from '../config/functions';
const scrWidth = config.scrWidth;

class Word extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      spelledRight: this.props.spelledRight,
      bgColor: colors.text_white
    };
  }

  componentDidMount(){

  }

  handleClick(){
    console.log("clicked");
    this.setState({show: false});
  }

  render() {
    const { wordHeight, left, top, word, delay } = this.props;
console.log("left: " + left + ", top: " + top);
    return (
      <AnimatePresence>
        {this.state.show && 
          <motion.div
            initial={{ x: 400, opacity: 1 }}
            animate={{ x: left, opacity: 1 }}
            exit={{ y: 500, opacity: 0 }}
            transition=
              {
                this.state.show === true?
                { ease: "linear", duration: 3, repeat: Infinity, repeatType: 'reverse'}
                :
                { ease: "linear", duration: 0.6}
              }
            onClick={() => this.handleClick()}
          >
            <motion.div
              style=
                {{
                  ...word_styles.word, 
                  backgroundColor: getColor(), 
                  height: wordHeight, 
                  top: top,
                  left: left,
                }}
                initial={{ y: -500 }}
                animate={{ y: top }}
                transition={{ type: "spring", stiffness: 250, damping: 18, duration: 1, delay: delay }}
            >
              <div style={{...word_styles.text, fontSize: wordHeight * 0.6, color: colors.off_black}}>
                {word.toUpperCase()}
              </div>
            </motion.div>
          </motion.div>
      }
      </AnimatePresence>
    );
  }
}

const word_styles = {
  word: {
    position: "absolute",
    display: "flex",
    margin: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.off_black, 
    borderStyle: 'solid',
    paddingLeft: 30,
    paddingRight: 30,
    overflow: "hidden"
  },
  text: {
    fontFamily: 'system-ui',
    fontWeight: 'bold',
    userSelect: 'none',
  }
}

export default Word;