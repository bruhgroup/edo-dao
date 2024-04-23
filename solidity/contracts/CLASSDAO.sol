// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "contracts/CLASSKEN.sol";

contract CLASSDAO is CLASSKEN {

    address private immutable PROFESSOR;

    event AWARDED_TOKENS(address student, uint amount);
    event PROPOSAL_SUBMITTED(uint indexed index, address author, string description);
    event PROPOSAL_VOTED(uint indexed index, uint8 numVotes, bool support);

    // Costs 10 tokens to submit a proposal.
    uint8 public immutable PROPOSAL_COST = 10;

    struct Proposal {
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address=>uint8) timesAddressVoted;
    }

    // Holds all proposals.
    Proposal[] public proposals;

    /**
     * To make certain methods professor-only
     */
    modifier onlyProfessor() {
        require(msg.sender == PROFESSOR);
        _;
    }

    /**
     * Professor has no proposal, voting, or vetoing powers, such that the contract can be trusted.
     */
    modifier notProfessor() {
        require(msg.sender != PROFESSOR);
        _;
    }

    constructor() CLASSKEN() {
        // Professor is the contract creator.
        PROFESSOR = msg.sender;
    }

    /**
     * awardTokens allows ONLY professor to award governance tokens to students.
     */
    function awardTokens(address student, uint256 amount) public onlyProfessor {
        // Mints a number of tokens to the student.
        _mint(student, amount);

        emit AWARDED_TOKENS(student, amount);
    }

    /**
     * submitProposal allows a student to submit an PIP (Professor Improvement Proposal).
     */
    function submitProposal(string memory description) public notProfessor {
        _burn(msg.sender, PROPOSAL_COST);

        Proposal storage newProposal = proposals.push();
        newProposal.description = description;

        emit PROPOSAL_SUBMITTED(proposals.length - 1, msg.sender, description);
    }
   
    /**
     * voteProposal allows a student to vote for a proposal.
     * Multiple votes are allowed, but will have quadratic scaling per vote.
     *  i.e. first vote costs 1, second costs 2, ... n^2
     */
     function voteProposal(uint proposalIndex, uint8 numVotes, bool support) public notProfessor {
        require(proposalIndex < proposals.length);
        
        uint8 previousVotes = proposals[proposalIndex].timesAddressVoted[msg.sender];
        uint voteCost = (previousVotes + numVotes)^2 - previousVotes^2;

        _burn(msg.sender, voteCost);
        if (support) {
            proposals[proposalIndex].votesFor += numVotes;
        } else {
            proposals[proposalIndex].votesAgainst += numVotes;
        }

        proposals[proposalIndex].timesAddressVoted[msg.sender] += numVotes;

        emit PROPOSAL_VOTED(proposalIndex, numVotes, support);
    }
}
