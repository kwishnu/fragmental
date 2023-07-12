import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const pc = config.isPC;
const tablet = config.isTablet;

class EndGameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkModeEnabled: this.props.isDarkModeEnabled,
    };
  }
  componentDidMount() {
  }
  closeSelf(){
    this.props.requestModalClose();
  }
  goToStart(){
    this.props.requestGoToStart();
  }

  render() {
    const { isDarkModeEnabled, isModalVisible } = this.props;
    return(
      <AnimatePresence>
      {isModalVisible && 
        <motion.div
          style={eg_modal_styles.centereddiv}
          initial={{ y: scrHeight }}
          animate={{ y: 0 }}
          exit={{ y: scrHeight }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          <div style={{...eg_modal_styles.modaldiv, backgroundColor: isDarkModeEnabled ? colors.off_black:colors.off_white}}>
          <div style={eg_modal_styles.text_container}>
              <div style={{...eg_modal_styles.modal_title, color: this.props.isDarkModeEnabled ? colors.gray_1:colors.off_black}}>Closing Game</div>
              <div style={{...eg_modal_styles.modal_text, color: this.props.isDarkModeEnabled ? colors.gray_2:colors.off_black}}>This will end the current game.  Exit game?</div>
            </div>
            <div style={eg_modal_styles.button_container}>
              <div
                style={eg_modal_styles.button}
                onClick={() => this.closeSelf()}
              >
                <div style={eg_modal_styles.button_text}>Cancel</div>
              </div>
              <div
                style={eg_modal_styles.button}
                onClick={() => this.goToStart()}
              >
                <div style={eg_modal_styles.button_text}>OK</div>
              </div>
            </div>
          </div>
        </motion.div>
      }
      </AnimatePresence>
      );
  }
}

const eg_modal_styles = {
  centereddiv: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: scrWidth,
    zIndex: 100
  },
  modaldiv: {
    display: 'flex',
    flexDirection: 'column',
    width: config.isPC?scrHeight * 0.2:scrWidth * 0.5,
    padding: 25,
    borderRadius: 5,
    alignItems: "center",
    boxShadow: `8px 8px 28px ${colors.gray_3}`,
  },
  button_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text_container: {
    alignSelf: 'stretch',
  },
  button: {
    display: 'flex',
    justifyContent: "center",
    width: pc?scrHeight/12:tablet?scrWidth/8:scrWidth/5,
    padding: 8,
    margin: 5,
    borderRadius: 7,
    backgroundColor: colors.button_blue,
  },
  button_text: {
    color: "white",
    fontSize: convertFont(23),
    fontWeight: 'bold',
    textAlign: "center",
    fontFamily: "system-ui",
    userSelect: 'none'
  },
  modal_title: {
    fontSize: convertFont(30),
    fontFamily: 'Acme',
    marginBottom: 15,
    textAlign: "left",
    userSelect: 'none'
  },
  modal_text: {
    fontFamily: 'system-ui',
    fontSize: convertFont(22),
    marginBottom: 30,
    marginTop: 15,
    textAlign: "left",
    userSelect: 'none'
  },
}

export default EndGameModal;