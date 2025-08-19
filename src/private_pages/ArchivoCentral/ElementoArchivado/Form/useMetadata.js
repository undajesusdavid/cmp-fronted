import { getClasificaciones } from "../../../../api/CentralArchive/ClasificacionController";
import { getExpedientes } from "../../../../api/CentralArchive/ExpedienteController";
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
import { getContenedores } from "../../../../api/CentralArchive/ContenedorController";
import useAsync from "../../../../custom_hooks/useAsync";

const useMetadata = () => {
  const departamentos = useAsync({
    asyncFunction: getDepartamentos,
    defaultData: [],
    autoRun: true,
  });

  const clasificaciones = useAsync({
    asyncFunction: getClasificaciones,
    defaultData: [],
    autoRun: false,
  });

  const expedientes = useAsync({
    asyncFunction: getExpedientes,
    defaultData: [],
    autoRun: false,
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
