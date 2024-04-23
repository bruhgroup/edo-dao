import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// npx hardhat ignition deploy .\ignition\modules\CLASSDAO.ts --network localhost

const ClassDAOModule = buildModule("ClassDAOModule", (m) => {
    const contract = m.contract("CLASSDAO");
    return { contract };
});

export default ClassDAOModule;
