import { useCallback, useEffect, useState } from "react";

const defaultError = {
  message: "Error de Interno del servidor",
  status: 500,
};

const useDataList = ({ handleGetDataList }) => {
  const [list, setList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [errorList, setErrorList] = useState(null);

  const fetchData = useCallback(async () => {
    setLoadingList(true);
    setErrorList(null);
    try {
      setList(await handleGetDataList());
    } catch (error) {
      setErrorList(error.response.data || defaultError);
    } finally {
      setLoadingList(false);
    }
  }, [handleGetDataList]);


  const reloadList = () => {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { list, loadingList, errorList, reloadList };
};

export default useDataList;
