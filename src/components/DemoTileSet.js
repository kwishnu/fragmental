import React, { Component } from 'react';
import DemoTile from './DemoTile';
import Draggable from "react-draggable";
import colors from '../config/colors';
const shadow = `0px 0px 26px ${colors.off_black}`;
let idPrefix = "";

class DemoTileSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPosition: 0,
      yPosition: 0,
      lastPositionX: 0,
      lastPositionY: 0,
      overBoard: false,
      moved: false,
      width: this.props.letters.length * this.props.tileHeight,
      height: this.props.tileHeight,
      letters: this.props.letters,
      flexDirection: "row",
      flipState: this.props.flipState,
      flipping: false,
      beingDragged: false,
      positionInvalid: false,
      bgColor: colors.transparent,
      disabled: false,
      zIndex: 0,
    };
    this.tileRefs = [];
  }

  componentDidMount(){
    // this.setState({xPosition: this.props.tileHeight * 0.4, yPosition: 3 * this.props.tileHeight + this.props.index * 10});
  }

  componentWillUnmount() {
    clearTimeout(this.dragEndTimeout);
  }

  handleDrag(e, data){
  }

  handleStop(e, data){
    this.setState({xPosition: data.x, yPosition: data.y});
  }

  handleClick(){
    this.setState({xPosition: this.state.xPosition + 60});

    const newFlipState = (this.state.flipState + 1)%4;
    const tiles = this.props.letters.length === 2?2:3;
    const th = this.props.tileHeight;
    let addToX = 0;
    let addToY = 0;
    let dir = "";
    let letters = this.state.letters;

    if(this.state.flipping){
      // console.log("case 1");
      this.setState({
        width: this.state.width === tiles * this.props.tileHeight?this.props.tileHeight:tiles * this.props.tileHeight,
        height: this.state.height === tiles * this.props.tileHeight?this.props.tileHeight:tiles * this.props.tileHeight,
        shadow: shadow,
        flipState: newFlipState,
        letters: newFlipState === 1 || newFlipState === 3? letters:letters.reverse()
      });

      switch(newFlipState){
        case 1:
          addToX = tiles === 2?th/2:th;
          addToY = tiles === 2?0:-th;
          dir = "column";
          break;
        case 2:
          addToX =  tiles === 2?-th * 0.5:-th;
          addToY =  tiles === 2?0:th;
          dir = "row";
          break;
        case 3:
          addToX = tiles === 2?th/2:th;
          addToY = tiles === 2?0:-th;
          dir = "column";
          break;
        default:
          addToX =  tiles === 2?-th * 0.5:-th;
          addToY =  tiles === 2?0:th;
          dir = "row";
      }
      this.setState({
        flexDirection: dir, 
        xPosition: this.state.xPosition + addToX, 
        yPosition: this.state.yPosition + addToY,
      });
    }else if(!this.state.flipping && (this.state.overBoard || this.state.moved)){
      // console.log("case 2");
      this.setState({
        flipping: true,
        moved: true,
        flexDirection: this.state.flexDirection === "row"?"column":"row", 
        xPosition: this.state.flipState === 1 || this.state.flipState === 3? this.state.xPosition - th/2:this.state.xPosition + th/2, 
        yPosition: this.state.flipState === 1 || this.state.flipState === 3? this.state.yPosition + th * 0.5:this.state.yPosition - th * 0.5,
        shadow: shadow,
        width: this.state.width === tiles * th?th:tiles * th,
        height: this.state.height === tiles * th?th:tiles * th,
        flipState: newFlipState,
        letters: newFlipState === 1 || newFlipState === 3? letters:letters.reverse(),
        zIndex: 10,
      });
    }else{
      // console.log("case 3");
      const addToDoublesX = this.props.letters.length === 2?th:0;
      this.setState({
        flipping: true,
        flexDirection: this.state.flexDirection === "row"?"column":"row", 
        xPosition: th * 1.5 + addToDoublesX, 
        yPosition: -(th/2),
        shadow: shadow,
        width: this.state.width === tiles * th?th:tiles * th,
        height: this.state.height === tiles * th?th:tiles * th,
        flipState: newFlipState,
        letters: newFlipState === 1 || newFlipState === 3? letters:letters.reverse(),
        zIndex: 10,
      });
    }
  }

  setLastPositionX(x){
    this.setState({lastPositionX: x});
  }
  
  setLastPositionY(y){
    this.setState({lastPositionY: y});
  }

  renderTile(letter, i){
    const refPrefix = idPrefix + this.props.index + "|";

    return (
      <DemoTile
        key={`${refPrefix}${i}`}
        id={`${refPrefix}${i}`}
        letter={letter}
        ref={(ref) => this.tileRefs[`${refPrefix}${i}`] = ref}
        tileHeight={this.props.tileHeight}
      />
    )
  }

  render() {
    const { letters, left, top } = this.props;
    idPrefix = letters.length === 2? "d|":"t|";

    return (
      <Draggable 
        position={{x: this.state.xPosition, y: this.state.yPosition}}
        onStart={(e, data) => {
          this.setLastPositionX(Math.floor(data.x));
          this.setLastPositionY(Math.floor(data.y));
        }}
        onDrag={(e, data) => this.handleDrag(e, data)}
        onStop={(e, data) => {
          if (Math.floor(data.x) === this.state.lastPositionX && Math.floor(data.y) === this.state.lastPositionY) {
            this.handleClick();
            return;
          }else{
            this.handleStop(e, data);
          }
        }}
        disabled={false}
      > 
        <div 
          style=
            {{
              ...styles.tileset, 
              flexDirection: this.state.flexDirection, 
              height: this.state.height, 
              width: this.state.width, 
              top: top, 
              left: left,
              zIndex: this.state.zIndex,
              backgroundColor: this.state.bgColor,
              boxShadow: this.state.shadow
            }}>
            {
              letters.map((letter, index) => this.renderTile(letter, index))
            }
        </div>
      </Draggable>
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
    zIndex: 100
  },
}

export default DemoTileSet;