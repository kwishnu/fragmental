import React, { Component } from 'react';
import Switch from "react-switch";
import { motion, AnimatePresence } from "framer-motion"
import tinycolor from 'tinycolor2';
import ReactSimpleRange from "react-simple-range";
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import settings_styles from "../styles/settings_styles";
import colors from '../config/colors';
import config from '../config/config';
const scrHeight = config.scrHeight;
const scrWidth = config.scrWidth;
const isPC = config.isPC;
const KEY_BGColorPref = 'bgColorPrefKey';
const KEY_ModePref = 'modePrefKey';
const KEY_EasyModePref = 'easyModePrefKey';
const KEY_AnimationPref = 'animationPrefKey';
const KEY_BGColorSliderValue = 'bgColorValueSliderKey';
const KEY_BGValSliderValue = 'bgValValueSliderKey';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkModeSwitchEnabled: false,
      easyModeSwitchEnabled: false,
      darkModeEnabled: false,
      animationPreference: 'Leave',
      leaveAnimationChecked: false,
      spinAnimationChecked: false,
      noneAnimationChecked: false,
      colorSliderValue: 276,
      valSliderValue: 15,
      swatchBG: global.bgColor,
      blockPremiumFeatures: true,
      colorSliderKey: "",
      valueSliderKey: "",
    };
  }
  componentDidMount() {
    const csk = nanoid();
    const vsk = nanoid();
    this.setState({
      colorSliderKey: csk, 
      valueSliderKey: vsk
    });
    const modePref = window.localStorage.getItem(KEY_ModePref);
    if (modePref !== null) {
      const modePrefBool = (modePref === 'true')?true:false;
      this.setState({ darkModeEnabled: modePrefBool, darkModeSwitchEnabled: modePrefBool});
    }else{
      try {
          window.localStorage.setItem(KEY_ModePref, 'false');
      } catch (error) {
          window.alert('window.localStorage error: ' + error.message);
      }
    }
    const eModePref = window.localStorage.getItem(KEY_EasyModePref);
    if (eModePref !== null) {
      const eModePrefBool = (eModePref === 'true')?true:false;
      this.setState({easyModeSwitchEnabled: eModePrefBool});
    }else{
      try {
          window.localStorage.setItem(KEY_EasyModePref, 'false');
      } catch (error) {
          window.alert('window.localStorage error: ' + error.message);
      }
    }
    const animPref = window.localStorage.getItem(KEY_AnimationPref);
    if (animPref !== null) {
      const ap = animPref;
      switch(ap){
        case "Spin":
          this.setState({spinAnimationChecked: true});
          break;
        case "None":
          this.setState({noneAnimationChecked: true});
          break;
        default:
          this.setState({leaveAnimationChecked: true});
      }
      this.setState({animationPreference: ap});
    }
    const bgColorValue =  window.localStorage.getItem(KEY_BGColorSliderValue);
    if (bgColorValue !== null) {
      const bgCV = bgColorValue;
      const bgCVInt = parseInt(bgCV);
      this.setState({colorSliderValue: bgCVInt});
    }else{
      this.setState({colorSliderValue: 276});
      try {
        window.localStorage.setItem(KEY_BGColorSliderValue, '276');
      } catch (error) {
          window.alert('localStorage error: ' + error.message);
      }
    }
    const bgValValue =  window.localStorage.getItem(KEY_BGValSliderValue);
    if (bgValValue !== null) {
      const bgV = bgValValue;
      const bgVInt = parseInt(bgV);
      this.setState({valSliderValue: bgVInt});
    }else{
      this.setState({valSliderValue: 15});
      try {
        window.localStorage.setItem(KEY_BGValSliderValue, '15');
      } catch (error) {
          window.alert('localStorage error: ' + error.message);
      }
    }
  }   
  showAlert(){
    toast("Sorry, these features come with the premium upgrade! \u000D Please visit \u2764 Support", {
      position: "bottom-center",
      autoClose: 2400,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }
  closeSelf(){
    this.props.requestModalClose("Settings", false);
  }
  toggleDarkMode(){
    const newBool = !this.state.darkModeSwitchEnabled;
    const newBoolStr = newBool ? "true":"false";
    this.props.sendValueToGame(["Dark Mode", newBool]);
    this.setState({darkModeEnabled: newBool, darkModeSwitchEnabled: newBool});
    try {
        window.localStorage.setItem(KEY_ModePref, newBoolStr);
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
  }
  toggleEasyMode(){
    if(!global.upgradeStatus)return;
    const newBool = !this.state.easyModeSwitchEnabled;
    const newBoolStr = newBool ? "true":"false";
    this.props.sendValueToGame(["Easy Mode", newBool]);
    this.setState({easyModeSwitchEnabled: newBool});
    try {
        window.localStorage.setItem(KEY_EasyModePref, newBoolStr);
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
  }
  handleAnimationRadio(mode){
    if( (this.state.leaveAnimationChecked && mode === "Leave") ||
        (this.state.spinAnimationChecked && mode === "Spin") ||
        (this.state.noneAnimationChecked && mode === "None")
      ) return;
      let leaveBool = false;
      let spinBool = false;
      let noneBool = false;
      switch(mode){
        case "Leave":
          leaveBool = true;
          break;
        case "Spin":
          spinBool = true;
          break;
        case "None":
          noneBool = true;
          break;
        default:
          console.log("No default case...");
      }
    this.props.sendValueToGame(["Animation Style", mode]);
    this.setState({leaveAnimationChecked: leaveBool, spinAnimationChecked: spinBool, noneAnimationChecked: noneBool});
    try {
        window.localStorage.setItem(KEY_AnimationPref, mode);
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
  }
  handleColorChange(sliderSetting) {
    const colResult = tinycolor({ h: sliderSetting.value, s: 96, l: this.state.valSliderValue });
    this.setState({swatchBG: colResult.toHexString()});
  }
  handleColorChangeComplete(sliderSetting){
    const colResult = tinycolor({ h: sliderSetting.value, s: 96, l: this.state.valSliderValue }).toHexString();
    this.setState({colorSliderValue: sliderSetting.value});
    document.querySelector('meta[name="theme-color"]').setAttribute('content', colResult);
    global.bgColor = colResult;
    try {
        window.localStorage.setItem(KEY_BGColorSliderValue, sliderSetting.value.toString());
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    try {
        window.localStorage.setItem(KEY_BGColorPref, colResult);
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    this.setState({colorSliderValue: sliderSetting.value});
  }
  handleColorValChange(sliderSetting){
    const colResult = tinycolor({ h: this.state.colorSliderValue, s: 96, l: sliderSetting.value });
    this.setState({swatchBG: colResult.toHexString()});
  }
  handleColorValChangeComplete(sliderSetting){
    console.log("sliderSetting: " + sliderSetting.value);
    const colResult = tinycolor({ h: this.state.colorSliderValue, s: 96, l: sliderSetting.value }).toHexString();
    document.querySelector('meta[name="theme-color"]').setAttribute('content', colResult);
    global.bgColor = colResult;
    try {
        window.localStorage.setItem(KEY_BGValSliderValue, sliderSetting.value.toString());
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    try {
        window.localStorage.setItem(KEY_BGColorPref, colResult);
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    this.setState({valSliderValue: sliderSetting.value});
  }
  restoreDefaults(){
    this.setState({
      colorSliderValue: 276,
      valSliderValue: 15,
      swatchBG: colors.dark_purple,
      darkModeSwitchEnabled: false,
      easyModeSwitchEnabled: false,
      darkModeEnabled: false,
      animationPreference: 'Leave',
      leaveAnimationChecked: true,
      spinAnimationChecked: false,
      noneAnimationChecked: false,
    });
    const csk2 = nanoid();
    const vsk2 = nanoid();
    setTimeout(() => {
	    this.setState({colorSliderKey: csk2, valueSliderKey: vsk2});
    }, 200);    
    if(this.state.darkModeEnabled)this.toggleDarkMode();
    global.bgColor = colors.dark_purple;
    this.props.sendValueToGame(["Dark Mode", false]);
    this.props.sendValueToGame(["Animation Style", "Leave"]);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', colors.dark_purple);
    try {
        window.localStorage.setItem(KEY_BGColorSliderValue, '276');
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    try {
        window.localStorage.setItem(KEY_BGValSliderValue, '15');
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    try {
        window.localStorage.setItem(KEY_BGColorPref, '#142392');
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    try {
        window.localStorage.setItem(KEY_AnimationPref, 'Leave');
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
  }
  displayPremiumBlock(){
    if(this.state.modalContainerHeight > 0){  
      console.log("this.state.modalContainerHeight: " + this.state.modalContainerHeight);    
      return (
        <div style={settings_styles.premium_block} onClick={() => this.showAlert()}>
        </div>
      )
    }  
}

render() {
  let { 
    darkModeSwitchEnabled, 
    easyModeSwitchEnabled, 
    darkModeEnabled, 
    leaveAnimationChecked,
    spinAnimationChecked,
    noneAnimationChecked
  } = this.state;
  const closeImage = darkModeEnabled? require("../images/close.png"):require("../images/close_black.png");
  const { isModalVisible } = this.props;
  const leaveCheckImg = leaveAnimationChecked && !darkModeEnabled? require("../images/checkbox_checked.png") :
                        leaveAnimationChecked && darkModeEnabled? require("../images/checkbox_checked_white.png") :
                        !leaveAnimationChecked && !darkModeEnabled? require("../images/checkbox_unchecked.png") :
                        require("../images/checkbox_unchecked_white.png");
  const spinCheckImg = spinAnimationChecked && !darkModeEnabled? require("../images/checkbox_checked.png") :
                        spinAnimationChecked && darkModeEnabled? require("../images/checkbox_checked_white.png") :
                        !spinAnimationChecked && !darkModeEnabled? require("../images/checkbox_unchecked.png") :
                        require("../images/checkbox_unchecked_white.png");
  const noneCheckImg = noneAnimationChecked && !darkModeEnabled? require("../images/checkbox_checked.png") :
                        noneAnimationChecked && darkModeEnabled? require("../images/checkbox_checked_white.png") :
                        !noneAnimationChecked && !darkModeEnabled? require("../images/checkbox_unchecked.png") :
                        require("../images/checkbox_unchecked_white.png");
  const hueSliderImage = require("../images/rainbow_slider.png");
  const valueSliderImage = require("../images/value_gradient.png");
  const onOrOffStr = this.state.darkModeEnabled ? "On" : "Off";
  const easyOnOrOffStr = this.state.easyModeSwitchEnabled ? "On" : "Off";

  return(
    <AnimatePresence>
    {isModalVisible && 
      <motion.div
        initial={{ y: scrHeight }}
        animate={{ y: -2 }}
        exit={{ y: scrHeight }}
        style={{...settings_styles.containerView}}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        <div style={{...settings_styles.modalView, backgroundColor: darkModeEnabled ? colors.gray_4:colors.off_white}}>
          <div style={settings_styles.modalHeader}>
            <div style={settings_styles.titleContainer}>
              <div style={{...settings_styles.title, color: darkModeEnabled ? colors.off_white:colors.off_black}}>Settings</div>
            </div>
            <div style={settings_styles.closeButtonContainer}>
              <img
                style = {settings_styles.close_image}
                src={closeImage}
                onClick={() => this.closeSelf()}
                alt = {"Close Button"}
              />
            </div>
          </div>
          <div style={{...settings_styles.modalBody, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
            {!global.upgradeStatus && this.displayPremiumBlock()}
            <div style={settings_styles.sectionHead}>
              <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>Display</div>
            </div>
            <div style={settings_styles.switchRow}>
              <div style={settings_styles.switchContainer}>
                <Switch
                  height={20}
                  width={50}
                  handleDiameter={28}
                  onColor={ "#81b0ff" }
                  offColor={ "#767577" }
                  onHandleColor={colors.button_blue}
                  offHandleColor={colors.button_blue}
                  onChange={() => {this.toggleDarkMode()}}
                  checked={darkModeSwitchEnabled}
                  checkedIcon={false}
                  uncheckedIcon={false}
                />
              </div>
              <div style={settings_styles.switchTextContainer}>
                <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>DARK MODE</div>
                <div style={{...settings_styles.text_small, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>{`\u2002\u2022\u2002` + onOrOffStr}</div>
              </div>
            </div>
          <div style={{...settings_styles.premium_block, backgroundColor: !global.upgradeStatus?colors.translucent:colors.transparent}} onClick={!global.upgradeStatus?() => this.showAlert():null}>
            <div style={settings_styles.sectionHead}>
              <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>Difficulty</div>
            </div>
            <div style={settings_styles.switchRow}>
              <div style={settings_styles.switchContainer}>
                <Switch
                  height={20}
                  width={50}
                  handleDiameter={28}
                  onColor={ "#81b0ff" }
                  offColor={ "#767577" }
                  onHandleColor={colors.button_blue}
                  offHandleColor={colors.button_blue}
                  onChange={() => {this.toggleEasyMode()}}
                  checked={easyModeSwitchEnabled}
                  checkedIcon={false}
                  uncheckedIcon={false}
                />
              </div>
              <div style={settings_styles.switchTextContainer}>
                <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>EASIER</div>
                <div style={{...settings_styles.text_small, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>{`\u2002\u2022\u2002` + easyOnOrOffStr}</div>
              </div>
            </div>
              <div style={{...settings_styles.switchTextContainer, marginTop: 3}}>
                <div style={{...settings_styles.text_small, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>{`\u2002("Easier" = 3 words max per level, 6 levels rather than 8 - Daily games excluded)`}</div>
              </div>
            <div style={settings_styles.sectionHead}>
              <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>Animation Style</div>
            </div>
            <div style={settings_styles.radiobuttonRow}>
              <div style={{...settings_styles.radioImageContainer, pointerEvents: !global.upgradeStatus? "none":null}}>
                <img
                  onClick={() => this.handleAnimationRadio("Leave")}
                  style = {settings_styles.radioImage}
                  src = {leaveCheckImg}
                  alt = {"Leave Animation"}
                />
              </div>
              <div style={settings_styles.switchTextContainer}>
                <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>LEAVE</div>
                <div style={{...settings_styles.text_small, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>  {`\u2002\u2022\u2002Zooms away`}</div>
              </div>
            </div>
            <div style={settings_styles.radiobuttonRow}>
              <div style={{...settings_styles.radioImageContainer, pointerEvents: !global.upgradeStatus? "none":null}}>
                <img 
                  onClick={() => this.handleAnimationRadio("Spin")}
                  style = {settings_styles.radioImage}
                  src = {spinCheckImg}
                  alt = {"Spin Animation"}
                />
              </div>
              <div style={settings_styles.switchTextContainer}>
                <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>SPIN</div>
                <div style={{...settings_styles.text_small, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>  {`\u2002\u2022\u2002Flips and fades`}</div>
              </div>
            </div>
            <div style={settings_styles.radiobuttonRow}>
              <div style={{...settings_styles.radioImageContainer, pointerEvents: !global.upgradeStatus? "none":null}}>
                <img 
                  onClick={() => this.handleAnimationRadio("None")}
                  style = {settings_styles.radioImage}
                  src = {noneCheckImg}
                  alt = {"No Animation"}
                />
              </div>
              <div style={settings_styles.switchTextContainer}>
                <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>FADE</div>
                <div style={{...settings_styles.text_small, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>  {`\u2002\u2022\u2002No-nonsense fade`}</div>
              </div>
            </div>
            <div style={settings_styles.sectionHead}>
              <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>Background Color:</div>
            </div>
              <div style={{...settings_styles.sliderContainer, pointerEvents: !global.upgradeStatus? "none":null}}>
                <div style={settings_styles.slider1View}>
                  <img style={settings_styles.colorPickerImage} src={hueSliderImage} alt = {"Hue Selection"}/>
                  <ReactSimpleRange
                    key={this.state.colorSliderKey}
                    onChangeComplete={(value) => this.handleColorChangeComplete(value)}
                    onChange={(value) => this.handleColorChange(value)}
                    defaultValue={this.state.colorSliderValue}
                    max={359}
                    min={1}
                    trackColor={!global.upgradeStatus ? colors.transparent: darkModeEnabled ? colors.gray_3:colors.off_white2}
                    sliderColor={!global.upgradeStatus ? colors.transparent: darkModeEnabled ? colors.gray_3:colors.off_white2}
                    customThumb={<div style={settings_styles.custom_thumb}></div>}                    
                  />
                </div>
                <div style={settings_styles.slider2View}>
                  <img style={settings_styles.valuePickerImage} src={valueSliderImage} alt = {"Value Selection"}/>
                  <ReactSimpleRange
                    key={this.state.valueSliderKey}
                    onChangeComplete={(value) => this.handleColorValChangeComplete(value)}
                    onChange={(value) => this.handleColorValChange(value)}
                    defaultValue={this.state.valSliderValue}
                    max={67}
                    min={0}
                    trackColor={!global.upgradeStatus ? colors.transparent: darkModeEnabled ? colors.gray_3:colors.off_white2}
                    sliderColor={!global.upgradeStatus ? colors.transparent: darkModeEnabled ? colors.gray_3:colors.off_white2}
                    customThumb={<div style={settings_styles.custom_thumb}></div>}                    
                  />
                </div>
              </div>
                <div style={settings_styles.swatchContainer}>
                  <div style={{...settings_styles.swatch, backgroundColor: this.state.swatchBG}}>
                </div>
              </div>
              <div style={settings_styles.spacer}>
              </div>
              <div style={{...settings_styles.defaultsButtonContainer, pointerEvents: !global.upgradeStatus? "none":null}}>
                <div style={settings_styles.button} onClick={() => this.restoreDefaults()} >
                  <div style={settings_styles.button_text_white}>RESTORE DEFAULTS</div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer
            position="bottom-center"
            style={{ width: isPC?scrHeight/4.5:scrWidth*0.7 }}
            autoClose={2400}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </motion.div>
      }
      </AnimatePresence>
    );
  }
}

export default Settings;