import config from '../config/config';
import colors from '../config/colors';
import {convertFont} from '../config/config';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const tablet = scrHeight/scrWidth > 1.77?false:true;

const help_styles = {

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
r_tile_container: {
  display: 'flex',
  flex: 1,
  zIndex: 100
},
r_tile_image: {
  height: 80,
  width: 80,
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
sectionHeading: {
  display: 'flex',
  height: "auto",
  flexDirection: 'row',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: 4,
},
section1_container: {
  display: 'flex',
  height: "auto",
  flexDirection: 'column',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  alignSelf: 'stretch',
  // height: line * 10,
},
section2_container: {
  display: 'flex',
  height: "auto",
  flexDirection: 'column',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  // height: line * 8,
},
section3_container: {
  display: 'flex',
  height: "auto",
  flexDirection: 'column',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  // height: line * 1,
},
section4_container: {
  display: 'flex',
  height: "auto",
  flexDirection: 'column',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginBottom: 10
  // height: line * 2,
},
close_image: {
  height: 35,
  width: 35,
  marginRight: 10
},
title: {
  fontSize: config.isPC?convertFont(32):convertFont(30),
  fontFamily: "Acme",
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
  userSelect: 'none'
},

}

export default help_styles;