import { useWalletInfo } from "components/hooks/web3";
import { useWeb3 } from "components/providers";
import { useState } from "react";
import moment from "moment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import artexlogo from "img/artex-logo.png"




export const normalizegetdata = (data) => {

  return {
    account: data.person,
    duration: data.duration,
    stake_time: data.stake_time,
    amount: data.amount,
    id: data.id
  }
}



export default function Artex() {
  const { contract } = useWeb3()

  const { account } = useWalletInfo()

  const [selectInterest, setSelectInterest] = useState(15)
  const [stakeAmount, setStakeAmount] = useState(0)
  const [maxBal, setMaxBal] = useState(0)

  const [interestAmt, setInterestAmt] = useState(0)
  const [redemptionDate, setRedemptionDate] = useState()
  const [option, setOption] = useState(1)





  const date = moment().format("DD-MMM-YYYY hh:mm ")
  
  function getRedeemDate(udate, _days) {
    return moment.unix(udate).add(getDuration(_days), 'days').format('DD-MMM-YYYY hh:mm ')
  }

  function getDuration(_days) {
    if (_days == 1) {
      return 60
    }
    else if (_days == 2) {
      return 90
    }
    else if (_days == 3) {
      return 120
    }
    else if (_days == 4) {
      return 365
    }
    else
      return 0
  }
  function getInterest(_days) {
    if (_days == 1) {
      return 15
    }
    else if (_days == 2) {
      return 20
    }
    else if (_days == 3) {
      return 30
    }
    else if (_days == 4) {
      return 90
    }
    else
      return 0
  }
  


  async function Stake(_stakeamt, _option) {
    try {      if (_stakeamt <= 0 && _option == 0) {
        toast.error('Invalid Amount!!! Please Enter the correct Amount.......', {
          position: "top-center",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return
      }
      await contract?.methods.Stake(_option, _stakeamt).send({ from: account.data })
    }
    catch (error) { console.log(error) }
  }

 
  function Calculate(_interest, _days) {
    try {
      setSelectInterest(_interest)
      setInterestAmt(stakeAmount * (_interest / 100))
      setRedemptionDate(moment().add(_days - 1, 'days').format('DD-MMM-YYYY hh:mm '))
      if (_interest == 15) {
        setOption(1)
      }
      else if (_interest == 20) {
        setOption(2)
      }
      else if (_interest == 30) {
        setOption(3)
      }
      else if (_interest == 90) {
        setOption(4)
      }
    }
    catch (error) { console.log(error) }
  }
  function Calculate1() {
    try {

      setInterestAmt(stakeAmount * (selectInterest / 100))

    }
    catch (error) { console.log(error) }
  }

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-1 text-5xl font-bold items-center lg:gap-x-96 lg:ml-24  ml-6   mt-12 px-3 ">
          Locked Staking
        </div>
      </div>
      <div className="flex  justify-center items-center  mt-16 w-full ">
        <div className="flex flex-1 justify-center  flex-col w-full  m-2">
          <div className="flex flex-1 justify-center w-full items-center">
            <div className="  justify-between   items-center shadow rounded-2xl bg-[#f4f5f6] p-6">
              <div className="flex flex-1   items-center   w-full  ">
                <Image                
                  src={artexlogo}
                  alt="artex logo" 
                  layout="fixed"/>

                  <div className="flex flex-1    justify-between  items-center  w-full">

                  <span className="px-3">Artex</span>
                  <span className="text-[10px] lg:text-xs text-right">{account.data}</span>

                  </div>
              </div>
             


              <p className="font-bold py-2 text-xs">Duration</p>
              <div className="flex1    justify-center items-center rounded-2xl  <libg-zinc-200">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
                  <div className="flex1 text-center justify-center">
                    <input className=" sr-only peer" type="radio" value="60 Days" name="answer" id="60" defaultChecked />
                    <label className="flex rounded-full p-2 a text-sm bg-white border border-gray-300  
                    cursor-pointer focus:outline-none  hover:bg-[#04009a] hover:text-white 
                     peer-checked:bg-[#04009a] peer-checked:text-white  font-bold peer-checked:ring-1 
                    peer-checked:border-transparent justify-center"
                      htmlFor="60" onClick={() => {
                        Calculate(15, 60)
                      }}>{"60 Day's"}</label>
                  </div>
                  <div >
                    <input className="sr-only peer" type="radio" value="90 Days" name="answer" id="90" />
                    <label className="flex rounded-full p-2  justify-center  text-sm bg-white border border-gray-300  cursor-pointer focus:outline-none 
                   hover:bg-[#04009a] hover:text-white px-3 pr-3 lg:px-4 lg:pr-4 peer-checked:bg-[#04009a] peer-checked:text-white  font-bold peer-checked:ring-1 peer-checked:border-transparent"
                      htmlFor="90" onClick={() => {
                        Calculate(20, 90)
                      }}>{"90 Day's"}</label>
                  </div>
                  <div >
                    <input className="sr-only peer" type="radio" value="120 Days" name="answer" id="120" />
                    <label className="flex rounded-full p-2 text-center text-sm bg-white border border-gray-300  cursor-pointer focus:outline-none
                   hover:bg-[#04009a] hover:text-white px-3 pr-3 justify-center lg:px-4 lg:pr-4 peer-checked:bg-[#04009a] peer-checked:text-white  font-bold peer-checked:ring-1 peer-checked:border-transparent"
                      htmlFor="120" onClick={() => {
                        Calculate(30, 120)
                      }}>{"120 Day's"}</label>
                  </div>
                  <div >
                    <input className="sr-only peer" type="radio" value="365 Days" name="answer" id="365" />
                    <label className="flex rounded-full p-2 text-center  text-sm bg-white border border-gray-300  cursor-pointer focus:outline-none
                   hover:bg-[#04009a] hover:text-white px-3 pr-3 justify-center lg:px-4 lg:pr-4 peer-checked:bg-[#04009a] peer-checked:text-white  font-bold peer-checked:ring-1 peer-checked:border-transparent"
                      htmlFor="365" onClick={() => {
                        Calculate(90, 365)
                      }}>{"365 Day's"}</label>
                  </div>
                </div>
              </div>
              <div className="flex mt-4 justify-between items-center  w-full">
                <span className="font-bold  text-xs text-left">Lock Amount</span>
                <span className="justify-end items-end text-xs text-right">available Amount  <strong>{maxBal}</strong>  ARTEX</span>
              </div>
              <div className="flex flex-row mt-5  justify-between items-center rounded-lg bg-white  ">
                <input placeholder="Please enter the Amount" value={stakeAmount} name="addressTo" type="number" 
                className="rounded-2xl font-semibold text-slate-500 text-sm  lg:w-96 border-0 lg:h-12 w-40 lg:96   "
                  onChange={({ target: { value } }) => {
                    setStakeAmount(value)
                    Calculate1()
                  }} />
                <div>
                  <span className="font-semibold lg:text-sm text-xs mr-2">Artex</span>
                  <button className="bg-[#04009a] text-white font-semibold text-xs lg:text-sm p-2 lg:px-4 lg:pr-4 
                   hover:bg-blue-700 rounded-full"
                    onClick={() => {
                      setStakeAmount(maxBal)
                      Calculate1()
                    }}
                  >Max Amount</button>                 
                </div>
              </div>
              <div className="flex mt-3 justify-between items-center  w-full">
                <span className="font-bold  text-xs  text-left">SUMMARY</span>
              </div>
              <div className="bg-white mt-3 lg:p-5 rounded-lg ">
                <div className="flex p-2 justify-between items-center  w-full">
                  <span className=" text-sm text-left">Stake Date</span>
                  <span className="justify-end items-end text-right text-md">{date}</span>
                </div>
                <div className="flex p-2 justify-between items-center  w-full">
                  <span className="text-sm text-left">Redemption Date</span>
                  <span className="justify-end items-end text-righttext-md">{redemptionDate}</span>
                </div>
                <div className="flex p-2 justify-between items-center  w-full">
                  <span className="text-sm text-left">Interests</span>
                  <span className="justify-end font-bold  items-end text-right " value="ddd">{selectInterest}% tokens On top</span>
                </div>
                <div className="flex p-2 justify-between items-center  w-full">
                  <span className="text-sm  text-left">Total Earn</span>
                  <span className="justify-end font-bold  items-end text-right text-green-400">{interestAmt} ARTEX</span>
                </div>
              </div>
              <div className=" text-sm text-orange-400 text-center mt-5 p-2 rounded-xl border border-orange-400">
                <p >* If you cancel staking, you will get charged with 25% cancellation fees on  </p>
                <p>their initial staking amount of tokens.</p>
              </div>
              <div className="1px] w-full bg-gray-400 my-2" />
              <button
                type="button"
                className="text-white text-md font-semibold w-full mt-2  p-2 bg-[#04009a]  hover:bg-blue-700 
                rounded-full cursor-pointer"
                onClick={() => {
                  Stake(stakeAmount, option)
                }}
              > Approve Staking</button>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div> 
      <div className="m-2 lg:m-10">
        <div className="lg:flex flex-1 justify-center items-center  text-sm  m-2  grid-cols-1  
          md:grid-cols-2 lg:grid-cols-8 border-b-2 px-10 hidden ">
          <div className=" flex-1">Coin</div>
          <div className=" flex-1   text-left ">Locked Token</div>
          <div className=" flex-1  ">Duration</div>
          <div className=" flex-1  ">Stake Date</div>
          <div className=" flex-1  ">Redemption Date</div>
          <div className=" flex-1  text-center">Interests</div>
          <div className=" flex-1  text-center">Total Earn</div>
          <div className=" flex-1  "></div>
        </div>
      </div>
    </>
  )
}