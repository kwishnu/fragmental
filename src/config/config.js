const height = window.innerHeight;
const width = window.innerWidth;
const TILE_HEIGHT = parseInt((height/17).toPrecision(2));
const deviceType = width > 1000?"PC":height/width > 1.65?"phone":"tablet";
const isPC = deviceType === "PC"?true:false;
const isTablet = deviceType === "tablet"?true:false;
const isPhone = deviceType === "phone"?true:false;
const SLIDER_WIDTH = isPC?height * 9/16 * 0.66:width * 0.66;
const LINE_HEIGHT = isPC?Math.floor(height/80):isTablet?Math.floor(width/22):Math.floor(width/18);



export const config = {
  versionCode: 12,
  versionName: '1.2.2',
  button_radius: 5,
  scrHeight: height,
  scrWidth: width,
  deviceType: deviceType,
  isPC: isPC,
  isPhone: isPhone,
  isTablet: isTablet,
  TILE_HEIGHT: TILE_HEIGHT,
  LINE_HEIGHT: LINE_HEIGHT,
  SLIDER_WIDTH: SLIDER_WIDTH
};

export const getAnimatedWordLeft = (length) => {
  const adjustedWidth = isPC || isTablet?height * 9/16:width;
  const multiplier = isPC || isTablet?0.40:0.34;
  switch(length){
    case 3: return multiplier * adjustedWidth;
    case 4: return (multiplier - 0.02) * adjustedWidth;
    case 5: return (multiplier - 0.04) * adjustedWidth;
    case 6: return (multiplier - 0.06) * adjustedWidth;
    case 7: return (multiplier - 0.08) * adjustedWidth;
    case 8: return(multiplier - 0.10) * adjustedWidth;
    case 9: return (multiplier - 0.12) * adjustedWidth;
    case 10: return (multiplier - 0.14) * adjustedWidth;
    default: return multiplier * adjustedWidth;
  }
  // switch(length){
  //   case 3: return multiplier * width;
  //   case 4: return (multiplier - 0.02) * width;
  //   case 5: return (multiplier - 0.04) * width;
  //   case 6: return (multiplier - 0.06) * width;
  //   case 7: return (multiplier - 0.08) * width;
  //   case 8: return (multiplier - 0.10) * width;
  //   case 9: return (multiplier - 0.12) * width;
  //   case 10: return (multiplier - 0.14) * width;
  //   default: return multiplier * width;
  // }
}

export const convertFont = (inputFontSize) => isTablet || isPC?inputFontSize * height/1200:inputFontSize * width/460;

export default config;
