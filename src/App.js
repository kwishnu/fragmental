import React, { Component } from 'react';
import PageVisibility from 'react-page-visibility';
import ScreenOrientationReact from 'screen-orientation-react';
import colors from './config/colors';
import config from './config/config';
import Menu from './components/Menu.js';
import Header from './components/Header.js';
import MenuImage from './images/fragmental2.png';
import GameBoard from './components/GameBoard';
import styles from './styles/appStyles.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      deviceType: window.innerWidth > 1000?"pc":window.innerHeight/window.innerWidth > 1.77?"phone":"tablet",
      scrHeight: window.innerHeight,
      scrWidth: window.innerWidth,

    }
  }

  toggleDrawer() {
    this.setState({ showMenu: !this.state.showMenu });
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
            closeMenu={() => this.toggleDrawer()}
            showModal={(which, open) => this.showModal(which, open)}
            themeColor={colors.gray_3}//global.bgColor
            scrHeight={this.state.scrHeight}
            scrWidth={this.state.scrWidth}
          />
          <div style={styles.appContainer} onClick={this.state.showMenu ? () => this.toggleDrawer() : null}>
          <Header
            clickMenu={(which) => this.toggleDrawer(which)}
            showModal={(which, open) => this.showModal(which, open)}
            scrHeight={this.state.scrHeight}
            scrWidth={this.state.scrWidth}
            marLeftOrRight={(this.state.scrWidth - this.state.scrHeight * 9/16)/2 + 20}
            deviceType={ this.state.deviceType}
          />
          <div>
            <ScreenOrientationReact options={orientationMessageOptions}/>
          </div>
            <div 
              id="appLeftBox"
              style={{ ...styles.adBox, backgroundColor: colors.gray_3, borderRightColor: colors.off_black, left: 0 }}
            />
            <div 
              style={styles.headerImageContainer}
            >
              <img src={MenuImage} alt={"Menu"} style={{boxShadow: `4px 4px 0px ${colors.off_black}`, height: config.scrHeight/9}}/>
            </div>

            <GameBoard />
            {/* <div style={styles.footer}>
              <p style={styles.footerText}>©2023 KWish Apps</p>
            </div> */}
            <div 
              id="appRightBox"
              style={{ ...styles.adBox, backgroundColor:colors.gray_3, borderRightColor: colors.off_black, right: 0 }}
            />
          </div>
        </div>
      </PageVisibility>
    );
  }
}

export default App;