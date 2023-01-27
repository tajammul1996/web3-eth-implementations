const hre = require("hardhat");

async function main() {
  const counter = await hre.ethers.getContractFactory("Counter");
  const deployedCounter = await counter.deploy(5);
  await deployedCounter.deployed();
  console.log("Counter deployed to:", deployedCounter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
