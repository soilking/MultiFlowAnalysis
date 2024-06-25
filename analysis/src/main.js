const { getContractAsync } = require("./datasources/contracts");
const { multiflowSG, gql } = require("./datasources/subgraph-client");
const abi = require('../../abis/uniswap.json');

const USDC_WETH = "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc";

(async () => {

  const result = await multiflowSG(gql`
    {
      liquidities(
        where: {percentLpSupplyChange_gt: "1"}
        first: 5
      ) {
        id
        eventBlock
        blockDiff
        txHash
        percentPriceChange0
        percentPriceChange1
        percentReserveChange0
        percentReserveChange1
        percentLpSupplyChange
        prevLpSupply
        newLpSupply
        prevPrice
        newPrice
        prevReserves
        newReserves
      }
      swaps(
        where: {percentPriceChange0_gt: "1"}
        first: 5
      ) {
        id
        eventBlock
        blockDiff
        txHash
        percentPriceChange0
        percentPriceChange1
        percentReserveChange0
        percentReserveChange1
        prevPrice
        newPrice
        prevReserves
        newReserves
      }
    }
  `);
  console.log('subgraph result: ', result.swaps);

  const contract = await getContractAsync(USDC_WETH, abi);
  const reserves = await contract.callStatic.getReserves({blockTag: 10091796});
  console.log(reserves.map(BigInt));

})();
