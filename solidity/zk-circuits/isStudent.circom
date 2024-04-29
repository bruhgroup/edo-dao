pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

/*
 * This circuit template checks whether the challenger is a student or not.
 * Challenger provides 4 numbers, and these numbers should match the hash.
 */

template IsStudent () {
   signal input in[4];
   signal output out[5];

   component poseidon = PoseidonEx(4, 5);
   poseidon.initialState <== 0;

   poseidon.inputs <== in;
   out <== poseidon.out;
}

component main = IsStudent();
