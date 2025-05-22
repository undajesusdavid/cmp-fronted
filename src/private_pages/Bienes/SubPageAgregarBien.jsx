// src/pages/BienFormPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SubPageAgregarBien.module.css";

const BienFormPage = () => {
  const navigate = useNavigate();

  const initialBienState = {
    // ... tus campos aquí
    sede: "",
    unidadAdministativa: "",
    codigoInternoDelBien: "",
    descripcion: "",
    formaAdquisicion: "",
    fechaAdquisicion: "",
    numeroDocumento: "",
    moneda: "",
    valorAdquisicion: "",
    estadoUsoDelBien: "",
    condicionFisica: "",
    marca: "",
    modelo: "",
    color: "",
    serial: "",
    categoriaGeneral: "",
    subcategoria: "",
    categoriaEspecifica: "",
  };

  const [bienData, setBienData] = useState(initialBienState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBienData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del nuevo bien:", bienData);
    alert("Bien registrado con éxito (simulado)!");
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={styles.formPageContainer}>
      <h2>Registrar Nuevo Bien</h2>
      <form onSubmit={handleSubmit} className={styles.bienForm}>
        {/* Sección 1: Datos de Ubicación y Código */}
        <div className={styles.formSection}>
          <h3>Información General</h3>
          <div className={styles.formFieldsGrid}>
            {" "}
            {/* Este es el contenedor clave */}
            <div className={styles.formGroup}>
              <label htmlFor="sede">Sede:</label>
              <input
                type="text"
                id="sede"
                name="sede"
                value={bienData.sede}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="unidadAdministrativa">
                Unidad Administrativa:
              </label>
              <input
                type="text"
                id="unidadAdministrativa"
                name="unidadAdministrativa"
                value={bienData.unidadAdministrativa}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="codigoInternoDelBien">
                Código Interno del Bien:
              </label>
              <input
                type="text"
                id="codigoInternoDelBien"
                name="codigoInternoDelBien"
                value={bienData.codigoInternoDelBien}
                onChange={handleChange}
                required
              />
            </div>
            {/* El campo de descripción puede ocupar más de una columna */}
            <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={bienData.descripcion}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* ... (el resto de las secciones con formFieldsGrid alrededor de sus formGroup) ... */}

        {/* Sección 2: Datos de Adquisición */}
        <div className={styles.formSection}>
          <h3>Datos de Adquisición</h3>
          <div className={styles.formFieldsGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="formaAdquisicion">Forma de Adquisición:</label>
              <select
                id="formaAdquisicion"
                name="formaAdquisicion"
                value={bienData.formaAdquisicion}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione</option>
                <option value="COMPRA">COMPRA</option>
                <option value="DONACIÓN">DONACIÓN</option>
                <option value="TRANSFERENCIA">TRANSFERENCIA</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fechaAdquisicion">Fecha de Adquisición:</label>
              <input
                type="date"
                id="fechaAdquisicion"
                name="fechaAdquisicion"
                value={bienData.fechaAdquisicion}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="numeroDocumento">Número de Documento:</label>
              <input
                type="text"
                id="numeroDocumento"
                name="numeroDocumento"
                value={bienData.numeroDocumento}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="moneda">Moneda:</label>
              <input
                type="text"
                id="moneda"
                name="moneda"
                value={bienData.moneda}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="valorAdquisicion">Valor de Adquisición:</label>
              <input
                type="text"
                id="valorAdquisicion"
                name="valorAdquisicion"
                value={bienData.valorAdquisicion}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Sección 3: Estado Físico y Uso */}
        <div className={styles.formSection}>
          <h3>Estado y Condición</h3>
          <div className={styles.formFieldsGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="estadoUsoDelBien">Estado de Uso:</label>
              <select
                id="estadoUsoDelBien"
                name="estadoUsoDelBien"
                value={bienData.estadoUsoDelBien}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione</option>
                <option value="EN USO">EN USO</option>
                <option value="FUERA DE USO">FUERA DE USO</option>
                <option value="EN REPARACIÓN">EN REPARACIÓN</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="condicionFisica">Condición Física:</label>
              <select
                id="condicionFisica"
                name="condicionFisica"
                value={bienData.condicionFisica}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione</option>
                <option value="BUENO">BUENO</option>
                <option value="REGULAR">REGULAR</option>
                <option value="MALO">MALO</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sección 4: Características del Bien */}
        <div className={styles.formSection}>
          <h3>Características</h3>
          <div className={styles.formFieldsGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="marca">Marca:</label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={bienData.marca}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="modelo">Modelo:</label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                value={bienData.modelo}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                id="color"
                name="color"
                value={bienData.color}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="serial">Serial:</label>
              <input
                type="text"
                id="serial"
                name="serial"
                value={bienData.serial}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Sección 5: Categorización */}
        <div className={styles.formSection}>
          <h3>Clasificación</h3>
          <div className={styles.formFieldsGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="categoriaGeneral">Categoría General:</label>
              <input
                type="text"
                id="categoriaGeneral"
                name="categoriaGeneral"
                value={bienData.categoriaGeneral}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subcategoria">Subcategoría:</label>
              <input
                type="text"
                id="subcategoria"
                name="subcategoria"
                value={bienData.subcategoria}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="categoriaEspecifica">Categoría Específica:</label>
              <input
                type="text"
                id="categoriaEspecifica"
                name="categoriaEspecifica"
                value={bienData.categoriaEspecifica}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.saveButton}>
            Guardar Bien
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BienFormPage;
