import {Contract, ethers} from 'ethers'
const contract = (async () => {
    let provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const Proposal = "(string description, uint256 votesFor, uint256 votesAgainst, mapping(address=>uint8) timesVoted)"
    let abi = [
        "event AWARDED_TOKENS(address indexed student, uint amount)",
        "event PROPOSAL_SUBMITTED(uint indexed index, address author, string description)",
        "event PROPOSAL_VOTED(uint indexed index, uint8 numVotes, bool support)",
        "function proposals(uint256) view returns (string, uint256, uint256)"
    ];

    let contract = new Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", abi, provider);
// Event listeners
    contract.on("AWARDED_TOKENS", (student, amount) => {
        console.log("AWARDED_TOKENS event received:");
        console.log("Student:", student);
        console.log("Amount:", amount);
    });

    contract.on("PROPOSAL_SUBMITTED", (index, author, description) => {
        console.log("PROPOSAL_SUBMITTED event received:");
        console.log("Index:", index);
        console.log("Author:", author);
        console.log("Description:", description);
    });

    contract.on("PROPOSAL_VOTED", (index, numVotes, support) => {
        console.log("PROPOSAL_VOTED event received:");
        console.log("Index:", index);
        console.log("Number of Votes:", numVotes);
        console.log("Support:", support);
    });

    return contract;
})();

export default contract;
