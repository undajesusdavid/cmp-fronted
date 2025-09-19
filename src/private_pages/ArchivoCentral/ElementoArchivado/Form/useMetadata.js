import { getClasificaciones } from "../../../../api/CentralArchive/ClasificacionController";
import { getExpedientes } from "../../../../api/CentralArchive/ExpedienteController";
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
import { getContenedores } from "../../../../api/CentralArchive/ContenedorController";
import useAsync from "../../../../custom_hooks/useAsync";
import { useEffect } from "react";

const useMetadata = (formDefaultData = null) => {
  const departamentoId = formDefaultData?.departamento_id;

  const departamentos = useAsync({
    asyncFunction: getDepartamentos,
    defaultData: [],
    autoRun: true,
  });

  const clasificaciones = useAsync({
    asyncFunction: getClasificaciones,
    defaultData: [],
  });

  const expedientes = useAsync({
    asyncFunction: getExpedientes,
    defaultData: [],
  });

  const contenedores = useAsync({
    asyncFunction: getContenedores,
    defaultData: [],
  });


  useEffect(() => {
    // Si no hay un ID de departamento, no hacemos nada
    if (!departamentoId) {
      return;
    }

    // Ejecutamos las llamadas en paralelo para mayor eficiencia
    const promises = [
      clasificaciones.execute(departamentoId),
      expedientes.execute(departamentoId),
      contenedores.execute(departamentoId),
    ];

    Promise.all(promises);

  }, [departamentoId]);

  return {
    departamentos,
    clasificaciones,
    expedientes,
    contenedores,
  };
};

export default useMetadata;