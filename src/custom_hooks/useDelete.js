import { useState } from "react";
import { structError } from "../utils/errorUtils";

const defaultAfterDelete = () => null;

const useDelete = ({ deleteApi }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(null);

  const onDelete = async (id, afterDelete = defaultAfterDelete) => {
    try {
      setLoadingDelete(true);
      await deleteApi(id);
      afterDelete();
    } catch (error) {
      setErrorDelete(structError(error));
    } finally {
      setLoadingDelete(false);
    }
  };

  return { onDelete, loadingDelete, errorDelete };
};

export default useDelete;
