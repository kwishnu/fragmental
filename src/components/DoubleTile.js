import React, { Component } from 'react';
// import { motion, AnimatePresence } from "framer-motion"
import Tile from '../components/Tile';
import Draggable from "react-draggable";
import colors from '../config/colors';
const twoIndices = ["0", "1"];

class DoubleTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: 0,
      yPosition: 0,
      width: 2 * this.props.tileHeight,
      height: this.props.tileHeight,
      flexDirection: "row",
      flipState: 0,
      beingDragged: false,
      bgColor: colors.text_white,
      zIndex: 0,
      show: true,
    };
    this.tileRefs = [];
  }

  componentDidMount(){
    this.setState({xPosition: this.props.index * 20, yPosition: this.props.index * 10});
    // this.setState({indexes: [this.props.indexes[0] + 2, this.props.indexes[1] + 2]});//, index: this.props.index + 2
  }

  handleDrag(e, data){
    this.setState({beingDragged: true, zIndex: 10, shadow: `0px 0px 38px ${colors.off_black}`});
    const refPrefix = "d|" + this.props.index + "|";

    twoIndices.forEach((index) => {
      this.tileRefs[refPrefix + index].toggleShadow(true);
    })
    this.props.sendDragData(e.movementX, e.movementY, this.props.id);
    // this.props.sendDragData(data.x, data.y, this.props.id);
  }

  handleStop(e, data){
    const refPrefix = "d|" + this.props.index + "|";
    twoIndices.forEach((index) => {
      this.tileRefs[refPrefix + index].toggleShadow(false);
    })
    setTimeout(() => {
      this.setState({beingDragged: false, zIndex: 0});//
    }, 200);    
    this.setState({xPosition: data.x, yPosition: data.y});
    if(!this.state.beingDragged)return;
    this.props.sendStopping(data.x, data.y, this.props.id, e);
  }

  handleClick(){
    const newFlipState = (this.state.flipState + 1)%4;
    let addToX = 0;
    let addToY = 0;
    let dir = "";
    if(!this.state.beingDragged){
      this.setState({
        width: this.state.width === 2 * this.props.tileHeight?this.props.tileHeight:2 * this.props.tileHeight,
        height: this.state.height === 2 * this.props.tileHeight?this.props.tileHeight:2 * this.props.tileHeight,
        flipState: newFlipState
      });
      switch(newFlipState){
        case 1:
          addToX = 0;
          addToY = 0;
          dir = "column";
          break;
        case 2:
          addToX = -this.props.tileHeight;
          addToY = 0;
          dir = "row-reverse";
          break;
        case 3:
          addToX = this.props.tileHeight;
          addToY = -this.props.tileHeight;
          dir = "column-reverse";
          break;
          default:
            dir = "row";
            addToX = 0;
          addToY = this.props.tileHeight;
      }
      this.setState({flexDirection: dir, xPosition: this.state.xPosition + addToX, yPosition: this.state.yPosition + addToY});
    }
  }

  moveTile(x, y){
    this.setState({shadow: `18px 18px 28px ${colors.gray_4}`, beingDragged: true, xPosition: this.state.xPosition + x,  yPosition: this.state.yPosition + y, zIndex: 10});
  }

  flipFragment(){
    console.log("flipping");
  }
  flipPosition(x, y){
    console.log("from Tile: ", x, y);
     this.setState({xPosition: x,  yPosition: y, flipState: (this.state.flipState + 1)%4, shadow: null, zIndex: 10});
  }

  updatePosition(x, y, index, overBoard){
    let modX = x;
    let modY = y;;
    let xAdjust = 0;
    let yAdjust = 0;
    const th = this.props.tileHeight;

    if(overBoard){
      modX = Math.round(x/th) * th;
      modY = Math.round(y/th) * th;
      
    }

    if(this.state.flipped){
      const myIndex = parseInt(this.props.id.split("|")[2]);
      // if(type === "double"){
        xAdjust = index === 0?-th:th;
        yAdjust =  index === 0?th:-th;
        xAdjust = myIndex === index?0:xAdjust;
        yAdjust = myIndex === index?0:yAdjust;
      // }else{
      //   switch(index){
      //     case 0:
      //       xAdjust = myIndex === 0?0:myIndex === 1?-th:-2 * th;
      //       yAdjust = myIndex === 0?0:myIndex === 1?th:2 * th;
      //       break;
      //     case 1:
      //       xAdjust = myIndex === 0?th:myIndex === 1?0:-th;
      //       yAdjust = myIndex === 0?-th:myIndex === 1?0:th;
      //       break;
      //     default:
      //       xAdjust = myIndex === 0?2 * th:myIndex === 1?th:0;
      //       yAdjust = myIndex === 0?-2 * th:myIndex === 1?-th:0;
      //   }
      // }
    }
    this.setState({xPosition:  modX + xAdjust, yPosition: modY + yAdjust, shadow: null});//zIndex: this.state.flipped?10:0, 
  }

  renderTile(letter, i){
    const refPrefix = "d|" + this.props.index + "|";

    return (
      <Tile
        key={`${refPrefix}${i}`}
        id={`${refPrefix}${i}`}
        letter={letter}
        ref={(ref) => this.tileRefs[`${refPrefix}${i}`] = ref}
        tileHeight={this.props.tileHeight}
        z={this.state.zIndex}
        delay={this.props.delay}
        sendDragData={(x, y, index) => this.sendDragDataToFragment(x, y, index)}
        sendStopping={(x, y, id, e) => this.handleTileStop(x, y, id, e)}
      />
    )
  }

  render() {
    const { letters, left, top } = this.props;

    return (
      <Draggable 
        position={{x: this.state.xPosition, y: this.state.yPosition}}
        onDrag={(e, data) => this.handleDrag(e, data)}
        onStop={(e, data) => this.handleStop(e, data)}
      > 
      <div 
        onClick={() => this.handleClick()} 
        style=
          {{
            ...styles.tileset, 
            flexDirection: this.state.flexDirection, 
            height: this.state.height, 
            width: this.state.width, 
            top: top, 
            left: left,
            zIndex: this.state.zIndex,
            boxShadow: this.state.shadow
          }}>
          {
            letters.map((letter, index) => this.renderTile(letter, index))
          }
      </div></Draggable>
      );
  }

}

const styles = {
  tileset: {
    position: 'absolute',
    display: 'flex',
    marginTop: 2,
    marginLeft: 2,
    justifyContent: "space-around",
    backgroundColor: colors.translucent,
  },
}

export default DoubleTile;