
# Prueba Técnica - CRUD Proveedores y Consumo de API Externa

Este proyecto consiste en un backend en Node.js con Express y un frontend en React, diseñados para gestionar proveedores y consumir una API externa mediante autenticación con JWT.

## Contenidos
- [Requisitos](#requisitos)
- [Instrucciones para Backend](#instrucciones-para-backend)
- [Instrucciones para Frontend](#instrucciones-para-frontend)
- [Uso del CRUD de Proveedores](#uso-del-crud-de-proveedores)
  - [Crear un Proveedor](#crear-un-proveedor)
  - [Actualizar un Proveedor](#actualizar-un-proveedor)
  - [Obtener un Proveedor por ID](#obtener-un-proveedor-por-id)
  - [Eliminar un Proveedor](#eliminar-un-proveedor)
  - [Obtener Proyectos](#obtener-proyectos)

---

## Requisitos

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MySQL](https://www.mysql.com/) para la base de datos

---

## Instrucciones para Backend

1. **Clonar el repositorio y acceder a la carpeta del backend**:

   ```bash
   git clone https://github.com/JosePuelloCortina/prueba-tecnica-jose-puello
   cd server
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar la base de datos MySQL**:

   - Crear una base de datos en MySQL llamada `pruebamarval`.

4. **Configurar variables de entorno**:

   - Crear un archivo `.env` en la raíz de `server` con las siguientes variables de entorno, agregando tus propias credenciales:

     ```plaintext
     DB_NAME=pruebamarval
     DB_USER=<TU_USUARIO_MYSQL>
     DB_PASSWORD=<TU_CONTRASEÑA_MYSQL>

     login=<CREDENCIALES_API_LOGIN>
     pswd=<CREDENCIALES_API_PASSWORD>
     ```

   - Las variables `login` y `pswd` son para las credenciales de autenticación que se usan para consumir la API externa.

5. **Ejecutar el servidor**:

   ```bash
   npm run dev
   ```

   El backend estará activo en [http://localhost:3000](http://localhost:3000).

---

## Instrucciones para Frontend

1. **Acceder a la carpeta del frontend**:

   ```bash
   cd frontend
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Ejecutar el frontend**:

   ```bash
   npm run dev
   ```

   El frontend estará activo en [http://localhost:5173](http://localhost:5173).

---

## Uso del CRUD de Proveedores

### Crear un Proveedor

1. Crear un usuario con rol de admin:

   - **Endpoint**: `POST http://localhost:3000/user/create-user`
   - **JSON Body**:
     ```json
     {
       "username": "Jose Puello",
       "email": "test@test.com",
       "password": "Pass123@",
       "role": "admin"
     }
     ```

2. Usar el EMAIL del usuario creado para crear un proveedor:

   - En la respuesta del endpoint anterior, toma el `email` del usuario y agrégalo en el campo `validated_by`.
   - **Endpoint**: `POST http://localhost:3000/proveedor/crear-nuevo-proveedor`
   - **JSON Body**:
     ```json
     {
       "nit": "qwy26gw",
       "name": "Camilo",
       "lastname": "Castro",
       "id_number": "123456",
       "supplier_type": "Nacional",
       "person_type": "Natural",
       "validated_by": "<EMAIL_DEL_USUARIO_ADMIN>",
       "bank": "Bancolombia",
       "account_number": "3737373633",
       "account_type": "ahorros",
       "name_beneficiary": "Andrea",
       "id_number_beneficiary": "2541352"
     }
     ```

### Actualizar un Proveedor

Para actualizar un proveedor existente:

- Usa el `id` del proveedor en la URL y los datos en el cuerpo de la solicitud.
- **Endpoint**: `PUT http://localhost:3000/proveedor/actualizar-informacion-proveedor/<ID_DEL_PROVEEDOR>`
- **JSON Body**:
  ```json
  {
    "nit": "qwy26gw",
    "name": "Carlos",
    "lastname": "Castro",
    "id_number": "123456",
    "supplier_type": "Nacional",
    "person_type": "Natural",
    "state": "Aprobado",
    "validated_by": "<EMAIL_DEL_USUARIO_ADMIN>",
    "bank": "Bancolombia",
    "account_number": "3737373633",
    "account_type": "ahorros",
    "name_beneficiary": "Adriana",
    "id_number_beneficiary": "1234567"
  }
  ```

### Obtener un Proveedor por ID

Para obtener los datos de un proveedor específico, usa su `id` en la ruta como parámetro:

- **Endpoint**: `GET http://localhost:3000/proveedor/obtener-informacion-proveedor-por-id/<ID_DEL_PROVEEDOR>`

### Eliminar un Proveedor

Para eliminar un proveedor, usa su `id` en la ruta como parámetro:

- **Endpoint**: `DELETE http://localhost:3000/proveedor/eliminar-proveedor-por-id/<ID_DEL_PROVEEDOR>`

### Obtener Proyectos

Para obtener la lista de proyectos de la API externa, asegúrate de tener configuradas las credenciales de `login` y `pswd` en el archivo `.env`. Un middleware se encarga de autenticarse y enviar el token para consumir la API externa.

- **Endpoint**: `GET http://localhost:3000/projects/get-projects`
