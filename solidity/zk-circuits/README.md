# Generating the Proof

- https://github.com/iden3/snarkjs

Create circuit
- `circom isstudent.circom --r1cs --wasm --sym`

```
template instances: 78
non-linear constraints: 297
linear constraints: 0
private inputs: 4
public outputs: 5
wires: 302
labels: 1200
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
[INFO]  snarkJS: # of Wires: 302
[INFO]  snarkJS: # of Constraints: 297
[INFO]  snarkJS: # of Private Inputs: 4
[INFO]  snarkJS: # of Public Inputs: 0
[INFO]  snarkJS: # of Labels: 1200
[INFO]  snarkJS: # of Outputs: 5
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
                d92fc431 e14124a6 a6c88f2b 986e6d9e
                21498aaa 5395e112 57e68d00 e36e8f43
                ba300a27 d919a17c df1024a2 bd800d07
                7d148e94 5bc3b038 bf23a466 75a80302
```

Contribute to phase 2 ceremony. Repeat this as many times needed for more entropy (increase zkey indexes)
- `npx snarkjs zkey contribute isstudent_0000.zkey isstudent_0001.zkey --name="1st Contributor Name" -v`

```
> npx snarkjs zkey contribute isstudent_0000.zkey isstudent_0001.zkey --name="1st Contributor Name" -v
Enter a random text. (Entropy): 3ygs34ygh24we8fg48rns829tn8924ra8923jrty892ny8923nar2793bhrgcf8u2dhg723vbg5r792
[DEBUG] snarkJS: Applying key: L Section: 0/296
[DEBUG] snarkJS: Applying key: H Section: 0/512
[INFO]  snarkJS: Circuit Hash:
                21498aaa 5395e112 57e68d00 e36e8f43
                ba300a27 d919a17c df1024a2 bd800d07
                7d148e94 5bc3b038 bf23a466 75a80302
[INFO]  snarkJS: Contribution Hash:
                8b6b971a 91eaf57d 465495ce 3126d2b4
                ce97835c ede84999 1461134a 85837ab7
                592316f5 e1ec663c 4f35c78c 76f5b925
                30b5733c 26d448c8 2771d42d 4781d5ab
> npx snarkjs zkey contribute isstudent_0001.zkey isstudent_0002.zkey --name="2nd Contributor Name" -v
Enter a random text. (Entropy): hw9ucwehu9hn98tfghwuocbhu9qefbuweigb2489fbes
[DEBUG] snarkJS: Applying key: L Section: 0/296
[DEBUG] snarkJS: Applying key: H Section: 0/512
[INFO]  snarkJS: Circuit Hash:
                d92fc431 e14124a6 a6c88f2b 986e6d9e
                21498aaa 5395e112 57e68d00 e36e8f43
                ba300a27 d919a17c df1024a2 bd800d07
                7d148e94 5bc3b038 bf23a466 75a80302
[INFO]  snarkJS: Contribution Hash:
                931115f1 8d5dd763 30d15b1c a9b24d05
                6b5f7667 0b0910fb 601e3cd1 73303227
                a202658d cbffd10c ac5022f5 b676e881
                5b0025a1 720cedea 666a3935 99d78d2b
> npx snarkjs zkey contribute isstudent_0002.zkey isstudent_0003.zkey --name="3rd Contributor Name" -v
Enter a random text. (Entropy): h823gb8c923hdn8923ybn89fgc2jyar8923nyh89rtcny234
[DEBUG] snarkJS: Applying key: L Section: 0/296
[DEBUG] snarkJS: Applying key: H Section: 0/512
[INFO]  snarkJS: Circuit Hash: 
                d92fc431 e14124a6 a6c88f2b 986e6d9e
                21498aaa 5395e112 57e68d00 e36e8f43
                ba300a27 d919a17c df1024a2 bd800d07
                7d148e94 5bc3b038 bf23a466 75a80302
[INFO]  snarkJS: Contribution Hash: 
                d7c86e91 37d8a30a d9a931df 1626c6f3
                21b1e97c 612c3f5c 54485b84 bbbdcf9a
                a7e9eac0 14b6be01 18ecefc3 b567f6f4
                1f6bf6df 023626ec d76e5cb6 2ccf05fe
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
                d92fc431 e14124a6 a6c88f2b 986e6d9e
                21498aaa 5395e112 57e68d00 e36e8f43
                ba300a27 d919a17c df1024a2 bd800d07
                7d148e94 5bc3b038 bf23a466 75a80302
[INFO]  snarkJS: Circuit Hash: 
                d92fc431 e14124a6 a6c88f2b 986e6d9e
                21498aaa 5395e112 57e68d00 e36e8f43
                ba300a27 d919a17c df1024a2 bd800d07
                7d148e94 5bc3b038 bf23a466 75a80302
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #3 3rd Contributor Name:
                d7c86e91 37d8a30a d9a931df 1626c6f3
                21b1e97c 612c3f5c 54485b84 bbbdcf9a
                a7e9eac0 14b6be01 18ecefc3 b567f6f4
                1f6bf6df 023626ec d76e5cb6 2ccf05fe
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #2 2nd Contributor Name:
                931115f1 8d5dd763 30d15b1c a9b24d05
                6b5f7667 0b0910fb 601e3cd1 73303227
                a202658d cbffd10c ac5022f5 b676e881
                5b0025a1 720cedea 666a3935 99d78d2b
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #1 1st Contributor Name:
                8b6b971a 91eaf57d 465495ce 3126d2b4
                ce97835c ede84999 1461134a 85837ab7
                592316f5 e1ec663c 4f35c78c 76f5b925
                30b5733c 26d448c8 2771d42d 4781d5ab
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: ZKey Ok!
```

Apply random beacon
- `npx snarkjs zkey beacon isstudent_0003.zkey isstudent_final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"`

```
[INFO]  snarkJS: Contribution Hash: 
                93977390 a1b61379 bd933dfc da293fd6
                788ec57f 79d79885 c2233144 b7b7a77f
                e4492541 bb366785 3134806a ba81d60d
                7ea81aa3 cdd3c60f 56db2664 531e4f8d
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
                d92fc431 e14124a6 a6c88f2b 986e6d9e
                21498aaa 5395e112 57e68d00 e36e8f43
                ba300a27 d919a17c df1024a2 bd800d07
                7d148e94 5bc3b038 bf23a466 75a80302
[INFO]  snarkJS: Circuit Hash: 
                d92fc431 e14124a6 a6c88f2b 986e6d9e
                21498aaa 5395e112 57e68d00 e36e8f43
                ba300a27 d919a17c df1024a2 bd800d07
                7d148e94 5bc3b038 bf23a466 75a80302
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #4 Final Beacon phase2:
                93977390 a1b61379 bd933dfc da293fd6
                788ec57f 79d79885 c2233144 b7b7a77f
                e4492541 bb366785 3134806a ba81d60d
                7ea81aa3 cdd3c60f 56db2664 531e4f8d
[INFO]  snarkJS: Beacon generator: 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
[INFO]  snarkJS: Beacon iterations Exp: 10
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #3 3rd Contributor Name:
                d7c86e91 37d8a30a d9a931df 1626c6f3
                21b1e97c 612c3f5c 54485b84 bbbdcf9a
                a7e9eac0 14b6be01 18ecefc3 b567f6f4
                1f6bf6df 023626ec d76e5cb6 2ccf05fe
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #2 2nd Contributor Name:
                931115f1 8d5dd763 30d15b1c a9b24d05
                6b5f7667 0b0910fb 601e3cd1 73303227
                a202658d cbffd10c ac5022f5 b676e881
                5b0025a1 720cedea 666a3935 99d78d2b
[INFO]  snarkJS: -------------------------
[INFO]  snarkJS: contribution #1 1st Contributor Name:
                8b6b971a 91eaf57d 465495ce 3126d2b4
                ce97835c ede84999 1461134a 85837ab7
                592316f5 e1ec663c 4f35c78c 76f5b925
                30b5733c 26d448c8 2771d42d 4781d5ab
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
["0x021306b71ebf6f240c76e6bc9efc6f0b8a3fe447b9ca96ba14a10863686d901e", "0x06d7d1eb1defef24533b578ee65beebee15adbecb6952fe8170be91dc491bc7c"],[["0x0983c661e0b168773a61d52ef840f72dff7bc2b8306fe2a864a16a9c3039ee70", "0x2e1245ec3e6be9e5387310d61058c7d7fc5cc49e6978738b0d858327dd0885d9"],["0x13e472a2f5456ddf685292d1d8c40e2d444ef4507126db349d45b0e5e87c9a72", "0x2b85a5005c43b6d95060724f62eaee341c85a91df862928198d3930296af6510"]],["0x122f94d69144729b8f182fff7fb3cac1242c1011b94fc684b5d07ee8970cb507", "0x2aabcf7d16c457216292e21276c46f41af69f12e507d81c74aa83970f13dd4c6"],["0x02e63510e7597b4a7149db1831cade8f4b5e0cd7aa7a9607e9774c537b41d1e8","0x28199c3cb1917ab7308876b06ad8e1a842e9efe0681bee0360c79353b21ff67f","0x3063a1514b414a0ceb260a4030a519e4e94d14abf7545f9781b92c2887cdb18b","0x1fcf302f1331d2f83bb509857f29229e6706a6d8e39fda062183650c448796d0","0x2cf471858df3ef301719f1455b33121bb86f5aa5d1b4eb2bd29195cd62f56562"]
```
