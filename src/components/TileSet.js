import React, { Component } from 'react';
import Tile from '../components/Tile';
import Draggable from "react-draggable";
import colors from '../config/colors';
const shadow = `0px 0px 26px ${colors.off_black}`;
let idPrefix = "";

class TileSet extends Component {
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
      bgColor: colors.transparent,
      zIndex: 0,
    };
    this.tileRefs = [];
  }

  componentDidMount(){
    this.setState({xPosition: this.props.tileHeight * 0.4 + this.props.index * 20, yPosition: 3 * this.props.tileHeight + this.props.index * 10});
  }

  handleDrag(e, data){
    if(!this.state.beingDragged){
      this.resetBgColor(this.props.id);
      this.setState({beingDragged: true, moved: true, zIndex: 10, shadow: shadow});
    }
  }

  handleStop(e, data){
    if(!this.state.beingDragged)return;

    setTimeout(() => {
      this.setState({beingDragged: false});
      if(!this.state.flipping)this.setState({zIndex: 0}); 
    }, 200);    
    this.props.sendStopping(
      data.x, 
      data.y, 
      this.props.left, 
      this.props.top, 
      this.props.id, 
      this.state.flipState 
    );
  }

  handleClick(){
    this.resetBgColor(this.props.id);
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
        yPosition: this.state.yPosition + addToY
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
        zIndex: 10
      });
    }else{
      // console.log("case 3");
      const addToDoublesX = this.props.letters.length === 2?th:0;
      this.setState({
        flipping: true,
        flexDirection: this.state.flexDirection === "row"?"column":"row", 
        xPosition: th * 1.5 + addToDoublesX + this.props.index * 4, 
        yPosition: -(th/2 + this.props.index * th) + this.props.index * 4,
        shadow: shadow,
        width: this.state.width === tiles * th?th:tiles * th,
        height: this.state.height === tiles * th?th:tiles * th,
        flipState: newFlipState,
        letters: newFlipState === 1 || newFlipState === 3? letters:letters.reverse(),
        zIndex: 10
      });
    }
  }

  updatePosition(x, y, overBoard){
    const th = this.props.tileHeight;
    let modX = x;
    let modY = y;

    if(overBoard){
      modX = Math.round(x/th) * th;
      modY = Math.round(y/th) * th;
    }

    this.setState({xPosition:  modX, yPosition: modY, shadow: null, flipping: false, overBoard: overBoard}); 
  }

  showSolved(refPrefix){
    let index = 0;
    this.state.letters.forEach(() => {
      this.tileRefs[refPrefix + "|" + index].showSolved(refPrefix + "|" + index);
      index++;
    });
  }

  indicateBadMove(refPrefix){
    let index = 0;
    this.state.letters.forEach(() => {
      this.tileRefs[refPrefix + "|" + index].setBgColor(colors.dark_pink);
      index++;
    });
  }

  resetBgColor(refPrefix){
    let index = 0;
    this.state.letters.forEach(() => {
      this.tileRefs[refPrefix + "|" + index].setBgColor(colors.text_white);
      index++;
    });
  }

  setLastPositionX(x){
    this.setState({lastPositionX: x});
  }
  
  setLastPositionY(y){
    this.setState({lastPositionY: y});
  }

  changeTileSetBgColor(ref){
    this.setState({bgColor: colors.translucent});
  }

  changeTileSetZIndex(val){
    this.setState({zIndex: val});
    this.props.requestGreenOrDefault(this.props.id);
  }

  renderTile(letter, i){
    const refPrefix = idPrefix + this.props.index + "|";

    return (
      <Tile
        key={`${refPrefix}${i}`}
        id={`${refPrefix}${i}`}
        letter={letter}
        ref={(ref) => this.tileRefs[`${refPrefix}${i}`] = ref}
        tileHeight={this.props.tileHeight}
        delay={this.props.delay}
        setBgColor={(tileRef) => {this.changeTileSetBgColor(tileRef)}}
        setZIndex={(tileRef) => {this.changeTileSetZIndex(tileRef)}}
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
  },
}

export default TileSet;