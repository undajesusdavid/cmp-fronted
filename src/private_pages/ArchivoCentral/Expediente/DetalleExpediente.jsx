import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExpediente } from "../../../api/CentralArchive/ExpedienteController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import SectionDetail from "../../../components/SectionDetail/SectionDetail";
import DetailItem from "../../../components/DetailItem/DetailItem";

const DetalleExpediente = () => {
  const { id } = useParams();
  const [expediente, setExpediente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fecthData = async () => {
    try {
      setLoading(true);
      setExpediente(await getExpediente(id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  if (loading) return <LoadingSpinner message="Registrando Contenedor..." />;

  if (error && loading === false) {
    return (
      <ErrorMessage message="Ah ocurrido un error, no se obtuvieron los datos del contenedor" />
    );
  }

  return (
    <div>
      <ButtonBack />
      <SectionContainer>
        <SectionDetail label="DETALLES DEL EXPEDIENTE">
          <DetailItem
            label="Departamento"
            value={expediente?.departamento.nombre || "No disponible"}
          />
          <DetailItem
            label="Codigo"
            value={expediente?.codigo || "No disponible"}
          />

          <DetailItem
            label="ejercicio fiscal"
            value={expediente?.ejercicio_fiscal || "No disponible"}
          />

          <DetailItem
            label="Descripción"
            value={expediente?.descripcion || "No disponible"}
          />
        </SectionDetail>
      </SectionContainer>
    </div>
  );
};

export default DetalleExpediente;
