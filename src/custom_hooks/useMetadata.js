import { useMemo } from "react";
import useAsync from "./useAsync";

const useMetadata = (list = []) => {
  const metaData = useMemo(() => {
    const result = {};

    list.forEach((meta) => {
      result[meta.name] = useAsync({
        asyncFunction: meta.asyncFunction,
        defaultData: meta.defaultData,
        autoRun: meta.autoRun,
      });
    });

    return result;
  }, [list]);

  return { metaData };
};

export default useMetadata;
