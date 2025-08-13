import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClasificacion } from "../../../api/CentralArchive/ClasificacionController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import SectionDetail from "../../../components/SectionDetail/SectionDetail";
import DetailItem from "../../../components/DetailItem/DetailItem";

const DetalleClasificacion = () => {
  const { id } = useParams();
  const [clasificacion, setClasificacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setClasificacion(await getClasificacion(id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Cargando Clasificacion..." />;

  if (error && loading === false) {
    return (
      <ErrorMessage message="Ah ocurrido un error, no se obtuvieron los datos de la clasificacion" />
    );
  }

  return (
    <div>
      <ButtonBack />
      <SectionContainer>
        <SectionDetail label="DETALLES DE CLASIFICACION">
          <DetailItem
            label="Departamento"
            value={clasificacion?.departamento.nombre || "No disponible"}
          />
          <DetailItem
            label="Codigo de serie"
            value={clasificacion?.cod_serie || "No disponible"}
          />
          <DetailItem
            label="Codigo de Subserie"
            value={clasificacion?.cod_serie || "No disponible"}
          />
          <DetailItem
            label="Nombre de serie"
            value={clasificacion?.serie || "No disponible"}
          />
          <DetailItem
            label="Nombre de subserie"
            value={clasificacion?.subserie || "No disponible"}
          />
        </SectionDetail>
      </SectionContainer>
    </div>
  );
};

export default DetalleClasificacion;
