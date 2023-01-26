import { Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ethers from "ethers";

import "./App.css";

function App() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  // const dispatch = useDispatch();
  const { blocks, loading, error, latestBlockNumber } = useSelector(
    (state) => state.blocks
  );

  if (loading && !blocks.length) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <h1 className="text-2xl">Fetching latest block...</h1>
      </div>
    );
  }

  const renderBlocks = () => {
    return blocks.map((block) => {
      return (
        <div
          key={block.hash}
          className="border-gray-200 border-spacing-2 border-solid border border-y p-2 my-2   hover:border-zinc-900 hover:bg-slate-500 hover:text-white hover:cursor-pointer hover:transition-all"
          onClick={() => setSelectedBlock(block)}
        >
          <div className="block__header">
            <div className="block__header__number">Block #{block.number}</div>
            <div className="block__header__hash">{block.hash}</div>
            <div>Total no transactions {block.transactions.length}</div>
          </div>
        </div>
      );
    });
  };

  const renderBlockDetails = () => {
    if (selectedBlock) {
      return (
        <div className="h-screen w-full p-2 bg-slate-50 mt-2 ml-2 border-gray-200 border">
          <div className="block__header">
            <div className="block__header__number">
              Block #{selectedBlock.number}
            </div>
            <div className="block__header__hash">{selectedBlock.hash}</div>
            <div>Total no transactions {selectedBlock.transactions.length}</div>
            <p>Time {selectedBlock.timestamp}</p>
            <p>Gas Limit: {parseInt(selectedBlock.gasLimit)}</p>
            <p>Gas Used: {parseInt(selectedBlock.gasUsed)}</p>
            <p>Miner: {selectedBlock.miner}</p>

            <h2>Transactions</h2>
            <div className="borde bg-slate-200 overflow-scroll max-h-96">
              {selectedBlock.transactions.map((transaction) => {
                // accordion
                return (
                  <div className="border border-gray-700 m-2 p-2">
                    <div className="block__transaction__header">
                      <div className="block__transaction__header__hash">
                        {transaction.hash}

                        <div className="">
                          <p>From: {transaction.from}</p>
                          <p>To: {transaction.to}</p>
                          <p>Value: {parseInt(transaction.value).toString()}</p>
                          {/* <p>Gas: {transaction.gas}</p> */}
                          <p>Gas Price: {parseInt(transaction.gasPrice)}</p>
                          <p>Nonce: {transaction.nonce}</p>
                          <p>Input: {transaction.input}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-screen w-full p-2 bg-slate-50 mt-2 ml-2 border-gray-200 border">
        <p>Select a block to view details</p>
      </div>
    );
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 max-h-screen overflow-scroll">
          {renderBlocks()}
        </div>
        <div className="w-1/2">{renderBlockDetails()}</div>
      </div>
    </div>
  );
}

export default App;
