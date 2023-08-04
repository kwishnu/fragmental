import React, { Component } from 'react';
import PageVisibility from 'react-page-visibility';
import ScreenOrientationReact from 'screen-orientation-react';
import { nanoid } from 'nanoid';
import formatDate from 'date-fns/format';
import { differenceInMinutes } from 'date-fns';
import colors from './config/colors';
import config from './config/config';
import Menu from './components/Menu.js';
import Header from './components/Header.js';
import GameBoard from './components/GameBoard';
import Launch from "./screens/launch";
import Help from "./screens/help";
import Support from "./screens/support";
import styles from './styles/appStyles.js';
import {getLaunchText, getPuzzles} from './data/dataHelper';
const KEY_LastOpenedDate = 'fmLastOpenedKey';
const KEY_LastVisibleTime = 'fmLastVisibleTime';
const KEY_PuzzleStreakDays = 'fmPuzzleStreakKey';
const KEY_DailySolvedArray = 'fmDailySolvedKey';
const isPC = config.isPC;
let dateToday = "";
let prettyDate = "";
let launchText = "";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      deviceType: window.innerWidth > 1000?"pc":window.innerHeight/window.innerWidth > 1.77?"phone":"tablet",
      scrHeight: window.innerHeight,
      scrWidth: window.innerWidth,
      widthLeftOrRight: window.innerWidth > 1000?(window.innerWidth - window.innerHeight * 9/16)/2:window.innerHeight/window.innerWidth > 1.77?0:(window.innerWidth - window.innerHeight * 9/16)/2,
      showLaunch: true,
      daily: false,
      dailySolvedArray: [],
      puzzleStreak: "0,01-01-2001",
      showGame3: false,
      showGame4: false,
      showGame5: false,
      showHelpModal: false,
      showSupportModal: false,
      showSettingsModal: false,
      puzzlesObj: {},
      visible: true,
      lastVisibleTime: localStorage.getItem(KEY_LastVisibleTime) || new Date(),
      title: ""
    }
  }

  componentDidMount(){
    dateToday = formatDate(new Date(), "MM-dd-yyyy");
    prettyDate = formatDate(new Date(), "EEEE, MMMM d");
    launchText = getLaunchText(dateToday);
    const puzzlesObj = getPuzzles(dateToday);
    this.setState({puzzlesObj: puzzlesObj});

    let needToClearDailyArray = false;
    const openedStr = window.localStorage.getItem(KEY_LastOpenedDate);

    if (openedStr !== null) {
      if (dateToday !== openedStr) {
        needToClearDailyArray = true;
      }
    }else{
      try {
        window.localStorage.setItem(KEY_LastOpenedDate, dateToday);
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    if(needToClearDailyArray){
      try {
        window.localStorage.setItem(KEY_DailySolvedArray, JSON.stringify([]));
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
      try {
        window.localStorage.setItem(KEY_LastOpenedDate, dateToday);
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    this.updatePuzzleStreak();
    this.updateDailySolvedArray();

    if(isPC){
      window.addEventListener("resize", this.updateHeightAndWidth);
    }
  }

  componentWillUnmount(){
    if(isPC){
      window.removeEventListener("resize", this.updateHeightAndWidth);
    }
  }

  updateHeightAndWidth = (m) => {
    const wlor = window.innerWidth > 1000?(window.innerWidth - window.innerHeight * 9/16)/2:window.innerHeight/window.innerWidth > 1.77?0:(window.innerWidth - window.innerHeight * 9/16)/2
    this.setState({
      widthLeftOrRight: wlor,
      scrHeight: window.innerHeight,
      scrWidth: window.innerWidth,
      deviceType: window.innerWidth > 1000?"pc":window.innerHeight/window.innerWidth > 1.77?"phone":"tablet",
    });
  }

  updatePuzzleStreak(){
    const puzzStreak = window.localStorage.getItem(KEY_PuzzleStreakDays);
    if (puzzStreak !== null) {
      this.setState({puzzleStreak: puzzStreak});
    }else{
      try {
        window.localStorage.setItem(KEY_PuzzleStreakDays, '0,01-01-2001');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }
  }

  updateDailySolvedArray(){
    const solvedArray = window.localStorage.getItem(KEY_DailySolvedArray);
    if (solvedArray !== null) {
      this.setState({dailySolvedArray: JSON.parse(solvedArray)});
    }else{
      try {
        window.localStorage.setItem(KEY_DailySolvedArray, JSON.stringify([]));
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }
  }

  toggleMenu(respond) {
    if(respond){
      this.setState({ showMenu: !this.state.showMenu });
    }
  }

  closeMenu() {
      this.setState({ showMenu: false });
  }

  showLaunch(){
    this.updatePuzzleStreak();
    this.updateDailySolvedArray();
    this.setState({ showLaunch: true, title: "" });
    setTimeout(() => {
      this.setState({showGame3: false, showGame4: false, showGame5: false});
    }, 700);
  }

  toggleModal(which, open, startingGame) {
    if (open) {
      switch (which) {
        case "Home":
          this.updatePuzzleStreak();
          this.updateDailySolvedArray();
          this.toggleMenu(true);
          this.setState({ showLaunch: true, title: "" });
          setTimeout(() => {
            this.setState({showGame3: false, showGame4: false, showGame5: false});
          }, 700);
          break;
        case "Settings":
          this.setState({ showSettingsModal: true });
          break;
        case "Help":
          this.setState({ showHelpModal: true });
          break;
        case "Support":
          this.setState({ showSupportModal: true });
          break;
        default:
          console.log("No default case...");
      }
    } else if(startingGame){
      this.setState({showLaunch: false});
    } else {
      this.setState({
        showSettingsModal: false,
        showHelpModal: false,
        showSupportModal: false,
        showEndGameModal: false,
      });

    }
  }

  showModal(which, open) {
    this.setState({
      showSettingsModal: false,
      showHelpModal: false,
      showSupportModal: false,
    });

    this.toggleModal(which, open);
  }

  startGame(which, daily){
    const keyIDFrag = nanoid();

    this.setState({title: "FragMental"});

    switch(which){
      case 3:
        this.setState({daily: daily, showGame3: true, showGame4: false, showGame5: false, keyIDFrag: keyIDFrag});
      break;
      case 4:
        this.setState({daily: daily, showGame4: true, showGame3: false, showGame5: false, keyIDFrag: keyIDFrag});
      break;
      default:
        this.setState({daily: daily, showGame5: true, showGame3: false, showGame4: false, keyIDFrag: keyIDFrag});
    }
  }

  handleVisibilityChange(visible) {
    if (visible) {
      const currentTime = new Date();
      const minutesSinceVisible = differenceInMinutes(currentTime, new Date(this.state.lastVisibleTime));
      console.log("minutesSinceVisible: " + minutesSinceVisible);
      if (!this.state.visible && minutesSinceVisible >= 15) {
        window.location.reload(); // Reload the page
      }

      // this.setState({ visible: true, lastVisibleTime: currentTime });
      // localStorage.setItem(KEY_LastVisibleTime, currentTime);
      // dateToday = formatDate(new Date(), "MM-dd-yyyy");
      // prettyDate = formatDate(new Date(), "EEEE, MMMM d");
      // const openedStr = window.localStorage.getItem(KEY_LastOpenedDate);
      // if (openedStr !== null) {
      //   if (dateToday !== openedStr) {
      //     launchText = getLaunchText(dateToday);
      //     const puzzlesObj = getPuzzles(dateToday);
      //     this.setState({puzzlesObj: puzzlesObj});//, dailyPuzzleCompleted: false
      //   }
      // }
      // try {
      //   window.localStorage.setItem(KEY_LastOpenedDate, dateToday);
      // } catch (error) {
      //   window.alert('window.localStorage error: ' + error.message);
      // }
    }else{
      this.setState({ visible: false });
    }
  }

  render() {
    const orientationMessageOptions = {
      color: colors.off_black,
      bgColor: global.bgColor,
      animation: false,
      fontSize: 3,
      message: "Please play FragMental in portrait mode"
    }
    const selectedPattern = this.state.showGame3 ? patterns.bg3 : this.state.showGame4? patterns.bg4:this.state.showGame5?patterns.bg5:patterns.bg0;
    const {keyIDFrag} = this.state;

    return (
      <PageVisibility onChange={isVisible => this.handleVisibilityChange(isVisible)}>
        <div>
          <Menu
            showMenu={this.state.showMenu}
            closeMenu={(respond) => this.toggleMenu(respond)}
            showModal={(which, open) => this.showModal(which, open)}
            themeColor={colors.gray_3}
            scrHeight={this.state.scrHeight}
            scrWidth={this.state.scrWidth}
          />
          <div style={{...styles.appContainer, ...selectedPattern}} onClick={this.state.showMenu ? (respond) => this.toggleMenu(respond) : null}>
          <Header
            clickMenu={(respond) => this.toggleMenu(respond)}
            showModal={(which, open) => this.showModal(which, open)}
            scrHeight={this.state.scrHeight}
            scrWidth={this.state.scrWidth}
            marLeftOrRight={(this.state.scrWidth - this.state.scrHeight * 9/16)/2 + 20}
            deviceType={ this.state.deviceType}
            title={this.state.title}
          />
          <div>
        <ScreenOrientationReact options={orientationMessageOptions}/>
          </div>
            <div 
              id="appLeftBox"
              style={{ ...styles.adBox, width: this.state.widthLeftOrRight, backgroundColor: colors.gray_3, borderRightColor: colors.off_black, left: 0 }}
            />
            {this.state.showGame3 &&
              <GameBoard 
                count={3} 
                words={this.state.puzzlesObj["3"].words} 
                puzzleSet={this.state.puzzlesObj["3"].puzzleSet} 
                fragments={this.state.puzzlesObj["3"].fragments} 
                fragObj={this.state.puzzlesObj["3"].fragObj} 
                daily={this.state.daily}
                startGame={(which, daily) => { this.startGame(which, daily) }}
                keyIDFragment={keyIDFrag}
                showLaunch={() => { this.showLaunch() }}
                />
                  }
            {this.state.showGame4 &&
              <GameBoard 
                count={4} 
                words={this.state.puzzlesObj["4"].words} 
                puzzleSet={this.state.puzzlesObj["4"].puzzleSet} 
                fragments={this.state.puzzlesObj["4"].fragments} 
                fragObj={this.state.puzzlesObj["4"].fragObj} 
                daily={this.state.daily}
                startGame={(which, daily) => { this.startGame(which, daily) }}
                keyIDFragment={keyIDFrag}
                showLaunch={() => { this.showLaunch() }}
                />
                  }
            {this.state.showGame5 &&
              <GameBoard 
                count={5} 
                words={this.state.puzzlesObj["5"].words} 
                puzzleSet={this.state.puzzlesObj["5"].puzzleSet} 
                fragments={this.state.puzzlesObj["5"].fragments} 
                fragObj={this.state.puzzlesObj["5"].fragObj} 
                daily={this.state.daily}
                startGame={(which, daily) => { this.startGame(which, daily) }}
                keyIDFragment={keyIDFrag}
                showLaunch={() => { this.showLaunch() }}
                />
                  }
            <div 
              id="appRightBox"
              style={{ ...styles.adBox, width: this.state.widthLeftOrRight, backgroundColor:colors.gray_3, borderRightColor: colors.off_black, right: 0 }}
            />
          </div>
          <Launch
            isModalVisible={this.state.showLaunch}
            introText={launchText}
            dateToday={prettyDate}
            puzzleStreak={this.state.puzzleStreak}
            dailySolvedArray={this.state.dailySolvedArray}
            requestModalClose={(which, open, startingGame) => { this.toggleModal(which, open, startingGame) }}
            startGame={(which, daily) => { this.startGame(which, daily) }}
            requestMenuClose={() => { this.closeMenu()}}
            // darkModeEnabled={this.state.darkModeEnabled}
          />
          <Help
            isModalVisible={this.state.showHelpModal}
            requestModalClose={(which, open) => { this.toggleModal(which, open) }}
            // darkModeEnabled={this.state.darkModeEnabled}
          />
          <Support
            isModalVisible={this.state.showSupportModal}
            requestModalClose={(which, open) => { this.toggleModal(which, open) }}
            startPurchaseInGame={(val) => { this.initiatePurchase(val) }}
            // darkModeEnabled={this.state.darkModeEnabled}
          />
        </div>
      </PageVisibility>
    );
  }
}

const patterns = {
  bg0: {
    backgroundColor: colors.gray_4,
  },
  bg3: {
    backgroundColor: '#000200',
    opacity: 1,
    backgroundImage: 'radial-gradient(ellipse farthest-corner at 9px 9px, #0e2701, #0e2701 50%, #000200 50%)',
    backgroundSize: '9px 9px'
  },
  bg4: {
    backgroundColor: '#01021f',
    opacity: 1,
    backgroundImage: 'radial-gradient(ellipse farthest-corner at 9px 9px, #02076a, #02076a 50%, #01021f 50%)',
    backgroundSize: '9px 9px'
  },
  bg5: {
    backgroundColor: '#210401',
    opacity: 1,
    backgroundImage: 'radial-gradient(ellipse farthest-corner at 9px 9px, #440902, #440902 50%, #210401 50%)',
    backgroundSize: '9px 9px'
  }
}
//530c03
export default App;