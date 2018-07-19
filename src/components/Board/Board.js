import { sha256 } from 'js-sha256';

const INITITAL_BALANCE_AMOUNT = 100;
const BET_NUMBER_MIN = 1;
const BET_NUMBER_MAX = 100;

export default {
  name: 'Board',
  data: () => ({
    betAmount: null,
    betNumber: null,
    betType: null,
    betResultText: null,
    balanceAmount: INITITAL_BALANCE_AMOUNT,
    randomNumber: null,
  }),

  methods: {
    getRoundedNumber(number) {
      return Math.round(number * 100) / 100;
    },

    getRandomNumber() {
      return Math.floor(BET_NUMBER_MIN + (Math.random() * BET_NUMBER_MAX));
    },
  },

  computed: {
    chanceValueHi() {
      return 100 - this.betNumber;
    },

    chanceValueLo() {
      return this.betNumber;
    },

    payoutRatioHi() {
      return this.getRoundedNumber(100 / this.chanceValueHi);
    },

    payoutRatioLo() {
      return this.getRoundedNumber(100 / this.chanceValueLo);
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
      return !this.betAmount || !this.betNumber;
    },
  },

  created() {
    this.randomNumber = this.getRandomNumber();
  },
};
