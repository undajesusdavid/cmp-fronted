// DynamicForm.jsx
import React, { useState, useCallback } from "react";
import { FaPlus, FaTrash, FaPaperPlane } from "react-icons/fa"; // Importa los iconos que necesitas
import "./DynamicForm.css"; // Importa los estilos CSS

const DynamicForm = ({
  fieldsConfig,
  formTitle = "Formulario Dinámico",
  onSubmit,
}) => {
  // Inicializa el estado con un único elemento basado en la configuración de campos.
  const [items, setItems] = useState(() => {
    const initialItem = fieldsConfig.reduce((acc, field) => {
      acc[field.name] = ""; // Inicializa cada campo con un string vacío
      return acc;
    }, {});
    return [{ id: 1, ...initialItem }];
  });

  // Estado para el próximo ID disponible
  const [nextId, setNextId] = useState(2);

  // Lógica para agregar, eliminar y manejar cambios (sin cambios aquí)
  const handleAddItem = useCallback(() => {
    const newItem = fieldsConfig.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
    setItems((prevItems) => [...prevItems, { id: nextId, ...newItem }]);
    setNextId((prevNextId) => prevNextId + 1);
  }, [fieldsConfig, nextId]);

  const handleRemoveItem = useCallback((idToRemove) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== idToRemove));
  }, []);

  const handleChange = useCallback((id, fieldName, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [fieldName]: value } : item
      )
    );
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (onSubmit && typeof onSubmit === "function") {
        onSubmit(items);
      } else {
        console.warn(
          "No se proporcionó una función 'onSubmit' al componente DynamicForm."
        );
        console.log("Datos del formulario:", items);
        alert("Formulario enviado (sin callback externo). Revisa la consola.");
      }
    },
    [items, onSubmit]
  );

  return (
    <div className="dynamic-form-container">
      <h1 className="form-title">{formTitle}</h1>
      <form onSubmit={handleSubmit}>
        {items.map((item) => (
          <div key={item.id} className="form-item-group">
            <h3 className="item-title">Elemento #{item.id}</h3>
            <div className="form-fields-grid">
              {/* Mapea sobre la configuración de campos para renderizar cada input */}
              {fieldsConfig.map((field) => (
                <div key={field.name} className="form-field">
                  <label>
                    {field.label ||
                      field.name
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    :
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={item[field.name]}
                      onChange={(e) =>
                        handleChange(item.id, field.name, e.target.value)
                      }
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={field.rows || 3}
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={item[field.name]}
                      onChange={(e) =>
                        handleChange(item.id, field.name, e.target.value)
                      }
                      required={field.required}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Botón de eliminar con icono, solo si hay más de uno */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="remove-item-button"
                aria-label="Eliminar elemento" /* Para accesibilidad */
              >
                <FaTrash />
                <span>Eliminar</span>{" "}
                {/* Span para texto oculto / accesibilidad */}
              </button>
            )}
          </div>
        ))}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleAddItem}
            className="action-button add-button"
            aria-label="Agregar nuevo elemento"
          >
            <FaPlus />
            <span>Agregar Nuevo</span>
          </button>
          <button
            type="submit"
            className="action-button submit-button"
            aria-label="Enviar formulario"
          >
            <FaPaperPlane />
            <span>Enviar</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
