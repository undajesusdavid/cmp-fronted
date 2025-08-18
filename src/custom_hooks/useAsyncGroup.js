// useAsyncGroup.js
import { useMemo, useCallback } from "react";
import useAsync from "./useAsync"; // Importamos el hook base

const useAsyncGroup = (asyncFunctions) => {
  // Creamos una instancia de useAsync para cada función asíncrona que nos pasen.
  // Esto nos da acceso a la lógica de cancelación y estado de cada llamada.
  const asyncCallers = useMemo(() => {
    return asyncFunctions.map((func) => {
      // Usamos el hook useAsync para cada función
      const { data, loading, error, execute } = useAsync(func);
      return { data, loading, error, execute };
    });
  }, [asyncFunctions]);

  // Consolidamos el estado de 'loading' y 'error' de todas las llamadas
  const loading = asyncCallers.some((caller) => caller.loading);
  const error = asyncCallers.find((caller) => caller.error) || null;
  const data = asyncCallers.map((caller) => caller.data);
  const anyData = asyncCallers.some((caller) => caller.data !== null);

  // La función executeGroup orquesta todas las llamadas
  const executeGroup = useCallback(
    async (...args) => {
      // Si alguna llamada falla, Promise.all se rechaza y el error se captura
      // por el hook que haya fallado. El error consolidado de useAsyncGroup lo detectará.
      return Promise.all(asyncCallers.map((caller) => caller.execute(...args)));
    },
    [asyncCallers]
  );

  return {
    data: anyData ? data : null, // Retornamos null si no hay datos de ninguna llamada
    loading,
    error,
    execute: executeGroup,
  };
};

export default useAsyncGroup;
