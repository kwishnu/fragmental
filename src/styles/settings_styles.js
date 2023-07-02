import config from '../config/config';
import colors from '../config/colors';
import {convertFont} from '../config/config';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const tablet = scrHeight/scrWidth > 1.77?false:true;
let line = tablet?config.LINE_HEIGHT * 0.7:config.LINE_HEIGHT;

const settings_styles = {

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
loading_container: {
  display: 'flex',
  flex: 1,
  height: 100,
  width: 100,
  justifyContent: 'center',
  alignItems: 'center',
},
modalView: {
  display: 'flex',
  flexDirection: 'column',
  height: "auto",
  width: config.isPC?scrHeight * 0.36:scrWidth * 0.85,
  borderRadius: 5,
  padding: 10,
  alignItems: "center",
  boxShadow: `10px 20px 30px ${colors.off_black}`,
  zIndex: 100,
},
modalHeader: {
  display: 'flex',
  height: "auto",
  flexDirection: 'row',
  justifyContent: "flex-start",
  alignItems: "center",
  alignSelf: "stretch",
  paddingLeft: tablet?scrWidth * 0.01:0,
},
titleContainer: {
  display: 'flex',
  flex: 4,
  justifyContent: "flex-start",
  alignItems: "flex-start",
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
  position: "relative",
  flex: 1,
  flexDirection: 'column',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  alignSelf: 'stretch',
  padding: 12,
  borderRadius: 10,
},
premium_block: {
  display: 'flex',
  height: "auto",
  alignSelf: 'stretch',
  flexDirection: 'column',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: config.isPC?10:20,
  zIndex: 1000,
},
sectionHead: {
  display: 'flex',
  height: "auto",
  flexDirection: 'row',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: 2,
  marginBottom: 6
},
close_image: {
  height: 35,
  width: 35,
  marginRight: 10
},
switchRow: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "center",
  alignItems: "center",
  height: "auto",
  marginTop: 4
},
switchContainer: {
  display: 'flex',
  flex: 1,
  justifyContent: "center",
  alignItems: "flex-start",
  marginRight: 6,
},
switchTextContainer: {
  display: 'flex',
  flex: 5,
  flexDirection: 'row',
  justifyContent: "flex-start",
  alignItems: "center",
  marginLeft: 6,
},
radiobuttonRow: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "center",
  alignItems: "center",
  height: config.isPC? line * 3.2:line * 1.5,
},
radioImageContainer: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "center",
  alignItems: "center",
  height: line * 2,
},
radioImage: {
  height: config.isPC?line * 2.6:line * 1.5,
  width: config.isPC?line * 2.6:line * 1.5,
  marginRight: 10
},
sliderContainer: {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "stretch",
  height: config.isPC?line * 9:line * 4,
},
slider1View: {
  position: "absolute",
  top: 0,
  left: 0,
  width: config.isPC?scrHeight * 0.36 - 30:scrWidth * 0.85 -30,
  height: config.isPC?line * 3:line * 2,
},
colorPickerImage: {
  position: "absolute",
  top: 12,
  left: 0,
  width: config.isPC?scrHeight * 0.36 - 30:scrWidth * 0.85 -30,
  // height: "auto"
},
slider2View: {
  position: "absolute",
  top: config.isPC?line * 3.5:line * 2,
  left: 0,
  width: config.isPC?scrHeight * 0.36 - 30:scrWidth * 0.85 -30,
  height: line * 2,
},
valuePickerImage: {
  position: "absolute",
  top: 12,
  left: 0,
  width: config.isPC?scrHeight * 0.36 - 30:scrWidth * 0.85 -30,
},
custom_thumb: {
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: colors.text_white,
},
swatchContainer: {
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "stretch",
  marginTop: 12,
  marginBottom: config.isPC?10:0,
  // height: config.isPC?line * 6:line * 4,
},
swatch: {
  width: config.isPC?line * 6:line * 3,
  height: config.isPC?line * 6:line * 3,
  borderRadius: 5,
  borderColor: colors.black, 
  borderWidth: 1, 
  borderStyle: 'solid'
},
defaultsButtonContainer: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "stretch",
  marginTop: 12,
  // height: line * 6,
},
button: {
  display: 'flex',
  paddingLeft: tablet || config.isPC? scrHeight * 0.02:scrWidth * 0.05,
  paddingRight: tablet || config.isPC? scrHeight * 0.02:scrWidth * 0.05,
  paddingTop: tablet || config.isPC? scrHeight * 0.01:scrWidth * 0.04,
  paddingBottom: tablet || config.isPC? scrHeight * 0.01:scrWidth * 0.04,
  justifyContent: "center",
  backgroundColor: colors.button_blue,
  boxShadow: `10px 10px 30px ${colors.off_black}`,
  borderRadius: config.button_radius + 10,
  borderColor: colors.transparent,
  borderLeftWidth: tablet?10:8,
  borderRightWidth:  tablet?10:8
},
button_text_white: {
  fontFamily: "Acme",
  fontSize: convertFont(18),
  color: colors.off_white,
  textAlign: "center",
  userSelect: 'none'
},
title: {
  fontSize: config.isPC?convertFont(32):convertFont(30),
  fontFamily: "Acme",
  marginBottom: 10,
  userSelect: 'none'
},
section_heading: {
  fontSize: config.isPC?convertFont(23):convertFont(26),
  fontFamily: "Acme",
  textDecorationLine: "underline",
  userSelect: 'none'
},
text: {
  fontSize: config.isPC?convertFont(15):convertFont(22),
  fontFamily: "system-ui",
  userSelect: 'none'
},
text_small: {
  fontSize: config.isPC?convertFont(14):convertFont(18),
  fontFamily: "system-ui",
  userSelect: 'none'
},
}

export default settings_styles;