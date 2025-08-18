import { useState, useCallback, useEffect, useRef } from "react";

const useAsync = ({ asyncFunction, defaultData = null, autoRun = false }) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const originalDataRef = useRef(defaultData); // Guardamos los datos originales
  const lastCallId = useRef(0);
  const controllerRef = useRef(null);

  const execute = useCallback(
    async (...args) => {
      const currentId = ++lastCallId.current;

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const response = await asyncFunction(...args, controller.signal);

        if (currentId === lastCallId.current) {
          originalDataRef.current = response; // Guardamos los datos originales
          setData(response);
        }

        return response;
      } catch (err) {
        if (err.name !== "AbortError" && currentId === lastCallId.current) {
          console.error("Async error:", err);
          setError(err);
        }

        return Promise.reject(err);
      } finally {
        if (currentId === lastCallId.current) {
          setLoading(false);
          controllerRef.current = null;
        }
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setData(defaultData);
    originalDataRef.current = defaultData;
    setError(null);
    setLoading(false);
  }, [defaultData]);

  const filterData = useCallback((filterFn) => {
    if (typeof filterFn === "function") {
      const filtered = originalDataRef.current?.filter?.(filterFn);
      setData(filtered ?? []);
    }
  }, []);

  useEffect(() => {
    if (autoRun) {
      execute();
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [autoRun, execute]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    filterData, // 👈 Exponemos la función de filtrado
  };
};

export default useAsync;
