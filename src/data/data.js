"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.data = [
    {
        title: "[AUT:001] - Registrar usuario exitosamente con datos válidos",
        description: "Feature: Registro de usuarios\nScenario: Registro exitoso con datos válidos",
        test_case: "Given: El administrador tiene un usuario con nombres, apellidos, fecha_nacimiento, direccion, telefono, correo_electronico válido y salario_base válido\nWhen: Se envía la petición POST al endpoint /api/v1/usuarios con dichos datos\nThen: El sistema guarda el usuario de forma transaccional en la base de datos\nAnd: Devuelve una respuesta con estado 201 y mensaje de éxito",
        test_type: "Happy Path",
        isFirst: true,
    },
    {
        title: "[AUT:001] - Error al registrar usuario con correo electrónico duplicado",
        description: "Feature: Registro de usuarios\nScenario: Intento de registro con correo electrónico ya existente",
        test_case: 'Given: Existe un usuario registrado previamente con el correo_electronico "test@correo.com"\nWhen: Se envía la petición POST con un nuevo usuario que tiene el mismo correo_electronico\nThen: El sistema rechaza la operación\nAnd: Devuelve estado 400 con un mensaje indicando que el correo_electronico ya está registrado',
        test_type: "Validación Negativa",
        isFirst: false,
    },
];
