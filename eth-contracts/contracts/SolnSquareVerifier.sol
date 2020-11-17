pragma solidity >=0.5.2 <0.6.0;

import "./ERC721Mintable.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is MyERC721PropertyToken {

    Verifier private verifierContract;

    constructor(address verifierAddress, string memory name, string memory symbol)
        MyERC721PropertyToken(name, symbol)
        public
    {
      verifierContract = Verifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 solutionIndex;
        address solutionAddress;
        bool solutionExists;
        bool minted;
    }


    // TODO define an array of the above struct
    uint256 public numberOfSolutions = 0;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) public solutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 solutionIndex, address indexed solutionAddress);



    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
      public
    {
      bytes32 solutionHash = keccak256(abi.encodePacked(input[0], input[1]));
      require(solutions[solutionHash].solutionExists == false, "Solution already exists");

      bool verified = verifierContract.verifyTx(a,b,c, input);
      require(verified, "Solution could not be verified");


      solutions[solutionHash] = Solution(numberOfSolutions,msg.sender,true,false);

      emit SolutionAdded(numberOfSolutions, msg.sender);
      numberOfSolutions+=1;
    }



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly



}




  


// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract Verifier {
    function verifyTx(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
        public
        returns (bool r);
}























