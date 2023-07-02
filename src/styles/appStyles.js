import colors from '../config/colors';
import config from '../config/config';
// import {convertFont} from '../config/config';
// const scrWidth = config.scrWidth;
const pc = config.isPC;
// const tablet = config.isTablet;
// const phone = config.isPhone;
const scrHeight = window.innerHeight;
const scrWidth = window.innerWidth;
const widthLeftOrRight = (scrWidth - scrHeight * 9/16)/2 + 20;

// import config from '../config/config';
// import {convertFont} from '../config/config';
// const scrWidth = config.scrWidth;
// const scrHeight = config.scrHeight;

const appStyles = {
  appContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: scrHeight,
    width: scrWidth,
    maxWidth: scrWidth,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.gray_4,
    zIndex: -1
  },
  // container: {
  //   position: "relative",
  //   display: "flex",
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: scrHeight,
  //   width: scrWidth,
  //   backgroundColor: colors.gray_4,
  //   borderColor: 'yellow', borderWidth: 2, borderStyle: 'solid'
  // },
  adBox: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: pc ? widthLeftOrRight - 40 : 0,
    borderStyle: "solid",
    borderWidth: 2,
    zIndex: 1000,
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 100,
    width: scrWidth,
  },
  footerText: {
    fontSize: 14,
    color: colors.off_white,
    textAlign: "center",
    userSelect: 'none'
  },

}

export default appStyles;