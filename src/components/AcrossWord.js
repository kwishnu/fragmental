import React, { Component } from 'react';
import colors from '../config/colors';
import { repeatArrayElements } from '../config/functions';
import Tile from './Tile';
let refArray = [];

class AcrossWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      tileHeight: this.props.tileHeight,
      xPosition: 0,
      yPosition: 0,
      bgColor: colors.text_white,
      axis: 'x',
      top: this.props.top,
      left: this.props.left,
    };
    this.tileRefs = [];
  }

  componentDidMount(){
  }

  sendDragDataToApp(x, y, i){
    //send to app...then:
    refArray.forEach(refStr => {
      if(refStr !== i + ""){
        this.tileRefs[refStr].moveTile(x, y);
      }
    })


  }

  renderTiles(letter, i){
    const lettersInWord = this.props.word.length;
    refArray.push(i + "");
    let left = 0;
    const ht = this.props.tileHeight;
    switch(true){
      case i < lettersInWord:
        left = 0;
      break;
      case i >= 2 * lettersInWord:
        left = (lettersInWord + 1) * ht;
      break;

      default:
        left = (i - lettersInWord + 1) * ht
    }

    return(
      <Tile
        key={i} 
        index={i}
        ref={(ref) => this.tileRefs[i + ""] = ref}
        letter={letter}
        wordLength={this.props.word.length}
        tileHeight={80}
        left={left}
        top={0}
        sendDragData={(x, y, index) => this.sendDragDataToApp(x, y, index)}
      />
    );
  }

  render() {
    const { word, tileHeight } = this.props;
    let wordArray = word.split("");
    const len = wordArray.length;
    let extendedArray = repeatArrayElements(wordArray, 3);

    return (
      <div style={{...tile_styles.container, width: (len + 2) * tileHeight + 3}}>
        <div style={tile_styles.left_hidden}>
          <div style={{height: 82, width: 80, position: "relative", backgroundColor: colors.gray_3, zIndex: 100}}></div>
        </div>
        <div style={{...tile_styles.word_container, width:len * tileHeight + 2, height: tileHeight}}>
          {
            extendedArray.map((letter, index, len) => this.renderTiles(letter, index, len))
          }
        </div>
        <div style={tile_styles.right_hidden}>
          <div style={{height: 82, width: 80, position: "relative", backgroundColor: colors.gray_3, zIndex: 100}}></div>
        </div>
      </div>
    );
  }

}

const tile_styles = {
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',

  },
  word_container: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
  },
  left_hidden: {
    width: 80,
    height:80,
  },
  right_hidden: {
    width: 80,
    height:80,
  },
  text: {
    fontFamily: 'system-ui',
    fontWeight: 'bold',
    userSelect: 'none'
  }
}

export default AcrossWord;