import { getClasificaciones } from "../../../../api/CentralArchive/ClasificacionController";
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
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

  return {
    departamentos,
    clasificaciones
  }
};


export default useMetadata;
