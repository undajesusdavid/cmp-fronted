import { useState, useEffect } from "react";
import "./RegistroUsuario.css"; // Importa el archivo CSS
import { getMetadataUser, addUser } from "../../api/Users/UserController";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const RegistroUsuario = () => {
  /* Datos cargados de API*/
  const [employees, setEmployees] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [errorMetadata, setErrorMetadata] = useState(null);
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  /*Datos del componente*/
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]); // Almacena IDs de roles seleccionados
  const [selectedPermissions, setSelectedPermissions] = useState([]); // Almacena IDs de permisos seleccionados
  const [passwordError, setPasswordError] = useState("");

  const handleGetMetadata = async () => {
    setLoadingMetadata(true);
    const { error, data } = await getMetadataUser();
    if (error) setErrorMetadata(error);
    if (data) {
      console.log(data);
      setEmployees(data.employees);
      setAllRoles(data.roles);
      setAllPermissions(data.permissions);
    }
    setLoadingMetadata(false);
  };

  useEffect(() => {
    handleGetMetadata();
    return () => {
      setEmployees([]);
      setAllRoles([]);
      setAllPermissions([]);
    };
  }, []);

  // Filtra los roles disponibles para el select, excluyendo los ya seleccionados
  const availableRoles = allRoles.filter(
    (role) => !selectedRoles.includes(role.id)
  );

  // Filtra los permisos disponibles para el select, excluyendo los ya seleccionados
  const availablePermissions = allPermissions.filter(
    (perm) => !selectedPermissions.includes(perm.id)
  );

  const handleRoleSelect = (e) => {
    const roleId = parseInt(e.target.value);
    if (roleId && !selectedRoles.includes(roleId)) {
      setSelectedRoles((prevSelected) => [...prevSelected, roleId]);
      e.target.value = ""; // Limpiar la selección del select original
    }
  };

  const handleRoleRemove = (roleId) => {
    setSelectedRoles((prevSelected) =>
      prevSelected.filter((id) => id !== roleId)
    );
  };

  const handlePermissionSelect = (e) => {
    const permissionId = parseInt(e.target.value);
    if (permissionId && !selectedPermissions.includes(permissionId)) {
      setSelectedPermissions((prevSelected) => [...prevSelected, permissionId]);
      e.target.value = ""; // Limpiar la selección del select original
    }
  };

  const handlePermissionRemove = (permissionId) => {
    setSelectedPermissions((prevSelected) =>
      prevSelected.filter((id) => id !== permissionId)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingAdd(true);

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    } else {
      setPasswordError("");
    }

    // Aquí enviarías esta data a tu API de backend
    const userData = {
      username,
      password,
      employee_id: selectedEmployee,
      roles: selectedRoles, // IDs de roles seleccionados
      permissions: selectedPermissions, // IDs de permisos seleccionados
    };

    const { error, data } = await addUser(userData);

    console.log("Datos del usuario a enviar:", data);

    if (error) {
      alert("Error al registrar el usuario");
    } else {
      alert("¡Usuario registrado correctamente!");
    }

    setLoadingAdd(false);
    // Restablecer formulario después del envío (opcional)
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setSelectedEmployee("");
    setSelectedRoles([]);
    setSelectedPermissions([]);
  };

  if (loadingMetadata) {
    return <LoadingSpinner />;
  }

  return (
    <div className="add-user-form-container">
      <h2>Agregar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} className="user-form">
        {/* Sección: Datos del Usuario */}
        <section className="form-section user-data-section">
          <h3>Datos del Usuario</h3>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="employee">Empleado:</label>
            <select
              id="employee"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="form-select"
            >
              <option value="">Selecciona un empleado</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Sección: Roles */}
        <section className="form-section roles-section">
          <h3>Roles</h3>
          <div className="form-group select-transfer-container">
            <div className="select-box">
              <label htmlFor="availableRoles">Roles Disponibles:</label>
              <select
                id="availableRoles"
                onChange={handleRoleSelect}
                className="form-select"
                value="" // Importante para permitir seleccionar el mismo item después de deseleccionar
              >
                <option value="">Seleccionar rol...</option>
                {availableRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="selected-box">
              <label>Roles Seleccionados:</label>
              {selectedRoles.length === 0 ? (
                <p className="no-items-text">No hay roles seleccionados.</p>
              ) : (
                <ul className="selected-items-list">
                  {selectedRoles.map((roleId) => {
                    const role = allRoles.find((r) => r.id === roleId);
                    return (
                      <li key={roleId} className="selected-item">
                        {role ? role.nombre : "Rol desconocido"}
                        <button
                          type="button"
                          onClick={() => handleRoleRemove(roleId)}
                          className="remove-button"
                        >
                          &times;
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Sección: Permisos */}
        <section className="form-section permissions-section">
          <h3>Permisos</h3>
          <div className="form-group select-transfer-container">
            <div className="select-box">
              <label htmlFor="availablePermissions">
                Permisos Disponibles:
              </label>
              <select
                id="availablePermissions"
                onChange={handlePermissionSelect}
                className="form-select"
                value=""
              >
                <option value="">Seleccionar permiso...</option>
                {availablePermissions.map((permission) => (
                  <option key={permission.id} value={permission.id}>
                    {permission.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="selected-box">
              <label>Permisos Seleccionados:</label>
              {selectedPermissions.length === 0 ? (
                <p className="no-items-text">No hay permisos seleccionados.</p>
              ) : (
                <ul className="selected-items-list">
                  {selectedPermissions.map((permissionId) => {
                    const permission = allPermissions.find(
                      (p) => p.id === permissionId
                    );
                    return (
                      <li key={permissionId} className="selected-item">
                        {permission ? permission.nombre : "Permiso desconocido"}
                        <button
                          type="button"
                          onClick={() => handlePermissionRemove(permissionId)}
                          className="remove-button"
                        >
                          &times;
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="submit-button"
          disabled={loadingAdd ? true : false}
        >
          {loadingAdd ? "Cargando..." : "Agregar Usuario"}
        </button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
