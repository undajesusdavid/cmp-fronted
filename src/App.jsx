import { BrowserRouter as Router } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import router from "./routes/router"; // Importamos nuestro objeto router

// --- Componente Principal de la Aplicación ---

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      {/* Usamos el componente de rutas aquí */}
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
    </AuthProvider>
  );
}

export default App;
