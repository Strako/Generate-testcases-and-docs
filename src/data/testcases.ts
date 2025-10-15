/* eslint-disable quotes */
export const testcases = [
  {
    title: "",
    content: "",
  },
  {
    title: "[AUT:001] - Registrar usuario exitosamente con datos válidos",
    content:
      "Feature: Registro de usuarios\nScenario: Registro exitoso con datos válidos\nGiven: El administrador tiene un usuario con nombres, apellidos, fecha_nacimiento, direccion, telefono, correo_electronico válido y salario_base válido\nWhen: Se envía la petición POST al endpoint /api/v1/usuarios con dichos datos\nThen: El sistema guarda el usuario de forma transaccional en la base de datos\nAnd: Devuelve una respuesta con estado 201 y mensaje de éxito\nTipo de test case: Happy Path",
  },
  {
    title:
      "[AUT:001] - Error al registrar usuario con correo electrónico duplicado",
    content:
      'Feature: Registro de usuarios\nScenario: Intento de registro con correo electrónico ya existente\nGiven: Existe un usuario registrado previamente con el correo_electronico "test@correo.com"\nWhen: Se envía la petición POST con un nuevo usuario que tiene el mismo correo_electronico\nThen: El sistema rechaza la operación\nAnd: Devuelve estado 400 con un mensaje indicando que el correo_electronico ya está registrado\nTipo de test case: Validación Negativa',
  },
];
