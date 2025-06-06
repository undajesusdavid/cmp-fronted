import styles from "./DetalleEmpleado.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneEmployee } from "../../../api/Employees/EmployeeController";
import defaultEmployeeImage from "../../../assets/default_employee.jpg";
import { formatFecha } from "../../../utils/ManejoFechas";

// Componente auxiliar para mostrar un item de detalle
const DetailItem = ({ label, value, fullWidth = false }) => (
  <div
    className={`${styles.detailItem} ${fullWidth ? styles.fullWidthItem : ""}`}
  >
    <strong>{label}:</strong> <span>{value}</span>
  </div>
);

const DetalleEmpleado = () => {
  const { empleadoId } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleGetOneEmployee = async () => {
      setLoading(true);
      setError(null);
      try {
        const employee = await getOneEmployee(empleadoId);
        if (employee) {
          setEmpleado(employee);
        } else {
          setError(new Error("Empleado no encontrado."));
        }
      } catch (err) {
        setError(
          new Error(
            "Error al cargar los datos del empleado. Por favor, inténtelo de nuevo más tarde."
          )
        );
        console.error("Error fetching employee:", err);
      } finally {
        setLoading(false);
      }
    };

    handleGetOneEmployee();
  }, [empleadoId]);


  // Esta función simula la obtención de una URL de imagen.
  // En una aplicación real, 'empleado.fotoUrl' vendría del backend.
  const getEmployeeDisplayImage = (employeeData) => {
    // Si el empleado tiene una URL de foto en sus datos, úsala.
    if (employeeData && employeeData.fotoUrl) {
      // Asume que 'fotoUrl' es un campo en tu objeto empleado
      return employeeData.fotoUrl;
    }
    // Si no tiene, usa la imagen de silueta por defecto.
    return defaultEmployeeImage;
  };

  if (loading) {
    return (
      <div className={styles.loadingMessage}>
        Cargando detalles del empleado...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorMessage}>
        Error: {error.message}
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Volver
        </button>
      </div>
    );
  }

  if (!empleado) {
    return (
      <div className={styles.emptyDetailsMessage}>
        No se encontraron detalles para este empleado.
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Volver al Listado
        </button>
      </div>
    );
  }

  const employeeDisplayImage = getEmployeeDisplayImage(empleado);

  return (
    <div className={styles.detailsPageContainer}>
      <button className={styles.backButton} onClick={() => navigate("/empleados/listado")}>
        ← Volver al Listado
      </button>
      
      <div className={styles.employeeCard}>
        <div className={styles.profileHeader}>
          <img
            src={employeeDisplayImage}
            alt={`Foto de ${empleado.nombre} ${empleado.apellido}`}
            className={styles.profileImage}
          />
          <div className={styles.profileInfo}>
            <h2>
              {empleado.nombre} {empleado.apellido}
            </h2>
            <p className={styles.employeeTitle}>
              {empleado.cargo?.nombre || "Sin Cargo Asignado"}
            </p>
            <p className={styles.employeeDepartment}>
              {empleado.departamento?.nombre || "Sin Departamento"}
            </p>
          </div>
        </div>

        <div className={styles.sectionsContainer}>
          {/* Sección: Información Personal */}
          <section className={styles.detailSection}>
            <h3>Información Personal</h3>
            <div className={styles.detailGrid}>
              <DetailItem label="Cédula" value={empleado.cedula} />
              <DetailItem label="RIF" value={empleado.rif || "N/A"} />
              <DetailItem
                label="Género"
                value={empleado.genero === "M" ? "Masculino" : "Femenino"}
              />
              <DetailItem
                label="Fecha de Nacimiento"
                value={formatFecha(empleado.fecha_nac)}
              />
              <DetailItem
                label="Lugar de Nacimiento"
                value={empleado.lugar_nac || "N/A"}
              />
              <DetailItem
                label="Estado Civil"
                value={
                  empleado.estado_civil === "S"
                    ? "Soltero/a"
                    : empleado.estado_civil === "C"
                    ? "Casado/a"
                    : empleado.estado_civil || "N/A"
                }
              />
              <DetailItem label="Hijos" value={empleado.num_hijos} />
              <DetailItem
                label="Altura"
                value={`${empleado.altura || "N/A"} m`}
              />
              <DetailItem label="Peso" value={`${empleado.peso || "N/A"} kg`} />
              <DetailItem label="Tipo de Sangre" value={empleado.tipo_sangre?.tipo } />
              <DetailItem
                label="Nacionalidad"
                value={empleado.nacionalidad?.nombre || "N/A"}
              />
            </div>
          </section>

          {/* Sección: Contacto */}
          <section className={styles.detailSection}>
            <h3>Contacto</h3>
            <div className={styles.detailGrid}>
              <DetailItem label="Correo" value={empleado.correo || "N/A"} />
              <DetailItem
                label="Teléfono Móvil"
                value={empleado.tlf_movil || "N/A"}
              />
              <DetailItem
                label="Dirección"
                value={empleado.dir_habitacion || "N/A"}
                fullWidth // Este item ocupará todo el ancho
              />
            </div>
          </section>

          {/* Sección: Detalles Laborales */}
          <section className={styles.detailSection}>
            <h3>Detalles Laborales</h3>
            <div className={styles.detailGrid}>
              <DetailItem
                label="Fecha Ingreso (Admin Pública)"
                value={formatFecha(empleado.fec_ingreso_admin_pub)}
              />
              <DetailItem
                label="Fecha Ingreso (Institución)"
                value={formatFecha(empleado.fec_ingreso_inst)}
              />
              <DetailItem
                label="Nivel Académico"
                value={empleado.nivel_academico?.nivel || "N/A"}
              />
              <DetailItem
                label="Profesión"
                value={empleado.profesion?.nombre || "N/A"}
              />
              <DetailItem
                label="Tipo de Personal"
                value={empleado.tipo_personal?.nombre || "N/A"}
              />
              <DetailItem
                label="Cargo"
                value={empleado.cargo?.nombre || "N/A"}
              />
              <DetailItem
                label="Departamento"
                value={empleado.departamento?.nombre || "N/A"}
              />
            </div>
          </section>

          {/* Sección: Carnet de la Patria */}
          <section className={styles.detailSection}>
            <h3>Carnet de la Patria</h3>
            <div className={styles.detailGrid}>
              <DetailItem
                label="Tiene Carnet"
                value={empleado.tiene_carnet_patria ? "Sí" : "No"}
              />
              {empleado.tiene_carnet_patria && (
                <>
                  <DetailItem
                    label="Código"
                    value={empleado.codigo_carnet_patria || "N/A"}
                  />
                  <DetailItem
                    label="Serial"
                    value={empleado.serial_carnet_patria || "N/A"}
                  />
                </>
              )}
            </div>
          </section>

          {/* Sección: Tallas */}
          {empleado.tallas && (
            <section className={styles.detailSection}>
              <h3>Tallas</h3>
              <div className={styles.detailGrid}>
                <DetailItem
                  label="Zapato"
                  value={empleado.tallas.zapato || "N/A"}
                />
                <DetailItem
                  label="Camisa"
                  value={empleado.tallas.camisa || "N/A"}
                />
                <DetailItem
                  label="Pantalón"
                  value={empleado.tallas.pantalon || "N/A"}
                />
              </div>
            </section>
          )}

          {/* Sección: Vivienda */}
          {empleado.tipo_vivienda && (
            <section className={styles.detailSection}>
              <h3>Vivienda</h3>
              <div className={styles.detailGrid}>
                <DetailItem
                  label="Tipo de vivienda"
                  value={empleado.tipo_vivienda.tipo || "N/A"}
                />
                <DetailItem
                  label="Condición de vivienda"
                  value={empleado.cond_vivienda.condicion || "N/A"}
                />
              </div>
            </section>
          )}

          {/* Sección: Familiares */}
          {empleado.familiares && empleado.familiares.length > 0 && (
            <section className={styles.detailSection}>
              <h3>Familiares</h3>
              <div className={styles.familiaresList}>
                {empleado.familiares.map((familiar) => (
                  <div key={familiar.id} className={styles.familiarItem}>
                    <strong>
                      {familiar.nombre} {familiar.apellido}
                    </strong>{" "}
                    ({familiar.parentesco?.nombre || "N/A"}) - C.I.:{" "}
                    {familiar.cedula || "N/A"}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleEmpleado;
