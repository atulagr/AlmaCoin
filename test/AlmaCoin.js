const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Alma Coin", function () {
  let almaCoin, owner, addr1, addr2;

  const NAME = "Alma Coin";
  const SYMBOL = "ABC";
  const DECIMALS = 18;
  const TOTAL_SUPPLY = ethers.utils.parseEther("1000"); //wei 1000*10**18 wei

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    AlmaCoin = await ethers.getContractFactory("AlmaCoin");
    almaCoin = await AlmaCoin.deploy(NAME, SYMBOL, DECIMALS, TOTAL_SUPPLY);
  });

  it("should have correct name, symbol, decimals, and total supply", async function () {
    expect(await almaCoin.name()).to.equal(NAME);
    expect(await almaCoin.symbol()).to.equal(SYMBOL);
    expect(await almaCoin.decimals()).to.equal(DECIMALS);
    expect(await almaCoin.totalSupply()).to.equal(TOTAL_SUPPLY);
  });

  it("should have correct balance after transfer", async function () {
    const transferAmount = ethers.utils.parseEther("100");
    await almaCoin.transfer(addr1.address, transferAmount);
    expect(await almaCoin.balanceOf(owner.address)).to.equal(
      TOTAL_SUPPLY.sub(transferAmount)
    );
    expect(await almaCoin.balanceOf(addr1.address)).to.equal(transferAmount);
  });

  it("should emit Transfer event on transfer", async function () {
    const transferAmount = ethers.utils.parseEther("100");
    await expect(almaCoin.transfer(addr1.address, transferAmount))
      .to.emit(almaCoin, "Transfer")
      .withArgs(owner.address, addr1.address, transferAmount);
  });

  it("should allow approved spender to transferFrom", async function () {
    const transferAmount = ethers.utils.parseEther("100");
    await almaCoin.approve(addr1.address, transferAmount);
    await almaCoin
      .connect(addr1)
      .transferFrom(owner.address, addr2.address, transferAmount);
    expect(await almaCoin.balanceOf(owner.address)).to.equal(
      TOTAL_SUPPLY.sub(transferAmount)
    );
    expect(await almaCoin.balanceOf(addr2.address)).to.equal(transferAmount);
  });

  it("should emit Approval and Transfer events on transferFrom", async function () {
    const transferAmount = ethers.utils.parseEther("100");
    await expect(almaCoin.connect(owner).approve(addr1.address, transferAmount))
      .to.emit(almaCoin, "Approval")
      .withArgs(owner.address, addr1.address, transferAmount);
    await expect(
      almaCoin
        .connect(addr1)
        .transferFrom(owner.address, addr2.address, transferAmount)
    )
      .to.emit(almaCoin, "Transfer")
      .withArgs(owner.address, addr2.address, transferAmount);
  });
});
