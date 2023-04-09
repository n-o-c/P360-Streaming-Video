const NFTSubscription = artifacts.require('NFTSubscription');

contract('NFTSubscription', ([admin, user]) => {
  let nftSubscription;

  before(async () => {
    nftSubscription = await NFTSubscription.new({ from: admin });
  });

  it('should be able to mint NFTs', async () => {
    await nftSubscription.mint(user, { from: admin });
    const owner = await nftSubscription.ownerOf(1);
    assert.equal(owner, user, 'NFT minting failed');
  });
});
