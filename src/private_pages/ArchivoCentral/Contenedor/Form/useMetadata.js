import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
import { getUnidadesConservacion } from "../../../../api/CentralArchive/UnidadConservacionController";
import useAsync from "../../../../custom_hooks/useAsync";

const useMetadata = (formDefaultData = null) => {
  const departamentos = useAsync({
    asyncFunction: getDepartamentos,
    defaultData: [],
    autoRun: true,
  });

  const unidadesDeConservacion = useAsync({
    asyncFunction: getUnidadesConservacion,
    defaultData: [],
    autoRun: true,
  });

  
  return {
    departamentos,
    unidadesDeConservacion
  }
};


export default useMetadata;
