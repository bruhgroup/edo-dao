// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "contracts/EDOKEN.sol";

contract EDAO is EDOKEN {

    address private immutable EDO;

    event AWARDED_TOKENS(address student, uint amount);
    event PROPOSAL_SUBMITTED(uint indexed index, address author, string description);
    event PROPOSAL_VOTED(uint indexed index, uint8 numVotes, bool support);

    uint8 immutable ProposalCost = 10;

    struct Proposal {
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address=>uint8) timesVoted;
    }

    Proposal[] public proposals;

    modifier onlyEDO() {
        require(msg.sender == EDO);
        _;
    }

    /**
     * Edo has no proposal, voting, or vetoing powers, such that the contract can be trusted.
     */
    modifier noEDO() {
        require(msg.sender != EDO);
        _;
    }

    constructor(uint _initialSupply) EDOKEN() {
        // Mints a fixed supply of governence tokens.
        _mint(address(this), _initialSupply);
        EDO = msg.sender;
    }

    /**
     * awardTokens allows Edo to award governance tokens to students.
     */
    function awardTokens(address student, uint256 amount) public onlyEDO {
        // This should transfer from Edo's wallet to yours.
        _mint(student, amount);

        emit AWARDED_TOKENS(student, amount);
    }

    /**
     * submitProposal allows a student to submit an EIP (Edo Improvement Proposal).
     */
    function submitProposal(string memory description) public noEDO {
        _burn(msg.sender, ProposalCost);

        Proposal storage newProposal = proposals.push();
        newProposal.description = description;

        emit PROPOSAL_SUBMITTED(proposals.length - 1, msg.sender, description);
    }
   
    /**
     * voteProposal allows a student to vote for a proposal.
     * Multiple votes are allowed, but will have quadratic scaling per vote.
     *  i.e. first vote costs 1, second costs 2, ... n^2
     */
     function voteProposal(uint proposalIndex, uint8 numVotes, bool support) public noEDO {
        require(proposalIndex < proposals.length);
        
        uint8 previousVotes = proposals[proposalIndex].timesVoted[msg.sender];
        uint voteCost = (previousVotes + numVotes)^2 - previousVotes^2;

        _burn(msg.sender, voteCost);
        if (support) {
            proposals[proposalIndex].votesFor += numVotes;
        } else {
            proposals[proposalIndex].votesAgainst += numVotes;
        }

        proposals[proposalIndex].timesVoted[msg.sender] += numVotes;

        emit PROPOSAL_VOTED(proposalIndex, numVotes, support);
    }
}
