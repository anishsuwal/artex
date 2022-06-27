

const HDWalletProvider = require("@truffle/hdwallet-provider");
const keys = require("./keys.json") 

//contract address for artex =0xf5525CE7F984B96381a06146Dd781AB5E2D3Cf2a


module.exports = {

    contracts_build_directory: "./public/contracts",
	networks: {
      development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     ropsten: {
       provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC
          },
          providerOrUrl: `wss://ropsten.infura.io/ws/v3/${keys.INFURA_PROJECT_ID}`,
          addressIndex: 0
        }),
        network_id:3,
        gas: 5500000,  //gas limit
        gasPrice: 20000000000,    // willing to spent for unit of gas
        confirmations: 2,    // no. of blocks to wait between deplyoment
        networkCheckTimeout: 1000000000,
        timeoutBlocks: 200 //no oof blocks before deployment timeout
     },
     bscTestnet: {
      provider: () => new HDWalletProvider(
        mnemonic, 
        'https://data-seed-prebsc-1-s1.binance.org:8545'
      ),
      network_id: 97,
      skipDryRun: true
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.14",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  }

};


// BASE fee ( determned by ethereum) = 39.791392694
//Max priority fee for Fas (tip) = 2
//Gas Price = base fee + tip = 41.791392694
// gas used = 21000

//transaaction fee = gas used * gas price = 41.791392694 * 21000
/// burnt fee = basefee * gas used = 39.791392694 * 21000

//rest to miner=tip * gas used = 2 * 21000

//NEXT_PUBLIC_TARGET_CHAIN_ID =1337
//NEXT_PUBLIC_NETWORK_ID=5777