import React, { Component } from 'react';
import PageVisibility from 'react-page-visibility';
import ScreenOrientationReact from 'screen-orientation-react';
import colors from './config/colors';
// import config from './config/config';
import Menu from './components/Menu.js';
import Header from './components/Header.js';
import GameBoard from './components/GameBoard';
import Launch from "./screens/launch";
import styles from './styles/appStyles.js';
const sampleBlurb = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      deviceType: window.innerWidth > 1000?"pc":window.innerHeight/window.innerWidth > 1.77?"phone":"tablet",
      scrHeight: window.innerHeight,
      scrWidth: window.innerWidth,
      showLaunch: true,
      title: "FragMental"
    }
  }

  componentDidMount(){
    this.setState({ showLaunch: true, title: "" });
  }

  toggleMenu(respond) {
    if(respond){
      this.setState({ showMenu: !this.state.showMenu });

    }
  }

  toggleModal(which, open) {
    if (open) {
      switch (which) {
        case "FragMental Start":
          console.log("Launch...");
            this.toggleMenu(true);
            this.setState({ showLaunch: true });
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
    } else {
      this.setState({
        showSettingsModal: false,
        showHelpModal: false,
        showSupportModal: false,
        showEndGameModal: false,
        showLaunch: false,
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

  handleVisibilityChange(visible) {
    if (visible) {
      // dateToday = formatDate(new Date(), "MM-dd-yyyy");
      // const openedStr = window.localStorage.getItem(KEY_LastOpenedDate);
      // if (openedStr !== null) {
      //   if (dateToday !== openedStr) {
      //     title = puzzTitle(dateToday);
      //     description = puzzDescription(dateToday);
      //     dailyPuzzlesArr = puzzles(dateToday);
      //     this.setState({ clearedLevel: true, dailyPuzzleCompleted: false });
      //     setTimeout(() => {
      //       this.nextGame(true);
      //     }, 200);
      //   }
      // }
      // try {
      //   window.localStorage.setItem(KEY_LastOpenedDate, dateToday);
      // } catch (error) {
      //   window.alert('window.localStorage error: ' + error.message);
      // }
    }
  }

  render() {
    const orientationMessageOptions = {
      color: colors.text_white,
      bgColor: global.bgColor,
      animation: false,
      fontSize: 3,
      message: "Please play RavL in portrait mode"
    }

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
          <div style={styles.appContainer} onClick={this.state.showMenu ? (respond) => this.toggleMenu(respond) : null}>
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

            <GameBoard />
            {/* <div style={styles.footer}>
              <p style={styles.footerText}>©2023 KWish Apps</p>
            </div> */}
            <div 
              id="appRightBox"
              style={{ ...styles.adBox, backgroundColor:colors.gray_3, borderRightColor: colors.off_black, right: 0 }}
            />
          </div>

          <Launch
            isModalVisible={this.state.showLaunch}
            introText={sampleBlurb}
            requestModalClose={(which, open) => { this.toggleModal(which, open) }}
            requestMenuClose={(respond) => { this.toggleMenu(respond)}}
            darkModeEnabled={this.state.darkModeEnabled}
          />

        </div>
      </PageVisibility>
    );
  }
}

export default App;