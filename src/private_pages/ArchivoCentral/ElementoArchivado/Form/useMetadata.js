import { getClasificaciones } from "../../../../api/CentralArchive/ClasificacionController";
import { getExpedientes } from "../../../../api/CentralArchive/ExpedienteController";
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
import { getContenedores } from "../../../../api/CentralArchive/ContenedorController";
import useAsync from "../../../../custom_hooks/useAsync";

const useMetadata = ({isEdit = false}) => {
  const departamentos = useAsync({
    asyncFunction: getDepartamentos,
    defaultData: [],
    autoRun: true,
  });

  const clasificaciones = useAsync({
    asyncFunction: getClasificaciones,
    defaultData: [],
    autoRun: isEdit,
  });

  const expedientes = useAsync({
    asyncFunction: getExpedientes,
    defaultData: [],
    autoRun: isEdit,
  });

  const contenedores = useAsync({
    asyncFunction: getContenedores,
    defaultData: [],
    autoRun: false,
  });

  return {
    departamentos,
    clasificaciones,
    expedientes,
    contenedores
  }
};


export default useMetadata;
