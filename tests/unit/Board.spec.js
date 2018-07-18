import { mount } from '@vue/test-utils';
import Board from '@/components/Board/Board.vue';

let wrapper;

describe('Board', () => {
  beforeEach(() => {
    wrapper = mount(Board);
  });

  it('should render Board component', () => {
    const board = wrapper.find('.board');
    expect(board.element).toBeDefined();
  });
});
