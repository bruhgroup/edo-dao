import { groth16 } from "snarkjs";

export async function generateZkProof(input: string[]) {
  const inputs = {
    in: input,
    hash: process.env.NEXT_PUBLIC_ZK_HASH!,
  };

  console.log("zkproof", { inputs });

  const wasmFile = "proof/isstudent.wasm";
  const zkeyFile = "proof/isstudent_final.zkey";

  try {
    const { proof, publicSignals } = await groth16.fullProve(
      inputs,
      wasmFile,
      zkeyFile,
    );

    console.log("zkproof", { proof, publicSignals });

    const calldataBlob = await groth16.exportSolidityCallData(
      proof,
      publicSignals,
    );
    const calldata = JSON.parse(`[${calldataBlob}]`);

    console.log("zkproof", { calldata });

    return {
      a: calldata[0],
      b: calldata[1],
      c: calldata[2],
      publicSignals: calldata[3],
    };
  } catch (err) {
    console.log("zkproof", err);
    return null;
  }
}
