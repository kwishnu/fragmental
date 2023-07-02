import colors from '../config/colors';
import config from '../config/config';
const pc = config.isPC;
// const tablet = config.isTablet;
// const phone = config.isPhone;
const scrHeight = window.innerHeight;
const scrWidth = window.innerWidth;
const widthLeftOrRight = (scrWidth - scrHeight * 9/16)/2 + 20;

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
    zIndex: -1
  },
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