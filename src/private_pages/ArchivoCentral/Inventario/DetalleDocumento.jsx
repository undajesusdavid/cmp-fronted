import { useParams } from "react-router-dom";
import "../../stylesPrivatePages.css";
import { useEffect, useState } from "react";
import { getItemInventory } from "../../../api/CentralArchive/InventoryController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import DetailItem from "../../../components/DetailItem/DetailItem";
import SectionDetail from "../../../components/SectionDetail/SectionDetail";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Table from "../../../components/Table/Table";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";

const DetalleDocumento = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetItemInventory = async () => {
    setLoading(true);
    const item = await getItemInventory(itemId);
    setItem(item);
    setLoading(false);
  };

  useEffect(() => {
    handleGetItemInventory();
  }, [itemId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const DataColumns = [
    {
      key: "descripcion",
      header: "Contenido",
      align: "center",
    },
  ];

  const expediente = (
    <SectionDetail label="DETALLE DE EXPEDIENTE">
      <DetailItem
        label="Descripción"
        value={item?.expediente.descripcion || "Sin descripción"}
      />
    </SectionDetail>
  );

  return (
    <>
      <ButtonBack />
      <SectionContainer>
        {(item?.expediente && item?.expediente.descripcion) ? expediente : null}

        <SectionDetail label="Detalle del Documento">
          <DetailItem label="Codigo" value={item?.codigo || "No disponible"} />
          <DetailItem
            label="Descripción  de contenido"
            value={item?.titulo || "Sin descripción"}
          />
          <DetailItem
            label="Numero de Pieza"
            value={item?.numero_pieza || "Sin descripción"}
          />
          <DetailItem
            label="Ubicación"
            value={item?.ubicacion || "Sin ubicación"}
          />
          <DetailItem
            label="Observacion"
            value={item?.observacion || "Sin observaciones"}
          />
        </SectionDetail>
      </SectionContainer>
    </>
  );
};

export default DetalleDocumento;
