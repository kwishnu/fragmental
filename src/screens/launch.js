import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import formatDate from 'date-fns/format';
import launch_styles from "../styles/launch_styles";
import colors from '../config/colors';
import config from '../config/config';
import MenuImage from '../images/fragmental4.png';
import SmallPuzzle from '../images/small_puzzle.png';
import MediumPuzzle from '../images/medium_puzzle.png';
import LargePuzzle from '../images/large_puzzle.png';
const scrHeight = config.scrHeight;
let dateToday = formatDate(new Date(), "EEEE, MMM d");

// const KEY_ModePref = 'modePrefKey';

class Launch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkModeEnabled: false,
      closeMenuListener: true
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
    this.props.requestModalClose("Launch", false);
  }

  closeMenu(){
    console.log("clicked");
    setTimeout(() => {
      this.props.requestMenuClose(this.state.closeMenuListener);
    }, 100);
  }

  launchPuzzle(which){
    this.setState({toggleMenuListener: false});
    switch(which){
      case 3:
        this.closeSelf();
        this.props.startGame(3);
      break;
      case 4:
        this.closeSelf();
        this.props.startGame(4);
      break;
      default:
        this.closeSelf();
        this.props.startGame(5);
    }
  }

  render() {
    const { isModalVisible, darkModeEnabled, introText } = this.props;

    return(
      <AnimatePresence>
      {isModalVisible && 
        <motion.div
          initial={{ y: scrHeight }}
          animate={{ y: -2 }}
          exit={{ y: scrHeight }}
          style={{...launch_styles.containerView}}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >

          <div style={{...launch_styles.modalView, backgroundColor: darkModeEnabled ? colors.gray_4:colors.gray_4}} onClick={() => this.closeMenu()}>
            <div style={launch_styles.headerImageContainer}>
              <img src={MenuImage} alt={"Menu"} style={{boxShadow: `4px 4px 0px ${colors.off_black}`, height: config.scrHeight/11}}/>

            </div>
            <div style={{...launch_styles.modalBody}}>
              {/* //, backgroundColor: colors.dark_green */}

              <div style={{...launch_styles.intro_container}}>
                    <div style={{...launch_styles.title, color: colors.text_white}}>
                      {dateToday}
                    </div>
                    <div style={{...launch_styles.text, marginLeft: 15, color: colors.text_white}}>
                      {introText}
                    </div>

              </div>
              <div style={{...launch_styles.button_container}}>
                <div style={{...launch_styles.launchButton, backgroundColor: colors.dark_green}} onClick={() => this.launchPuzzle(3)}>
                  <img src={SmallPuzzle} alt={"Small Puzzle"} style={{boxShadow: `4px 4px 16px ${colors.off_black}`, height: config.scrHeight/16}}/>
                </div>
                <div style={{...launch_styles.launchButton, backgroundColor: colors.dark_blue}} onClick={() => this.launchPuzzle(4)}>
                  <img src={MediumPuzzle} alt={"Medium Puzzle"} style={{boxShadow: `4px 4px 16px ${colors.off_black}`, height: config.scrHeight/14}}/>
                </div>
                <div style={{...launch_styles.launchButton, backgroundColor: colors.dark_red}} onClick={() => this.launchPuzzle(5)}>
                  <img src={LargePuzzle} alt={"Large Puzzle"} style={{boxShadow: `4px 4px 16px ${colors.off_black}`, height: config.scrHeight/12}}/>
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

export default Launch;