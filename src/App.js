import ViewEmployees from './components/viewEmployees';
import {Container, createTheme, CssBaseline, ThemeProvider, Typography} from '@mui/material';
import CreateEditEmployee from './components/createEditEmployee';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {useState} from "react";
import {data} from './data'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  let [dataModel, setDataModel] = useState(data);

  /**
   * Funcion para guardar un nuevo empleado en el DataModel.
   * @param employee
   */
  const onSave = (employee) => {
    const newEmployeeId = dataModel.length ? Math.max(...dataModel.map(employee => Number(employee.id))) + 1 : 1

    setDataModel((prevState) => ([
      ...prevState,
      {
        ...employee,
        id: newEmployeeId
      }
    ]))
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Container maxWidth='lg'>
        <Typography sx={{my: 4}} variant='h3'>Gestión de RRHH</Typography>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<ViewEmployees dataModel={dataModel} setDataModel={setDataModel}/>}
            />
            <Route
              path='/create'
              element={<CreateEditEmployee onSave={onSave}/>}
            />
            <Route
              path='/edit/:id'
              element={<CreateEditEmployee dataModel={dataModel} onSave={onSave}/>}
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
