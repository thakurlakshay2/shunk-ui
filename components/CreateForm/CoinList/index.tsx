"use client"; // Ensure this is a Client Component

import { CoinData } from "@/app/api/coinData/route";
import { CREATE_FORM_TABLE_COLUMN_SIZE } from "@/constants/tableSizes";
import { useHandleSearch } from "@/hooks/useHandleSearch";
import AnimatedNumber from "@/shared/AnimatedNumber";
import { BubbleDrag } from "@/shared/BubbleDrag";
import { Datatable } from "@/shared/DataTable";
import {
  TableHeaderField,
  TableHeaders,
  TableRows,
} from "@/shared/DataTable/typings";
import { Modal } from "@/shared/Modal";
import Skeleton from "@/shared/Skeleton";
import { useContract } from "@thirdweb-dev/react";
import { FastAverageColor } from "fast-average-color";
import Image from "next/image";
import { useEffect, useState } from "react";
import { coinListApiResponse, CoinListData } from "../../../constants/coinList";
import { Item, PercentageDistributor } from "../../PercentageDistributor";
import Checkbox from "../../primitives/Checkbox";
import ProfitLoss from "../../shared/ProfitLoss";
import { ShunkFactoryABI } from "../CONTRACT_ABI";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
});

const formatMarketCap = (marketCap: number) => {
  if (marketCap > 1_000_000_000) {
    return (
      (marketCap / 1_000_000_000).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }) + "B"
    );
  } else if (marketCap > 1_000_000) {
    return (
      (marketCap / 1_000_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }) + "M"
    );
  } else if (marketCap > 1_000) {
    return (
      (marketCap / 1_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }) + "k"
    );
  } else {
    return marketCap;
  }
};

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
export const CoinList = () => {
  const [input, setInput] = useState<string>("");
  const [selectedCoinId, setSelectedCoinId] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  // const [coinData, setOneInchData] = useState<OneInchInterface[]>([]);
  const [coinData, setCoinData] = useState<CoinData[]>([]);
  const { filteredData } = useHandleSearch<CoinListData>(
    coinListApiResponse.data,
    ["name", "symbol"],
    input
  );
  const [isCreatingContract, setIsCreatingContract] = useState<boolean>(false);

  const { contract, isLoading, error } = useContract(
    CONTRACT_ADDRESS,
    ShunkFactoryABI
  );

  useEffect(() => {
    const getCoinList = async () => {
      const response = await fetch("/api/coinData");
      const responseData: CoinData[] = await response?.json();

      setCoinData(responseData);
    };

    getCoinList();
  }, []);

  const tableHeaders: TableHeaders[] = [
    {
      field: TableHeaderField.CHECKBOX,
      component: (
        <input
          disabled
          type="checkbox"
          value=""
          className="w-5 h-5 appearance-none border   rounded-md mr-2 border-indigo-500 bg-indigo-100 "
        />
      ),
      align: "text-start",
    },
    {
      field: TableHeaderField.CRYPTO_INFO,
      component: "Coin",
      align: "text-start",
      isSearch: true,
    },
    {
      field: TableHeaderField.CRYPTO_PRICE,
      component: "Price",
      align: "flex-auto text-end",
    },
    {
      field: TableHeaderField.MARKET_CAP,
      component: "Market Cap",
      align: "text-end",
    },
  ];

  const dataRows: TableRows[][] = coinData?.map((coinData, id) => {
    return [
      {
        field: TableHeaderField.CHECKBOX,
        component: (
          <Checkbox
            label={""}
            checked={selectedCoinId.includes(coinData.symbol)}
            onChange={() => {
              setSelectedCoinId((prev) => {
                if (prev.includes(coinData.symbol)) {
                  return prev.filter((id) => id != coinData.symbol);
                } else {
                  const newSelection = [...prev, coinData.symbol];
                  return newSelection;
                }
              });
            }}
          />
        ),
        className: "p-5",
      },
      {
        field: TableHeaderField.CRYPTO_INFO,
        component: (
          <div className="flex gap-8">
            <Image
              src={coinData.icon}
              alt={coinData.name + "logo"}
              className="w-10 h-10 mt-1 rounded-full"
              width={32}
              height={32}
            />
            <div>
              <p className="truncate w-48">{coinData.name}</p>
              <p>{coinData.symbol}</p>
            </div>
          </div>
        ),
        searchText: coinData.name.concat(",", coinData.symbol),
      },
      {
        field: TableHeaderField.CRYPTO_PRICE,
        component: (
          <div className="flex justify-end text-end">
            <div>
              {/* <p>{formatter.format(coinData.quote.USD.price)}</p> */}
              <p>{(coinData?.priceUSD || 0).toFixed(4)}</p>

              <span>
                <ProfitLoss percentage={coinData?.percentChange || 0} />
              </span>
            </div>
          </div>
        ),
      },
      {
        field: TableHeaderField.MARKET_CAP,
        component: (
          <p className="text-end">
            {formatMarketCap(coinData?.marketCap || 0)}
          </p>
        ),
      },
    ];
  });

  const [itemsContent, setItemContent] = useState<Item[]>([]);
  useEffect(() => {
    const setAsyncItems = async () => {
      const fac = new FastAverageColor();
      const result = await Promise.all(
        selectedCoinId.map(async (coinId) => {
          const data = coinData.find((data) => data.symbol === coinId);
          const color = await fac.getColorAsync(data.icon);

          return {
            id: data?.["_id"],
            name: (
              <li
                key={coinId}
                className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-white text-gray-900 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer"
              >
                <div className="group flex justify-between w-full hover:text-indigo-600">
                  <div className="flex gap-8">
                    <Image
                      src={data.icon}
                      alt={data?.name + " logo"}
                      className="w-10 h-10 rounded-full self-center mt-1"
                      width={32}
                      height={32}
                    />
                    <div>
                    <p className="text-lg pt-1">{data?.symbol}</p>
                      <p className="text-md pt-1">{data?.name}</p>
                    
                    </div>
                  </div>
                </div>
              </li>
            ),
            percentage: 100 / selectedCoinId.length,
            color: color?.hex ?? "",
          } as Item;
        })
      );
      setItemContent(result);
    };

    setAsyncItems();
  }, [coinData, selectedCoinId]);

  const handleChange = (id: number | string, value: number) => {
    setItemContent((data) => {
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, percentage: value } : item
      );
      return updatedData;
    });
  };

  return (
    <div>
      <div className="max-w[80vw] p-8 min-w[50vw] h-full grid gap-4">
        <div
          className={`fixed w-full h-full ${
            isCreatingContract ? "z-1000" : ""
          }`}
        >
          {selectedCoinId.map((coinId) => {
            const data = coinData.find((data) => data.symbol === coinId);
            return (
              <BubbleDrag
                key={coinId}
                isLoading={isCreatingContract}
                data={
                  <Image
                    src={data?.icon || ""}
                    alt={data?.name + "logo"}
                    className="w-14 h-14 pointer-events-none rounded-full"
                    width={64}
                    height={64}
                  />
                }
                size={
                  Math.max((5 * 5) / Math.min(selectedCoinId.length, 10), 5) *
                  (isCreatingContract ? 2 : 1)
                }
              />
            );
          })}
        </div>
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClickPrimaryButton={() => {
            setIsCreatingContract(true);
            // TODO: Remove when integrating contract
            setTimeout(() => {
              setIsCreatingContract(false);
            }, 2000);
          }}
          onClickSecondaryButton={() => {
            setIsCreatingContract(false);
            setOpenModal(false);
          }}
          modalContent={
            <div className=" justify-center relative flex gap-10">
              <PercentageDistributor
                items={itemsContent}
                handleChange={handleChange}
              ></PercentageDistributor>
            </div>
          }
        >
          <div className=" flex justify-between">
            <div className="content-center">
              {" "}
              <p className=" text-center text-2xl -z-10 font-medium">
                BUIDL your own bag (BYOB)
              </p>
            </div>
            <div>
              <button
                onClick={(e) => {
                  if (selectedCoinId.length === 0) {
                    return;
                  }
                  setOpenModal(true);
                }}
                disabled={selectedCoinId.length === 0}
                className={`modal-button relative items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all duration-500 rounded-xl group
    ${
      selectedCoinId.length === 0
        ? "text-sm bg-indigo-300 text-white font-semibold text-center shadow-xs cursor-not-allowed"
        : "bg-indigo-500 text-base font-semibold group-hover:text-white"
    }
  `}
              >
                <span className="relative w-auto text-base font-semibold text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Confirm
                  <AnimatedNumber value={selectedCoinId.length} />
                </span>
              </button>
            </div>
          </div>
        </Modal>
        <Datatable
          headers={tableHeaders}
          rows={coinData.length === 0 ? dataRowsShimmer : dataRows}
          columnSizes={CREATE_FORM_TABLE_COLUMN_SIZE}
          customStyles={{ width: "800px" }}
          isLoading={coinData.length === 0}
        />
      </div>
    </div>
  );
};
