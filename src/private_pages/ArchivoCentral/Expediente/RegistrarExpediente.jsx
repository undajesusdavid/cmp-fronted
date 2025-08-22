import Form from "./Form";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import ErrorMessage from "../../../components/ErrorMessage";
import { addExpediente } from "../../../api/CentralArchive/ExpedienteController";


import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAsync from "../../../custom_hooks/useAsync";

const RegistrarExpediente = () => {
  const navigate = useNavigate();
  const {
    execute: handleSubmit,
    loading,
    error,
  } = useAsync({
    asyncFunction: addExpediente,
    defaultData: {},
    successFunction: (expediente) => {
      navigate("/archivo-central/expedientes");
      toast.success("¡Expediente " + expediente?.codigo + " registrado exitosamente!")
    },
  });


  return (
    <div>
      <ButtonBack />
      {error && loading === false && (
        <ErrorMessage message="Ha ocurrido un error, no se registro el expediente" />
      )}

      <Form
        onSubmit={handleSubmit}
        submitLabel="Registrar Expediente"
        loading={loading}
      />
    </div>
  );
};

export default RegistrarExpediente;
