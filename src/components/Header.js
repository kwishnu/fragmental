import React from 'react';
import colors from '../config/colors';
import config from '../config/config';
import MenuImage from '../images/menu.png';
import SupportImage from '../images/heart.png';
import HelpImage from '../images/question.png';
// const scrWidth = config.scrWidth;
// const scrHeight = config.scrHeight;
// const marLeftOrRight = (scrWidth - scrHeight * 9/16)/2;

function Header(props) {
  let isPC = props.deviceType === "pc"?true:false;
  let isTablet = props.deviceType === "tablet"?true:false;
  let isPhone = props.deviceType === "phone"?true:false;
  return(
    <div style={{...headerStyles.container, width: props.scrWidth, backgroundColor: colors.very_dark_gray}}>
      {/* global.bgColor */}
      <div style={headerStyles.left_div}>
      <img 
        src={MenuImage} 
        alt={"Menu"} 
        onClick={() => props.clickMenu("Menu")} 
        style={{
          height: config.isPhone?35:45,
          width: config.isPhone?35:45, 
          marginLeft: isPC || isTablet?props.marLeftOrRight:10
        }} 
      />          
      </div>
      <div style={headerStyles.center_div}>
        <div style={headerStyles.titleText}>
          {props.title}          
        </div>
      </div>
      <div style={headerStyles.right_div}>
        <img 
          src={SupportImage} 
          alt={"Support"} 
          onClick={() => props.showModal("Support", true)} 
          style={{
            height: isPhone?31:35,
            width: isPhone?31:35,
            marginRight: 6
          }} 
        />          
        <img 
          src={HelpImage} 
          alt={"Help"} 
          onClick={() => props.showModal("Help", true)} 
          style={{
            height: 35,
            width: 35,
            marginRight: isPC || isTablet?props.marLeftOrRight:10
          }} 
        />          
      </div>
    </div>
  )
}

const headerStyles = {
  container: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    height: 50,
  },
  left_div: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  center_div: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  right_div: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"

  },
  titleText: {
    fontFamily: "Acme",
    fontSize: 24,
    color: colors.off_white,
    textAlign: "center",
    marginTop: 8,
    userSelect: 'none'
  },

}

export default Header;