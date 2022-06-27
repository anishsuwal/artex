import { useWalletInfo } from "components/hooks/web3";
import { useWeb3 } from "components/providers";
import { useEffect, useState } from "react";
import moment from "moment";
import useSWR from "swr"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import artexlogo from "img/artex-logo.png"
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Button } from "components/ui/common";
import { BigNumber} from 'ethers';


export const normalizegetdata = (data) => {

  return {
    account: data.person,
    duration: data.duration,
    stake_time: data.stake_time,
    amount: data.amount,
    id: data.id,
    count: data.count
  }
}

export default function Artex() {
  const { contract } = useWeb3()
  const { account } = useWalletInfo()
  const [selectInterest, setSelectInterest] = useState(15)
  const [stakeAmount, setStakeAmount] = useState()
  const [maxBal, setMaxBal] = useState(0)
  const [getDecimal, setGetDecimal] = useState(0)

  const [interestAmt, setInterestAmt] = useState(0)
  const [redemptionDate, setRedemptionDate] = useState()
  const [option, setOption] = useState(1)
  const numFormatter = new Intl.NumberFormat('en')

  const notify = (_count) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white border-2  rounded-3xl shadow-2xl p-12 lg:p-20 w-[329px] h-[283px] lg:w-[570px] lg:h-[344px]">
          <div className="custom-ui text-lg lg:text-2xl text-[#FF6838] text-center ">
            <h1>* If you cancel staking, you will get 
              <strong> charged with 25% cancellation </strong>
               fees on their initial staking amount of tokens.</h1>          
          </div>
          <div className="flex lg:mt-10 mt-5 item-center justify-center gap-x-2 ">
          {<button className="bg-[#04009a] hover:bg-blue-700 rounded-full w-[129px] h-[40px] lg:h-[48px] lg:w-[225px] 
           text-white text-lg font-bold items-center" onClick={onClose}>Cancel</button>
        }
          <button className=" border hover:bg-[#04009a] hover:text-white rounded-full w-[129px] h-[40px] lg:h-[48px] lg:w-[225px] text-lg font-bold items-center"
           onClick={() =>{
            rewardClaim(_count,false)
            onClose()}}>Submit</button>
          </div>
          </div>
        );
      }
    });
  }


  const rewardClaim  = async( _count, bool ) => {
    if(bool)
    {
         await contract?.methods.get_Reward(_count).send({ from: account.data })
    }
  else
    {
        await contract?.methods.OpenReward(_count).send({ from: account.data })
    }
  }

  
  function claimReward(_redemptionDate,_count)
  {
    const rdate = new Date(_redemptionDate)
    const currDate = new Date(date)
    if(rdate.getTime() >= currDate.getTime())
    {
          notify(_count)
    }
    else
    {
      rewardClaim(_count,true)
    }

  }
  

  const date = moment().format("DD MMM YYYY hh:mm ")
  function getUnixDate(udate) {
    var dateString = moment.unix(udate).format('DD MMM YYYY hh:mm ')
    return dateString
  }
  function getRedeemDate(udate, _days) {
    return moment.unix(udate).add(getDuration(_days), 'days').format('DD MMM YYYY hh:mm ')
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
  const Transaction = () => {
    const swrRes = useSWR(() =>
      contract ? "hi" : "problem",
      async () => {

        const data = []
        var _cnt = await contract?.methods.getCount().call()
        console.log(_cnt)
        for (let i = 0; i < _cnt; i++) {

          const _dd = await contract?.methods._userdata(i).call()
          const normalized = normalizegetdata(_dd)
          data.push(normalized)
        }
        return data
      }
    )
    if(account.data>0)
      maxAmount()
    //swrRes.data?.map(x=>console.log(x.stake_time,"I am wokring with object array"))

    return swrRes.data?.map(x => (

      <div className="hover:bg-slate-200  container lg:text-base text-xs font-medium border-b lg:border-b-0  mx-auto p-5 lg:p-0 "
       key={x.count}>

        <div className="grid justify-between items-center  grid-cols-1 md:grid-cols-2  lg:grid-cols-8 p-3 gap-y-3" >
          <div className="flex flex-1 justify-between grid-cols-2 lg:grid-rows-2  grid-flow-col">
            <div className="flex flex-1 items-center w-[32px] h-[32px] ">
              <Image
                src={artexlogo}
                alt="Artex Header Logo" 
                layout="fixed"/>
              <span className="px-3 text-sm">Artex</span>
            </div>
          </div>
          <div className="flex flex-1 justify-between grid-cols-2 lg:grid-rows-2   grid-flow-col">
            <div className="  text-left lg:text-center  md:hidden lg:hidden xl:hidden 2xl:hidden"> Total locked token</div>
            <div className="  text-right" >{numFormatter.format((x.amount)/10 ** getDecimal)} ARTEX</div>
          </div>
          <div className="flex flex-1 justify-between grid-cols-2 lg:grid-rows-2   grid-flow-col">
            <div className="  text-left lg:text-center  md:hidden lg:hidden xl:hidden 2xl:hidden">Duration</div>
            <div className="  text-right  ">{getDuration(x.id)} Days</div>
          </div>
          <div className="flex flex-1  justify-between grid-cols-2   lg:grid-rows-2  grid-flow-col">
            <div className="  text-left lg:text-center  md:hidden lg:hidden xl:hidden 2xl:hidden">Stake Date</div>
            <div className="  text-right  "> {getUnixDate(x.stake_time)}</div>
          </div>
          <div className="flex flex-1 justify-between grid-cols-2  lg:grid-rows-2  grid-flow-col">
            <div className="  text-left lg:text-center  md:hidden lg:hidden xl:hidden 2xl:hidden">Redemption Date</div>
            <div className="  text-right  ">{getRedeemDate(x.stake_time, x.id)}</div>
          </div>
          <div className="flex flex-1 justify-between grid-cols-2  lg:grid-rows-2  grid-flow-col">
            <div className="  text-left lg:text-center  md:hidden lg:hidden xl:hidden 2xl:hidden">Interests</div>
            <div className="  text-right font-semibold  ">{getInterest(x.id)}% tokens On top</div>
          </div>
          <div className="flex flex-1 justify-between grid-cols-2  lg:grid-rows-2  grid-flow-col">
            <div className="  text-left lg:text-center md:hidden lg:hidden xl:hidden 2xl:hidden">Total Earn</div>
            <div className="  text-right  text-green-400 font-bold ">{numFormatter.format((getInterest(x.id) / 100) * ((x.amount)/10 ** getDecimal))} ARTEX</div>
          </div>
          <div >
            <Button
              disabled={!account.data}
              type="button"
              className="text-white w-full justify-center items-center text-center border-[1px] 
                p-2 mt-2 bg-[#00a3ff] font-bold text-sm  hover:bg-[#04009a] lg:w-[75px]  rounded-full cursor-pointer"
                onClick={() =>{claimReward(getRedeemDate(x.stake_time, x.id),x.count)}}
            >
              Claim
            </Button>
          </div>
          
        </div>
      </div>
    ))
  }


  async function Stake(_stakeamt, _option) {
    try {     
       if (_stakeamt <= 0 && _option == 0) {
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

      _stakeamt = BigNumber.from(_stakeamt).mul(BigNumber.from(10).pow(getDecimal));

      console.log("amount isxxxxxxxxxxxxxxxxxxxxxxx ", _stakeamt);

  

       
      const temp = await contract?.methods.Stake(_option, _stakeamt).send({ from: account.data })
    }
    catch (error) { console.log(error) }
  }

  
  async function maxAmount() {
    try {
      const temp = await contract?.methods.balanceOf(account.data).call()
      const decimal = await contract?.methods.decimals().call()
      const dec = 10 ** decimal
      setGetDecimal(decimal)
      const _bal = (temp / dec)
      if(_bal>0 )
        setMaxBal(_bal)
      else
      setMaxBal(0)
      return temp
    }
    catch (error) { console.log(error) }
  }

  function Calculate(_interest, _days) {
    try {
      setSelectInterest(_interest)
      if(stakeAmount!=0 && stakeAmount > 0)
          setInterestAmt(stakeAmount * (_interest / 100))
      else
      setInterestAmt(0)
      setRedemptionDate(moment().add(_days - 1, 'days').format('DD MMM YYYY hh:mm '))
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
  function Calculate1(amt) {
    try {

      setInterestAmt(amt * (selectInterest / 100))

    }
    catch (error) { console.log(error) }
  }

  useEffect(()=>{
      console.log("hello")
  },[account,stakeAmount]
  )

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-1 lg:text-[48px] text-3xl font-bold items-center lg:gap-x-96 lg:ml-44 ml-3    mt-12 px-3 ">
          Locked Staking
        </div>
      </div>
      <div className="flex  justify-center items-center  mt-14 w-full ">  
        <div className="flex flex-1 justify-center  flex-col w-full  m-4">
          <div className="flex flex-1 justify-center w-full items-center">
            <div className="  justify-between   lg:w-[570px] items-center shadow rounded-2xl bg-[#f4f5f6] lg:p-10 p-3">
              <div className="flex flex-1   items-center   w-full  ">
                <div className="w-[29px] h-[29px] ">
                <Image                
                  src={artexlogo}
                  alt="artex logo" 
                  layout="fixed"/>
                  </div>
                  <div className="flex flex-1    justify-between  items-center  w-full">

                  <span className="px-3">Artex</span>
                  <span className="text-[8px] lg:text-xs text-right">{account.data}</span>

                  </div>
              </div>
             


              <p className="font-bold py-2 text-xs">DURATION</p>
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
                      }}>{"60 Days"}</label>
                  </div>
                  <div >
                    <input className="sr-only peer" type="radio" value="90 Days" name="answer" id="90" />
                    <label className="flex rounded-full p-2  justify-center  text-sm bg-white border border-gray-300  cursor-pointer focus:outline-none 
                   hover:bg-[#04009a] hover:text-white px-3 pr-3 lg:px-4 lg:pr-4 peer-checked:bg-[#04009a] peer-checked:text-white  font-bold peer-checked:ring-1 peer-checked:border-transparent"
                      htmlFor="90" onClick={() => {
                        Calculate(20, 90)
                      }}>{"90 Days"}</label>
                  </div>
                  <div >
                    <input className="sr-only peer" type="radio" value="120 Days" name="answer" id="120" />
                    <label className="flex rounded-full p-2 text-center text-sm bg-white border border-gray-300  cursor-pointer focus:outline-none
                   hover:bg-[#04009a] hover:text-white px-3 pr-3 justify-center lg:px-4 lg:pr-4 peer-checked:bg-[#04009a] peer-checked:text-white  font-bold peer-checked:ring-1 peer-checked:border-transparent"
                      htmlFor="120" onClick={() => {
                        Calculate(30, 120)
                      }}>{"120 Days"}</label>
                  </div>
                  <div >
                    <input className="sr-only peer" type="radio" value="365 Days" name="answer" id="365" />
                    <label className="flex rounded-full p-2 text-center  text-sm bg-white border border-gray-300  cursor-pointer focus:outline-none
                   hover:bg-[#04009a] hover:text-white px-3 pr-3 justify-center lg:px-4 lg:pr-4 peer-checked:bg-[#04009a] peer-checked:text-white  font-bold peer-checked:ring-1 peer-checked:border-transparent"
                      htmlFor="365" onClick={() => {
                        Calculate(90, 365)
                      }}>{"365 Days"}</label>
                  </div>
                </div>
              </div>
              <div className="flex mt-4 justify-between items-center  w-full">
                <span className="font-bold  text-sm text-left">Lock Amount</span>
                <span className="justify-end items-end text-xs text-right">Available Amount  {numFormatter.format(maxBal)}  ARTEX</span>
              </div>
              <div className="flex flex-row mt-3  justify-between items-center rounded-lg bg-white h-[48px]  ">
                <input id="amount-input" placeholder="Please Enter the Amount" value={0} name="addressTo" type="number" 
                className="lg:flex rounded-2xl font-semibold text-slate-500 text-xs  lg:w-72 border-0 lg:h-12 w-[115px] hidden "
                  onChange={({ target: { value } }) => {
                    setStakeAmount(value)
                    Calculate1(value)
                  }} />
                      <input placeholder="0" value={stakeAmount || ''} name="addressTo" type="number" 
                className="rounded-2xl font-semibold text-slate-500 text-xs  lg:w-72 border-0 lg:h-12 w-[115px] lg:hidden "
                  onChange={({ target: { value } }) => {
                    setStakeAmount(value)
                    Calculate1(value)
                  }} />
                <div className="flex justify-center items-center">
                  <span className="font-bold  text-xs text-center mr-2">ARTEX</span>
                  <button className="bg-[#04009a] text-white font-bold text-sm   lg:mr-3 mr-3
                   hover:bg-blue-700 rounded-full w-[125px] h-[24px]"
                    onClick={() => {
                      setStakeAmount(maxBal)
                      Calculate1(maxBal)
                    }}
                  >Max Amount</button>                 
                </div>
              </div>
              <div className="flex mt-3 justify-between items-center  w-full">
                <span className="font-bold  text-sm  text-left">SUMMARY</span>
              </div>
              <div className="bg-white mt-3 p-5 rounded-lg ">
                <div className="flex p-2 justify-between items-center text-xs lg:text-sm  w-full">
                  <span className="  font-medium text-left">Stake Date</span>
                  <span className="justify-end items-end text-right lg:text-base  font-medium ">{date}</span>
                </div>
                <div className="flex p-2 justify-between items-center text-xs lg:text-sm  w-full">
                  <span className="font-medium text-left">Redemption Date</span>
                  <span className="justify-end items-end text-right lg:text-base  font-medium">{redemptionDate}</span>
                </div>
                <div className="flex p-2 justify-between items-center text-xs lg:text-sm  w-full">
                  <span className=" font-medium text-left">Interests</span>
                  <span className="justify-end font-bold  items-end text-right " value="ddd">{selectInterest}% of tokens on top</span>
                </div>
                <div className="flex p-2 justify-between items-center text-xs lg:text-sm  w-full">
                  <span className=" font-bold text-left">Total Earn</span>
                  <span className="justify-end font-bold  items-end text-right text-green-400">{numFormatter.format(interestAmt)} ARTEX</span>
                </div>
              </div>
              <div className=" bg-[#FFF8F5] text-[#FF6838] text-sm font-medium   mt-5 p-2 rounded-xl border border-orange-400">
                <p >* If you cancel staking, you will get <strong>charged with 25% cancellation</strong> fees on  
                their initial staking amount of tokens.</p>
              </div>
              <div className="flex flex-1 justify-center items-center w-full " >
              <Button 
               disabled={!maxBal}                 
                type="button"
                className="text-white text-base font-semibold lg:w-[380px] h-[48px] w-full mt-5   bg-[#04009a]  hover:bg-blue-700 
                rounded-full cursor-pointer"
                onClick={() => {
                  Stake(stakeAmount, option)
                  setStakeAmount(0)
                }}
              > Approve Staking</Button>
            </div>

            </div>
          </div>
        </div>
        <div>
        </div>
      </div> 
      <div className="m-4 lg:m-10">
        <div className="lg:flex flex-1 justify-center items-center  text-sm  m-2  grid-cols-1  
          md:grid-cols-2 lg:grid-cols-8 border-b-2 px-3 pb-2 hidden font-medium">
          <div className=" flex-1">Coin</div>
          <div className=" flex-1   text-left ">Total locked token</div>
          <div className=" flex-1  ">Duration</div>
          <div className=" flex-1  text-center">Stake Date</div>
          <div className=" flex-1  text-center">Redemption Date</div>
          <div className=" flex-1  text-center">Interests</div>
          <div className=" flex-1  text-left font-bold">Total Earn</div>
          <div className=" flex-1  "></div>
        </div>
        <Transaction />
      </div>



    </>
  )
}