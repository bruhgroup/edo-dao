// import { deploy } from './ethers-lib'
// import { Contract, utils } from 'ethers'
//
// let provider;
// let result;
// (async () => {
//   try {
//     result = await deploy('EDAO', [100000])
//     provider = result.provider;
//     console.log("Contract deployed successfully");
//     console.log(`Contract address: ${result.address}`)
//   } catch (e) {
//     console.log(e.message)
//   }
// })()
// .then(() => {
//     let abi = [
//       "event AWARDED_TOKENS(address indexed student, uint amount)",
//       "event PROPOSAL_SUBMITTED(uint indexed index, address author, string description)",
//       "event PROPOSAL_VOTED(uint indexed index, uint8 numVotes, bool support)"
//     ];
//
//     let contract = new Contract(result.address, abi, provider);
//
//     // Event listeners
//     contract.on("AWARDED_TOKENS", (student, amount) => {
//       console.log("AWARDED_TOKENS event received:");
//       console.log("Student:", student);
//       console.log("Amount:", amount);
//     });
//
//     contract.on("PROPOSAL_SUBMITTED", (index, author, description) => {
//       console.log("PROPOSAL_SUBMITTED event received:");
//       console.log("Index:", index);
//       console.log("Author:", author);
//       console.log("Description:", description);
//     });
//
//     contract.on("PROPOSAL_VOTED", (index, numVotes, support) => {
//       console.log("PROPOSAL_VOTED event received:");
//       console.log("Index:", index);
//       console.log("Number of Votes:", numVotes);
//       console.log("Support:", support);
//     });
//
// });
