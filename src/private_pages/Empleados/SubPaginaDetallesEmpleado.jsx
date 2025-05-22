// src/private_pages/Empleados/SubPaginaDetallesEmpleado.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import empleadosData from "../../data/empleadosData"; // <-- Importa los datos de los empleados
import styles from "./SubPaginaDetallesEmpleado.module.css";

const SubPaginaDetallesEmpleado = () => {
  const { empleadoId } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulamos la búsqueda en los datos locales importados
    const foundEmpleado = empleadosData.find((emp) => emp.id === empleadoId);
    if (foundEmpleado) {
      setEmpleado(foundEmpleado);
    } else {
      setError(new Error("Empleado no encontrado."));
    }
    setLoading(false);
  }, [empleadoId]);

  if (loading) {
    return (
      <div className={styles.loadingMessage}>
        Cargando detalles del empleado...
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorMessage}>Error: {error.message}</div>;
  }

  if (!empleado) {
    return (
      <div className={styles.emptyDetailsMessage}>
        No se encontraron detalles para este empleado.
      </div>
    );
  }

  const formatFecha = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-VE");
  };

  return (
    <div className={styles.detailsContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Volver al Listado
      </button>
      <h2>
        Detalles Completos de {empleado.nombre} {empleado.apellido}
      </h2>

      <div className={styles.detailGrid}>
        <div className={styles.detailItem}>
          <strong>Cédula:</strong> <span>{empleado.cedula}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>RIF:</strong> <span>{empleado.rif}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Género:</strong>{" "}
          <span>{empleado.genero === "M" ? "Masculino" : "Femenino"}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Fecha de Nacimiento:</strong>{" "}
          <span>{formatFecha(empleado.fecha_nac)}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Lugar de Nacimiento:</strong>{" "}
          <span>{empleado.lugar_nac}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Estado Civil:</strong>{" "}
          <span>
            {empleado.estado_civil === "S"
              ? "Soltero/a"
              : empleado.estado_civil === "C"
              ? "Casado/a"
              : empleado.estado_civil}
          </span>
        </div>
        <div className={styles.detailItem}>
          <strong>Hijos:</strong> <span>{empleado.num_hijos}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Altura:</strong> <span>{empleado.altura} m</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Peso:</strong> <span>{empleado.peso} kg</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Nacionalidad:</strong>{" "}
          <span>{empleado.nacionalidad?.nombre || "N/A"}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Correo:</strong> <span>{empleado.correo}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Teléfono Móvil:</strong> <span>{empleado.tlf_movil}</span>
        </div>
        <div className={styles.detailItemFull}>
          <strong>Dirección:</strong> <span>{empleado.dir_habitacion}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Fecha Ingreso (Admin Pública):</strong>{" "}
          <span>{formatFecha(empleado.fec_ingreso_admin_pub)}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Fecha Ingreso (Institución):</strong>{" "}
          <span>{formatFecha(empleado.fec_ingreso_inst)}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Nivel Académico:</strong>{" "}
          <span>{empleado.nivel_academico?.nivel || "N/A"}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Profesión:</strong>{" "}
          <span>{empleado.profesion?.nombre || "N/A"}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Tipo de Personal:</strong>{" "}
          <span>{empleado.tipo_personal?.nombre || "N/A"}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Cargo:</strong> <span>{empleado.cargo?.nombre || "N/A"}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Departamento:</strong>{" "}
          <span>{empleado.departamento?.nombre || "N/A"}</span>
        </div>
        <div className={styles.detailItem}>
          <strong>Carnet de Patria:</strong>{" "}
          <span>{empleado.tiene_carnet_patria ? "Sí" : "No"}</span>
        </div>
        {empleado.tiene_carnet_patria && (
          <>
            <div className={styles.detailItem}>
              <strong>Cod. Carnet Patria:</strong>{" "}
              <span>{empleado.codigo_carnet_patria}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Serial Carnet Patria:</strong>{" "}
              <span>{empleado.serial_carnet_patria}</span>
            </div>
          </>
        )}
      </div>

      {empleado.familiares && empleado.familiares.length > 0 && (
        <>
          <h3>Familiares</h3>
          <div className={styles.familiaresList}>
            {empleado.familiares.map((familiar) => (
              <div key={familiar.id} className={styles.familiarItem}>
                <strong>
                  {familiar.nombre} {familiar.apellido}
                </strong>{" "}
                ({familiar.parentesco?.nombre || "N/A"}) - C.I.:{" "}
                {familiar.cedula}
              </div>
            ))}
          </div>
        </>
      )}

      {empleado.tallas && (
        <>
          <h3>Tallas</h3>
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <strong>Zapato:</strong> <span>{empleado.tallas.zapato}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Camisa:</strong> <span>{empleado.tallas.camisa}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Pantalón:</strong> <span>{empleado.tallas.pantalon}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SubPaginaDetallesEmpleado;
