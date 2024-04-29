pragma circom 2.0.0;

/*
 * This circuit template checks that c is the multiplication of a and b.
 *
 * Generate witness:
 * circom isstudent.circom --r1cs --wasm --sym
 */

template IsStudent () {

   // Declaration of signals.
   signal input a;
   signal input b;
   signal output c;

   signal ab;
 
   // Constraints.
   ab <== a * b;
   c <== ab * ab;
}

component main = IsStudent();

/* 
proof.input =  { 
   "a":4,
   "b":5
   }
*/