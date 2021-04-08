import { ethers } from 'ethers';

async function event_task() {
  // Step1: 到 https://www.alchemyapi.io/ 注册api key 填到这里
  const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/api_key');
  let event_abi = [
    {
      inputs: [
        { internalType: 'address', name: '_core', type: 'address' },
        { internalType: 'address', name: '_pcvDeposit', type: 'address' },
        { internalType: 'address', name: '_oracle', type: 'address' },
        { internalType: 'uint256', name: '_incentiveAmount', type: 'uint256' },
        { internalType: 'uint256', name: '_minDistanceForReweightBPs', type: 'uint256' },
        { internalType: 'address', name: '_pair', type: 'address' },
        { internalType: 'address', name: '_router', type: 'address' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: '_core', type: 'address' }],
      name: 'CoreUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: '_oracle', type: 'address' }],
      name: 'OracleUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: '_pcvDeposit', type: 'address' }],
      name: 'PCVDepositUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: '_pair', type: 'address' }],
      name: 'PairUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
      name: 'Paused',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: '_caller', type: 'address' }],
      name: 'Reweight',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'ReweightIncentiveUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, internalType: 'uint256', name: '_basisPoints', type: 'uint256' }],
      name: 'ReweightMinDistanceUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, internalType: 'uint256', name: '_reweightWithdrawBPs', type: 'uint256' }],
      name: 'ReweightWithdrawBPsUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
      name: 'Unpaused',
      type: 'event',
    },
    {
      inputs: [],
      name: 'core',
      outputs: [{ internalType: 'contract ICore', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
          internalType: 'struct Decimal.D256',
          name: 'price',
          type: 'tuple',
        },
        {
          components: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
          internalType: 'struct Decimal.D256',
          name: 'peg',
          type: 'tuple',
        },
      ],
      name: 'deviationBelowPeg',
      outputs: [
        {
          components: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
          internalType: 'struct Decimal.D256',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'fei',
      outputs: [{ internalType: 'contract IFei', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'feiBalance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'forceReweight', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [],
      name: 'getReserves',
      outputs: [
        { internalType: 'uint256', name: 'feiReserves', type: 'uint256' },
        { internalType: 'uint256', name: 'tokenReserves', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'incentiveContract',
      outputs: [{ internalType: 'contract IUniswapIncentive', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
          internalType: 'struct Decimal.D256',
          name: 'price',
          type: 'tuple',
        },
      ],
      name: 'invert',
      outputs: [
        {
          components: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
          internalType: 'struct Decimal.D256',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'liquidityOwned',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'minDistanceForReweight',
      outputs: [
        {
          components: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
          internalType: 'struct Decimal.D256',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'oracle',
      outputs: [{ internalType: 'contract IOracle', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'pair',
      outputs: [{ internalType: 'contract IUniswapV2Pair_3', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [],
      name: 'paused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'pcvDeposit',
      outputs: [{ internalType: 'contract IPCVDeposit', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'peg',
      outputs: [
        {
          components: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
          internalType: 'struct Decimal.D256',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'reweight', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [],
      name: 'reweightEligible',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'reweightIncentiveAmount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'reweightWithdrawBPs',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'router',
      outputs: [{ internalType: 'contract IUniswapV2Router02_2', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'core', type: 'address' }],
      name: 'setCore',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_oracle', type: 'address' }],
      name: 'setOracle',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_pcvDeposit', type: 'address' }],
      name: 'setPCVDeposit',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_pair', type: 'address' }],
      name: 'setPair',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      name: 'setReweightIncentive',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'basisPoints', type: 'uint256' }],
      name: 'setReweightMinDistance',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_reweightWithdrawBPs', type: 'uint256' }],
      name: 'setReweightWithdrawBPs',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'token',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'tribe',
      outputs: [{ internalType: 'contract IERC20_5', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'tribeBalance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [],
      name: 'updateOracle',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
  ];
  let event_contract_address = '0x7a165F8518A9Ec7d5DA15f4B77B1d7128B5D9188';
  let event_contract = new ethers.Contract(event_contract_address, event_abi, provider);
  let event_filter = {
    address: event_contract_address,
    topics: [event_contract.interface.events.Reweight],
  };
  event_contract.once(event_filter, async () => {
    let route_abi = [
      {
        inputs: [
          { internalType: 'address', name: 'pair', type: 'address' },
          { internalType: 'address', name: 'weth', type: 'address' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        inputs: [],
        name: 'PAIR',
        outputs: [{ internalType: 'contract IUniswapV2Pair', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'WETH',
        outputs: [{ internalType: 'contract IWETH', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'minReward', type: 'uint256' },
          { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        name: 'buyFei',
        outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256', name: 'maxPenalty', type: 'uint256' },
          { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
          { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        name: 'sellFei',
        outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      { stateMutability: 'payable', type: 'receive' },
    ];
    let route_address = '0x9271D303b57c204636C38Df0eD339b18Bf98f909';
    let route_contract = new ethers.Contract(route_address, route_abi, provider);
    // Step2 你的eth 地址私钥
    let privateKey = '';
    let wallet = new ethers.Wallet(privateKey, provider);
    let contractWithSigner = route_contract.connect(wallet);
    // Step3 225 是gas price，可以调的大一点
    let options = { gasPrice: 225000000000, gasLimit: 500000, value: 0 };
    const timestamp = (Date.now() + 30 * 60 * 1000) * 10;
    // Step4 根据实际情况，需要改成你自己的数字
    const maxPenalty = ethers.utils.parseEther('30000').toString(); // 最大的penalty，目前应该可以随便填，我填了3万
    const amountIn = ethers.utils.parseEther('240000').toString(); // 要卖的fei数量，我使用了默认卖24万fei
    const amountOutMin = ethers.utils.parseEther('105').toString(); // 兑换的最小数量，兑换最少105个eth
    let tx = await contractWithSigner.sellFei(
      maxPenalty,
      amountIn,
      amountOutMin,
      'your adddress', // Step5 你的 eth 地址
      timestamp.toString(),
      options
    );
    console.log(tx);
  });
}

event_task();
