import React, { Component } from 'react';
import PageVisibility from 'react-page-visibility';
import ScreenOrientationReact from 'screen-orientation-react';
import { nanoid } from 'nanoid';
import formatDate from 'date-fns/format';
import parse from 'date-fns/parse';
import { differenceInMinutes, differenceInDays } from 'date-fns';
import colors from './config/colors';
import Menu from './components/Menu.js';
import Header from './components/Header.js';
import GameBoard from './components/GameBoard';
import Launch from "./screens/launch";
import Help from "./screens/help";
import Settings from "./screens/settings";
import Support from "./screens/support";
import styles from './styles/appStyles.js';
import {getLaunchText, getPuzzles} from './data/dataHelper';
const KEY_LastOpenedDate = 'lastOpenedKey';
const KEY_ShowedTutorial = 'showedTutKey';
const KEY_PlayedFirstGame = 'playedGameKey';
const KEY_LastVisibleTime = 'lastVisibleTime';
const KEY_PuzzleStreakDays = 'puzzleStreakKey';
const KEY_DailySolvedArray = 'dailySolvedKey';
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
      showLaunch: true,
      daily: false,
      dailyPuzzleCompleted: false,
      puzzleStreak: "0,01-01-2001",
      // lastPuzzleDay: "01-01-2001",
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

    const showed = window.localStorage.getItem(KEY_ShowedTutorial);
    if (showed !== null) {
      const showedBool = (showed === 'true') ? true : false;
      this.setState({ showedTutScreen1: showedBool, showTutScreen1: !showedBool });
    } else {
      try {
        window.localStorage.setItem(KEY_ShowedTutorial, 'false');
        this.setState({ showedTutScreen1: false });
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    const played = window.localStorage.getItem(KEY_PlayedFirstGame);
    if (played !== null) {
      const playedBool = (played === 'true') ? true : false;
      this.setState({ playedGameOnce: playedBool });
    } else {
      try {
        window.localStorage.setItem(KEY_PlayedFirstGame, 'false');
        this.setState({ playedGameOnce: false });
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }


    const lastOpened = window.localStorage.getItem(KEY_LastOpenedDate);
    if (lastOpened !== null) {
      const loDateStr = lastOpened;
      this.setState({ lastOpenedDate: loDateStr });
      try {
        window.localStorage.setItem(KEY_LastOpenedDate, dateToday);
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    } else {
      try {
        window.localStorage.setItem(KEY_LastOpenedDate, dateToday);
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
    }

    try {
      window.localStorage.setItem(KEY_DailySolvedArray, JSON.stringify([]));
    } catch (error) {
      window.alert('window.localStorage error: ' + error.message);
    }
    this.updatePuzzleStreak();
  }

  updatePuzzleStreak(){
    const puzzStreak = window.localStorage.getItem(KEY_PuzzleStreakDays);
    if (puzzStreak !== null) {
      const ps = puzzStreak;
      const numPuzzStreakDays = ps.split(",")[0];
      const lastPuzzDay = ps.split(",")[1];
      let today = new Date();
      const dateFromLPD = parse(lastPuzzDay, 'MM-dd-yyyy', new Date());
      const diff = differenceInDays(today, dateFromLPD);
      console.log("diff: " + diff);
      const numStr = (numPuzzStreakDays === '0' || diff > 1) ? '0' : numPuzzStreakDays;
      const newPuzzDateStr = numStr + "," + dateToday;

    //   if(!this.state.didit){

    //   try {
    //     window.localStorage.setItem(KEY_PuzzleStreakDays, '1,07-27-2023');
    //   } catch (error) {
    //     window.alert('window.localStorage error: ' + error.message);
    //   }
    //   this.setState({ puzzleStreak: '1,07-27-2023', didit: true });
    // }else{
      this.setState({ puzzleStreak: newPuzzDateStr });
    // }
    } else {
      try {
        window.localStorage.setItem(KEY_PuzzleStreakDays, '0,01-01-2001');
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
        // showLaunch: false,
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

  // reloadGame(){
  //   window.location.reload();
  // }

  handleVisibilityChange(visible) {
    if (visible) {
      const currentTime = new Date();
      const minutesSinceVisible = differenceInMinutes(currentTime, new Date(this.state.lastVisibleTime));

      if (!this.state.visible && minutesSinceVisible >= 15) {
        window.location.reload(); // Reload the page
      }

      this.setState({ visible: true, lastVisibleTime: currentTime });
      localStorage.setItem(KEY_LastVisibleTime, currentTime);
      dateToday = formatDate(new Date(), "MM-dd-yyyy");
      prettyDate = formatDate(new Date(), "EEEE, MMMM d");
      const openedStr = window.localStorage.getItem(KEY_LastOpenedDate);
      if (openedStr !== null) {
        if (dateToday !== openedStr) {
          launchText = getLaunchText(dateToday);
          const puzzlesObj = getPuzzles(dateToday);
          this.setState({puzzlesObj: puzzlesObj});
                this.setState({ dailyPuzzleCompleted: false });
          setTimeout(() => {
            this.reloadGame();
          }, 200);
        }
      }
      try {
        window.localStorage.setItem(KEY_LastOpenedDate, dateToday);
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
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
            themeColor={colors.gray_3}//global.bgColor
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
              style={{ ...styles.adBox, backgroundColor: colors.gray_3, borderRightColor: colors.off_black, left: 0 }}
            />
            {this.state.showGame3 &&
              <GameBoard 
                count={3} 
                words={this.state.puzzlesObj["3"].words} 
                puzzleSet={this.state.puzzlesObj["3"].puzzleSet} 
                fragments={this.state.puzzlesObj["3"].fragments} 
                fragObj={this.state.puzzlesObj["3"].fragObj} 
                daily={this.state.daily}
                puzzleStreak={this.state.puzzleStreak}
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
                puzzleStreak={this.state.puzzleStreak}
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
                puzzleStreak={this.state.puzzleStreak}
                startGame={(which, daily) => { this.startGame(which, daily) }}
                keyIDFragment={keyIDFrag}
                showLaunch={() => { this.showLaunch() }}
                />
                  }
            <div 
              id="appRightBox"
              style={{ ...styles.adBox, backgroundColor:colors.gray_3, borderRightColor: colors.off_black, right: 0 }}
            />
          </div>
          <Launch
            isModalVisible={this.state.showLaunch}
            introText={launchText}
            dateToday={prettyDate}
            puzzleStreak={this.state.puzzleStreak}
            requestModalClose={(which, open, startingGame) => { this.toggleModal(which, open, startingGame) }}
            startGame={(which, daily) => { this.startGame(which, daily) }}
            requestMenuClose={() => { this.closeMenu()}}
            // darkModeEnabled={this.state.darkModeEnabled}
          />
          <Settings
            isModalVisible={this.state.showSettingsModal}
            requestModalClose={() => { this.toggleModal(null, false) }}
            sendValueToGame={(val) => { this.updateSettingsValue(val) }}
            navigation={this.props.navigation}
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