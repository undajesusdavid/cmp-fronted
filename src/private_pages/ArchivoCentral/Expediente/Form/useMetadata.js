import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
import useAsync from "../../../../custom_hooks/useAsync";

const useMetadata = (formDefaultData = null) => {
  const departamentos = useAsync({
    asyncFunction: getDepartamentos,
    defaultData: [],
    autoRun: true,
  });

  return {
    departamentos,
  }
};


export default useMetadata;
