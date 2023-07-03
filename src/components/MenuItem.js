import React from 'react';
import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const pc = config.isPC;
const tablet = scrHeight/scrWidth > 1.77?false:true;
// const widthLeftOrRight = (scrWidth - scrHeight * 9/16)/2;

function MenuItem(props) {
  return(
    <div style={{...menu_item_styles.container, backgroundColor: props.bgC}} onClick={() => props.showModal(props.text)}>
      <div style={menu_item_styles.image_div}>
        <img src={props.imageUrl} alt={props.altText} style={menu_item_styles.image_style} />
      </div>
      <div style={menu_item_styles.label_div}>
        <div style={menu_item_styles.menu_label}>
          {props.text}
        </div>
      </div>
    </div>
  )

}

const menu_item_styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: 'auto',//tablet?scrHeight * 0.08:config.isPC?230:scrWidth * 0.15,
    width: scrHeight * 0.26,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 8,
    borderColor: colors.light_blue_gray,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 6,
    boxShadow: "inset 3px 3px 3px #000000"

  },
  image_div: {
    display: "flex",
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: "center",
    alignItems: "center",
  },
  image_style: {
    height: tablet? scrHeight * 0.035:scrWidth * 0.08,
    width: tablet? scrHeight * 0.035:scrWidth * 0.08,
    margin: 14,
  },
  label_div: {
    display: "flex",
    flex: 4,
    alignSelf: 'stretch',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menu_label: {
    fontSize: pc?convertFont(22):convertFont(19),
    color: colors.off_white,
    userSelect: 'none'
  },
}

export default MenuItem;