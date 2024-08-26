"use client"; // Ensure this is a Client Component

import { coinListMetaData } from "@/constants/coinListMetadata";
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
import PercentageChange from "@/shared/PercentageChange";
import Image from "next/image";
import { useState } from "react";
import { coinListApiResponse, CoinListData } from "../../constants/coinList";
import Checkbox from "../primitives/Checkbox";
import ProfitLoss from "../shared/ProfitLoss";
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

export const CreateForm = () => {
  const [input, setInput] = useState<string>("");
  const [selectedCoinId, setSelectedCoinId] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { filteredData } = useHandleSearch<CoinListData>(
    coinListApiResponse.data,
    ["name", "symbol"],
    input
  );

  const tableHeaders: TableHeaders[] = [
    {
      field: TableHeaderField.CHECKBOX,
      component: (
        <input
          type="checkbox"
          value=""
          className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
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
  const dataRows: TableRows[][] = filteredData.map((coinData) => {
    return [
      {
        field: TableHeaderField.CHECKBOX,
        component: (
          <Checkbox
            label={""}
            checked={selectedCoinId.includes(coinData.id)}
            onChange={() => {
              setSelectedCoinId((prev) => {
                if (prev.includes(coinData.id)) {
                  return prev.filter((id) => id != coinData.id);
                } else {
                  const newSelection = [...prev, coinData.id];
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
              src={coinListMetaData.data?.[coinData.id + ""]?.logo || ""}
              alt={coinData.name + "logo"}
              className="w-10 h-10 mt-1"
              width={64}
              height={64}
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
              <p>{formatter.format(coinData.quote.USD.price)}</p>
              <p>
                <ProfitLoss
                  percentage={+coinData.quote.USD.percent_change_24h || 0}
                />
              </p>
            </div>
          </div>
        ),
      },
      {
        field: TableHeaderField.MARKET_CAP,
        component: (
          <p className="text-end">
            {formatMarketCap(coinData.quote.USD.market_cap)}
          </p>
        ),
      },
    ];
  });
  return (
    <div className="h-[80%]">
      <div className="relative">
        <div className="flex justify-between flex-row items-center">
          <div>
            <Modal
              openModal={openModal}
              setOpenModal={setOpenModal}
              onClickPrimaryButton={() => {}}
              onClickSecondaryButton={() => {}}
              modalContent={
                <div className="relative flex gap-10">
                  <ul className="w-2/4 flex flex-col border-r-2	border-indigo-500/100 h-full">
                    {selectedCoinId.map((coinId) => {
                      const coinData = coinListApiResponse.data.find(
                        (data) => data.id === coinId
                      );
                      return (
                        <li
                          key={coinId}
                          className=" inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-white border-b-2	 border-gray-300 text-gray-900 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer"
                        >
                          <div className="group flex justify-between w-full hover:text-indigo-600">
                            <div className="flex gap-8">
                              <Image
                                src={
                                  coinListMetaData.data?.[coinData?.id + ""]
                                    ?.logo || ""
                                }
                                alt={coinData?.name + "logo"}
                                className="w-10 h-10"
                                width={10}
                                height={10}
                              />
                              <div>
                                <p>{coinData?.name}</p>
                                <p>{coinData?.symbol}</p>
                              </div>
                            </div>
                          </div>
                          <PercentageChange
                            initialPercentage={selectedCoinId.length / 100}
                            onPercentageChange={function (
                              newPercentage: number
                            ): void {}}
                          />
                        </li>
                      );
                    })}
                  </ul>
                  <div className="relative w-full">
                    {selectedCoinId.map((coinId) => {
                      const coinData = coinListApiResponse.data.find(
                        (data) => data.id === coinId
                      );
                      return (
                        <BubbleDrag
                          key={coinId}
                          data={
                            <Image
                              src={
                                coinListMetaData.data?.[coinData?.id + ""]
                                  ?.logo || ""
                              }
                              alt={coinData?.name + "logo"}
                              className="w-10 h-10 pointer-events-none"
                              width={10}
                              height={10}
                            />
                          }
                          size={selectedCoinId.length / 100}
                        />
                      );
                    })}
                  </div>
                </div>
              }
            >
              <button
                onClick={(e) => {
                  setOpenModal(true);
                }}
                className="modal-button relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-xl group"
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-300 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-300 ease-in-out delay-200 -translate-x-full translate-y-full bg-indigo-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                <span className="relative w-auto text-base font-semibold text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Create Contract
                  <AnimatedNumber value={selectedCoinId.length} />
                </span>
              </button>
            </Modal>
          </div>
        </div>
        <div className="max-w[80vw] p-12 min-w[50vw]">
          <Datatable
            headers={tableHeaders}
            rows={dataRows}
            columnSizes={CREATE_FORM_TABLE_COLUMN_SIZE}
          />
        </div>
      </div>
    </div>
  );
};
