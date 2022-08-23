import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Buy Me Coffee", function () {
  let admin: any;
  let donator: any;
  let contract: any;

  /* This is a function that runs before each test case. */
  beforeEach(async function () {
    // getting admin address
    [admin, donator] = await ethers.getSigners();
    const CoffeeContract = await ethers.getContractFactory(
      "Coffee"
    );
    contract = await CoffeeContract.deploy();
    await contract.deployed();
  });

  describe("Buy Coffee", function () {
    /* This is a test case to check for donating funds. */
    it("User Should able to but coffee", async function () {
      const donationAmount = ethers.BigNumber.from("100000000000000000000");
      const donatorName = "John Deo";
      const donatorMsg = "You are awesome!";
      await contract.connect(donator).buyCoffee(donatorName, donatorMsg, { value: donationAmount });
      const getDonation = await contract.getDonation(donator.address);
      expect(getDonation.amount).to.equal(donationAmount);
    });
  });

});
