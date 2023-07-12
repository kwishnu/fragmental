import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { CircularProgress } from '@mui/material';
import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
// import EmailInput from '../components/EmailInput';
const KEY_HasUpgrade = 'hasUpgradeKey';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const pc = config.isPC;
const tablet = config.isTablet;


function validMail(email)
{
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
}

class UpgradeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkModeEnabled: this.props.isDarkModeEnabled,
      email: "",
      showSpinner: false
    };
  }
  componentDidMount() {
  }
  closeSelf(){
    this.props.requestModalClose();
  }
  updateEmail(address){
    this.setState({email: address});
  }
  
  checkForEmail(){
    if(validMail(this.state.email)){
      this.setState({showSpinner: true});
      try {
        window.localStorage.setItem(KEY_HasUpgrade, 'true');
      } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
      }
      global.upgradeStatus = true;
      setTimeout(() => {
        this.setState({showSpinner: false});
        this.closeSelf();

        setTimeout(() => {
          this.props.requestTYOpen();
        }, 200);

      }, 2000);
    }else{
      window.alert("Sorry, " + this.state.email + " doesn't appear to be a valid email address")
    }
  }

  render() {
    const { isDarkModeEnabled, isModalVisible } = this.props;
    return(
      <AnimatePresence>
      {isModalVisible && 
        <motion.div
          style={eg_modal_styles.centereddiv}
          initial={{ y: scrHeight }}
          animate={{ y: 0 }}
          exit={{ y: scrHeight }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          <div style={{...eg_modal_styles.modaldiv, backgroundColor: isDarkModeEnabled ? colors.off_black:colors.off_white}}>
          {this.state.showSpinner &&
            <div style={eg_modal_styles.spinner_container}>
              <CircularProgress colors={colors.off_white} />
            </div>
          }
          <div style={eg_modal_styles.text_container}>
              <div style={{...eg_modal_styles.modal_title, color: this.props.isDarkModeEnabled ? colors.gray_1:colors.off_black}}>Apply/Restore Upgrade</div>
              <div style={{...eg_modal_styles.modal_text, color: this.props.isDarkModeEnabled ? colors.gray_2:colors.off_black}}>
                {'To apply (or restore) your upgrade, please enter your email address and click "Submit" so that we can check with BuyMeACoffee.com for your donation:'}
              </div>
            </div>
            {/* <div style={eg_modal_styles.EmailInputContainer}>
              <EmailInput updateEmailAdress={(addr) => { this.updateEmail(addr) }}/>
            </div> */}
            <div style={eg_modal_styles.button_container}>
              <div
                style={eg_modal_styles.button}
                onClick={() => this.closeSelf()}
              >
                <div style={eg_modal_styles.button_text}>Cancel</div>
              </div>
              <div
                style={eg_modal_styles.button}
                onClick={() => this.checkForEmail()}
              >
                <div style={eg_modal_styles.button_text}>Submit</div>
              </div>
            </div>
          </div>
        </motion.div>
      }
      </AnimatePresence>
      );
  }
}

const eg_modal_styles = {
  centereddiv: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: scrWidth,
    zIndex: 100
  },
  spinner_container: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparent
  },
  modaldiv: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: config.isPC?scrHeight * 0.4:scrWidth * 0.8,
    padding: 25,
    borderRadius: 5,
    alignItems: "center",
    boxShadow: `8px 8px 28px ${colors.gray_3}`,
  },
  EmailInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    // borderColor: 'yellow', borderWidth: 1, borderStyle: 'solid'
  },
  button_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text_container: {
    alignSelf: 'stretch',
  },
  button: {
    display: 'flex',
    justifyContent: "center",
    width: pc?scrHeight/12:tablet?scrWidth/8:scrWidth/5,
    padding: 8,
    margin: 5,
    borderRadius: 7,
    backgroundColor: colors.button_blue,
  },
  button_text: {
    color: "white",
    fontSize: convertFont(23),
    fontWeight: 'bold',
    textAlign: "center",
    fontFamily: "system-ui",
    userSelect: 'none'
  },
  modal_title: {
    fontSize: convertFont(30),
    fontFamily: 'Acme',
    marginBottom: 15,
    textAlign: "left",
    userSelect: 'none'
  },
  modal_text: {
    fontFamily: 'system-ui',
    fontSize: convertFont(18),
    marginBottom: 30,
    marginTop: 15,
    textAlign: "left",
    userSelect: 'none'
  },
}

export default UpgradeModal;