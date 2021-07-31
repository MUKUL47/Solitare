import React from "react";
import { Deck } from "../deck/deck";
import { Solitare } from "../solitare";
import "./gameboard.css";
export class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    const solitare = new Solitare();
    solitare.initialize();
    this.state = {
      solitare,
      selectedDeckInfo: { deck: null, type: -1, index: -1, top: -1, left: -1 },
    };
    this.gameboardRef = React.createRef();
    this.deckInHandRef = React.createRef();
  }

  componentDidUpdate(prev) {
    if (prev.reset !== this.props.reset) {
      this.setState({ solitare: new Solitare().initialize() });
    }
  }

  deckClicked(cards, index, type, e, deckIndex) {
    // //console.log(cards, index, type);
    if (type === "DECK" && !this.state.selectedDeckInfo?.deck) {
      this.setState({ solitare: this.state.solitare.deckToDeckExpose() });
    } else if (!this.state.selectedDeckInfo?.deck) {
      //hold deck in hand
      if (cards[0].hidden) return;
      if (type === "DECK_EXPOSED") {
        this.setState({
          selectedDeckInfo: { deck: cards, index, type, e, deckIndex },
          solitare: this.state.solitare.removeCardsFromDeck(),
        });
      } else {
        this.setState({
          selectedDeckInfo: { deck: cards, index, type, e, deckIndex },
          solitare: this.state.solitare.removeOldCardsFromBoard(
            deckIndex,
            index
          ),
        });
      }
    } else {
      // target deck
      if (type === "BOARD") {
        //console.log(deckIndex);
        const oldDeck = { ...this.state.selectedDeckInfo };
        const solitare = this.state.solitare.appendNewCardsToBoard(
          deckIndex,
          oldDeck.deck,
          oldDeck.deckIndex === deckIndex
        );
        if (!solitare) return;
        this.setState({
          solitare: solitare.exposeTopDeck(oldDeck.deckIndex),
          selectedDeckInfo: {},
        });
      }
    }
  }

  onDeckClick() {
    if (
      this.state.selectedDeckInfo?.deck &&
      this.state.selectedDeckInfo?.type === "DECK_EXPOSED"
    ) {
      this.setState({
        solitare: this.state.solitare.deckToDeckExpose(
          this.state.selectedDeckInfo?.deck[0]
        ),
        selectedDeckInfo: {},
      });
    }
  }

  onEmptyDeckBoard(index) {
    if (this.state.selectedDeckInfo?.deck) {
      const oldDeck = { ...this.state.selectedDeckInfo };
      const solitare = this.state.solitare.appendNewCardsToBoard(
        index,
        oldDeck.deck,
        oldDeck.deckIndex === index
      );
      if (!solitare) return;
      this.setState({
        solitare: solitare.exposeTopDeck(oldDeck.deckIndex),
        selectedDeckInfo: {},
      });
    }
  }

  deckTarget(...args) {
    //console.log("TARGET-", args);
    //console.log("DECK-", this.state.selectedDeckInfo);
  }

  componentDidMount() {
    this.gameboardRef.current.addEventListener("mousemove", (e) => {
      if (this.state.selectedDeckInfo.deck) {
        this.deckInHandRef.current.style.top = `${e.clientY}px`;
        this.deckInHandRef.current.style.left = `${e.clientX + 10}px`;
      }
    });
  }

  resetDeck() {
    if (this.state.solitare.deck.length === 0)
      this.setState({ solitare: this.state.solitare.resetDeck() });
  }

  lastDeckClicked(cards, index, type, e, deckIndex) {
    if (this.state.selectedDeckInfo?.deck?.length === 1) {
      const oldDeck = { ...this.state.selectedDeckInfo };
      const solitare = this.state.solitare.appendToFinishedDeck(
        oldDeck.deck[oldDeck.deck.length - 1],
        deckIndex
      );
      if (!solitare) return;
      this.setState({
        solitare: solitare.exposeTopDeck(oldDeck.deckIndex),
        selectedDeckInfo: {},
      });
    }
  }

  render() {
    const board = this.state.solitare.board.map((deck, deckIndex) => {
      return (
        <div
          className="board-area"
          key={deck.id}
          onClick={() => {
            if (deck.length === 0) {
              this.onEmptyDeckBoard(deckIndex);
            }
          }}>
          <Deck
            data={deck}
            deckIndex={deckIndex}
            deckClicked={this.deckClicked.bind(this)}
            type="BOARD"
          />
        </div>
      );
    });
    const finishedDeck = this.state.solitare.finishedDeck.map(
      (deck, deckIdx) => {
        return (
          <div className="ace" key={deckIdx}>
            {deck.length > 0 ? (
              <Deck
                key={deckIdx}
                data={deck}
                deckClicked={this.lastDeckClicked.bind(this)}
                zIndex={1.5}
                type="DECK_FINISHED"
                deckIndex={deckIdx}
              />
            ) : (
              <p
                onClick={() =>
                  this.lastDeckClicked(null, null, null, null, deckIdx)
                }>
                Ace
              </p>
            )}
          </div>
        );
      }
    );
    return (
      <div className="game-board" data={1} ref={this.gameboardRef}>
        {this.state.selectedDeckInfo.deck && (
          <div className="deck-in-hand" ref={this.deckInHandRef}>
            <Deck
              data={this.state.selectedDeckInfo.deck}
              deckClicked={this.deckTarget.bind(this)}
            />
          </div>
        )}
        <div className="game-board_header">
          <div className="deck-stash">
            <div className="decks">
              {this.state.solitare.deck.length > 0 ? (
                <Deck
                  data={this.state.solitare.deck}
                  deckClicked={this.deckClicked.bind(this)}
                  zIndex={1.5}
                  type="DECK"
                />
              ) : (
                <p onClick={this.resetDeck.bind(this)}>Reset Deck</p>
              )}
            </div>
            <div
              className="decks-exposed"
              onClick={this.onDeckClick.bind(this)}>
              <Deck
                data={this.state.solitare.deckExposed}
                deckClicked={this.deckClicked.bind(this)}
                zIndex={1.5}
                type="DECK_EXPOSED"
              />
            </div>
          </div>
          <div className="aces">{finishedDeck}</div>
        </div>
        <div className="game-board_play">{board}</div>
      </div>
    );
  }
}
