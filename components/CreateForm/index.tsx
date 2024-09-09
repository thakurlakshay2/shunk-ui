"use client"; // Ensure this is a Client Component
import { CoinData } from "@/app/api/coinData/route";
import { TableHeaderField, TableRows } from "@/shared/DataTable/typings";
import Skeleton from "@/shared/Skeleton";
import { useEffect, useState } from "react";
import { CoinList } from "./CoinList";

const shimmerArrayLoop = new Array(8).fill(1);
const dataRowsShimmer: TableRows[][] = shimmerArrayLoop.map(() => {
  return [
    {
      field: TableHeaderField.CHECKBOX,
      component: (
        <Skeleton isLoading={true} width="w-5 rounded-md	" height="h-5" />
      ),
      className: "p-5",
    },
    {
      field: TableHeaderField.CRYPTO_INFO,
      component: (
        <div className=" w-full flex gap-4">
          <Skeleton
            isLoading={true}
            height="h-10"
            width={"w-10"}
            type="circle"
          />
          <div className="w-3/5 flex flex-col gap-4">
            <Skeleton isLoading={true} height="h-4" width={"w-full"} />
            <Skeleton isLoading={true} height="h-4" width={"w-1/2"} />
          </div>
        </div>
      ),
    },
    {
      field: TableHeaderField.CRYPTO_PRICE,
      component: (
        <div className="w-full flex flex-col gap-4 place-items-end		">
          <Skeleton isLoading={true} height="h-4" width={"w-full"} />
          <Skeleton isLoading={true} height="h-4" width={"w-1/3"} />
        </div>
      ),
    },
    {
      field: TableHeaderField.MARKET_CAP,
      component: (
        <div className="w-full  place-items-end	">
          <Skeleton isLoading={true} width={"w-full"} />
        </div>
      ),
    },
  ];
});

const CONTRACT_ADDRESS = process.env.BASE_CONTRACT_ADDRESS;
export const CreateForm = () => {
  const [selectedCoinId, setSelectedCoinId] = useState<string[]>([]);
  const [coinData, setCoinData] = useState<CoinData[]>([]);

  useEffect(() => {
    const getCoinList = async () => {
      const response = await fetch("/api/coinData");
      const responseData: CoinData[] = await response?.json();

      setCoinData(responseData);
    };

    getCoinList();
  }, []);

  return (
    <div>
      {/* <Stepper /> */}
      <CoinList />
    </div>
  );
};
