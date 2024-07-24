import ViewEmployees from './components/viewEmployees';
import {Container, createTheme, CssBaseline, ThemeProvider, Typography} from '@mui/material';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import CreateEmployee from "./components/createEmployee";
import EditEmployee from "./components/editEmployee";

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
        <Typography sx={{my: 4}} variant='h3'>Gestión de RRHH</Typography>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<ViewEmployees />}
            />
            <Route
              path='/create'
              element={<CreateEmployee />}
            />
            <Route
              path='/edit/:id'
              element={<EditEmployee />}
            />
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
