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
const isPhone = config.isPhone;
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
    this.props.requestModalClose("Home", false, true);
  }

  closeMenu(){
    setTimeout(() => {
      this.props.requestMenuClose(this.state.closeMenuListener);
    }, 100);
  }

  launchPuzzle(which, daily){
    this.setState({closeMenuListener: false});
    this.closeSelf();
    this.props.startGame(which, daily);
  }

  render() {
    const { isModalVisible, introText, puzzleStreak } = this.props;
    const dailyPuzzlesText = "Daily Puzzles";
    const playText = "Play";
    const numPuzzStreakDays = puzzleStreak.split(",")[0];

    return(
      <AnimatePresence>
      {isModalVisible && 
        <motion.div
          initial={{ y: scrHeight }}
          animate={{ y: isPhone?-20:0 }}
          exit={{ y: scrHeight }}
          style={{...launch_styles.containerView}}
          transition={{ type: "spring", bounce: 0, duration: 0.8 }}
        >

          <div style={{...launch_styles.modalView, backgroundColor: colors.gray_4}} onClick={() => this.closeMenu()}>
            <div style={launch_styles.headerImageContainer}>
              <img src={MenuImage} alt={"Menu"} style={{height: config.scrHeight/11}}/>
            </div>
            <div style={{...launch_styles.modalBody, justifyContent: isPhone?"flex-start":"center"}}>
              <div style={{...launch_styles.intro_container}}>
                <div style={launch_styles.title}>
                  {dateToday}
                </div>
                <div style={{...launch_styles.text, marginLeft: 15}}>
                  {introText}
                </div>
              </div>
              <div style={launch_styles.labelContainer}>
                <div style={launch_styles.labelBackground}>
                  <div style={launch_styles.title}>
                    {dailyPuzzlesText}
                  </div>
                </div>
                <div style={launch_styles.streak_cell}>
              {(parseInt(numPuzzStreakDays) !== 0 && puzzleStreak !== '0,01-01-2001') &&
                <div  style={launch_styles.streak_text_div}>
                  <div style={launch_styles.streak_text}>
                    Streak:
                  </div>
                  <div style={{...launch_styles.streak_text_bubble, paddingLeft: parseInt(puzzleStreak) > 2?8:12, paddingRight: parseInt(puzzleStreak) > 2?8:14}}>
                    <div style={{...launch_styles.streak_number_text, fontSize: 16}}>
                      {
                        (parseInt(numPuzzStreakDays) > 2)?'🔥 ' + numPuzzStreakDays:
                        numPuzzStreakDays
                      }
                    </div>
                  </div>
                </div>
              }
          </div>

              </div>
              <div style={{...launch_styles.button_container}}>
                <div style={{...launch_styles.launchButton, marginTop: 10, marginBottom: 10, backgroundColor: colors.dark_green, borderRadius: "15% 0 0 15%"}} onClick={() => this.launchPuzzle(3, true)}>
                  <img src={SmallPuzzle} alt={"Small Puzzle"} style={{boxShadow: `4px 4px 16px ${colors.off_black}`, height: config.scrHeight/22}}/>
                </div>
                <div style={{...launch_styles.launchButton, marginTop: 10, marginBottom: 10, backgroundColor: colors.dark_blue}} onClick={() => this.launchPuzzle(3, true)}>
                  <img src={MediumPuzzle} alt={"Medium Puzzle"} style={{boxShadow: `4px 4px 16px ${colors.off_black}`, height: config.scrHeight/18}}/>
                </div>
                <div style={{...launch_styles.launchButton, marginTop: 10, marginBottom: 10, backgroundColor: colors.dark_red, borderRadius: "0 15% 15% 0"}} onClick={() => this.launchPuzzle(3, true)}>
                  <img src={LargePuzzle} alt={"Large Puzzle"} style={{boxShadow: `4px 4px 16px ${colors.off_black}`, height: config.scrHeight/15}}/>
                </div>
              </div>
              <div style={launch_styles.labelContainer}>
                <div style={launch_styles.labelBackground}>
                  <div style={launch_styles.title}>
                    {playText}
                  </div>
                </div>
              </div>
              <div style={{...launch_styles.button_container}}>
                <div style={{...launch_styles.launchButton, margin: 10, backgroundColor: colors.dark_green, borderRadius: 15}} onClick={() => this.launchPuzzle(3, false)}>
                  <img src={SmallPuzzle} alt={"Small Puzzle"} style={{boxShadow: `4px 4px 16px ${colors.off_black}`, height: config.scrHeight/22}}/>
                </div>
                <div style={{...launch_styles.launchButton, margin: 10, backgroundColor: colors.dark_blue, borderRadius: 15}} onClick={() => this.launchPuzzle(4, false)}>
                  <img src={MediumPuzzle} alt={"Medium Puzzle"} style={{boxShadow: `4px 4px 16px ${colors.off_black}`, height: config.scrHeight/18}}/>
                </div>
                <div style={{...launch_styles.launchButton, margin: 10, backgroundColor: colors.dark_red, borderRadius: 15}} onClick={() => this.launchPuzzle(5, false)}>
                  <img src={LargePuzzle} alt={"Large Puzzle"} style={{boxShadow: `4px 4px 16px ${colors.off_black}`, height: config.scrHeight/15}}/>
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