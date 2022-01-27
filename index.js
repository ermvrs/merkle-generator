const keccak256 = require('keccak256')
const { MerkleTree } = require('merkletreejs');

const whiteList = [
    "0xa003B3e7942D984F34FAaeEd0AfA9b1A65386442",
    "0x9E9Bb6D0C2aA93e544731287e7Ee80f57E440dAE",
    "0x3764e671894E8b39d5542F7E0c216bD7d911BE2A",
    "0x1C8D0C71926eB0D30D8006725E4870FdC891449b",
    "0x22AC362305133eFaE98757ce9f94950fb549507E",
    "0x340B2b4470cB545C668Bed5B525A99a94BcE85ec",
    "0x452BBAF0e207e9F2842d629E7EB6b159fb53AB2F",
    "0xfB3fD9C140f40B8BC8cE8AbCBF0725339dD9DAF3",
    "0xE8639EE410d4F36e58d318b22Ce4E0BceCB1B018",
    "0x94705A9d675daa924F9190Eca4c05ED6B12d5345",
    "0x1a48541961a2F7bC6c090c5ba0C98B9745493b43",
    "0xf824AEcDb5c30B03F78a06b5C01847d055DdA6f1",
    "0xfB504f10E7c912C7a06B212B702AC05cE7b04059",
    "0x8EA8aDb5079D06a1E6034657bE2b577bD4845cd1",
    "0x58fBcAe5b9C043E17767CBF3057F03db02fB946C",
    "0x3Ea8C940b5e1aC9d9D518598c725ee1bA4E5A447",
    "0xA692092634FCEf0343a0e8C62005efbaD896A0f8",
    "0xbC42E4722347f6Cb1d47f5525b342980491A4DFf",
    "0xbC42E4722347f6Cb1d47f5525b342980491A4DFf",
    "0xf502Cbae65b407eeC11AaE0d3B4963561D7B77cf",
    "0x675082c99757b65Dcb0bD0fBF3589dB992103144",
    "0x091D884564b9EAaF0997F294fcc26D665466b28F",
    "0x7B2DAed5A630d45d0aAefc2fAa59b88309BB3924",
    "0xb236140d6a310B3d7Ba777Dca1feD61318648C57",
    "0xe4e45C14a6d7500835c3dcA1c0d30F134197f9aC",
    "0xd8D377817370C10c5D060E13e7638f63311C090b",
    "0x7511eF14D027A7e1D34eAEac04604880A3440cC2",
    "0x5E0C4da9Ed2543bB340369DcAE4E6041dE2131e4",
    "0x2c95d7B9a4bFe815B9e47e0bA5196D26866C7419",
    "0x4901Ff8F478d2CA81a2c55eA442C9BF939E120dB",
    "0xd3b8cEb2806ecdA745D9F437e70382a0E2f0FBf8",
    "0xA66B5bd78A817e340110A2a6E0E76d92a0174296",
    "0xbAfC0742B4989414c5A95E64915c9288796F7Aa2",
    "0x657E0D866c8c99B542b240aAE931BB42c77C3Ad2",
    "0x7828757bA24fB8DF83435F177B7D88d82343C69D",
    "0x4DF44A3dd2bD7331bbf5716Baa23415f43E20a16",
    "0xCfde2349bB7542E3f671a7bC8fD2A91A5c6Ae0aE",
    "0xF4286d5F4e0FC185f1B13CCc2Ee00fd5D8914262",
    "0xa1b3C868B79Ec332E2D5b03d5F89D498c34daa2d",
    "0x19D946287527bedCC37dCe026ACA391A366788F9",
    "0x49c1D54D3D25c4DeCdc974bF82b0F53f9f78C1aF",
    "0x6ff05Db98F87F74cEfBe3D6B868A1e180e064c57",
    "0xf3531907a0c7e39a3aE4FF51A1de8f0184641003",
    "0xB12feDE7Df01C01dA179aD04CFa349A7bB50bb67",
    "0x039207D140653650BD0Cff5Ca3D4cd4bD138df03",
    "0x5eD72F7D8Deb44f4b87022ce051422bCF3814a5B",
    "0x2F27dfda3b32F4d3E34476222BA7aaF03ff4a568",
    "0xc0aa573b25AfA31BDbdE10bAe25aDeD8d214787a",
    "0x3F499cD65eD2FE113340c3f4c94b32522ECF6ECc",
    "0x8Ee23de93e1D42C0f97807104DC98eb6cAF7dED2",
    "0x00718f1281Cda7e673E82af18986466d7aDb3117",
    "0x13a9aE2255e21fb677837cC498ae2C53e446F6C7",
    "0xc81ef14c67A7B908BE5222F307A8edEFac44417E",
    "0x3D5832D7dbaA8C477A6aaACA81dA1fF5FeF2A331",
    "0x8BcFA94392e26E169DD3d82dbaf54b6b776DE690",
    "0x67b7335A988935C2949aF21baaa5C3337f530562",
    "0x45fF7BC14501A8742458092D06F047e5d0EFfA66",
    "0x1d8a407313642f7f07315FF190573AEA556feE64",
    "0xE4adf99e4aE06894c7AaC39fa36aBD1568fa1bC1",
    "0xb638eda5FaFb07a7D332795029cdAaE19F989123",
    "0x1AfeE49774bf5d9Ed7C243EaAa4D2dD1c5F88740",
    "0x0bf231F205114732dF5526BABc769055484D33A8",
    "0xA6cFf77985f58Ce983F90D90C39498cd40ee6e26",
    "0x2dCb4379F5A8BA119016129Ed330bC6F185faE63",
    "0xe6d9B39916875Fba5c5421fBbCb83D222Ce6b2d5",
    "0x6D496Cebec651079339F4f853c2d383dA39784B6",
    "0xe4881b07E8204032d0222D195E66f260801D247E",
    "0xa7dD2b2201f7745D380Ba747C86e2B4b3a049319",
    "0x242c4Acdaf8D8522E90970B62401fA1bd8DD1b22",
    "0x71e5C8a240e01adA333b4cF1cA38b7BC5Bc10933", //görli 1
    "0xD12FBD5c1f2C90c244Ce8aFE02D0CAb2EF109949", //görli 3
    "0xd2D319FFa0660A3Ec007b4d0cd27e39C7ce5456d", //görli 4
    "0x6FB3365fe423Fa159C111bbC9C3Aac8d840FA44D", //görli 6
    "0xD69522807C59dF7888B4f257c2bdD5527D45B1bC", //görli 7
    "0xD7051141d24C3c06c7741215d324A07a0fFf9499" // erim
    ];

const leaves = whiteList.map(x => keccak256(x));
const merkle = new MerkleTree(leaves, keccak256, {sortPairs : true});

const roothash = merkle.getRoot();

console.log(merkle.toString())

console.log(roothash.toString('hex'))
console.log(merkle.getHexProof(keccak256('0xD7051141d24C3c06c7741215d324A07a0fFf9499')))
// root : e32dc6959b53c3188859dbac19c6ab960108d42e1f829c3a820a78208c835b2f