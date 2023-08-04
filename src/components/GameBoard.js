import React, { Component } from 'react';
import { CircularProgress } from '@mui/material';
import Confetti from '../components/Confetti.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import formatDate from 'date-fns/format';
import colors from '../config/colors';
import config from '../config/config';
import TileSet from '../components/TileSet';
import CrosswordTile from '../components/CrosswordTile';
// import words3 from '../data/3letter.js';
// import words4 from '../data/4letter.js';
// import words5 from '../data/5letter.js';
// import words6 from '../data/6letter.js';
// import words7 from '../data/7letter.js';
// import words8 from '../data/8letter.js';
// import words9 from '../data/9letter.js';
// import words10 from '../data/10letter.js';
import { 
  generateArray, 
  getFragments, 
  removeLetters, 
  getFragObj, 
  transposeArray, 
  concatStringArrays, 
  splitAndFilterStrings, 
  splitAndFilterWithIndex, 
  checkArrayInMultiDimensional 
} from '../config/functions';
const defaultChar = '.';
const scrHeight = config.scrHeight;
const scrWidth = config.scrWidth;
const delays = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
const shadow = `3px 3px 8px ${colors.off_black}`;
const homeImage = require("../images/home.png");
const nextImage = require("../images/arrow_forward.png");
const KEY_PuzzleStreakDays = 'fmPuzzleStreakKey';
const KEY_DailySolvedArray = 'fmDailySolvedKey';
const KEY_PlayedFirstGame = 'fmPlayedGameKey';
const toastParams = {
  position: toast.POSITION.BOTTOM_CENTER,
  autoClose: 2400,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
}

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzleArray: [[]],
      puzzleSlate: [],
      fragmentLetterObj: [],
      puzzArrayDuplicate: [],
      words: [],
      playedFragments: [],
      tileHeight: 0,
      showButtons: false,
      nextGameIndex: this.props.count,
      daily: this.props.daily,
      dailyComplete: false,
      keyIDFragment: "",
      loading: false
    }
    this.fragRefs = [];
    this.tileRefs = [];
  }

  componentDidMount(){
    this.init();
 }

 init(){
  this.setState({ loading: true });
  const size = this.props.count;
  let tHeight = (scrHeight * 9/16)/13;
  tHeight = tHeight >= 62?62:tHeight;

  if(!this.props.daily){
    setTimeout(() => {
    const puzzleSet = generateArray(size);
    // console.log("whole shebang:: " + JSON.stringify(puzzleSet));
    // console.log("puzzleSet: " + JSON.stringify(puzzleSet[0]));
    const puzzleArray = puzzleSet[0];
    console.log("words: " + JSON.stringify(puzzleSet[1]));

    const dup = JSON.parse(JSON.stringify(puzzleArray));
    let fragments = getFragments(puzzleArray, defaultChar, size);
    // console.log("fragments: " + JSON.stringify(fragments));


    const fragObj = getFragObj(puzzleArray, fragments);
    // console.log("fragObj: " + JSON.stringify(fragObj));
    const filteredArray = removeLetters(puzzleArray, fragments[2]);
    const ps = JSON.parse(JSON.stringify(filteredArray));

    this.setState({
      tileHeight: tHeight, 
      puzzArrayDuplicate: dup, 
      puzzleArray: filteredArray, 
      puzzleSlate: ps, 
      fragmentLetterObj: fragObj,
      playedFragments: [],
      words: puzzleSet[1],
      loading: false
    });
    }, 1000);
  }else{
    const puzzleArray = this.props.puzzleSet;
    console.log("words: " + JSON.stringify(this.props.words));

    const dup = JSON.parse(JSON.stringify(puzzleArray));
    let fragments = this.props.fragments;
    const fragObj = this.props.fragObj;
    const filteredArray = removeLetters(puzzleArray, fragments[2]);
    const ps = JSON.parse(JSON.stringify(filteredArray));

    this.setState({
      tileHeight: tHeight, 
      puzzArrayDuplicate: dup, 
      puzzleArray: filteredArray, 
      puzzleSlate: ps, 
      fragmentLetterObj: fragObj,
      playedFragments: [],
      words: this.props.words,
      loading: false
    });

  }

 }

  handleTileStop(x, y, left, top, id, flipState){
    const th = this.state.tileHeight;
    const xCoord = Math.round((x + left)/th);
    const yCoord = Math.round((y + top)/th);
    const coords = [xCoord, yCoord];
    const overGameBoard = 
      (xCoord > -1 && xCoord < this.state.puzzleArray[0].length) 
      && 
      (yCoord > -1 && yCoord < this.state.puzzleArray.length)
      ?
      true:false;

    this.fragRefs[id].updatePosition(x, y, overGameBoard);
    this.removeFragment(id);

    if(overGameBoard){
      this.addFragment(id, flipState, coords);
    }
  }

  removeFragment(id){
    let delArray = this.state.playedFragments;
    const index = delArray.findIndex((obj) => obj.id === id);
    if(index > -1){
      delArray.splice(index, 1);
      this.setState({playedFragments: delArray});
    }
  }

  addFragment(id, flipState, coords){
    let addArray = this.state.playedFragments;
    let insertObj = {};
    insertObj["id"] = id;
    insertObj["state"] = flipState;
    insertObj["origin"] = coords;
    addArray.push(insertObj);
    this.setState({playedFragments: addArray});

    this.evaluateBoard(addArray, id);
  }

  evaluateBoard(played, id){
    const boardArr = this.getBoardArray(played, id);
    if(boardArr){
      const concatenatedHorizontal = concatStringArrays(boardArr);
      const concatenatedVertical = concatStringArrays(transposeArray(boardArr));
      const horWords = splitAndFilterStrings(concatenatedHorizontal, defaultChar);
      const vertWords = splitAndFilterStrings(concatenatedVertical, defaultChar);
      const allWordsFromSplits = horWords.concat(vertWords);
      let foundIncorrectWord = false;
      //const allWords = [...words3, ...words4, ...words5, ...words6, ...words7, ...words8, ...words9, ...words10];

      for(let m = 0;m < allWordsFromSplits.length;m++){
        //foundIncorrectWord = allWords.includes(allWordsFromSplits[m])?false:true;
        foundIncorrectWord = this.state.words.includes(allWordsFromSplits[m])?false:true;
        //console.log("words: " + JSON.stringify(this.state.words));
        if(foundIncorrectWord)break;
      }
      if(!foundIncorrectWord){
        this.storeOnGameComplete(this.props.daily)
        this.showSolved();
        return;
      }
      this.turnAllGreenOrDefault();
    }
  }

  storeOnGameComplete(daily) {
    if(!daily)return;
    let playedBool = false;
    const played = window.localStorage.getItem(KEY_PlayedFirstGame);
    if (played !== null) {
      playedBool = true;
    }else{
      playedBool = false;
      window.localStorage.setItem(KEY_PlayedFirstGame, 'true');
    }
    let dailySolvedArray = JSON.parse(window.localStorage.getItem(KEY_DailySolvedArray));
    if(dailySolvedArray.length === 2){
      toast.success("\u2605 Daily puzzles complete...\r\nWoo hoo! \u2605", {toastParams});
      this.setState({dailyComplete: true});
    }else if(dailySolvedArray.length === 0 && playedBool){
      toast.success("\u2605 Daily streak extended \u2605", {toastParams});
    }
    
    if(!dailySolvedArray.includes(this.props.count)){
      dailySolvedArray.push(this.props.count);
    }
    
    try {
      window.localStorage.setItem(KEY_DailySolvedArray, JSON.stringify(dailySolvedArray));
    } catch (error) {
      window.alert('window.localStorage error: ' + error.message);
    }

    const puzzStreak = window.localStorage.getItem(KEY_PuzzleStreakDays);
    let streakDateStr;
    if (puzzStreak !== null) {
      const dateToday = formatDate(new Date(), "MM-dd-yyyy");
      const numPuzzStreakDays = puzzStreak.split(",")[0];
      const lastPuzzDay = puzzStreak.split(",")[1];
      let psInt = parseInt(numPuzzStreakDays);
      if (dateToday !== lastPuzzDay || psInt === 0) psInt++;
      let incrPsStr = psInt + "";
      streakDateStr = incrPsStr + "," + dateToday;
    }
    try {
      window.localStorage.setItem(KEY_PuzzleStreakDays, streakDateStr);
    } catch (error) {
      window.alert('window.localStorage error: ' + error.message);
    }
  }

  getBoardArray(played, id){
    let bArray = JSON.parse(JSON.stringify(this.state.puzzleSlate));

    for(let j = 0;j < played.length;j++){
      const fragId = played[j].id;
      const frag = this.state.fragmentLetterObj.find(fragment => fragment.id === fragId);
      const fragLetters = frag.letters;
      const horizontal = played[j].state === 0 || played[j].state === 2?true:false;
      bArray = horizontal?bArray:transposeArray(bArray);
      const coordsToUse = horizontal?[played[j].origin[0], played[j].origin[1]]:[played[j].origin[1], played[j].origin[0]];
      for(let k = 0;k < fragLetters.length;k++){
        if(bArray[coordsToUse[1]][coordsToUse[0] + k] !== "*" && frag.id === id){
          this.fragRefs[id].changeTilesetColor(id, colors.dark_pink, false);
          return false;
        }
        bArray[coordsToUse[1]][coordsToUse[0] + k] = fragLetters[k];
      }
      bArray = played[j].state === 0 || played[j].state === 2?bArray:transposeArray(bArray);
    }
    return bArray;
  }

  showSolved(){
    const indices = Array.from(Array(this.props.count), (_, index) => index);
    if (this.state.daily) {
      this.setState((prevState) => {
        let newIndex = prevState.nextGameIndex;
        do {
          newIndex = (newIndex + 1) % 6;
        } while (newIndex < 3);
        return {
          nextGameIndex: newIndex,
        };
      });
    }    
    setTimeout(() => {
      this.setState({showButtons: true});
    }, 2200); 
    indices.forEach((index) => {
      const dRef = "d|" + index;
      const tRef = "t|" + index;
      this.fragRefs[dRef].changeTilesetColor(dRef, colors.text_white, false);
      this.fragRefs[tRef].changeTilesetColor(tRef, colors.text_white, false);
      this.fragRefs[dRef].showSolved(dRef);
      this.fragRefs[tRef].showSolved(tRef);
    })
    for(let j = 0;j < this.state.puzzleArray.length;j++){
      for(let k = 0;k < this.state.puzzleArray[0].length;k++){
        const ref = `tile${k}|${j}`;
        this.tileRefs[ref].showSolved(ref);
      }
    }
  }

  turnAllGreenOrDefault(id){
    const indices = Array.from(Array(this.props.count), (_, index) => index);
    if(id)this.removeFragment(id);

    const boardArr = this.getBoardArray(this.state.playedFragments);
    const concatenatedHorizontal = concatStringArrays(boardArr);
    const concatenatedVertical = concatStringArrays(transposeArray(boardArr));
    const horWords = splitAndFilterWithIndex(concatenatedHorizontal, defaultChar, true);
    const vertWords = splitAndFilterWithIndex(concatenatedVertical, defaultChar, false);
    const allWordsFromSplits = horWords.concat(vertWords);
    let solvedCoords = [];

    for(let n = 0;n < allWordsFromSplits.length;n++){
      if(this.state.words.includes(allWordsFromSplits[n][0])){
        const origCoord = allWordsFromSplits[n][1];
        let coordsArray = [];
        const horiz = allWordsFromSplits[n][2];
        for(let nn = 0;nn < allWordsFromSplits[n][0].length;nn++){
          const nextCoord = horiz?[origCoord[0] + nn, origCoord[1]]:[origCoord[0], origCoord[1] + nn];
          coordsArray.push(nextCoord);
        }
        solvedCoords.push(coordsArray);
      }
    }
    indices.forEach((index) => {
      const dRef = "d|" + index;
      const tRef = "t|" + index;

      this.fragRefs[dRef].changeTilesetColor(dRef, colors.text_white, false);
      this.fragRefs[tRef].changeTilesetColor(tRef, colors.text_white, false);
    })

    for(let j = 0;j < this.state.puzzleArray.length;j++){
      for(let k = 0;k < this.state.puzzleArray[0].length;k++){
        const ref = `tile${k}|${j}`;
        this.tileRefs[ref].setBgColor();
      }
    }

    let playedTileArray = [];

    if(solvedCoords.length){
      for(let j = 0; j < solvedCoords.length; j++){
        for(let k = 0; k < solvedCoords[j].length; k++){
          const ref = `tile${solvedCoords[j][k][0]}|${solvedCoords[j][k][1]}`;
          this.tileRefs[ref].setBgColor(colors.green);
        }
      }
      
      this.state.playedFragments.forEach(frag => {
        const tileIndices = frag.id.substring(0, 1) === "d" ? [0, 1] : [0, 1, 2];
        const horizontal = frag.state === 0 || frag.state === 2?true:false;
        let oneTileSet = [];
        let tileSetCoords = [];

        for(let q = 0; q < tileIndices.length; q++){
          const aCoord = horizontal?[frag.origin[0] + q, frag.origin[1]]:[frag.origin[0], frag.origin[1] + q];
          tileSetCoords.push(aCoord);
        }

        oneTileSet.push(frag.id, tileSetCoords);
        playedTileArray.push(oneTileSet);
      });
    }
    let fragId, tilesToTurn;
    let changeColorArr = [];

    for(let w = 0; w < playedTileArray.length; w++){
      fragId = null;
      tilesToTurn = [];
      for(let x = 0; x < playedTileArray[w][1].length; x++){
        const coordsFound = checkArrayInMultiDimensional(solvedCoords, playedTileArray[w][1][x]);
        if(coordsFound){
          fragId = playedTileArray[w][0];
          tilesToTurn.push(x);
        }
      }
      if(fragId)changeColorArr.push([fragId, tilesToTurn])
    }

    for(let y = 0; y < changeColorArr.length; y++){
      this.fragRefs[changeColorArr[y][0]].changeTilesetColor(changeColorArr[y][0], colors.green, changeColorArr[y][1]);
    }
  }

  closeGame(){
    this.props.showLaunch();
  }

  nextGame(which){
    const nextIndex = which?which: this.state.nextGameIndex;
    this.setState({showButtons: false});
    this.props.startGame(nextIndex, this.state.daily);
    this.init();
  }

  renderTile(letter, index, i, idFrag){
    const th = this.state.tileHeight;
    const tileName = "tile" + i + "|" + index;

    return(
      <CrosswordTile
        key={`${idFrag}${index}-${i}`} 
        id={tileName}
        letter={letter}
        ref={(ref) => this.tileRefs[tileName] = ref}
        left={i * th}
        top={index * th}
        tileHeight={th}
      />
    );
  }

  renderTileSet(obj, index, idFrag) {
    const th = this.state.tileHeight;
    const puzzHeight = this.state.puzzleArray.length;
    const refStr = obj.id;
    const isDouble = refStr.substring(0, 1) === "d" ? true : false;
    const leftMultiplier = isDouble ? 1 : 4;
    const topReducer = isDouble ? this.state.fragmentLetterObj.length / 2 : 0;
    const i = index - topReducer;
  
    const bottomOffset = 40;
    const bottomPosition = scrHeight - bottomOffset;
  
    const tileSetTop = (puzzHeight + i) * th + th;
    const adjustedTop = tileSetTop > bottomPosition ? bottomPosition - th : tileSetTop;
  
    return (
      <div key={idFrag + index}>
        <TileSet
          key={idFrag + refStr}
          index={i}
          id={refStr}
          letters={obj.letters}
          flipState={obj.flipState}
          ref={(ref) => (this.fragRefs[refStr] = ref)}
          left={leftMultiplier * th}
          top={adjustedTop}
          tileHeight={th}
          delay={delays[i]}
          sendStopping={(x, y, left, top, id, state) => this.handleTileStop(x, y, left, top, id, state)}
          requestGreenOrDefault={(id) => this.turnAllGreenOrDefault(id)}
        />
      </div>
    );
  }
  
  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <div style={game_styles.loading_container}>
          <CircularProgress colors={colors.off_white} />
        </div>
      );
    }
    const th = this.state.tileHeight;

    return (
      <div>
        {this.state.dailyComplete &&
          <Confetti />
        }          

      <div id="parentContainer" style={{...game_styles.container, width: this.state.puzzleArray[0].length * th, height: (this.state.puzzleArray.length) * th}}>
        {this.state.puzzleArray.map((array, outerIndex) => (
          <div key={outerIndex}>
            {array.map((str, innerIndex) => (
              this.renderTile(str, outerIndex, innerIndex, this.props.keyIDFragment)
            ))}
          </div>
        ))}
        {
          this.state.fragmentLetterObj.map((obj, index) => this.renderTileSet(obj, index, this.props.keyIDFragment))
        }
      </div>
      <div style={game_styles.button_container}>
        <AnimatePresence>
          {this.state.showButtons &&    
            <div style={{display: 'flex', flexDirection: 'row'}}>     
              <motion.button
                initial={{ opacity: 0, y: 700 }}
                animate={{ opacity: 1, y: 150 }}
                transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.8, delay: 0.3 }}
                style={{...game_styles.button, backgroundColor: colors.button_blue}}
              >
                <img style={game_styles.img} src={homeImage} onClick={() => this.closeGame()} alt={"Home"} />
              </motion.button>
            {(this.state.daily && !this.state.dailyComplete) &&    
              <motion.button
                initial={{ opacity: 0, y: 700 }}
                animate={{ opacity: 1, y: 150 }}
                transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.6 }}
                style={{...game_styles.button, backgroundColor: colors.button_blue}}
              >
                <img style={game_styles.img} src={nextImage} onClick={() => this.nextGame()} alt={"Next Game"} />
              </motion.button>
            }
            {!this.state.daily &&  
            <div style={game_styles.nextGame_button_container}>  
              <motion.button
                initial={{ opacity: 0, y: 700 }}
                animate={{ opacity: 1, y: 150 }}
                transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.6 }}
                style={{...game_styles.button, backgroundColor: colors.dark_green}}
              >
                <img style={game_styles.img} src={nextImage} onClick={() => this.nextGame(3)} alt={"Next Game"} />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 700 }}
                animate={{ opacity: 1, y: 150 }}
                transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.6 }}
                style={{...game_styles.button, backgroundColor: colors.dark_blue}}
              >
                <img style={game_styles.img} src={nextImage} onClick={() => this.nextGame(4)} alt={"Next Game"} />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 700 }}
                animate={{ opacity: 1, y: 150 }}
                transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.6 }}
                style={{...game_styles.button, backgroundColor: colors.dark_red}}
              >
                <img style={game_styles.img} src={nextImage} onClick={() => this.nextGame(5)} alt={"Next Game"} />
              </motion.button>
              </div>
            }
            </div> 
          }
        </AnimatePresence>
     </div> 
     <ToastContainer
              position="bottom-center"
              style={{ width: config.isPC ? scrHeight / 4.5 : scrWidth * 0.7 }}
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
    );
  }
}

const game_styles = {
  loading_container: {
    display: 'flex',
    flex: 1,
    height: scrHeight,
    width: scrWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: "relative",
    backgroundColor: colors.gray_4,
    marginTop: 160,
    borderRadius: 5,
    boxShadow: shadow,
    borderColor: colors.off_black, borderWidth: 4, borderStyle: 'solid'
  },
  button_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: colors.transparent,
  },
  nextGame_button_container: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: colors.transparent,
  },
  button: {
    display: 'flex',
    borderRadius: config.button_radius + 10,
    justifyContent: "center",
    boxShadow: `4px 10px 16px ${colors.black}`,
    borderColor: colors.transparent,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    padding: 15,
    margin: 6
  },
  img: {
    height: 35, 
    width: 35,
    alignSelf: "center"
  },
  button_text: {
    fontSize: 22,
    color: colors.off_white,
    textAlign: "center",
    userSelect: 'none'
  },
}

export default GameBoard;


