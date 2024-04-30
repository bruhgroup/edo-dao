# Generating the Proof

- https://github.com/iden3/snarkjs

Create circuit
- `circom isstudent.circom --r1cs --wasm --sym`

```
template instances: 71
non-linear constraints: 261
linear constraints: 0
public inputs: 1
private inputs: 3
public outputs: 0
wires: 265
labels: 939
Written successfully: .\isstudent.r1cs
Written successfully: .\isstudent.sym
Written successfully: .\isstudent_js\isstudent.wasm
Everything went okay
```

Generate witness
- `node ./isstudent_js/generate_witness.js ./isstudent_js/isstudent.wasm input.json witness.wtns`

Download Phase-1 `.ptau`, choosing a file with points > number of constraints.
- https://github.com/privacy-scaling-explorations/perpetualpowersoftau?tab=readme-ov-file#prepared-and-truncated-files
- Since our constraints = 297, choose [ppot_0080_09](https://pse-trusted-setup-ppot.s3.eu-central-1.amazonaws.com/pot28_0080/ppot_0080_09.ptau)

Can also check info
- `npx snarkjs r1cs info isstudent.r1cs`

```
[INFO]  snarkJS: Curve: bn-128
[INFO]  snarkJS: # of Wires: 265
[INFO]  snarkJS: # of Constraints: 261
[INFO]  snarkJS: # of Private Inputs: 3
[INFO]  snarkJS: # of Public Inputs: 1
[INFO]  snarkJS: # of Labels: 939
[INFO]  snarkJS: # of Outputs: 0
```

Generate `.zkey` file
- `npx snarkjs groth16 setup isstudent.r1cs ppot_0080_09.ptau isstudent_0000.zkey`
```
[INFO]  snarkJS: Reading r1cs
[INFO]  snarkJS: Reading tauG1
[INFO]  snarkJS: Reading tauG2
[INFO]  snarkJS: Reading alphatauG1
[INFO]  snarkJS: Reading betatauG1
[INFO]  snarkJS: Circuit hash: 
                c300c6d4 ab8b9862 00209675 04922b67
                2fe8f1a0 348b7982 0bf66b2d 3af2c282
                14370824 8c23484e ebfe8d36 bd419369
                76f6fbd3 d662eb34 55242708 3c00bca0
```

Contribute to phase 2 ceremony. Repeat this as many times needed for more entropy (increase zkey indexes)
- `npx snarkjs zkey contribute isstudent_0000.zkey isstudent_0001.zkey --name="1st Contributor Name" -v`

```
> npx snarkjs zkey contribute isstudent_0000.zkey isstudent_0001.zkey --name="1st Contributor Name" -v
Enter a random text. (Entropy): ty8934aztyj78924nty78934nyt78weyg89onw34gh9erw8ngh8ersg
[DEBUG] snarkJS: Applying key: L Section: 0/263
[DEBUG] snarkJS: Applying key: H Section: 0/512
[INFO]  snarkJS: Circuit Hash: 
                c300c6d4 ab8b9862 00209675 04922b67
                2fe8f1a0 348b7982 0bf66b2d 3af2c282
                14370824 8c23484e ebfe8d36 bd419369
                76f6fbd3 d662eb34 55242708 3c00bca0
[INFO]  snarkJS: Contribution Hash:
                f4665153 54ac3dd4 f97d1509 8ac8609b
                4d210261 3abf213e d24a474f 68a79323
                9fa8a571 7abd74ba 5ae7d79a 84b210f6
                7681cf1b 75d14684 0453ee42 c4202a1a

> npx snarkjs zkey contribute isstudent_0001.zkey isstudent_0002.zkey --name="2nd Contributor Name" -v
Enter a random text. (Entropy): hdfbm89dsfhbu8dmsfhb87dhsbmdfsb8df79smbhd789fsbmh78dfs
[DEBUG] snarkJS: Applying key: L Section: 0/263
[DEBUG] snarkJS: Applying key: H Section: 0/512
[INFO]  snarkJS: Circuit Hash: 
                c300c6d4 ab8b9862 00209675 04922b67
                2fe8f1a0 348b7982 0bf66b2d 3af2c282
                14370824 8c23484e ebfe8d36 bd419369
                76f6fbd3 d662eb34 55242708 3c00bca0
[INFO]  snarkJS: Contribution Hash: 
                7e625320 1de33b0a bbd81e36 de30a3b3
                e2d93de7 c40441fa 70ea0956 4de9c123
                225c5549 7d21ad0b 64869565 c21a4a15
                9007c699 30e77167 f4685cac 1d695962

> npx snarkjs zkey contribute isstudent_0002.zkey isstudent_0003.zkey --name="3rd Contributor Name" -v
Enter a random text. (Entropy): 247m895hzg785gh78435ghm87345hmg78453gh7845h45783
[DEBUG] snarkJS: Applying key: L Section: 0/263
[DEBUG] snarkJS: Applying key: H Section: 0/512
[INFO]  snarkJS: Circuit Hash: 
                c300c6d4 ab8b9862 00209675 04922b67
                2fe8f1a0 348b7982 0bf66b2d 3af2c282
                14370824 8c23484e ebfe8d36 bd419369
                76f6fbd3 d662eb34 55242708 3c00bca0
[INFO]  snarkJS: Contribution Hash: 
                619415c4 be4d9977 134d74f0 fa907255
                521e72d0 022091fc f59f5295 439080cf
                19fdeb4b 6174069f fa92d344 0af142d7
                bfb6b52b 8f47af33 5ae18d00 8f815a77
```

Verify latest `zkey`
- `npx snarkjs zkey verify isstudent.r1cs ppot_0080_09.ptau isstudent_0003.zkey`

```
[INFO]  snarkJS: Reading r1cs
[INFO]  snarkJS: Reading tauG1
[INFO]  snarkJS: Reading tauG2
[INFO]  snarkJS: Reading alphatauG1
[INFO]  snarkJS: Reading betatauG1
[INFO]  snarkJS: Circuit hash: 
                c300c6d4 ab8b9862 00209675 04922b67
                2fe8f1a0 348b7982 0bf66b2d 3af2c282
                14370824 8c23484e ebfe8d36 bd419369
                76f6fbd3 d662eb34 55242708 3c00bca0
[INFO]  snarkJS: Circuit Hash: 
                c300c6d4 ab8b9862 00209675 04922b67
                2fe8f1a0 348b7982 0bf66b2d 3af2c282
                14370824 8c23484e ebfe8d36 bd419369
                76f6fbd3 d662eb34 55242708 3c00bca0
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #3 3rd Contributor Name:
                619415c4 be4d9977 134d74f0 fa907255
                521e72d0 022091fc f59f5295 439080cf
                19fdeb4b 6174069f fa92d344 0af142d7
                bfb6b52b 8f47af33 5ae18d00 8f815a77
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #2 2nd Contributor Name:
                7e625320 1de33b0a bbd81e36 de30a3b3
                e2d93de7 c40441fa 70ea0956 4de9c123
                225c5549 7d21ad0b 64869565 c21a4a15
                9007c699 30e77167 f4685cac 1d695962
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #1 1st Contributor Name:
                f4665153 54ac3dd4 f97d1509 8ac8609b
                4d210261 3abf213e d24a474f 68a79323
                9fa8a571 7abd74ba 5ae7d79a 84b210f6
                7681cf1b 75d14684 0453ee42 c4202a1a
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: ZKey Ok!
```

Apply random beacon
- `npx snarkjs zkey beacon isstudent_0003.zkey isstudent_final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"`

```
[INFO]  snarkJS: Contribution Hash: 
                74be4f28 873da11d ccc82de4 7a712143
                6de2c399 625fd709 475717cd 70e70ca5
                6aaa8449 d9069903 495fb41d 12e1c105
                38f04ad7 4cf2d930 2289b92e 35021f77
```

Verify final `zkey`
- `npx snarkjs zkey verify isstudent.r1cs ppot_0080_09.ptau isstudent_final.zkey`

```
[INFO]  snarkJS: Reading r1cs
[INFO]  snarkJS: Reading tauG1
[INFO]  snarkJS: Reading tauG2
[INFO]  snarkJS: Reading alphatauG1
[INFO]  snarkJS: Reading betatauG1
[INFO]  snarkJS: Circuit hash: 
                c300c6d4 ab8b9862 00209675 04922b67
                2fe8f1a0 348b7982 0bf66b2d 3af2c282
                14370824 8c23484e ebfe8d36 bd419369
                76f6fbd3 d662eb34 55242708 3c00bca0
[INFO]  snarkJS: Circuit Hash: 
                c300c6d4 ab8b9862 00209675 04922b67
                2fe8f1a0 348b7982 0bf66b2d 3af2c282
                14370824 8c23484e ebfe8d36 bd419369
                76f6fbd3 d662eb34 55242708 3c00bca0
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #4 Final Beacon phase2:
                74be4f28 873da11d ccc82de4 7a712143
                6de2c399 625fd709 475717cd 70e70ca5
                6aaa8449 d9069903 495fb41d 12e1c105
                38f04ad7 4cf2d930 2289b92e 35021f77
[INFO]  snarkJS: Beacon generator: 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
[INFO]  snarkJS: Beacon iterations Exp: 10
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #3 3rd Contributor Name:
                619415c4 be4d9977 134d74f0 fa907255
                521e72d0 022091fc f59f5295 439080cf
                19fdeb4b 6174069f fa92d344 0af142d7
                bfb6b52b 8f47af33 5ae18d00 8f815a77
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #2 2nd Contributor Name:
                7e625320 1de33b0a bbd81e36 de30a3b3
                e2d93de7 c40441fa 70ea0956 4de9c123
                225c5549 7d21ad0b 64869565 c21a4a15
                9007c699 30e77167 f4685cac 1d695962
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #1 1st Contributor Name:
                f4665153 54ac3dd4 f97d1509 8ac8609b
                4d210261 3abf213e d24a474f 68a79323
                9fa8a571 7abd74ba 5ae7d79a 84b210f6
                7681cf1b 75d14684 0453ee42 c4202a1a
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: ZKey Ok!
```

Export verification key
- `npx snarkjs zkey export verificationkey isstudent_final.zkey verification_key.json`

```
[INFO]  snarkJS: EXPORT VERIFICATION KEY STARTED
[INFO]  snarkJS: > Detected protocol: groth16
[INFO]  snarkJS: EXPORT VERIFICATION KEY FINISHED
```

Create proof
- `npx snarkjs groth16 prove isstudent_final.zkey witness.wtns proof.json public.json`

Verify proof
- `npx snarkjs groth16 verify verification_key.json public.json proof.json`

```
[INFO]  snarkJS: OK!
```

Export as smart contract
- `npx snarkjs zkey export solidityverifier isstudent_final.zkey verifier.sol`

```
[INFO]  snarkJS: EXPORT VERIFICATION KEY STARTED
[INFO]  snarkJS: > Detected protocol: groth16
[INFO]  snarkJS: EXPORT VERIFICATION KEY FINISHED
```

Get parameters to simulate
- `npx snarkjs generatecall`

```
["0x026ca79f8dc57ba5c24985810cf2ef83e2540d8ae7c674b5961e429b915324f6", "0x14016d0c7ddde206cdee54fed4690e217802f720634281b50474bdda80b18db9"],[["0x2553688324090b362bb09c45f4b7c6924a2dafd4ff1084fe95bccfbfd3515640", "0x2b6e855349e59cea7cd4dc4464cd145559b7d5834a87a1a90b9dbdbf4ee714f3"],["0x0c400ba6a696a8b85607066adda4611ef30b85c42f73f0bed09c0eb18cb1ed44", "0x1d4b8a430098ef7c45e4f534c47a7e757a4cd6aa51b2855726fc7730deb98afa"]],["0x200968ed3841af6588a1332d8977f3c3a7862d0f05c6e40b53dfbfccfd57f107", "0x0bb4e62394269a4c36c700f3331def2d291213eaa080ed331b2e36d444233e30"],["0x23ab4847bb61a525e344bb8e199c70a747772e928a61de573fa87f116f611c15"]
```
