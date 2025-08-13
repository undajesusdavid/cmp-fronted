import Table from "../../../../components/Table/Table";
import useTableAction from "../../../../custom_hooks/useTableAction";
import ErrorMessage from "../../../../components/ErrorMessage";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { dataColumns, searchKeys } from "./config";

//Funciones APi
import {
  deleteClasificacion,
  getClasificaciones,
} from "../../../../api/CentralArchive/ClasificacionController";

const TableClasificacion = ({ path }) => {
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
    apiDelete: deleteClasificacion,
    apiDataList: getClasificaciones,
    mConfirmDelete: "¿Esta seguro de eliminar?",
    mDeleted: "Elemento eliminado satisfactoriamente!",
  });

  if (loadingDelete) {
    return <LoadingSpinner message="Eliminando Clasificación" />;
  }

  if (loadingList) {
    return (
      <LoadingSpinner message="Cargando Listado de Clasificaciones" />
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
        emptyMessage="No se encontraron registros"
        onAdd={Add}
        onView={View}
        onEdit={Edit}
        onDelete={Delete}
      />
    </div>
  );
};

export default TableClasificacion;
