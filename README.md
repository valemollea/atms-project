## Atms Project

### Sobre el proyecto
Para el desarrollo del proyecto se usaron dos frameworks, Express para la api (la base de datos corresponde a un archivo .json con una lista de cajeros) y React para el lado del cliente. Se usaron varias librerias listadas al final de este documento.

### Instrucciones para correr el proyecto
**Correr el cliente y el servidor juntos:**

Para correr de forma más sensilla ambas partes del proyecto simultaneamente, use una herramienta que corre varios comandos de forma concurrent (concurrently para node js), de esta forma, para correr tanto lo que esta en "client" como en "server" bastante con entrar a "JamppProject" (directorio general), instalar las dependencias con el siguiente comando:

### `npm install`

Y luego correr el proyecto con este comando:

### `npm start`


**Correr el cliente y el servidor por separado:**

Debería seguirse el mismo procedimiento desde dos terminales, ingresando a los correspondientes directorios. En una terminal dentro de "client" y en la otra dentro de "server".

**Para terminar los procesos:**
### `ctrl + c`


### Dependencias (Versiones)
**Generales:**

- node: 14.7.0
- concurrently: 5.3.0

**Cliente:**

- axios: 0.19.2
- bootstrap: 4.5.2
- google-maps-react: 2.0.6
- react: 16.13.1
- react-bootstrap: 1.3.0
- react-dom: 16.13.1
- react-google-recaptcha: 2.1.0
- react-scripts: 3.4.1

**Servidor:**

- express: 4.17.1
- request: 2.88.2

F