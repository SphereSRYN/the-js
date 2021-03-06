'use strict';

/**๐งจ๐ฅ

1. 4->7 => ๊ด์ฐฎ์ผ๋ ์ผ๋จ ํ๋์ฝ๋ฉ. 100%๋ฅผ ์ง์ํ๋ผ.
    1-1. ํ์ํ ๋ณ์ ๋ค ์ ์ฌ.
    1-2. ํ์ํ ํจ์ ๊ป๋ฐ๊ธฐ ์ ์ฌ.
    1-3. ํ์ํ ํจ์ ๊ป๋ฐ๊ธฐ ์์ ํ์ ๊ธฐ๋ฅ ์ ๊ธฐ
    1-4. ๊ธฐ๋ฅ๋ง ๋์๊ฐ๊ฒ ๊ตฌํ.
2. validate -> WIP(๊ณ์์ ์ผ๋ก...)
3. refactoring => ์ง๊ด์ ์ธ ๋ค์ด๋ฐ, ๊ตฌ์กฐํ, ์ค๋ณต์ ๊ฑฐ
    3-1. ์ง๊ด์ ์ด๊ณ  ๋จ์ํ ์ด๋ฆ์ผ๋ก ๋ณ๊ฒฝ.    
    3-2. ์ค๋ณต์์ ์ถ๊ฐํจ์๋ก ๊ตฌํ.

*/

/**  Main Funcs vars*/
const btnRollScore = document.querySelector('.btn--roll');
const btnHoldeScore = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

/** Main elem vars */
const dice = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const scoreP1 = document.querySelector('#score--0');
const scoreP2 = document.querySelector('#score--1');
const currentP1 = document.querySelector('#current--0');
const currentP2 = document.querySelector('#current--1');
let bPlayer, currentPlayer;

const playerList = [
  { holdScore: 0, currentScore: 0 },
  { holdScore: 0, currentScore: 0 },
];

/**
 * 1. Set all Scores to 0
 * 2. Set P1 as starting Player
 */
const init = () => {
  playerList.forEach((player, index) => {
    player.holdScore = 0;
    player.currentScore = 0;
  });

  bPlayer = true; // true = p1, false = p2
  currentPlayer = bPlayer ? playerList[0] : playerList[1];
  scoreP1.innerHTML = 0;
  scoreP2.innerHTML = 0;
  currentP1.innerHTML = 0;
  currentP2.innerHTML = 0;
};

init();

/**  Sub Funcs */
const chngBg = () => {
  // ๋ฐฐ๊ฒฝ๋ณ๊ฒฝ์ ํ์ ๊ธฐ๋ฅ์ผ๋ก ๊ฐ์ฃผ, ๋ด๋ถํจ์๋ก ๋ณ๊ฒฝํจ.
  function checkActive(elem) {
    return elem.classList.contains('player--active');
  }
  function rmvActive(elem) {
    return elem.classList.remove('player--active');
  }
  function addActive(elem) {
    return elem.classList.add('player--active');
  }

  !checkActive(bPlayer ? player1 : player2) &&
    addActive(bPlayer ? player1 : player2);
  checkActive(bPlayer ? player2 : player1) &&
    rmvActive(bPlayer ? player2 : player1);
};

const setCurrentInnerHtml = () => {
  bPlayer
    ? (currentP1.innerHTML = currentPlayer.currentScore)
    : (currentP2.innerHTML = currentPlayer.currentScore);
};

const setCurrentPlayer = () => {
  bPlayer = !bPlayer;
  currentPlayer = bPlayer ? playerList[0] : playerList[1];
  chngBg();
  console.log(`๐น  P changed. ๐ฎ Player is ${bPlayer ? 'P1' : 'P2'}.`);
};

/**     Main Funcs   - func Roll,  func Hold, func New   -                          */

/**
 * 1. randomNum ์์ฑ
 * 2. dice display
 * 3. 1์ฒดํฌ
 *  3-1. randomNum ์ ๋ฆฝ, currentInnerHtml๋ณ๊ฒฝ
 *  3-2. currentScore 0 ์ด๊ธฐํ, currentInnerHtml๋ณ๊ฒฝ, currentPlayer ๋ณ๊ฒฝ.
 */
btnRollScore.addEventListener('click', function () {
  console.log(`๐น  BtnRoll. ๐ฎ Player is ${bPlayer ? 'P1' : 'P2'}.`);
  let randomNum = Math.ceil(Math.random() * 6);
  dice.src = `dice-${randomNum}.png`;
  dice.style.display = 'block';

  if (randomNum !== 1) {
    currentPlayer.currentScore += randomNum;
    setCurrentInnerHtml();
  } else {
    console.log(`๐น  It it One`);
    currentPlayer.currentScore = 0;
    setCurrentInnerHtml();
    setCurrentPlayer();
  }
});

/**
 * 1. hold ๋๋ฅด๋ฉด holdScore ์ ๋ฆฝ
 * 2. scoreInnerHtml์ ์ ๋ฆฝ
 * 3. currentScore ์ด๊ธฐํ
 * 4. CurrentInnerHtml ์ด๊ธฐํ__
 *
 */
btnHoldeScore.addEventListener('click', function () {
  console.log(`๐น  BtnHold. ๐ฎ Player is ${bPlayer ? 'P1' : 'P2'}.`);
  let tempPList = bPlayer ? playerList[0] : playerList[1];
  let tempScore = bPlayer ? scoreP1 : scoreP2;
  let tempCurrent = bPlayer ? currentP1 : currentP2;
  let tempWinner = bPlayer ? player1 : player2;
  tempPList.holdScore += tempPList.currentScore;
  tempScore.innerHTML = tempPList.holdScore;
  tempPList.currentScore = 0;
  tempCurrent.innerHTML = 0;
  console.log(tempPList);
  if (Number(tempPList.holdScore) >= 100) {
    alert('you win');
    dice.style.display = 'none';
    tempWinner.classList.add('player--winner');
    tempWinner.classList.remove('player--active');
  } else setCurrentPlayer();
});

/**  ๊ฒ์ ์ด๊ธฐํ */
btnNewGame.addEventListener('click', init);
