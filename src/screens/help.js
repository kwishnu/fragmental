import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import DemoTileSet from '../components/DemoTileSet';
import help_styles from "../styles/help_styles";
import colors from '../config/colors';
import config from '../config/config';
const scrHeight = config.scrHeight;

// const KEY_ModePref = 'modePrefKey';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkModeEnabled: true,
    };
  }
  componentDidMount() {
    // AsyncStorage.getItem(KEY_ModePref).then((modePref) => {
    //   if (modePref !== null) {
    //     const modePrefBool = (modePref == 'true')?true:false;
    //     this.setState({ darkModeEnabled: modePrefBool});
    //   }else{
    //     try {
    //         AsyncStorage.setItem(KEY_ModePref, 'false');
    //     } catch (error) {
    //         window.alert('AsyncStorage error: ' + error.message);
    //     }
    //   }
    // }).done();
  }
  closeSelf(){
    this.props.requestModalClose("Help", false);
  }
   render() {
    const row1Text = "\u2003  Tap or click the fragments to rotate a full 360 degrees. Note that this can reverse the letters. Try it out:";
    const row2Text = "\u2003  The fragment will turn pink if dropped in an illegal position:";
    const row3Text = "\u2003  ...whereas correct puzzle words will turn green when formed. Be aware, however, that they may not be in the right location in the puzzle!";
    // const row1Text2 = "horizontal ";
    const closeImage = this.state.darkModeEnabled? require("../images/close.png"):require("../images/close_black.png");
    const { isModalVisible } = this.props;
    const { darkModeEnabled } = this.state;

    return(
      <AnimatePresence>
      {isModalVisible && 
        <motion.div
          initial={{ y: scrHeight }}
          animate={{ y: -2 }}
          exit={{ y: scrHeight }}
          style={{...help_styles.containerView}}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >

          <div style={{...help_styles.modalView, backgroundColor: darkModeEnabled ? colors.gray_4:colors.off_white}}>
            <div style={help_styles.modalHeader}>
              <div style={help_styles.titleContainer}>
                <div style={{...help_styles.title, color: darkModeEnabled ? colors.off_white:colors.off_black}}>How to Play</div>
              </div>
              <div style={help_styles.closeButtonContainer}>
                <img
                  style = {help_styles.close_image}
                  src={closeImage}
                  onClick={() => this.closeSelf()}
                  alt = {"Close Button"}
                />
              </div>
            </div>
            <div style={{...help_styles.modalBody, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
              <div style={demo_styles.sectionContainer}>
                <div style={{...help_styles.section_heading, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  Tap to Rotate:
                </div>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  {row1Text}
                </div>
                <div style={demo_styles.tilesContainer}>
                  <DemoTileSet
                    letters={["a", "b", "c"]}
                    flipState={0}
                    left={160}
                    top={100}
                    tileHeight={48}
                  />
                </div>
              </div>
              <div style={demo_styles.sectionContainer}>
                <div style={{...help_styles.section_heading, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  Drag and Drop!
                </div>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  {row2Text}
                </div>
                <div style={demo_styles.boardImageContainer}>
                  <img
                    src={require("../images/incorrect_move.png")}
                    style={demo_styles.boardImage}
                    alt={"Incorrect move example"}
                  />
                </div>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  {row3Text}
                </div>
                <div style={demo_styles.boardImageContainer}>
                  <img
                    src={require("../images/correct_move.png")}
                    style={demo_styles.boardImage}
                    alt={"Correct move example"}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        }
        </AnimatePresence>
      );
  }
}

const demo_styles = {
  sectionContainer: {
    display: 'flex', 
    flexDirection: "column", 
    position: "relative", 
    height: "auto", 
    alignSelf: "stretch", 
  },
  tilesContainer: {
    height: 80,
  },
  boardImageContainer: {
    display: 'flex', 
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    alignSelf: "stretch", 
    backgroundColor: colors.off_black,
    margin: 20
  },
  boardImage: {
    height: 95,
    width: 130,
  }
}
export default Help;