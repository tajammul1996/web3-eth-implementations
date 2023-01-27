const { expect } = require("chai");
const hre = require("hardhat")

describe("Counter", function() {
    it("Should deploy the contract", async function() {
        const counter = await hre.ethers.getContractFactory("Counter")
        // console.log(counter)
        const contract = await counter.deploy(2)

        await contract.deployed()

        const currentCount = await contract.count()

        console.log(currentCount)
        expect(currentCount).to.eq(2)
    })
})