import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import help_styles from "../styles/help_styles";
import colors from '../config/colors';
import config from '../config/config';
const scrHeight = config.scrHeight;

// const KEY_ModePref = 'modePrefKey';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkModeEnabled: false,
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
    const row1Text1 = "\u2022  Find the hidden ";
    const row1Text2 = "horizontal ";
    const row1Text3 = "words of full puzzle width";
    const row1Text31 = "\u2022  Form words by moving the columns of letters";
    const row1Text4 = " up and down";
    const row1Text5 = " to align words going";
    const row1Text6 = "  across";
    const row2Text1 = "\u2022  Make sure that the red RavL tile is in a word formed with your ";
    const row2Text2 = "last move!";
    const row2Text3 = "Incidental words earn points, but only the puzzle words will ";
    const row2Text4 = "clear the board";
    const row2Text5 = "\u2022  Form a word with the RavL tile early, or";
    const row2Text51 = "\u2022  Run out of points (1 point for each move that doesn't form a word)" ;  
    const row2Text52 = "...or the round will fail \n\n \u2605  Completing a game without using hints or failing as described will earn a star for your home screen!";
    const row3Text1 = "\u2022  Cost 5 points for the first, 10 thereafter";
    const row4Text1 = "\u2022  1 point earned for each letter in the word formed";
    const closeImage = this.props.darkModeEnabled? require("../images/close.png"):require("../images/close_black.png");
    const { isModalVisible, darkModeEnabled } = this.props;

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
              <div style={help_styles.r_tile_container}>
                <img
                  src={require("../images/r_ravl_tile.png")}
                  style={help_styles.r_tile_image}
                  alt={"Tile"}
                />
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
              <div style={{...help_styles.sectionHeading, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
                  <div style={{...help_styles.section_heading, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                    Do:
                  </div>
              </div>
              <div style={{...help_styles.section1_container}}>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  {row1Text1}
                <span style={{...help_styles.text, fontWeight: "bold", color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  {row1Text2}
                </span>
                  {row1Text3}
                </div>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  {row1Text31}
                <span style={{...help_styles.text, fontWeight: "bold", color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  {row1Text4}
                </span>
                  {row1Text5}
                <span style={{...help_styles.text, fontWeight: "bold", color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  {row1Text6}
                </span>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  {row2Text1}
                <span style={{...help_styles.text, fontWeight: "bold", color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  {row2Text2}
                </span>
                </div><br/>
                  {row2Text3}
                <span style={{...help_styles.text, fontWeight: "bold", color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row2Text4}
                </span>
                </div>
              </div>
              <div style={{...help_styles.sectionHeading}}>
                <div style={{...help_styles.section_heading, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  Do Not:
                </div>
              </div>
              <div style={{...help_styles.section2_container}}>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row2Text5}
                </div>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row2Text51}
                </div>
                <div style={{...help_styles.text, whiteSpace: 'pre-line', color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row2Text52}
                </div>
                {/* <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row2Text53}
                </div> */}
              </div>
              <div style={{...help_styles.sectionHeading}}>
                <div style={{...help_styles.section_heading, color: darkModeEnabled ? colors.off_white:colors.off_black}}>Hints:</div>
              </div>
              <div style={{...help_styles.section3_container}}>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row3Text1}
                </div>
              </div>
              <div style={{...help_styles.sectionHeading}}>
                <div style={{...help_styles.section_heading, color: darkModeEnabled ? colors.off_white:colors.off_black}}>Points:</div>
              </div>
              <div style={{...help_styles.section4_container}}>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row4Text1}
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

export default Help;