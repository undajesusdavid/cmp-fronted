import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContenedor } from "../../../api/CentralArchive/ContenedorController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import SectionDetail from "../../../components/SectionDetail/SectionDetail";
import DetailItem from "../../../components/DetailItem/DetailItem";

const DetalleContenedor = () => {
  const { id } = useParams();
  const [contenedor, setContenedor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setContenedor(await getContenedor(id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
        <SectionDetail label="DETALLES DEL CONTENEDOR">
          <DetailItem
            label="Departamento"
            value={contenedor?.departamento.nombre || "No disponible"}
          />
          <DetailItem
            label="Unidad de Conservacion"
            value={contenedor?.unidad_conservacion.nombre || "No disponible"}
          />
          <DetailItem
            label="ejercicio fiscal"
            value={contenedor?.ejercicio || "No disponible"}
          />
          <DetailItem
            label="Ubicación"
            value={contenedor?.ubicacion || "No disponible"}
          />
          <DetailItem
            label="Descripción"
            value={contenedor?.descripcion || "No disponible"}
          />
        </SectionDetail>
      </SectionContainer>
    </div>
  );
};

export default DetalleContenedor;
