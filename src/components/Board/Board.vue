<style src="./Board.scss"></style>

<template>
  <section class="board section">
    <div class="container">
      <h1 class="title">Dice game by <a href="https://github.com/etnolover">@etnolover</a></h1>
      <div class="columns">
        <div class="column box is-two-thirds">
          <div class="columns">
            <label class="column label" for="bet_amount">Bet amount:
              <input
                v-model.number="betAmount"
                class="input is-primary"
                type="number"
                :max="balanceAmount"
                id="bet_amount"
                :placeholder="betAmountPlaceholder"
                @change="validateBetAmount">
                <span
                  v-if="errors.betAmount"
                  class="help is-danger"
                  v-text="betAmountError">
                </span>
            </label>
            <label class="column label" for="bet_number">Number:
              <input
                v-model.number="betNumber"
                class="input is-primary"
                type="number"
                min="1"
                max="100"
                id="bet_number"
                placeholder="Input number from 1 to 100">
                <span
                  v-if="errors.betNumber"
                  class="help is-danger"
                  v-text="betNumberError">
                </span>
            </label>
          </div>
          <div class="columns">
            <div class="column bet-type">
              <button
                class="button is-primary is-fullwidth bet-type__btn"
                @click="runGame('hi')"
                :disabled="isBetButtonsDisabled">
                Bet Hi
              </button>
              <div
                v-show="betNumber"
                class="bet-type__details has-text-centered">
                <div class="bet-details__number">
                  number &#8805;
                  <span
                    class="bet-details__number-value"
                    v-text="betNumber">
                  </span>
                </div>
                <div class="bet-details__chance">
                  chance:
                  <span
                    class="bet-details__chance-value"
                    v-text="chanceValueHi">
                  </span>%
                </div>
                <div class="bet-details__payout">
                  payout:
                  <span
                    class="bet-details__payout-value"
                    v-text="payoutRatioHi">
                  </span>x
                </div>
              </div>
            </div>
            <div class="column bet-type">
              <button
                class="button is-primary is-fullwidth bet-type__btn"
                @click="runGame('lo')"
                :disabled="isBetButtonsDisabled">
                Bet Lo
              </button>
              <div
                v-show="betNumber"
                class="bet-type__details has-text-centered">
                <div class="bet-details__number">
                  number &#8804;
                  <span
                    class="bet-details__number-value"
                    v-text="betNumber">
                  </span>
                </div>
                <div class="bet-details__chance">
                  chance:
                  <span
                    class="bet-details__chance-value"
                    v-text="chanceValueLo"></span>%
                </div>
                <div class="bet-details__payout">
                  payout:
                  <span
                    class="bet-details__payout-value"
                    v-text="payoutRatioLo">
                  </span>x
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="betResultText"
            class="board__game-result box has-text-centered">
            <p class="game-result__title">Result:</p>
            <div
              class="title is-2 game-result__details"
              v-text="betResultText">
            </div>
          </div>
          <div class="board__game-hash box has-text-centered">
            <p class="game-hash__title">Provable Fair Hash:</p>
            <div
              class="game-hash__value"
              v-text="hashedRandomNumber">
            </div>
          </div>
        </div>
        <div class="column box is-one-third">
          <div class="board__balance box">
            <p class="balance__amount">
              Balance:
              <span
                class="balance__amount-number"
                v-text="balanceAmount">
              </span>
              credits
            </p>
            <button
              class="board-balance__add-credits button is-warning is-fullwidth"
              @click="updateBalanceWithFreeCredits"
              :disabled="!!balanceAmount">
              Free credits
            </button>
          </div>
          <div class="box">
            <h4 class="title is-5 has-text-centered card-title">Betting Bot</h4>
            <label class="label" for="bets_number">Number of bets:
              <input
                class="input is-info"
                type="number"
                id="bets_number"
                min="1"
                v-model="numberOfBets">
            </label>
            <div class="auto-bet__type-container">
              <label class="auto-bet__type-label" for="auto_bet_hi">
                <input
                  class="auto-bet__type-input"
                  name="auto-bet-type"
                  type="radio"
                  id="auto_bet_hi"
                  value="hi"
                  v-model="autoBetType">
                Auto bet Hi
              </label>
              <label class="auto-bet__type-label" for="auto_bet_lo">
                <input
                  class="auto-bet__type-input"
                  name="auto-bet-type"
                  type="radio"
                  id="auto_bet_lo"
                  value="lo"
                  v-model="autoBetType">
                Auto bet Lo
              </label>
            </div>
            <label class="checkbox" for="martingale">
              <input
                v-model="isMartingale"
                type="checkbox"
                id="martingale">
              Martingale strategy
            </label>
            <button
              class="board-bot__btn board-bot__btn_run button is-info is-fullwidth"
              :class="{'is-danger': autoBetInProcess}"
              v-text="autoBetText"
              @click="runAutoBet"
              :disabled="isAutoBetBtnDisabled">
            </button>
            <button
              class="board-bot__btn board-bot__btn_history button is-info is-fullwidth is-inverted"
              v-text="historyBtnText"
              @click="historyToggle">
            </button>
          </div>
        </div>
      </div>
      <div
        v-show="isHistoryOpened"
        class="box bet-history-box">
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
            <tr v-for="(game, index) in betHistory" :key="index">
              <td v-text="index + 1"></td>
              <td v-text="game.amount"></td>
              <td v-text="game.result"></td>
              <td v-text="game.hash"></td>
              <td v-text="game.runningTotal"></td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./Board.js"></script>
