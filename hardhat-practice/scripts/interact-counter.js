const hre = require("hardhat")

async function main() {
    const DEPLOYED_ADDRESS="0x07423F36BFc769C3deC50939aA944CC122cebe74";
    const abi = require("../artifacts/contracts/Counter.sol/Counter.json").abi;

    const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, hre.ethers.provider)

    const contract = new hre.ethers.Contract(DEPLOYED_ADDRESS, abi, signer);
    const currentCount = await contract.count();

    console.log("Current count:", currentCount.toString());

    const tx = await contract.decrement();
    await tx.wait();

    const newCount = await contract.count();
    console.log("New count:", newCount.toString());



}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }
);
