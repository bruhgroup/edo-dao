pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/comparators.circom";

/*
 * This circuit template checks whether the challenger is a student or not.
 * Challenger provides 3 numbers, and these numbers should match the hash.
 */

template IsStudent () {
   signal input in[3];
   signal input hash;

   component poseidon = Poseidon(3);
   poseidon.inputs <== in;

   hash === poseidon.out;
}

component main { public [hash] } = IsStudent();
