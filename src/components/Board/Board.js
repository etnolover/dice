import { sha256 } from 'js-sha256';

const INITITAL_BALANCE_AMOUNT = 100;
const BET_NUMBER_MIN = 1;
const BET_NUMBER_MAX = 100;
const CHANCE_VALUE_MAX = 100;
const CHANCE_VALUE_MIN = 0;
const PAYOUT_RATIO_MAX = 100;

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
    isHistoryOpened: false,
    numberOfBets: null,
    autoBetType: 'hi',
    autoBetInProcess: false,
    isMartingale: false,
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
      this.addGameDetailsToHistory();
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

    runAutoBet() {
      this.clearBetHistory();
      this.autoBetInProcess = true;

      let numberOfBetsLeft = this.numberOfBets;

      while (numberOfBetsLeft > 0) {
        if (this.isBalanceInsufficient) {
          break;
        }

        this.runGame(this.autoBetType);

        if (this.isMartingale && !this.playerWon) {
          this.betAmount *= 2;
        }

        numberOfBetsLeft -= 1;
      }

      this.autoBetInProcess = false;
    },

    historyToggle() {
      this.isHistoryOpened = !this.isHistoryOpened;
    },

    addGameDetailsToHistory() {
      this.betHistory.push({
        amount: this.betAmount,
        result: this.betResultText,
        hash: this.hashedRandomNumber,
        runningTotal: this.balanceAmount,
      });
    },

    clearBetHistory() {
      this.betHistory = [];
    },
  },

  computed: {
    chanceValueHi() {
      const actualChance = CHANCE_VALUE_MAX - this.betNumber;
      return (actualChance < CHANCE_VALUE_MIN) ? CHANCE_VALUE_MIN : actualChance;
    },

    chanceValueLo() {
      return (this.betNumber > CHANCE_VALUE_MAX) ? CHANCE_VALUE_MAX : this.betNumber;
    },

    payoutRatioHi() {
      const actualRatio = this.getRoundedNumber(CHANCE_VALUE_MAX / this.chanceValueHi);
      return (actualRatio > PAYOUT_RATIO_MAX) ? PAYOUT_RATIO_MAX : actualRatio;
    },

    payoutRatioLo() {
      const actualRatio = this.getRoundedNumber(CHANCE_VALUE_MAX / this.chanceValueLo);
      return (actualRatio > PAYOUT_RATIO_MAX) ? PAYOUT_RATIO_MAX : actualRatio;
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

    isBalanceInsufficient() {
      return this.balanceAmount < this.betAmount;
    },

    autoBetText() {
      return this.autoBetInProcess ? 'Bet in process' : 'Auto Bet';
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
