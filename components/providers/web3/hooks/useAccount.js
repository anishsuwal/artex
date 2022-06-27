

import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
  "0x606ca185ed90aebb915fda3d7e8e6fa57b814244e808c1f3fefe8a566e0fd731": true,  //hex value of the account
  "0xe59f512d06a1ae032d30950d484f5945d2523078bb4caa18003add1bea4107b9": true
}

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]

      if (!account) {
        throw new Error("Cannot retreive an account. Please refresh the browser.")
      }

      return account
    }
  )

  useEffect(() => {
    const mutator = accounts => mutate(accounts[0] ?? null)
    provider?.on("accountsChanged", mutator)

    return () => {
      provider?.removeListener("accountsChanged", mutator)
    }
  }, [mutate])

  return {
    data,
    isAdmin: (
      data &&
      adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest
  }
}
