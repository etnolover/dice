import { sha256 } from 'js-sha256';

const INITITAL_BALANCE_AMOUNT = 100;
const BET_NUMBER_MIN = 1;
const BET_NUMBER_MAX = 100;
const CHANCE_VALUE_MAX = 100;

export default {
  name: 'Board',
  data: () => ({
    betAmount: null,
    betNumber: null,
    betType: null,
    betResultText: null,
    balanceAmount: INITITAL_BALANCE_AMOUNT,
    randomNumber: null,
    gameProceed: false,
    playerWon: null,
    betHistory: [],
    autoBet: false,
    isHistoryOpened: false,
    numberOfBets: null,
    autoBetType: 'hi',
    autoBetInProcess: false,
  }),

  methods: {
    getRoundedNumber(number) {
      return Math.round(number * 100) / 100;
    },

    getRandomNumber() {
      return Math.floor(BET_NUMBER_MIN + (Math.random() * BET_NUMBER_MAX));
    },

    runGame(type) {
      this.gameProceed = true;
      this.betType = type;
      this.subtractBetAmountFromBalance();
      this.setBetResult();
      this.updateBalance();
      this.randomNumber = this.getRandomNumber();
      this.gameProceed = false;
    },

    setBetResult() {
      if (
        (this.betType === 'hi' && this.randomNumber >= this.betNumber)
        || (this.betType === 'lo' && this.randomNumber <= this.betNumber)
      ) {
        this.betResultText = `${this.randomNumber} WIN`;
        this.playerWon = true;
      } else {
        this.betResultText = `${this.randomNumber} LOSE`;
        this.playerWon = false;
      }
    },

    subtractBetAmountFromBalance() {
      this.balanceAmount -= this.betAmount;
    },

    updateBalance() {
      if (this.playerWon) {
        this.balanceAmount += (this.betAmount * this.winningPayoutRatio);
      }

      localStorage.setItem('balanceAmount', this.balanceAmount);
    },

    updateBalanceWithFreeCredits() {
      this.balanceAmount = INITITAL_BALANCE_AMOUNT;
    },

    autoBetToggle() {
      this.autoBet = !this.autoBet;
    },

    historyToggle() {
      this.isHistoryOpened = !this.isHistoryOpened;
    },
  },

  computed: {
    chanceValueHi() {
      return CHANCE_VALUE_MAX - this.betNumber;
    },

    chanceValueLo() {
      return this.betNumber;
    },

    payoutRatioHi() {
      return this.getRoundedNumber(CHANCE_VALUE_MAX / this.chanceValueHi);
    },

    payoutRatioLo() {
      return this.getRoundedNumber(CHANCE_VALUE_MAX / this.chanceValueLo);
    },

    winningPayoutRatio() {
      return this.betType === 'hi' ? this.payoutRatioHi : this.payoutRatioLo;
    },

    betAmountPlaceholder() {
      if (this.balanceAmount > 0) {
        return `Input number from 1 to ${this.balanceAmount}`;
      }

      return 'Please, get free credits';
    },

    hashedRandomNumber() {
      return sha256(`${this.randomNumber}`);
    },

    isBetButtonsDisabled() {
      return this.gameProceed || !this.betAmount || !this.betNumber;
    },

    autoBetText() {
      return this.autoBet ? 'Stop Auto Bet' : 'Auto Bet';
    },

    isAutoBetBtnDisabled() {
      return this.isBetButtonsDisabled || !this.numberOfBets || this.autoBetInProcess;
    },

    historyBtnText() {
      return this.isHistoryOpened ? 'Hide history' : 'Show history';
    },
  },

  created() {
    this.randomNumber = this.getRandomNumber();

    if ('balanceAmount' in localStorage) {
      this.balanceAmount = +localStorage.getItem('balanceAmount');
    }
  },
};
