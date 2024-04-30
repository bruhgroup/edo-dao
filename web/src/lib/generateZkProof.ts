import { groth16 } from "snarkjs";

export async function generateZkProof(input: string[]) {
  const inputs = {
    in: input,
  };

  console.log({ inputs });

  const wasmFile = "proof/isstudent.wasm";
  const zkeyFile = "proof/isstudent_final.zkey";

  try {
    const { proof, publicSignals } = await groth16.fullProve(
      inputs,
      wasmFile,
      zkeyFile,
    );

    console.log({ proof, publicSignals });

    const calldataBlob = await groth16.exportSolidityCallData(
      proof,
      publicSignals,
    );
    const calldata = JSON.parse(`[${calldataBlob}]`);

    console.log({ calldata });

    return {
      a: calldata[0],
      b: calldata[1],
      c: calldata[2],
      publicSignals: calldata[3],
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
