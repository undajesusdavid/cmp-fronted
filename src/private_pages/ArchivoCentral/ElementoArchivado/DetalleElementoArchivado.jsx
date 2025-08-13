import { useParams } from "react-router-dom";
import "../../stylesPrivatePages.css";
import { useEffect, useState } from "react";
import { getElementoArchivado } from "../../../api/CentralArchive/ElementoController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import DetailItem from "../../../components/DetailItem/DetailItem";
import SectionDetail from "../../../components/SectionDetail/SectionDetail";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";

const DetalleElementoArchivado = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlegetElementoArchivado = async () => {
    try {
      setLoading(true);
      const item = await getElementoArchivado(itemId);
      setItem(item);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlegetElementoArchivado();
  }, [itemId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const expediente = (
    <SectionDetail label="DETALLE DE EXPEDIENTE">
      <DetailItem
        label="Descripción"
        value={item?.expediente?.descripcion || "Sin descripción"}
      />
    </SectionDetail>
  );

  return (
    <>
      <ButtonBack />
      <SectionContainer>
        {item?.expediente && item?.expediente.descripcion ? expediente : null}

        <SectionDetail label="DETALLE DE ELEMENTO ARCHIVADO">
          <DetailItem label="Serie" value={item?.clasificacion?.serie} />
          <DetailItem label="Subserie" value={item?.clasificacion?.subserie} />

          <DetailItem label="Codigo" value={item?.codigo || "No disponible"} />
          <DetailItem label="Titulo" value={item?.titulo || "Sin contenido"} />
          <DetailItem
            label="Año"
            value={item?.ejercicio_fiscal || "Sin contenido"}
          />
          <DetailItem
            label="Soporte"
            value={item?.soporte || "Sin contenido"}
          />
          <DetailItem
            label="Observacion"
            value={item?.observacion || "Sin contenido"}
          />
        </SectionDetail>
      </SectionContainer>
    </>
  );
};

export default DetalleElementoArchivado;
