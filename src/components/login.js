// src/LoginPage.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Paper } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        //Aca va la futura lógica de autenticación.
        console.log('Email:', email);
        console.log('Password:', password);
        // Limpiar el formulario o redirigir al usuario según el resultado de la autenticación.
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Iniciar sesión
                </Typography>
                <form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Iniciar sesión
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default LoginPage;
