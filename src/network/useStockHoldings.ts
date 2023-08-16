import {useEffect, useState} from 'react';
import callApi from './index.network';
import {INRFormatter} from '../utils/index.utils';
export interface Response {
  data: StocksDataProps[];
}
export interface StocksDataProps {
  avg_price: string;
  cnc_used_quantity: number;
  collateral_qty: number;
  collateral_type: string;
  collateral_update_qty: number;
  company_name: string;
  haircut: number;
  holdings_update_qty: number;
  isin: string;
  product: string;
  quantity: number;
  symbol: string;
  t1_holding_qty: number;
  token_bse: string;
  token_nse: string;
  withheld_collateral_qty: number;
  withheld_holding_qty: number;
  ltp: number;
  close: number;
  currentValue?: string;
  investmentValue?: string;
  pnl?: string;
}
export const useStocksHoldings = () => {
  const [apiState, setApiState] = useState<{
    data: {
      stocksData?: StocksDataProps[];
      totalCurrentVal?: string;
      totalInvestmentVal?: string;
      todaysTotalPNL?: string;
      totalPNL?: string;
    };
    loading: boolean;
    error: string;
  }>({
    data: {},
    loading: true,
    error: '',
  });

  const process = ({isRefetchFlow = false}) => {
    if (isRefetchFlow) {
      setApiState({
        data: {},
        loading: true,
        error: '',
      });
    }
    const data = callApi({endpoint: 'v3/6d0ad460-f600-47a7-b973-4a779ebbaeaf'});
    data
      .then(res => {
        setApiState({
          data: updateResponse({data: res.data}),
          loading: false,
          error: res.error,
        });
      })
      .catch(err => {
        setApiState({
          data: {},
          loading: false,
          error: err,
        });
      });
  };

  const updateResponse = ({data = []}) => {
    let totalCurrentVal = 0,
      totalInvestmentVal = 0,
      totalPNL = 0,
      todaysTotalPNL = 0;
    const updatedData = data?.map((item: StocksDataProps) => {
      const {quantity = 0, ltp = 0, avg_price = '', close = 0} = item || {};
      const currentValue = ltp * quantity;
      const investmentValue = Number(avg_price) * quantity;
      const pnl = currentValue - investmentValue;
      const todaysPNL = (close - ltp) * quantity;
      totalCurrentVal = totalCurrentVal + currentValue;
      totalInvestmentVal = totalInvestmentVal + investmentValue;
      totalPNL = totalPNL + pnl;
      todaysTotalPNL = todaysPNL + todaysTotalPNL;
      return {
        ...item,
        currentValue: INRFormatter(currentValue),
        investmentValue: INRFormatter(investmentValue),
        pnl: pnl > 0 ? INRFormatter(pnl) : `- ${INRFormatter(pnl)}`,
      };
    });
    return {
      stocksData: updatedData,
      totalCurrentVal: INRFormatter(totalCurrentVal),
      totalInvestmentVal: INRFormatter(totalInvestmentVal),
      totalPNL: INRFormatter(totalPNL),
      todaysTotalPNL:
        todaysTotalPNL > 0
          ? INRFormatter(todaysTotalPNL)
          : `- ${INRFormatter(todaysTotalPNL)}`,
    };
  };

  useEffect(() => {
    process({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {...apiState, refetch: () => process({isRefetchFlow: true})};
};
