var ERC721MintableComplete = artifacts.require('MyERC721PropertyToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const symbol = "PROP721";
    const name = "PropertyToken721";
    const n = 5; // index of last token id => total number of tokens is 6

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});

            // TODO: mint multiple tokens
            for (let i =0; i<=n; i++){
                let status = await this.contract.mint(account_two, i, {from: account_one});
            }       
        })

        it('should return total supply', async function () { 
            let amount = await this.contract.totalSupply();
            assert.equal(parseInt(amount),n+1,"Incorrect token amount for total supply");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(parseInt(balance), n+1, "Incorrect token balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri_1 = await this.contract.tokenURI.call(1);
            assert.equal(uri_1,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1","Incorrect uri");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two,account_three,1,{from:account_two});
            let ownerAddress = await this.contract.ownerOf(1);
            assert.equal(ownerAddress,account_three,"Incorrect token transfer");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let status;
            try{
                status = await this.contract.mint(account_two,8,{from:account_two});
              }catch(e){
                status = false;
              }

            assert.equal(status,false,"Incorrect: Only contract owner is able to mint tokens");
            
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, account_one,"Owner is not correct");
        })

    });

    describe('Able to transfer tokens', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});

            try{
            // TODO: mint multiple tokens
                for (let i =0; i<=n; i++){
                    let status = await this.contract.mint(account_two, i, {from: account_one});
                }    
            }catch(e){
                console.log("Fail to mint token");
            }
        })


        it('Able to approve an operator for all tokens transfer', async function () { 

            await this.contract.setApprovalForAll(account_three, true, {from: account_two});
            let result = await this.contract.isApprovedForAll.call(account_two, account_three);
            assert.equal(result, true,"Fail to approve operator for all token transfer");
        })

        it('Operator is able to transfer a token', async function () { 

            await this.contract.setApprovalForAll(account_three, true, {from: account_two});

            await this.contract.transferFrom(account_two, account_four, 0, {from: account_three});

            let ownerAddress = await this.contract.ownerOf(0);

            assert.equal(ownerAddress, account_four,"Operator fails to transfer token");
        })

    });
})