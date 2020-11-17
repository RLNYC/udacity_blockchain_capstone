var solnSquareContract = artifacts.require('SolnSquareVerifier');
var verifierContract = artifacts.require("Verifier");
var json = require("./proof.json");

contract('Square_verifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const symbol = "PROP721";
    const name = "PropertyToken721";
    const uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";


    // Test if a new solution can be added for contract - SolnSquareVerifier

    describe('Test if a new solution can be added for contract - SolnSquareVerifier', function () {
        beforeEach(async function () {
            const verifier = await verifierContract.new({from: account_one});
            this.contract = await solnSquareContract.new(verifier.address, name, symbol, {from: account_one});

        })

        it('add new solution', async function () {
          let result = await this.contract.addSolution(json.proof.a,json.proof.b,json.proof.c,json.inputs,{from:account_two});
          assert.equal(result.logs[0].args[1], account_two,"Solution-address doesn't match senders adddress");
          try{
            let second = await this.contract.addSolution(json.proof.a,json.proof.b,json.proof.c,json.inputs,{from:account_two});
            throw(second)
          }catch(error){
            assert.equal(error.reason,"Solution exists already","Able to make two identical solutions");
          }
        });
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    


})






