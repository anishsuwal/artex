import { useWeb3 } from "components/providers"
import { Button } from "components/ui/common"
import { useAccount } from "components/hooks/web3"
import artexHeader from "img/artex-header.png"

import Image from "next/image"

export default function Navbar() {
  const { connect, isLoading, requireInstall } = useWeb3()
  const { account } = useAccount()



  return (
    <div>
    <div className="flex justify-between border p-4  ">
      <div className="flex flex-1 items-center justify-center  lg:ml-24  m-30   ">
        <div className="flex border-r pr-2 w-24 lg:w-fit">
          <Image
            src={artexHeader}
            alt="artex logo" 
             />
        </div>
        <div className="flex flex-1 justify-end items-end lg:mr-32">

          <Button   
          className="bg-white  mr-1  font-bold  rounded-full inline-flex    lg:w-[146px] lg:h-[48px] justify-center items-center"
         >
            <svg strokeWidth="0" viewBox="0 0 511.97 511.97" className="align-middle me-1 fill-[#f3ba2f]"
              height="22" width="22" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z">
              </path>
                <path d="M156.56,215.14,256,115.71l99.47,99.47,57.86-57.85L256,0,98.71,157.28l57.85,57.85M0,256l57.86-57.87L115.71,256,57.85,313.83Zm156.56,40.85L256,396.27l99.47-99.47,57.89,57.82,0,0L256,512,98.71,354.7l-.08-.09,57.93-57.77M396.27,256l57.85-57.85L512,256l-57.85,57.85Z">
                </path></g></svg>
            <span className="px-1  text-[10px] lg:text-sm">BNB Chain</span>
          </Button>
          {isLoading ?
            <Button
              disabled={true}
              onClick={connect}
            >
              Loading...
            </Button> :
            account.data ?
              <Button
                onClick={connect}
                className=" text-white bg-[#04009a] hover:bg-blue-700 lg:w-[182px] lg:h-[48px] justify-center items-center">
                <span className="px-1 lg:text-sm  text-xs">Connected</span>
              </Button> :
              requireInstall ?
              <Button className="inline-flex bg-[#04009a] text-white lg:w-[182px] lg:h-[48px] justify-center items-center "
              onClick={() => window.open("https://metamask.io/download.html", "_blank")}>
                  <span className="  text-[10px] lg:text-sm">Install Metamask</span>
                </Button> :
               
               <Button className="inline-flex bg-[#04009a] hover:bg-blue-700 text-white lg:w-[182px] lg:h-[48px] justify-center items-center "
                  onClick={connect}>
                  <svg strokeWidth="0"  viewBox="0 0 24 24" className="align-middle me-1 fill-[#ffffff]"
                    height="22" width="22" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z">
                    </path>
                      <path d="M22 7h1v10h-1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v3zm-2 10h-6a5 5 0 0 1 0-10h6V5H4v14h16v-2zm1-2V9h-7a3 3 0 0 0 0 6h7zm-7-4h3v2h-3v-2z">
                      </path></g></svg>
                  <span className="px-2  text-[10px] lg:text-sm">Connect</span>
                  <span className="lg:flex text-xs lg:text-sm hidden">Wallet</span>

                </Button>
          }

        </div>
      </div>
    </div>

    </div>

  )

}

