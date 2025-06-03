const NotFoundPage = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh", // Ocupa toda la altura de la ventana
      backgroundColor: "#f0f2f5", // Un gris claro muy suave
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Fuente moderna y legible
      color: "#333", // Color de texto oscuro para contraste
      padding: "20px",
      boxSizing: "border-box", // Asegura que el padding no cause desbordamiento
    }}
  >
    <div
      style={{
        backgroundColor: "#fff", // Fondo blanco para el contenido principal
        borderRadius: "12px", // Bordes más redondeados
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Sombra más pronunciada pero suave
        padding: "40px 60px", // Más padding interno
        textAlign: "center",
        maxWidth: "700px", // Ancho máximo ligeramente mayor
        width: "100%", // Asegura que ocupe el ancho disponible
      }}
    >
      <h1
        style={{
          fontSize: "6em", // Número 404 más grande y llamativo
          marginBottom: "0.1em", // Espacio mínimo para el siguiente elemento
          color: "#007bff", // Color azul vibrante
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)", // Ligera sombra para el número
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "2.2em", // Título un poco más pequeño
          marginBottom: "25px",
          color: "#555", // Un gris más oscuro para el título
          fontWeight: "normal",
        }}
      >
        ¡Oops! Página No Encontrada
      </h2>
      <p
        style={{
          fontSize: "1.1em",
          marginBottom: "35px", // Más espacio para el botón
          lineHeight: "1.6", // Mejor legibilidad
          color: "#666", // Color de texto más suave
        }}
      >
        La página que intentas acceder no existe o ha sido movida.
      </p>
      <a
        href="/"
        style={{
          textDecoration: "none",
          padding: "15px 35px", // Mayor padding para el botón
          backgroundColor: "#007bff", // Mismo azul vibrante
          color: "white",
          borderRadius: "30px", // Bordes completamente redondeados (efecto píldora)
          fontWeight: "bold",
          fontSize: "1.1em",
          transition: "background-color 0.3s ease, transform 0.2s ease", // Transición suave al pasar el ratón
          boxShadow: "0 5px 15px rgba(0, 123, 255, 0.3)", // Sombra suave para el botón
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#0056b3"; // Color más oscuro al pasar el ratón
          e.currentTarget.style.transform = "translateY(-2px)"; // Efecto de elevación
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#007bff";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Volver al Inicio Seguro
      </a>
    </div>
  </div>
);

export default NotFoundPage;
