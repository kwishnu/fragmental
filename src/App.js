import React, { Component } from 'react';
import colors from './config/colors';
import config from './config/config';
import MenuImage from './images/fragmental2.png';
import GameBoard from './components/GameBoard';
import styles from './styles/appStyles.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div style={styles.appContainer}>
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
    );
  }
}

export default App;