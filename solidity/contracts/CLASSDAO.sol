// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CLASSKEN.sol";
import "./Groth16Verifier.sol";

contract CLASSDAO is CLASSKEN {

    address public immutable professor;

    event AWARDED_TOKENS(address student, uint256 amount);
    event PROPOSAL_SUBMITTED(uint256 indexed index, address author, string title, string description);
    event PROPOSAL_VOTED(uint256 indexed index, uint256 numVotes, bool support);
    event STUDENT_VERIFIED(address student, bool result);
    event EVALUATION_SUBMITTED(string feedback);

    // Costs 10 tokens to submit a proposal.
    uint8 public immutable PROPOSAL_COST = 10;

    struct Proposal {
        string title;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => uint256) timesAddressVoted;
    }

    // Holds all proposals.
    Proposal[] public proposals;

    // Student Verification
    mapping(address => bool) public verifiedStudents;
    Groth16Verifier public verifier;

    // Holds all course evaluations
    string[] public evaluations;

    /**
     * To make certain methods professor-only
     */
    modifier onlyProfessor() {
        require(msg.sender == professor, "must be professor");
        _;
    }

    /**
     * Professor has no proposal, voting, or vetoing powers, such that the contract can be trusted.
     */
    modifier notProfessor() {
        require(msg.sender != professor, "cannot be professor");
        _;
    }

    modifier onlyStudents() {
        require(verifiedStudents[msg.sender], "student status not verified");
        _;
    }

    constructor() CLASSKEN() {
        // Professor is the contract creator.
        professor = msg.sender;
        verifier = new Groth16Verifier();
    }

    /**
     * totalProposals returns the total number of proposals submitted.
     */
    function totalProposals() public view returns (uint256) {
        return proposals.length;
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
    function submitProposal(string memory title, string memory description) public notProfessor {
        _burn(msg.sender, PROPOSAL_COST);

        Proposal storage newProposal = proposals.push();
        newProposal.title = title;
        newProposal.description = description;

        emit PROPOSAL_SUBMITTED(proposals.length - 1, msg.sender, title, description);
    }

    /**
     * voteProposal allows a student to vote for a proposal.
     * Multiple votes are allowed, but will have quadratic scaling per vote.
     *  i.e. first vote costs 1, second costs 2, ... n^2
     */
    function voteProposal(uint256 proposalIndex, uint256 numVotes, bool support) public notProfessor {
        require(proposalIndex < proposals.length);

        uint256 previousVotes = proposals[proposalIndex].timesAddressVoted[msg.sender];
        uint256 voteCost = (previousVotes + numVotes) ** 2 - previousVotes ** 2;

        _burn(msg.sender, voteCost);
        if (support) {
            proposals[proposalIndex].votesFor += numVotes;
        } else {
            proposals[proposalIndex].votesAgainst += numVotes;
        }

        proposals[proposalIndex].timesAddressVoted[msg.sender] += numVotes;

        emit PROPOSAL_VOTED(proposalIndex, numVotes, support);
    }

    /**
     * This verifies a student, and verifies the calldata if student has not yet been verified.
     */
    function verifyStudent(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[5] calldata _pubSignals) public notProfessor returns (bool) {
        // Sender not yet verified (all are false by default)
        if (!verifiedStudents[msg.sender]) {
            bool result = verifier.verifyProof(_pA, _pB, _pC, _pubSignals);
            require(result, "invalid proof");

            verifiedStudents[msg.sender] = result;

            emit STUDENT_VERIFIED(msg.sender, result);
        }

        return verifiedStudents[msg.sender];
    }

    /**
     * This submits a course evaluation for the class, given that they are verified student and not the professor.
     */
    function submitCourseEvaluation(string memory feedback) public notProfessor onlyStudents {
        require(bytes(feedback).length > 0, "empty feedback string submitted");

        evaluations.push(feedback);

        emit EVALUATION_SUBMITTED(feedback);
    }
}
