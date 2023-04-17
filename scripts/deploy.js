const { ethers } = require("hardhat");

async function main() {
  // Compile the contract
  const AlmaCoin = await ethers.getContractFactory("AlmaCoin");

  // Deploy the contract
  const almaCoin = await AlmaCoin.deploy(
    "Alma Coin",
    "ABC",
    18,
    ethers.utils.parseEther("10000")
  );

  console.log("Token deployed to:", almaCoin.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0xDBe5d5656Ad61392BA5dc61c36ddcae27c59364B
