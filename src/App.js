import ViewEmployees from './components/viewEmployees';
import {Container, createTheme, CssBaseline, ThemeProvider, Typography} from '@mui/material';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import CreateEmployee from "./components/createEmployee";
import EditEmployee from "./components/editEmployee";
import Login from "./components/login";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Container maxWidth='lg'>
        {/* Encabezado principal */}
        <Typography sx={{my: 4}} variant='h3'>Gestión de RRHH</Typography>
        {/* Configura el enrutador */}
        <BrowserRouter>
          {/* Definición de rutas */}
          <Routes>
            {/* Componente para la ruta ViewEmployees  */}
            <Route
              path='/viewEmployees'
              element={<ViewEmployees />}
            />
            {/* Componente para la ruta Login */}
            <Route
                path='/'
                element={<Login />}
            />
            {/* Componente para la ruta de creación de empleado */}
            <Route
              path='/create'
              element={<CreateEmployee />}
            />
            {/* Componente para la ruta de edición de empleado */}
            <Route
              path='/edit/:id'
              element={<EditEmployee />}
            />
            {/* Redirección de rutas no encontradas */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
