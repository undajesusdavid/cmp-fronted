import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes"; // Importamos nuestras rutas
import { ToastContainer } from "react-toastify";

// --- Componente Principal de la Aplicación ---

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes /> {/* Usamos el componente de rutas aquí */}
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
