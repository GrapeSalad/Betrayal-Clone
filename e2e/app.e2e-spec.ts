import { HauntedHousePage } from './app.po';

describe('haunted-house App', () => {
  let page: HauntedHousePage;

  beforeEach(() => {
    page = new HauntedHousePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
