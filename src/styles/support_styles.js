import config from '../config/config';
import colors from '../config/colors';
import {convertFont} from '../config/config';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const tablet = config.isTablet;
const pc = config.isPC;
let line = tablet?config.LINE_HEIGHT * 0.7:config.LINE_HEIGHT;

const support_styles = {

containerView: {
  display: 'flex',
  flex: 1,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'rgba(0, 0, 0, 0)',
  zIndex: 100
},
modalView: {
  display: 'flex',
  flexDirection: 'column',
  height: "auto",
  width: config.isPC?scrHeight * 0.4:scrWidth * 0.85,
  borderRadius: 5,
  padding: 10,
  alignItems: "center",
  boxShadow: `10px 20px 30px ${colors.off_black}`,
  zIndex: 100
},
modalHeader: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "flex-start",
  alignItems: "center",
  height: 74,
  alignSelf: "stretch",
  paddingLeft: tablet?scrWidth * 0.01:0,
},
titleContainer: {
  display: 'flex',
  flex: 4,
  justifyContent: "flex-start",
  alignItems: "flex-start",
},
tile_container: {
  display: 'flex',
  flex: 1,
  zIndex: 100
},
heart_tile_image: {
  width: pc?scrHeight/15:tablet?scrWidth/8:scrWidth/6, 
  height: pc?scrHeight/15:tablet?scrWidth/8:scrWidth/6, 
  marginTop: 15,
  marginRight: 30
},
closeButtonContainer: {
  display: 'flex',
  flex: 2,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  zIndex: 1000
},
modalBody: {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  alignSelf: 'stretch',
  padding: 12,
  //width: config.isPC?scrHeight * 9/16 - 30:scrWidth * 0.9,
  borderRadius: 10,

},
section: {
  display: 'flex',
  height: "auto",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: tablet?20:4,
},
button_container: {
  display: 'flex',
  flex: 0,
  flexDirection: 'row',
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "stretch",
  height: line * 6,
  margin: 30
},
bmc_button: {
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  height: 60, 
  boxShadow: `4px 8px 12px ${colors.gray_4}`,
},
button: {
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  padding: 8,
  marginLeft: 8,
  borderRadius: 5,
  backgroundColor: colors.dark_green,
  boxShadow: `4px 8px 12px ${colors.gray_4}`,
},
copyrightContainer: {
  display: 'flex',
  flexDirection: "column",
  height: "auto",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "stretch",
  margin: 20,
},
button_text_white: {
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: convertFont(14),
  color: colors.off_white,
  textAlign: "center",
  userSelect: 'none',
  whiteSpace: 'pre-line'
},
close_image: {
  height: 35,
  width: 35,
  marginRight: 10
},
underlinedAcme: {
  fontSize: convertFont(18),
  fontFamily: "Acme",
  textDecorationLine: "underline",
  marginBottom: 10,
  userSelect: 'none'
},
text_small: {
  fontSize: convertFont(16),
  fontFamily: "system-ui",
  userSelect: 'none'
},
link_text: {
  fontSize: convertFont(16),
  fontFamily: "system-ui",
  userSelect: 'none'
},
link_text_small: {
  fontSize: convertFont(16),
  userSelect: 'none'
},
copyright: {
  fontSize: convertFont(16),
  fontWeight: "bold",
  fontFamily: "system-ui",
  alignText: "center",
  userSelect: 'none'
},
section_heading: {
  fontSize: config.isPC?convertFont(23):convertFont(26),
  fontFamily: "Acme",
  textDecorationLine: "underline",
  userSelect: 'none'
},
text: {
  fontSize: config.isPC?convertFont(15):convertFont(18),
  fontFamily: "system-ui",
  marginTop: 10,
  userSelect: 'none'
},

}

export default support_styles;