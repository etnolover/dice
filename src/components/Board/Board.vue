<style src="./Board.scss"></style>

<template>
  <section class="board section">
    <div class="container">
      <h1 class="title">Dice game by <a href="https://github.com/etnolover">@etnolover</a></h1>
      <div class="columns">
        <div class="column box is-two-thirds">
          <div class="columns">
            <label class="column label" for="bet_amount">Bet amount:
              <input class="input is-primary" type="number" id="bet_amount">
            </label>
            <label class="column label" for="bet_number">Number:
              <input class="input is-primary" type="number" id="bet_number">
            </label>
          </div>
          <div class="columns">
            <div class="column bet-type">
              <button class="button is-primary is-fullwidth bet-type__btn">Bet Hi</button>
              <div class="bet-type__details has-text-centered">
                <div class="bet-details__number">
                  number &#8805;
                  <span class="bet-details__number-value">25</span>
                </div>
                <div class="bet-details__chance">
                  chance:
                  <span class="bet-details__chance-value">75</span>%
                </div>
                <div class="bet-details__payout">
                  payout:
                  <span class="bet-details__payout-value">1.33</span>x
                </div>
              </div>
            </div>
            <div class="column bet-type">
              <button class="button is-primary is-fullwidth bet-type__btn">Bet Lo</button>
              <div class="bet-type__details has-text-centered">
                <div class="bet-details__number">
                  number &#8804;
                  <span class="bet-details__number-value">25</span>
                </div>
                <div class="bet-details__chance">
                  chance:
                  <span class="bet-details__chance-value">25</span>%
                </div>
                <div class="bet-details__payout">
                  payout:
                  <span class="bet-details__payout-value">4</span>x
                </div>
              </div>
            </div>
          </div>
          <div class="board__game-result box has-text-centered">
            <p class="game-result__title">Result:</p>
            <div class="title is-2 game-result__details">
              <span class="game-result__details-number">64</span>
              <span class="game-result__details-text">Win!</span>
            </div>
          </div>
          <div class="board__game-hash box has-text-centered">
            <p class="game-hash__title">Provable Fair Hash:</p>
            <div class="game-hash__value">
              a5cad04ed170e1d176a5ec3e26077b434184d0d149f33606db4e7366514d0486
            </div>
          </div>
        </div>
        <div class="column box is-one-third">
          <div class="board__balance box">
            <p class="balance__amount">
              Balance:
              <span class="balance__amount-number">100</span>
              credits
            </p>
            <button class="board-balance__add-credits button is-warning is-fullwidth">
              Free credits
            </button>
          </div>
          <div class="box">
            <h4 class="title is-5 has-text-centered card-title">Betting Bot</h4>
            <label class="label" for="bets_number">Number of bets:
              <input class="input is-info" type="number" id="bets_number">
            </label>
            <label class="checkbox" for="martingale">
              <input type="checkbox" id="martingale">
              Martingale strategy
            </label>
            <button
              class="board-bot__btn board-bot__btn_run button is-info is-fullwidth">
              Auto Bet
            </button>
            <button
              class="board-bot__btn board-bot__btn_history button is-info is-fullwidth is-inverted">
              Show history
            </button>
          </div>
        </div>
      </div>
      <div class="box bet-history-box">
        <div class="table is-bordered is-striped is-fullwidth bet-history-table">
          <caption class="history-table__caption">Bet History</caption>
          <thead>
            <tr>
              <th>№</th>
              <th>Bet Amount</th>
              <th>Result</th>
              <th>Provably Fair Hash</th>
              <th>Running Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>50</td>
              <td>64 Win!</td>
              <td>a5cad04ed170e1d176a5ec3e26077b434184d0d149f33606db4e7366514d0486</td>
              <td>100</td>
            </tr>
            <tr>
              <td>2</td>
              <td>50</td>
              <td>64 Win!</td>
              <td>a5cad04ed170e1d176a5ec3e26077b434184d0d149f33606db4e7366514d0486</td>
              <td>150</td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./Board.js"></script>
