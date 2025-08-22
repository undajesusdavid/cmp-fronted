import Form from "./Form";
import { addClasificacion } from "../../../api/CentralArchive/ClasificacionController";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import useAsync from "../../../custom_hooks/useAsync";

const RegistrarClasificacion = () => {
  const navigate = useNavigate();
  const { execute, loading, error } = useAsync({
    asyncFunction: addClasificacion,
    defaultData: {},
    successFunction: (data) => {
      navigate("/archivo-central/clasificacion");
      toast.success("Clasificación registrada exitosamente");
    },
  });

  return (
    <div>
      {error && loading === false && (
        <ErrorMessage message="Ha ocurrido un error, no se registro la clasificación" />
      )}
      <ButtonBack />
      <Form
        submitLabel="Registrar Clasificación"
        onSubmit={execute}
        loading={loading}
      />
    </div>
  );
};

export default RegistrarClasificacion;
