import { useEffect, useState } from "react";
import callApi from "./index.network";
import { ENV_VARIABLE } from "./env.constants";

export const useSearchedResultsData = ({ searchedText = "" }) => {
  const [apiState, setApiState] = useState<{
    data: any[];
    loading: boolean;
    error: string;
  }>({
    data: [],
    loading: true,
    error: "",
  });

  const process = ({ isRefetchFlow = false }) => {
    if (isRefetchFlow) {
      setApiState({
        data: [],
        loading: true,
        error: "",
      });
    }
    const data = callApi({
      endpoint: ENV_VARIABLE.POPULAR_MOVIES + searchedText,
      options: {},
    });
    data
      .then((res) => {
        setApiState({
          data: res.results,
          loading: false,
          error: res.error,
        });
      })
      .catch((err) => {
        setApiState({
          data: [],
          loading: false,
          error: err,
        });
      });
  };

  useEffect(() => {
    process({});
  }, []);

  return { ...apiState, refetch: () => process({ isRefetchFlow: true }) };
};
