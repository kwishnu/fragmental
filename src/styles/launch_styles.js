import config from '../config/config';
import colors from '../config/colors';
import {convertFont} from '../config/config';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
// const tablet = scrHeight/scrWidth > 1.77?false:true;

const launch_styles = {

containerView: {
  display: 'flex',
  flex: 1,
  position: 'absolute',
  top: 150,
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
  height: scrHeight,
  width: config.isPC?scrHeight * 9/16:scrWidth,
  borderRadius: 5,
  paddingLeft: 10,
  paddingRight: 10,
  alignItems: "center",
  zIndex: 100
},
headerImageContainer: {
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  height: scrHeight/10,
  width: config.scrHeight * 9/16,
  marginBottom: 10,
},
modalBody: {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
  alignSelf: 'stretch',
  padding: 40,
  background: `linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
    linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
    linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
    linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
    linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
    linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)`,
  backgroundColor: '#131313',
  backgroundSize: '20px 20px',
  borderRadius: 10,
  boxShadow: "inset 4px 6px 10px #000000"
},
intro_container: {
  display: 'flex',
  height: "auto",
  flexDirection: 'column',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  alignSelf: 'stretch',
  backgroundColor: colors.gray_3,
  padding: 20,
  borderRadius: 20,
  marginBottom: 60,
  boxShadow: "inset 4px 6px 10px #000000"
},
button_container: {
  display: 'flex',
  height: "auto",
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
  alignSelf: 'stretch',
  backgroundColor: colors.gray_3,
  padding: 30,
  borderRadius: 20,
  marginBottom: 60,
  boxShadow: "inset 4px 6px 10px #000000"
},
launchButton: {
  display: 'flex',
  width: scrHeight * 0.18,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  marginBottom: 15,
  borderRadius: 15,
  boxShadow: `4px 8px 12px ${colors.gray_4}`,
},
button_text_white: {
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: convertFont(20),
  color: colors.off_white,
  textAlign: "center",
  userSelect: 'none',
  whiteSpace: 'pre-line'
},
title: {
  fontSize: config.isPC?convertFont(24):convertFont(22),
  fontFamily: "Acme",
  userSelect: 'none'
},
text: {
  fontSize: config.isPC?convertFont(18):convertFont(16),
  fontFamily: "system-ui",
  userSelect: 'none'
},
}

export default launch_styles;