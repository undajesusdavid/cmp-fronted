import { useNavigate } from "react-router-dom";
import useDelete from "./useDelete";
import useDataList from "./useDataList";
import { toast } from "react-toastify";

const useTableAction = ({
  path,
  apiDelete,
  apiDataList,
  mConfirmDelete = "¿Seguro que desea eliminar el elemento seleccionado?",
  mDeleted = "Elemento eliminado correctamente",
}) => {
  const navigate = useNavigate();
  const { list, loadingList, errorList, reloadList } = useDataList({
    handleGetDataList: apiDataList,
  });
  const { onDelete, loadingDelete, errorDelete } = useDelete({
    deleteApi: apiDelete,
  });

  const Add = () => {
    navigate(`${path}/agregar`);
  };

  const View = (row) => {
    navigate(`${path}/detalle/${row.id}`);
  };

  const Edit = (row) => {
    navigate(`${path}/editar/${row.id}`);
  };

  const Delete = async (row) => {
    if (window.confirm(mConfirmDelete)) {
      onDelete(row?.id, () => {
        reloadList();
        toast.success(mDeleted, {
          theme: "light",
          position: "top-right",
        });
      });
    }
  };

  return {
    list,
    loadingList,
    errorList,
    Add,
    View,
    Edit,
    Delete,
    loadingDelete,
    errorDelete,
  };
};

export default useTableAction;
