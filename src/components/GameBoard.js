import React, { Component } from 'react';
import { CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import colors from '../config/colors';
import config from '../config/config';
import TileSet from '../components/TileSet';
import CrosswordTile from '../components/CrosswordTile';
import { generateArray, getFragments, removeLetters, getFragObj, transposeArray, concatStringArrays, splitAndFilterStrings, arraysHaveSameElements } from '../config/functions';
const defaultChar = '.';
const scrHeight = config.scrHeight;
const scrWidth = config.scrWidth;
const delays = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
const indices = [];
const shadow = `3px 3px 8px ${colors.off_black}`;
const backImage = require("../images/arrow_back.png");
const tablet = config.isTablet;
const pc = config.isPC;

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
      showBackButton: false,
      loading: false
    }
    this.fragRefs = [];
    this.tileRefs = [];
  }

  componentDidMount(){
    this.setState({ loading: true });
    setTimeout(() => {
    const size = this.props.count;
    const puzzleSet = generateArray(size);
    console.log("whole shebang:: " + JSON.stringify(puzzleSet));
    console.log("puzzleSet: " + JSON.stringify(puzzleSet[0]));
    const puzzleArray = puzzleSet[0];
    console.log("words: " + JSON.stringify(puzzleSet[1]));

    const dup = JSON.parse(JSON.stringify(puzzleArray));
    let fragments = getFragments(puzzleArray, defaultChar, size);
    console.log("fragments: " + JSON.stringify(fragments));

    for(let j = 0;j < size;j++){
      indices.push(j);
    }

    const fragObj = getFragObj(puzzleArray, fragments);
    console.log("fragObj: " + JSON.stringify(fragObj));
    const filteredArray = removeLetters(puzzleArray, fragments[2]);
    const ps = JSON.parse(JSON.stringify(filteredArray));
    let tHeight = (scrHeight * 9/16)/13;
    tHeight = tHeight >= 62?62:tHeight;

    this.setState({
      tileHeight: tHeight, 
      puzzArrayDuplicate: dup, 
      puzzleArray: filteredArray, 
      puzzleSlate: ps, 
      fragmentLetterObj: fragObj,
      words: puzzleSet[1],
      loading: false
    });
  }, 1000);
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
    let boardArr = JSON.parse(JSON.stringify(this.state.puzzleSlate));
    for(let j = 0;j < played.length;j++){
      const fragId = played[j].id;
      const frag = this.state.fragmentLetterObj.find(fragment => fragment.id === fragId);
      const fragLetters = frag.letters;
      const horizontal = played[j].state === 0 || played[j].state === 2?true:false;
      boardArr = horizontal?boardArr:transposeArray(boardArr);
      const coordsToUse = horizontal?[played[j].origin[0], played[j].origin[1]]:[played[j].origin[1], played[j].origin[0]];
      for(let k = 0;k < fragLetters.length;k++){
        if(boardArr[coordsToUse[1]][coordsToUse[0] + k] !== "*" && frag.id === id){
          this.fragRefs[id].indicateBadMove(id);
          return;
        }
        boardArr[coordsToUse[1]][coordsToUse[0] + k] = fragLetters[k];
      }
      boardArr = played[j].state === 0 || played[j].state === 2?boardArr:transposeArray(boardArr);
    }
    const concatenatedHorizontal = concatStringArrays(boardArr);
    const concatenatedVertical = concatStringArrays(transposeArray(boardArr));
    const horWords = splitAndFilterStrings(concatenatedHorizontal, defaultChar);
    const vertWords = splitAndFilterStrings(concatenatedVertical, defaultChar);
    const allWordsFromSplits = horWords.concat(vertWords);
    console.log(JSON.stringify(allWordsFromSplits));

    if(arraysHaveSameElements(allWordsFromSplits, this.state.words))this.showSolved();
  }

  showSolved(){
    setTimeout(() => {
      this.setState({showBackButton: true});
    }, 3000); 

    indices.forEach((index) => {
        this.fragRefs["d|" + index].showSolved("d|" + index);
        this.fragRefs["t|" + index].showSolved("t|" + index);
      })
      for(let j = 0;j < this.state.puzzleArray.length;j++){
        for(let k = 0;k < this.state.puzzleArray[0].length;k++){
          const ref = `tile${j}|${k}`;
          this.tileRefs[ref].showSolved(ref);
      }
    }
  }

  reloadGame(){
    window.location.reload();
  }

  renderTile(letter, index, i){
    const th = this.state.tileHeight;

    return(
      <CrosswordTile
        key={`${index}-${i}`} 
        id={i}
        letter={letter}
        ref={(ref) => this.tileRefs["tile" + index + "|" + i] = ref}
        myRef={"tile" + index + "|" + i}
        left={i * th}
        top={index * th}
        tileHeight={th}
      />
    );

  }

  renderTileSet(obj, index) {
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
      <div key={index}>
        <TileSet
          key={refStr}
          index={i}
          id={refStr}
          letters={obj.letters}
          flipState={obj.state}
          ref={(ref) => (this.fragRefs[refStr] = ref)}
          left={leftMultiplier * th}
          top={adjustedTop}
          tileHeight={th}
          delay={delays[i]}
          sendStopping={(x, y, left, top, id, state) => this.handleTileStop(x, y, left, top, id, state)}
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
      <div id="parentContainer" style={{...game_styles.container, width: this.state.puzzleArray[0].length * th, height: (this.state.puzzleArray.length) * th}}>
        {this.state.puzzleArray.map((array, outerIndex) => (
          <div key={outerIndex}>
            {array.map((str, innerIndex) => (
              this.renderTile(str, outerIndex, innerIndex)
            ))}
          </div>
        ))}
        {
          this.state.fragmentLetterObj.map((obj, index) => this.renderTileSet(obj, index))
        }
      </div>
      <div style={{...game_styles.button_container, backgroundColor: this.props.gameBgColor}}>
        <AnimatePresence>
          {this.state.showBackButton &&          
            <motion.button
              initial={{ opacity: 0, y: 700 }}
              animate={{ opacity: 1, y: 150 }}
              transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.4 }}
              style={game_styles.button}
            >
              <img src={backImage} onClick={() => this.reloadGame()} alt={"Back"} />
              {/* <div onClick={() => this.reloadGame()} style={game_styles.button_text}>New Puzzle</div> */}
            </motion.button>
          }
        </AnimatePresence>
     </div> 
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
  back_button: {
    width: tablet ? scrWidth / 6 : pc ? scrHeight / 14 : scrWidth / 4.8,
    height: tablet ? scrWidth / 6 : pc ? scrHeight / 14 : scrWidth / 4.8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    backgroundColor: colors.button_blue,
    boxShadow: `10px 10px 28px ${colors.off_black}`,
  },  button_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.gray_4,
  },
  button: {
    display: 'flex',
    borderRadius: config.button_radius + 10,
    justifyContent: "center",
    backgroundColor: colors.button_blue,
    boxShadow: `10px 20px 10px ${colors.off_black}`,
    borderColor: colors.transparent,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    padding: 15
  },
  button_text: {
    fontSize: 22,
    color: colors.off_white,
    textAlign: "center",
    userSelect: 'none'
  },
}

export default GameBoard;


