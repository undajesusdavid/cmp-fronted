// src/private_pages/Empleados/SubPaginaEditarEmpleado.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditarEmpleado.module.css"; // Usaremos el mismo CSS por ahora, o crear uno específico

const empleadosData = [];

const EditarEmpleado = () => {
  const { empleadoId } = useParams(); // Obtiene el ID del empleado de la URL
  const navigate = useNavigate();

  // Estado inicial del formulario vacío
  const [formData, setFormData] = useState({
    cedula: "",
    rif: "",
    nombre: "",
    apellido: "",
    genero: "",
    fecha_nac: "",
    lugar_nac: "",
    altura: "",
    peso: "",
    estado_civil: "",
    num_hijos: 0,
    dir_habitacion: "",
    correo: "",
    tlf_habitacion: "",
    tlf_movil: "",
    fec_ingreso_admin_pub: "",
    fec_ingreso_inst: "",
    conadpis: false,
    tiene_carnet_patria: false,
    codigo_carnet_patria: "",
    serial_carnet_patria: "",
    nacionalidad_id: "",
    tipo_vivienda_id: "",
    condicion_vivienda_id: "",
    tipo_sangre_id: "",
    nivel_academico_id: "",
    profesion_id: "",
    tipo_personal_id: "",
    cargo_id: "",
    dir_adscrita_id: "",
    zapato: "",
    camisa: "",
    pantalon: "",
    familiares: [], // Simplificado
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para cargar los datos del empleado cuando el componente se monta
  useEffect(() => {
    // En una aplicación real, harías una llamada a tu API:
    // fetch(`/api/empleados/${empleadoId}`)
    //   .then(res => res.json())
    //   .then(data => { setFormData(data); setLoading(false); })
    //   .catch(err => { setError(err); setLoading(false); });

    // Simulamos la búsqueda en los datos locales
    const empleadoAEditar = empleadosData.find((emp) => emp.id === empleadoId);

    if (empleadoAEditar) {
      // Mapear los datos del empleado al formato del formulario
      // Asegúrate de formatear fechas y otros valores según sea necesario
      setFormData({
        ...empleadoAEditar,
        genero: empleadoAEditar.genero || "",
        estado_civil: empleadoAEditar.estado_civil || "",
        // Formatear fechas a 'YYYY-MM-DD' para inputs type="date"
        fecha_nac: empleadoAEditar.fecha_nac
          ? new Date(empleadoAEditar.fecha_nac).toISOString().split("T")[0]
          : "",
        fec_ingreso_admin_pub: empleadoAEditar.fec_ingreso_admin_pub
          ? new Date(empleadoAEditar.fec_ingreso_admin_pub)
              .toISOString()
              .split("T")[0]
          : "",
        fec_ingreso_inst: empleadoAEditar.fec_ingreso_inst
          ? new Date(empleadoAEditar.fec_ingreso_inst)
              .toISOString()
              .split("T")[0]
          : "",

        // Asignar IDs de las relaciones
        nacionalidad_id: empleadoAEditar.nacionalidad?.id || "",
        tipo_vivienda_id: empleadoAEditar.tipo_vivienda?.id || "",
        condicion_vivienda_id: empleadoAEditar.cond_vivienda?.id || "",
        tipo_sangre_id: empleadoAEditar.tipo_sangre?.id || "",
        nivel_academico_id: empleadoAEditar.nivel_academico?.id || "",
        profesion_id: empleadoAEditar.profesion?.id || "",
        tipo_personal_id: empleadoAEditar.tipo_personal?.id || "",
        cargo_id: empleadoAEditar.cargo?.id || "",
        dir_adscrita_id: empleadoAEditar.departamento?.id || "", // Departamento

        // Tallas (si existen, de lo contrario cadenas vacías)
        zapato: empleadoAEditar.tallas?.zapato || "",
        camisa: empleadoAEditar.tallas?.camisa || "",
        pantalon: empleadoAEditar.tallas?.pantalon || "",

        // Si tienes familiares en el formulario, precárgalos.
        // Para este ejemplo, solo enviamos un array vacío o el que ya existe
        familiares: empleadoAEditar.familiares || [],
      });
      setLoading(false);
    } else {
      setError(new Error("Empleado no encontrado para editar."));
      setLoading(false);
    }
  }, [empleadoId]); // Dependencia del ID para re-ejecutar si cambia

  // Manejador genérico para todos los cambios de input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos actualizados a tu API
    // En una aplicación real, probablemente harías un PUT a /api/empleados/:empleadoId
    console.log("Datos actualizados a enviar:", formData);

    // Simulación de envío exitoso
    alert(
      `Empleado ${formData.nombre} ${formData.apellido} (ID: ${empleadoId}) actualizado (simulado) exitosamente.`
    );
    // Después de actualizar, podrías navegar de vuelta al listado o a los detalles
    navigate("/empleados/listado");
  };

  if (loading) {
    return (
      <div className={styles.loadingMessage}>
        Cargando datos del empleado para editar...
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorMessage}>Error: {error.message}</div>;
  }

  // Si no se encontró el empleado después de la carga
  if (!formData.id && !loading && !error) {
    return (
      <div className={styles.emptyDetailsMessage}>
        No se pudo cargar la información del empleado.
      </div>
    );
  }

  return (
    <div className={styles.editEmployeeContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Volver al Listado
      </button>
      <h2>
        ✏️ Editar Empleado: {formData.nombre} {formData.apellido}
      </h2>
      <p>
        Modifica los campos necesarios para actualizar la información del
        empleado.
      </p>

      <form onSubmit={handleSubmit} className={styles.employeeForm}>
        {/* Sección: Datos Personales */}
        <h3 className={styles.sectionTitle}>Datos Personales</h3>
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del empleado"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Apellido del empleado"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cedula">Cédula:</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              placeholder="V00000000"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="rif">RIF:</label>
            <input
              type="text"
              id="rif"
              name="rif"
              value={formData.rif}
              onChange={handleChange}
              placeholder="V00000000-0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="genero">Género:</label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fecha_nac">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fecha_nac"
              name="fecha_nac"
              value={formData.fecha_nac}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lugar_nac">Lugar de Nacimiento:</label>
            <input
              type="text"
              id="lugar_nac"
              name="lugar_nac"
              value={formData.lugar_nac}
              onChange={handleChange}
              placeholder="Ej: ACARIGUA"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="altura">Altura (m):</label>
            <input
              type="number"
              id="altura"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
              step="0.01"
              placeholder="Ej: 1.75"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="peso">Peso (kg):</label>
            <input
              type="number"
              id="peso"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              step="0.1"
              placeholder="Ej: 70.5"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="estado_civil">Estado Civil:</label>
            <select
              id="estado_civil"
              name="estado_civil"
              value={formData.estado_civil}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="S">Soltero/a</option>
              <option value="C">Casado/a</option>
              <option value="D">Divorciado/a</option>
              <option value="V">Viudo/a</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="num_hijos">Número de Hijos:</label>
            <input
              type="number"
              id="num_hijos"
              name="num_hijos"
              value={formData.num_hijos}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="nacionalidad_id">Nacionalidad:</label>
            <select
              id="nacionalidad_id"
              name="nacionalidad_id"
              value={formData.nacionalidad_id}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="1">Venezolana</option>
              {/* Agrega más opciones si es necesario */}
            </select>
          </div>
          <div className={styles.formGroupFull}>
            <label htmlFor="dir_habitacion">Dirección de Habitación:</label>
            <textarea
              id="dir_habitacion"
              name="dir_habitacion"
              value={formData.dir_habitacion}
              onChange={handleChange}
              placeholder="Dirección completa"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Sección: Contacto */}
        <h3 className={styles.sectionTitle}>Datos de Contacto</h3>
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label htmlFor="correo">Correo Electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="correo@example.com"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tlf_habitacion">Teléfono Habitación:</label>
            <input
              type="text"
              id="tlf_habitacion"
              name="tlf_habitacion"
              value={formData.tlf_habitacion}
              onChange={handleChange}
              placeholder="02XX-XXXXXXX"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tlf_movil">Teléfono Móvil:</label>
            <input
              type="text"
              id="tlf_movil"
              name="tlf_movil"
              value={formData.tlf_movil}
              onChange={handleChange}
              placeholder="04XX-XXXXXXX"
              required
            />
          </div>
        </div>

        {/* Sección: Datos Laborales */}
        <h3 className={styles.sectionTitle}>Datos Laborales</h3>
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label htmlFor="fec_ingreso_admin_pub">
              Fecha Ingreso (Admin. Pública):
            </label>
            <input
              type="date"
              id="fec_ingreso_admin_pub"
              name="fec_ingreso_admin_pub"
              value={formData.fec_ingreso_admin_pub}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fec_ingreso_inst">
              Fecha Ingreso (Institución):
            </label>
            <input
              type="date"
              id="fec_ingreso_inst"
              name="fec_ingreso_inst"
              value={formData.fec_ingreso_inst}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="nivel_academico_id">Nivel Académico:</label>
            <select
              id="nivel_academico_id"
              name="nivel_academico_id"
              value={formData.nivel_academico_id}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="1">Bachiller</option>
              <option value="2">Técnico Medio</option>
              <option value="3">TSU</option>
              <option value="4">Licenciado</option>
              <option value="5">Postgrado</option>
              {/* Agrega más opciones */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="profesion_id">Profesión:</label>
            <select
              id="profesion_id"
              name="profesion_id"
              value={formData.profesion_id}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="1">Administrador</option>
              <option value="6">Analisis de Sistemas</option>
              {/* Agrega más opciones */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tipo_personal_id">Tipo de Personal:</label>
            <select
              id="tipo_personal_id"
              name="tipo_personal_id"
              value={formData.tipo_personal_id}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="1">Fijo</option>
              <option value="12">Archivista</option>
              {/* Agrega más opciones */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cargo_id">Cargo:</label>
            <select
              id="cargo_id"
              name="cargo_id"
              value={formData.cargo_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="1">Asistente Administrativo</option>
              <option value="9">ARCHIVISTA</option>
              {/* Agrega más opciones */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="dir_adscrita_id">Departamento:</label>
            <select
              id="dir_adscrita_id"
              name="dir_adscrita_id"
              value={formData.dir_adscrita_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="1">DIR. ADMINISTRACIÓN Y FINANZAS</option>
              <option value="8">
                DIR. PLANIFICACIÓN, SECRETARÍA Y ARCHIVO
              </option>
              {/* Agrega más opciones */}
            </select>
          </div>
        </div>

        {/* Sección: Otros Datos */}
        <h3 className={styles.sectionTitle}>Otros Datos</h3>
        <div className={styles.formSection}>
          <div className={styles.formGroupCheckbox}>
            <input
              type="checkbox"
              id="conadpis"
              name="conadpis"
              checked={formData.conadpis}
              onChange={handleChange}
            />
            <label htmlFor="conadpis">¿Tiene CONADIS?</label>
          </div>
          <div className={styles.formGroupCheckbox}>
            <input
              type="checkbox"
              id="tiene_carnet_patria"
              name="tiene_carnet_patria"
              checked={formData.tiene_carnet_patria}
              onChange={handleChange}
            />
            <label htmlFor="tiene_carnet_patria">
              ¿Tiene Carnet de la Patria?
            </label>
          </div>
          {formData.tiene_carnet_patria && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="codigo_carnet_patria">
                  Código Carnet Patria:
                </label>
                <input
                  type="text"
                  id="codigo_carnet_patria"
                  name="codigo_carnet_patria"
                  value={formData.codigo_carnet_patria}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="serial_carnet_patria">
                  Serial Carnet Patria:
                </label>
                <input
                  type="text"
                  id="serial_carnet_patria"
                  name="serial_carnet_patria"
                  value={formData.serial_carnet_patria}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>

        {/* Sección: Tallas */}
        <h3 className={styles.sectionTitle}>Tallas</h3>
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label htmlFor="zapato">Talla de Zapato:</label>
            <input
              type="text"
              id="zapato"
              name="zapato"
              value={formData.zapato}
              onChange={handleChange}
              placeholder="Ej: 42"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="camisa">Talla de Camisa:</label>
            <input
              type="text"
              id="camisa"
              name="camisa"
              value={formData.camisa}
              onChange={handleChange}
              placeholder="Ej: M, L, XL"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pantalon">Talla de Pantalón:</label>
            <input
              type="text"
              id="pantalon"
              name="pantalon"
              value={formData.pantalon}
              onChange={handleChange}
              placeholder="Ej: 30, 32"
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarEmpleado;
