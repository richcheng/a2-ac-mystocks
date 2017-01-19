import { A2AcMystocksPage } from './app.po';

describe('a2-ac-mystocks App', function() {
  let page: A2AcMystocksPage;

  beforeEach(() => {
    page = new A2AcMystocksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
