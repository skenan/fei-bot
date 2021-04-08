import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { FeiRouter, EthUniswapPCVController } from './abi';

dotenv.config();

async function event_task() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API);
  let eventContract = new ethers.Contract(EthUniswapPCVController.ADDRESS, EthUniswapPCVController.ABI, provider);
  let eventFilter = {
    address: EthUniswapPCVController.ADDRESS,
    topics: [eventContract.interface.events.Reweight],
  };
  const pastLogs = await eventContract.queryFilter(eventFilter);
  const ethAddress = process.env.ETH_ADDRESS;
  const feiAmount = process.env.FEI_SELL_AMOUNT;
  const feiPenalty = process.env.FEI_MAX_PENALTY;
  const ethAmount = process.env.MIN_ETH_AMOUNT;
  const gasLimit = process.env.GAS_LIMIT;
  const gasPrice = process.env.GAS_PRICE;
  if (pastLogs) {
    console.log('Listening to the reweight event');
    console.log(
      `Trying to sell ${feiAmount} FEI with max penalty ${feiPenalty} FEI to get minimum ${ethAmount} ETH for Address ${ethAddress}`
    );
    console.log(`Set gas price ${gasPrice}, gas limit ${gasLimit}`);
  } else {
    console.log('Something is wrong');
    return;
  }
  eventContract.once(eventFilter, async () => {
    let routeContract = new ethers.Contract(FeiRouter.ADDRESS, FeiRouter.ABI, provider);
    let wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
    let contractWithSigner = routeContract.connect(wallet);
    let options = { gasPrice: gasPrice * 1000000000, gasLimit: gasLimit, value: 0 };
    const timestamp = (Date.now() + 30 * 60 * 1000) * 10; // order validate for 30 minutes
    const maxPenalty = ethers.utils.parseEther(feiPenalty).toString();
    const amountIn = ethers.utils.parseEther(feiAmount).toString();
    const amountOutMin = ethers.utils.parseEther(ethAmount).toString();
    let tx = await contractWithSigner.sellFei(
      maxPenalty,
      amountIn,
      amountOutMin,
      ethAddress,
      timestamp.toString(),
      options
    );
    console.log(tx);
  });
}

event_task();
