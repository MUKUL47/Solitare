(this.webpackJsonpsolitare=this.webpackJsonpsolitare||[]).push([[0],{14:function(e,t,i){},16:function(e,t,i){},17:function(e,t,i){"use strict";i.r(t),i.d(t,"default",(function(){return b}));var s=i(3),n=i(4),a=i(6),d=i(5),c=i(1),r=i.n(c),o=i(9),l=i.n(o),h=(i(14),i(2)),k=i(0),u=function(e){Object(a.a)(i,e);var t=Object(d.a)(i);function i(e){var n,a;return Object(s.a)(this,i),(a=t.call(this,e)).state={refs:null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.map((function(){return r.a.createRef()})),index:-1},a}return Object(n.a)(i,[{key:"deckClicked",value:function(e,t){["DECK"].includes(this.props.type)?this.helpDeckClicked(e):this.props.deckClicked(this.props.data.slice(e),e,this.props.type,t,this.props.deckIndex)}},{key:"helpDeckClicked",value:function(e){this.props.deckClicked(this.props.data[e],e,this.props.type),this.setState({index:e}),e!==this.state.index||this.setState({index:-1})}},{key:"componentDidUpdate",value:function(e){var t,i,s;(null===e||void 0===e?void 0:e.data)!==(null===(t=this.props)||void 0===t?void 0:t.data)&&this.setState({refs:null===(i=this.props)||void 0===i||null===(s=i.data)||void 0===s?void 0:s.map((function(){return r.a.createRef()})),index:-1})}},{key:"render",value:function(){var e=this;return this.props.data.map((function(t,i){var s;return Object(k.jsx)("card-t",{onClick:function(t){return e.deckClicked(i,t)},ref:e.state.refs[i],rank:t.hidden?0:t.rank,suit:t.hidden?0:t.type,backcolor:"blue",backtext:" ",style:{cursor:"pointer",zIndex:i,position:"absolute",left:0,top:i*((null===e||void 0===e||null===(s=e.props)||void 0===s?void 0:s.zIndex)||35),width:"100%"}},i)}))}}]),i}(c.Component),p=i(7),v=function(){function e(t){return Object(s.a)(this,e),this.ranks=["ace",2,3,4,5,6,7,8,9,10,"jack","queen","king"],this.type=["spades","clubs","diamonds","hearts"],this.board=[],this.deck=[],this.deckExposed=[],this.aces=[],this.finishedDeck=[[],[],[],[]],this.cardConsidered=[],this.cardsConsidered=1,this.colorMap={spades:0,clubs:0,diamonds:1,hearts:1},this.ranking={ace:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,jack:11,queen:12,king:13},this.someoneWon=t,this}return Object(n.a)(e,[{key:"initialize",value:function(){for(var e=0;e<=6;e++)for(var t=0;t<=e;t++){var i=this.getRandomCardFromDeck();i.hidden=e!==t,this.board[e]?this.board[e].push(i):this.board[e]=[i]}for(var s=this.getRandomCardFromDeck();s;)s.hidden=!0,this.deck.push(s),s=this.getRandomCardFromDeck();return this}},{key:"deckToDeckExpose",value:function(e){var t=e||Object(h.a)(Object(h.a)({},this.deck.pop()),{},{hidden:!1});return this.deckExposed=[].concat(Object(p.a)(this.deckExposed),[t]),this}},{key:"appendNewCardsToBoard",value:function(e,t,i){var s=this.board[e];if(!i){var n,a,d,c;if(0===s.length&&"king"!==t[0].rank)return!1;if(this.colorMap[null===(n=s[s.length-1])||void 0===n?void 0:n.type]===this.colorMap[null===t||void 0===t?void 0:t[0].type])return!1;if(s.length>0&&(null===(a=this.ranking)||void 0===a?void 0:a[s[s.length-1].rank])-1!==(null===(d=this.ranking)||void 0===d?void 0:d[null===t||void 0===t||null===(c=t[0])||void 0===c?void 0:c.rank]))return!1}return this.board[e]=[].concat(Object(p.a)(this.board[e]),Object(p.a)(t)),this}},{key:"exposeTopDeck",value:function(e){try{return this.board[e][this.board[e].length-1].hidden=!1,this}catch(t){return console.error(t),this}}},{key:"appendToFinishedDeck",value:function(e,t){var i=this.finishedDeck[t];return(0!==i.length||"ace"===e.rank)&&((!(i.length>0)||i[0].type===e.type&&this.ranking[i[i.length-1].rank]+1===this.ranking[e.rank])&&(this.finishedDeck[t]=[].concat(Object(p.a)(this.finishedDeck[t]),[e]),this))}},{key:"removeOldCardsFromBoard",value:function(e,t,i){return this.board[e].splice(t),this}},{key:"removeCardsFromDeck",value:function(){return this.deckExposed.pop(),this}},{key:"resetDeck",value:function(){return this.deck=this.deckExposed.reverse().map((function(e){return Object(h.a)(Object(h.a)({},e),{},{hidden:!0})})),this.deckExposed=[],this}},{key:"reset",value:function(){}},{key:"getRandomCardFromDeck",value:function(){for(;this.cardsConsidered<53;){var e=Math.floor(13*Math.random()),t=Math.floor(4*Math.random()),i="".concat(e,"-").concat(t);if(!this.cardConsidered[i])return this.cardConsidered[i]=!0,this.cardsConsidered++,{type:this.type[t],rank:this.ranks[e],id:Math.random()}}return!1}}]),e}(),f=(i(16),function(e){Object(a.a)(i,e);var t=Object(d.a)(i);function i(e){var n;Object(s.a)(this,i),n=t.call(this,e);var a=new v;return a.initialize(),n.state={solitare:a,selectedDeckInfo:{deck:null,type:-1,index:-1,top:-1,left:-1}},n.gameboardRef=r.a.createRef(),n.deckInHandRef=r.a.createRef(),n}return Object(n.a)(i,[{key:"componentDidUpdate",value:function(e){e.reset!==this.props.reset&&this.setState({solitare:(new v).initialize(),selectedDeckInfo:{}})}},{key:"deckClicked",value:function(e,t,i,s,n){var a,d;if(null===s||void 0===s||s.preventDefault(),"DECK"!==i||(null===(a=this.state.selectedDeckInfo)||void 0===a?void 0:a.deck))if(null===(d=this.state.selectedDeckInfo)||void 0===d?void 0:d.deck){if("BOARD"===i){var c=Object(h.a)({},this.state.selectedDeckInfo),r=this.state.solitare.appendNewCardsToBoard(n,c.deck,c.deckIndex===n);if(!r)return void this.resetCardInHard();this.setState({solitare:r.exposeTopDeck(c.deckIndex),selectedDeckInfo:{}})}}else{if(e[0].hidden)return;"DECK_EXPOSED"===i?this.setState({selectedDeckInfo:{deck:e,index:t,type:i,e:s,deckIndex:n},solitare:this.state.solitare.removeCardsFromDeck()}):this.setState({selectedDeckInfo:{deck:e,index:t,type:i,e:s,deckIndex:n},solitare:this.state.solitare.removeOldCardsFromBoard(n,t)})}else this.setState({solitare:this.state.solitare.deckToDeckExpose()})}},{key:"onDeckClick",value:function(){var e,t,i;(null===(e=this.state.selectedDeckInfo)||void 0===e?void 0:e.deck)&&"DECK_EXPOSED"===(null===(t=this.state.selectedDeckInfo)||void 0===t?void 0:t.type)&&this.setState({solitare:this.state.solitare.deckToDeckExpose(null===(i=this.state.selectedDeckInfo)||void 0===i?void 0:i.deck[0]),selectedDeckInfo:{}})}},{key:"onEmptyDeckBoard",value:function(e){var t;if(null===(t=this.state.selectedDeckInfo)||void 0===t?void 0:t.deck){var i=Object(h.a)({},this.state.selectedDeckInfo),s=this.state.solitare.appendNewCardsToBoard(e,i.deck,i.deckIndex===e);if(!s)return void this.resetCardInHard();this.setState({solitare:s.exposeTopDeck(i.deckIndex),selectedDeckInfo:{}})}}},{key:"resetCardInHard",value:function(){var e;if(null===(e=this.state.selectedDeckInfo)||void 0===e?void 0:e.deck){var t=Object(h.a)({},this.state.selectedDeckInfo);if("BOARD"===this.state.selectedDeckInfo.type){var i=this.state.solitare.appendNewCardsToBoard(t.deckIndex,t.deck,!0);if(!i)return;this.setState({solitare:i,selectedDeckInfo:{}})}else this.setState({solitare:this.state.solitare.deckToDeckExpose(t.deck[0]),selectedDeckInfo:{}})}}},{key:"componentDidMount",value:function(){var e=this;document.addEventListener("mousemove",(function(t){e.deckInHandRef.current&&(e.deckInHandRef.current.style.top="".concat(t.clientY,"px"),e.deckInHandRef.current.style.left="".concat(t.clientX+10,"px"))}))}},{key:"resetDeck",value:function(){0===this.state.solitare.deck.length&&this.setState({solitare:this.state.solitare.resetDeck()})}},{key:"lastDeckClicked",value:function(e,t,i,s,n){var a,d;if(1===(null===(a=this.state.selectedDeckInfo)||void 0===a||null===(d=a.deck)||void 0===d?void 0:d.length)){var c=Object(h.a)({},this.state.selectedDeckInfo),r=this.state.solitare.appendToFinishedDeck(c.deck[c.deck.length-1],n);if(!r)return void this.resetCardInHard();this.setState({solitare:r.exposeTopDeck(c.deckIndex),selectedDeckInfo:{}})}}},{key:"render",value:function(){var e=this,t=this.state.solitare.board.map((function(t,i){return Object(k.jsx)("div",{className:"board-area",onClick:function(){0===t.length&&e.onEmptyDeckBoard(i)},children:Object(k.jsx)(u,{data:t,deckIndex:i,deckClicked:e.deckClicked.bind(e),type:"BOARD"})},t.id)})),i=this.state.solitare.finishedDeck.map((function(t,i){return Object(k.jsx)("div",{className:"ace",children:t.length>0?Object(k.jsx)(u,{data:t,deckClicked:e.lastDeckClicked.bind(e),zIndex:1.5,type:"DECK_FINISHED",deckIndex:i},i):Object(k.jsx)("p",{onClick:function(){return e.lastDeckClicked(null,null,null,null,i)},children:"Ace"})},i)}));return Object(k.jsxs)("div",{className:"game-board",data:1,children:[this.state.selectedDeckInfo.deck&&Object(k.jsx)("div",{className:"deck-in-hand",ref:this.deckInHandRef,children:Object(k.jsx)(u,{data:this.state.selectedDeckInfo.deck,deckClicked:function(){return null}})}),Object(k.jsxs)("div",{className:"game-board_header",children:[Object(k.jsxs)("div",{className:"deck-stash",children:[Object(k.jsx)("div",{className:"decks",children:this.state.solitare.deck.length>0?Object(k.jsx)(u,{data:this.state.solitare.deck,deckClicked:this.deckClicked.bind(this),zIndex:1.5,type:"DECK"}):Object(k.jsx)("p",{onClick:this.resetDeck.bind(this),children:"Reset Deck"})}),Object(k.jsx)("div",{className:"decks-exposed",onClick:this.onDeckClick.bind(this),children:Object(k.jsx)(u,{data:this.state.solitare.deckExposed,deckClicked:this.deckClicked.bind(this),zIndex:1.5,type:"DECK_EXPOSED"})})]}),Object(k.jsx)("div",{className:"aces",children:i})]}),Object(k.jsx)("div",{className:"game-board_play",children:t})]})}}]),i}(r.a.Component)),b=function(e){Object(a.a)(i,e);var t=Object(d.a)(i);function i(e){var n;return Object(s.a)(this,i),(n=t.call(this,e)).state={reset:0},n}return Object(n.a)(i,[{key:"render",value:function(){var e=this;return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("div",{className:"solitare-header",children:Object(k.jsxs)("div",{children:[Object(k.jsx)("h1",{children:"Solitare"}),Object(k.jsx)("button",{onClick:function(){return e.setState({reset:Math.random()})},children:"Reset"})]})}),Object(k.jsx)(f,{reset:this.state.reset})]})}}]),i}(r.a.Component);l.a.render(Object(k.jsx)(b,{}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.dda81bb0.chunk.js.map