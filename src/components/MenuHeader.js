import React from 'react';
import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
const pc = config.isPC;
const scrHeight = config.scrHeight;
// const tablet = scrHeight/scrWidth > 1.77?false:true;

function MenuHeader(props) {
  return(
    <div style={{...menu_header_styles.container, borderColor: props.bgC}} onClick={() => props.closeMenu()}>
      <div style={menu_header_styles.label_div}>
        <div style={menu_header_styles.menu_label}>
          {props.text}
        </div>
      </div>
      <div style={menu_header_styles.image_div}>
        <img src={props.imageUrl} alt={props.altText} style={menu_header_styles.image_style} />
      </div>
    </div>
  )

}

const menu_header_styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: 'auto',//tablet?scrHeight * 0.08:config.isPC?230:scrWidth * 0.15,
    width: scrHeight * 0.26,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 4,
    backgroundColor: colors.off_black,
    borderWidth: 2,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 6,
    borderStyle: 'solid',
  },
  image_div: {
    display: "flex",
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: "center",
    alignItems: "center",
  },
  image_style: {
    height: '34px',//tablet? scrHeight * 0.035:config.isPC?'auto': scrWidth * 0.08,
    width: '34px',//tablet? scrHeight * 0.035:config.isPC?'auto':scrWidth * 0.08,
    margin: 10
  },
  label_div: {
    display: "flex",
    flex: 4,
    alignSelf: 'stretch',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menu_label: {
    fontFamily: 'Acme',
    fontSize: pc?convertFont(30):convertFont(24),
    color: colors.off_white,
    userSelect: 'none',
    marginLeft: 15
  },
}

export default MenuHeader;