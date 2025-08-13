import Table from "../../../../components/Table/Table";
import useTableAction from "../../../../custom_hooks/useTableAction";
import ErrorMessage from "../../../../components/ErrorMessage";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { dataColumns, searchKeys } from "./config";

//Funciones APi
import {
  deleteExpediente,
  getExpedientes,
} from "../../../../api/CentralArchive/ExpedienteController";

const TableElementos = ({ path }) => {
  const {
    list,
    loadingList,
    errorList,
    Add,
    View,
    Edit,
    Delete,
    loadingDelete,
    errorDelete,
  } = useTableAction({
    path,
    apiDelete: deleteExpediente,
    apiDataList: getExpedientes,
    mConfirmDelete: "¿Esta seguro de eliminar?",
    mDeleted: "Elemento eliminado satisfactoriamente!",
  });

  if (loadingDelete) {
    return <LoadingSpinner message="Eliminando Expediente" />;
  }

  if (loadingList) {
    return (
      <LoadingSpinner message="Cargando Listado de Expedientes" />
    );
  }

  return (
    <div>
      {errorDelete && !loadingDelete && <ErrorMessage error={errorDelete} />}
      {errorList && loadingList === false && <ErrorMessage error={errorList} />}

      <Table
        columns={dataColumns}
        data={list}
        searchable={true}
        searchKeys={searchKeys}
        rowsPerPageOptions={[3, 5, 10, 15, 20]}
        initialRowsPerPage={10}
        emptyMessage="No se encontraron registros."
        onAdd={Add}
        onView={View}
        onEdit={Edit}
        onDelete={Delete}
      />
    </div>
  );
};

export default TableElementos;