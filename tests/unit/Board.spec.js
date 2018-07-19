import { mount } from '@vue/test-utils';
import Board from '@/components/Board/Board.vue';

const localStorageMock = (function localStorageMock() {
  const store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
  };
}());

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockData = {
  betAmount: 100,
  betNumber: 20,
  randomNumber: 30,
};

const mockDataWithError = {
  betAmount: 1000,
  betNumber: 20,
  balanceAmount: 100,
};

const HASHED_73 = '96061e92f58e4bdcdee73df36183fe3ac64747c81c26f6c83aada8d2aabb1864';

let wrapper;

describe('Board', () => {
  beforeEach(() => {
    wrapper = mount(Board);
  });

  it('should render Board component', () => {
    const board = wrapper.find('.board');
    expect(board.element).toBeDefined();
  });

  it('should correctly display game result', () => {
    wrapper.setData(mockData);
    const betHiBtn = wrapper.find('.bet-type__btn');

    betHiBtn.trigger('click');

    expect(wrapper.vm.betResultText).toBe('30 WIN');
  });

  it('should correctly display hash', () => {
    wrapper.setData({ randomNumber: 73 });
    expect(wrapper.vm.hashedRandomNumber).toBe(HASHED_73);
  });

  it('show amount error if bet amount more than balance amount', () => {
    wrapper.setData(mockDataWithError);
    const { errors } = wrapper.vm;
    expect(errors.betAmount).toBeTruthy();
    expect(errors.betNumber).toBeFalsy();
  });
});
