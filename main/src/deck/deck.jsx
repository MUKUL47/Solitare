import React, { Component } from "react";
export class Deck extends Component {
  /**
   * 1) render a deck in a domino pattern based on hidden property
   * 2) on drag event to parent, verify if card(s) are/is draggable
   */
  constructor(props) {
    super(props);
    this.state = {
      refs: props?.data?.map(() => React.createRef()),
      index: -1,
    };
  }
  deckClicked(index, e) {
    //, "DECK_EXP_OSED"
    if (["DECK"].includes(this.props.type)) {
      this.helpDeckClicked(index);
      return;
    }
    this.props.deckClicked(
      this.props.data.slice(index),
      index,
      this.props.type,
      e,
      this.props.deckIndex
    );
  }

  helpDeckClicked(index) {
    this.props.deckClicked(this.props.data[index], index, this.props.type);
    this.setState({ index });
    if (index === this.state.index) {
      this.setState({ index: -1 });
      return;
    }
  }
  componentDidUpdate(prev) {
    const prevCards = prev?.data;
    const nextCards = this.props?.data;
    if (prevCards !== nextCards) {
      this.setState({
        refs: this.props?.data?.map(() => React.createRef()),
        index: -1,
      });
    }
    // return true;
  }
  render() {
    const Data = this.props.data.map((card, index) => {
      return (
        <card-t
          onClick={(e) => this.deckClicked(index, e)}
          key={index}
          ref={this.state.refs[index]}
          rank={card.hidden ? 0 : card.rank}
          suit={card.hidden ? 0 : card.type}
          backcolor="blue"
          backtext=" "
          style={{
            cursor: "pointer",
            zIndex: index,
            position: "absolute",
            left: 0,
            top: index * (this?.props?.zIndex || 35),
            width: "100%",
          }}></card-t>
      );
    });
    return Data;
  }
}
