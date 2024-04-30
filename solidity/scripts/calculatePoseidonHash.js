const circomlibjs = require("circomlibjs")

async function main() {
    const poseidon = await circomlibjs.buildPoseidon();
    const F = poseidon.F;
    const buffer = poseidon([211, 491, 651]);
    const hash = F.toObject(buffer).toString()
    console.log(hash);
}

main().then(() => {});