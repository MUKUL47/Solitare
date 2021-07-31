export class Solitare {
  ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
  type = ["spades", "clubs", "diamonds", "hearts"];
  board = []; // [ ]
  deck = [];
  deckExposed = [];
  aces = [];
  finishedDeck = [[], [], [], []];
  //
  cardConsidered = [];
  cardsConsidered = 1;
  colorMap = { spades: 0, clubs: 0, diamonds: 1, hearts: 1 };
  ranking = {
    ace: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    jack: 11,
    queen: 12,
    king: 13,
  };
  constructor(someoneWon) {
    this.someoneWon = someoneWon;
    return this;
  }

  initialize() {
    for (let i = 0; i <= 6; i++) {
      for (let j = 0; j <= i; j++) {
        let card = this.getRandomCardFromDeck();
        card["hidden"] = i !== j;
        if (!this.board[i]) {
          this.board[i] = [card];
        } else {
          this.board[i].push(card);
        }
      }
    }
    let card = this.getRandomCardFromDeck();
    while (card) {
      card["hidden"] = true;
      this.deck.push(card);
      card = this.getRandomCardFromDeck();
    }
    return this;
  }

  deckToDeckExpose(deck) {
    const newCard = deck ? deck : { ...this.deck.pop(), hidden: false };
    this.deckExposed = [...this.deckExposed, newCard];
    return this;
  }

  appendNewCardsToBoard(index, cards, exception) {
    const column = this.board[index];
    //first card king
    if (!exception) {
      if (column.length === 0 && cards[0].rank !== "king") return false;
      //red-black vice-versa
      if (
        this.colorMap[column[column.length - 1]?.type] ===
        this.colorMap[cards?.[0].type]
      )
        return false;
      //ranking
      if (
        column.length > 0 &&
        this.ranking?.[column[column.length - 1].rank] - 1 !==
          this.ranking?.[cards?.[0]?.rank]
      )
        return false;
    }
    this.board[index] = [...this.board[index], ...cards];
    return this;
  }

  exposeTopDeck(index) {
    try {
      this.board[index][this.board[index].length - 1].hidden = false;
      return this;
    } catch (e) {
      console.error(e);
      return this;
    }
  }

  appendToFinishedDeck(card, finishIndex) {
    //rank, type
    let deck = this.finishedDeck[finishIndex];
    if (deck.length === 0 && card.rank !== "ace") return false;
    if (deck.length > 0) {
      if (
        deck[0].type !== card.type ||
        this.ranking[deck[deck.length - 1].rank] + 1 !== this.ranking[card.rank]
      )
        return false;
    }
    this.finishedDeck[finishIndex] = [...this.finishedDeck[finishIndex], card];
    return this;
  }

  removeOldCardsFromBoard(boardIndex, spliceIndex, isDeckExposed) {
    this.board[boardIndex].splice(spliceIndex);
    return this;
  }
  removeCardsFromDeck() {
    this.deckExposed.pop();
    return this;
  }

  resetDeck() {
    this.deck = this.deckExposed.reverse().map((v) => {
      return { ...v, hidden: true };
    });
    this.deckExposed = [];
    return this;
  }

  reset() {}

  getRandomCardFromDeck() {
    while (this.cardsConsidered < 53) {
      const ranksIdx = Math.floor(Math.random() * 13);
      const typeIdx = Math.floor(Math.random() * 4);
      const index = `${ranksIdx}-${typeIdx}`;
      if (!this.cardConsidered[index]) {
        this.cardConsidered[index] = true;
        this.cardsConsidered++;
        return {
          type: this.type[typeIdx],
          rank: this.ranks[ranksIdx],
          id: Math.random(),
        };
      }
    }
    return false;
  }
}
