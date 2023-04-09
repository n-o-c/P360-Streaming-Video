const CreditToken = artifacts.require('CreditToken');

contract('CreditToken', ([admin, user]) => {
  let creditToken;

  before(async () => {
    creditToken = await CreditToken.new({ from: admin });
  });

  it('should be able to mint tokens', async () => {
    const amount = 100;
    await creditToken.mint(user, amount, { from: admin });
    const balance = await creditToken.balanceOf(user);
    assert.equal(balance.toNumber(), amount, 'Token minting failed');
  });
});
