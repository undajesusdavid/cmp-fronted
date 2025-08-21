import { getClasificaciones } from "../../../../api/CentralArchive/ClasificacionController";
import { getExpedientes } from "../../../../api/CentralArchive/ExpedienteController";
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
import { getContenedores } from "../../../../api/CentralArchive/ContenedorController";
import useAsync from "../../../../custom_hooks/useAsync";
import { useEffect } from "react";

const useMetadata = (formDefaultData = null) => {
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


  useEffect(() => {
    if(formDefaultData && formDefaultData.departamento_id){
      clasificaciones.execute(formDefaultData?.departamento_id);
      expedientes.execute(formDefaultData?.departamento_id);
      contenedores.execute(formDefaultData?.departamento_id);
    }

  },[formDefaultData]);

  return {
    departamentos,
    clasificaciones,
    expedientes,
    contenedores
  }
};


export default useMetadata;
