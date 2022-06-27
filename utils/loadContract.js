


const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID

export const loadContract = async (name, web3) => {

    const response = await fetch(`/contracts/${name}.json`)
    const Artifact = await response.json()

    let contract = null
    try {
        contract = new web3.eth.Contract(
          Artifact.abi,
          Artifact.networks[NETWORK_ID].address
        )
      } 
    catch {
        console.error(`Cannot load the contract...${name}... You are connnected to wrong network`)
    }
    return contract
}