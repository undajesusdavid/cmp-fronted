
import FormElementos from "./Form";
import { addElementoArchivado } from "../../../api/CentralArchive/ElementoController";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import useAsync from "../../../custom_hooks/useAsync";

const RegistrarElemento = () => {
  const navigate = useNavigate();
  const  {execute, loading, error} = useAsync({
    asyncFunction: addElementoArchivado,
    defaultData: null,
    successFunction: () => {
      toast.success("¡Elemento registrado con éxito!");
      navigate("/archivo-central/elementos");
    }
  });

  return (
    <div>
      <ButtonBack />
      <FormElementos
        submitLabel="Registrar Elemento"
        loading={loading}
        onSubmit={execute}
      />
    </div>
  );
};

export default RegistrarElemento;
