import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import colors from '../config/colors';
import config from '../config/config';
import MenuHeader from '../components/MenuHeader';
import MenuItem from '../components/MenuItem';
import closeImage from '../images/close.png';
// import settingsImage from '../images/settings.png';
import helpImage from '../images/question.png';
import supportImage from '../images/heart.png';
import homeImage from '../images/home.png';
const pc = config.isPC;


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  closeMenu(){
    this.props.closeMenu(true);
  }

  showModal(which){
    this.props.showModal(which, true);
  }
      
  render() {
    const { showMenu,  scrHeight, scrWidth } = this.props;//themeColor,
    const xInitial = pc?(scrWidth - scrHeight * 9/16)/2 - scrHeight * 0.26 : -scrHeight * 0.2;
    const xAnimate = pc?(scrWidth - scrHeight * 9/16)/2 -20 : -2;
    const themeColor = colors.blue_gray;

    return (
      <AnimatePresence>
        {showMenu && 
          <motion.div
            initial={{ x: xInitial }}
            animate={{ x: xAnimate }}
            exit={{ x: xInitial }}
            style={{...menu_styles.menu, height: scrHeight, width: pc?scrHeight * 0.28:scrHeight * 0.26}}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <div style={{...menu_styles.text, fontSize: 16, color: 'black'}}>
              <MenuHeader text={"FragMental"} imageUrl={closeImage} altText={"FragMental - Close Menu"} closeMenu={() => this.closeMenu()} bgC={themeColor}/>
              <MenuItem text={"Home"} imageUrl={homeImage} altText={"Home"} showModal={(which) => this.showModal(which, true)} bgC={themeColor}/>
              <div style={{...menu_styles.divider, width: scrHeight * 0.1, marginLeft: scrHeight * 0.08, borderColor: themeColor}}></div>
              {/* <MenuItem text={"Settings"} imageUrl={settingsImage} altText={"Settings"} showModal={(which) => this.showModal(which, true)} bgC={themeColor}/> */}
              <MenuItem text={"Help"} imageUrl={helpImage} altText={"Help"} showModal={(which) => this.showModal(which, true)} bgC={themeColor}/>
              <MenuItem text={"Support"} imageUrl={supportImage} altText={"Support"} showModal={(which) => this.showModal(which, true)} bgC={themeColor}/>
              {/* {this.props.cgi === -1 && global.upgradeStatus &&
                <MenuItem text={"Mega FragMental"} imageUrl={homeImage} altText={"Mega FragMental"} showModal={(which) => this.showModal(which, true)} bgC={themeColor}/>
              } */}
            </div>
            </motion.div>
        }
      </AnimatePresence>
    );
  }
}

const menu_styles = {
  menu: {
    display: "flex",
    position: 'absolute',
    margin: 1,
    borderRadius: 7,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: colors.gray_3,
    borderWidth: 1,
    borderColor: colors.off_black, 
    borderStyle: 'solid',
    padding: 10,
    zIndex: 1000
  },
  divider: {
    display: "flex",
    alignSelf: 'center',
    height: '6px',
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: colors.off_black,
    borderWidth: 1,
    borderStyle: 'solid',

  },
  text: {
    fontFamily: 'system-ui',
    fontWeight: 'bold',
  }
}

export default Menu;