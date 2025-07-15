Perfecto. Voy a diseñar una propuesta de MVP para una SPA y backend multiplataforma (Node.js con Fastify, Angular, y Capacitor) orientado a la trazabilidad de animales en Uruguay, considerando que el acceso a datos reales está restringido a operadores autorizados, por lo que podrían usarse datos simulados. Me enfocaré en un conjunto funcional mínimo que les permita demostrar las capacidades clave del sistema dentro del plazo de 4 semanas. Te avisaré en cuanto lo tenga listo.


# MVP para Sistema de Trazabilidad de Animales en Uruguay

&#x20;*Ganado en Uruguay, identificado con caravanas en las orejas para trazabilidad individual.*

## Descripción del Proyecto

La idea del proyecto es desarrollar un **sistema de trazabilidad de ganado** que permita conocer en tiempo real la ubicación de cada animal, adaptado al contexto de Uruguay. En Uruguay la trazabilidad bovina es obligatoria desde 2006; cada res debe llevar una caravana visual y un dispositivo RFID para su identificación única. Todos los movimientos de animales deben registrarse en una base de datos nacional (SNIG), *pero por ley solo pueden ser ingresados por un operador autorizado*. Esto significa que en el sistema oficial, los productores deben recurrir a técnicos registrados que notifican electrónicamente los movimientos al SNIG.

**¿Cómo abordaremos esto en nuestro proyecto?** Propondremos un **Mínimo Producto Viable (MVP)** que simule este sistema a pequeña escala. El MVP consistirá en una aplicación web de una sola página (SPA) con un backend propio, empaquetada también como aplicación móvil multiplataforma. La aplicación permitirá:

* Registrar animales con su identificación individual.
* Actualizar y consultar la *última ubicación* de cada animal (p.ej. coordenadas GPS) casi en tiempo real.
* Restringir el ingreso de datos solo a usuarios con rol de *Operador Autorizado*, respetando la regla legal (en nuestro sistema simulado, solo un usuario con ese rol podrá cargar o modificar datos de trazabilidad).
* Posiblemente visualizar en un mapa dónde se encuentra cada animal actualmente.

Dado que acceder a la API oficial del Ministerio de Ganadería (SNIG) es poco viable en un proyecto estudiantil, **simularemos las fuentes de datos externas**. Es decir, nuestro backend actuará como si fuera el “API” de trazabilidad: almacenará internamente los datos de animales y ubicaciones. Esto nos permite desarrollar y probar el sistema en 4 semanas sin depender de servicios externos.

## Tecnologías Seleccionadas (Stack Tecnológico)

Para lograr una SPA con backend y soporte multiplataforma en 4 semanas, elegimos un stack moderno que cubre frontend, backend y empaquetado móvil:

* **Node.js (Backend):** Node.js no es un lenguaje de programación en sí, sino un *entorno de ejecución* para ejecutar JavaScript del lado del servidor. Usaremos Node.js para programar el servidor backend, aprovechando su modelo asíncrono (event-loop) que es eficiente para aplicaciones en tiempo real. Esto nos permitirá manejar peticiones de forma no bloqueante y escalar a múltiples conexiones concurrentes con pocos recursos, ideal para una API de actualización frecuente (p. ej., reporte de ubicaciones GPS).

* **Fastify (Framework HTTP):** Fastify es un *framework web* rápido para Node.js, enfocado en alto rendimiento y mínima sobrecarga. En esencia, cumple un rol similar a Express.js pero optimizado: permite definir rutas HTTP de forma sencilla, manejar peticiones/respuestas, validación de datos, plugins, etc., todo con énfasis en eficiencia. Fastify nos facilitará construir una API REST robusta para el sistema de trazabilidad (ej.: rutas para **GET** datos de animales, **POST** actualizaciones de posición, autenticación, etc.) con buen rendimiento y código mantenible.

* **Angular (Frontend SPA):** Angular es un *framework frontend* de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página (SPA). Está basado en TypeScript, lo que nos brinda tipado estricto y mejor estructura en el desarrollo. Usaremos Angular para construir la interfaz web donde los usuarios (operadores) iniciarán sesión, verán la lista de animales y sus ubicaciones, y podrán registrar movimientos. Al ser SPA, la aplicación Angular cargará una vez en el navegador o dispositivo y luego las actualizaciones de datos se harán de forma dinámica mediante llamadas API al backend, sin recargar completamente la página. Esto ofrece una experiencia más fluida, similar a una app de escritorio o móvil.

* **Capacitor (Empaquetado multiplataforma):** Capacitor es una librería JavaScript y a la vez un *entorno de ejecución nativo* que proporciona una API unificada para interactuar con funcionalidades web y nativas. En otras palabras, Capacitor nos permite tomar la SPA Angular (que es una aplicación web) y *convertirla en una aplicación móvil instalable* (Android/iOS) sin reescribir el código. Funciona creando un contenedor nativo (una WebView) donde corre nuestra app web, y expone puentes para acceder a APIs del dispositivo (sensor GPS, cámara, almacenamiento, etc.) mediante JavaScript. En la práctica, integraremos Capacitor al proyecto Angular una vez funcionando la web, y generaremos plataformas Android/iOS: Capacitor creará los proyectos nativos y podremos compilar, por ejemplo, un APK de Android. Así cumpliremos con el requisito multiplataforma usando un solo código fuente.

## Funcionalidades y Alcance del MVP

Teniendo un tiempo acotado (4 semanas), definimos las **funcionalidades mínimas** que nuestro sistema deberá cumplir:

* **Autenticación y Rol de Operador:** Implementaremos un sistema de usuarios con inicio de sesión. Solo un usuario con rol *Operador Autorizado* podrá registrar o modificar datos de animales. Esto simula el rol real utilizado en las páginas del MGAP (Ministerio de Ganadería), donde solo operadores registrados pueden reportar movimientos. En nuestro MVP, podemos crear de antemano uno o dos usuarios (p.ej., *admin* u *operador*) en la base de datos. El frontend Angular ofrecerá un formulario de login; al validar credenciales, el backend emitirá un token (ej. JWT) o iniciará una sesión. Todas las operaciones críticas (alta de animal, actualizar ubicación) requerirán estar autenticado como operador. Este mecanismo asegura que se cumpla la regla de “solo operador autorizado registra datos”.

* **Registro y Consulta de Animales:** El sistema manejará un listado de animales con sus datos básicos. Cada animal tendrá al menos un **identificador único** – por ejemplo, el número de caravana oficial de 12 dígitos (podemos usar un formato UY######### simulado). Opcionalmente se almacenan atributos como sexo, raza, fecha de nacimiento, etc., pero para el MVP podemos limitarlo al ID y quizás un nombre o descripción. El operador podrá **registrar un nuevo animal** (ingresando su ID) mediante la SPA, lo que enviará un POST al backend (que lo guardará en la base de datos simulada). También habrá una pantalla o sección de **consulta**, donde se liste cada animal registrado junto con su *última ubicación conocida* y la hora de la última actualización. Esta lista se obtiene con una petición GET al backend (por ejemplo `/animales` devuelve JSON con todos los animales y sus datos).

* **Actualización de Ubicación en “Tiempo Real”:** Esta es la esencia de la trazabilidad: poder **actualizar la ubicación de un animal** y consultarla casi en tiempo real. Cuando el operador tenga un animal localizado, usará la app para enviar su posición. Gracias a Capacitor, la app móvil podrá obtener coordenadas GPS del dispositivo. Por ejemplo, integraremos el API de geolocalización: el operador podría abrir el detalle de un animal y pulsar "Actualizar ubicación", entonces la app captura la ubicación GPS actual (latitud/longitud) y la envía al servidor (quizá mediante un POST a `/animales/{id}/ubicacion`). El backend Fastify recibirá esa posición, la almacenará asociada al animal (sobrescribiendo la última ubicación y guardando quizás un historial simple), y responderá con éxito.

  Desde el lado de visualización, la SPA Angular podrá mostrar la ubicación en un mapa. Para el MVP, podría bastar con mostrar las coordenadas numéricas o nombre de la estancia/localidad. Sin embargo, sería muy ilustrativo integrar un mapa sencillo (por ejemplo usando Google Maps *embed* o una librería como Leaflet/OpenStreetMap) en la vista de detalle: al tener la latitud/longitud, podemos colocar un marcador indicando "posición actual". La actualización "en tiempo real" se reflejaría al momento que el operador envía una nueva posición – incluso podríamos implementar *WebSockets* o *Server-Sent Events* para que si la vista del mapa está abierta, éste reciba actualizaciones automáticas. No obstante, para simplificar en 4 semanas, quizás optemos por un enfoque de *pull*: cada vez que se abre o refresca el detalle, se pide la última ubicación al servidor, o se pulsa un botón "refrescar". Lo importante es que el sistema permita conocer dónde está cada animal con datos lo más recientes posible, imitando un seguimiento en vivo.

* **Simulación de API/Integraciones:** Inicialmente, todos los datos estarán en nuestro propio backend. La frase "lo ideal sería conectarnos con una API" alude a que, en un mundo ideal, podríamos consumir directamente servicios del SNIG u otros (por ejemplo, obtener datos oficiales de animales escaneando el número de caravana). Dado que no tendremos acceso a esas APIs oficiales, optaremos por **simular** dichas integraciones. Esto puede hacerse de dos maneras en el MVP:

  1. **Datos precargados:** Poblar la base de datos con algunos animales de ejemplo (IDs ficticios) y quizás sus ubicaciones iniciales. Así, al iniciar la aplicación, ya hay información para visualizar.
  2. **Endpoints dummy externos:** Para ilustrar la arquitectura, podríamos crear un pequeño servicio o archivo JSON que represente la "API del MGAP". Por ejemplo, un JSON con información de animales que el backend consume una vez. Sin embargo, dado el tiempo, probablemente sea más sencillo manejar todo dentro del mismo backend.

  En resumen, no nos conectaremos a servicios gubernamentales reales, sino que **nuestro Node/Fastify será el proveedor de datos**. Esto nos da control total para pruebas (podemos simular respuestas de búsqueda de un animal, etc.) y evita retrasos por trámites de acceso.

* **Aplicación Web y Móvil desde la misma base de código:** La SPA Angular correrá en el navegador (por ejemplo, desplegada en un servidor local o en GitHub Pages) y **también** se ejecutará como app móvil gracias a Capacitor. Esto significa que entregaremos un APK de Android al final del proyecto (y potencialmente instrucciones para iOS si se requiere, aunque sin un Mac es complicado compilar para iOS). En el modo móvil, la app debe funcionar offline en cuanto a interfaz (sirviendo los archivos estáticos desde el dispositivo), pero necesitará conectividad para comunicarse con el backend al hacer login o actualizar ubicaciones. Podríamos desplegar el backend en un servicio en la nube o simplemente ejecutarlo localmente para las demostraciones (por ejemplo, ambos dispositivos conectados a la misma red).

  Un detalle a considerar es el *almacenamiento local*: con Capacitor podríamos aprovechar funciones nativas para guardar, por ejemplo, el token de autenticación de forma segura en el dispositivo móvil. Pero en MVP esto se puede simplificar usando *LocalStorage* del navegador en la SPA misma.

## Arquitectura e Implementación

**Arquitectura General:** Será una arquitectura cliente-servidor tradicional, separando claramente frontend y backend:

* En el **frontend**, Angular manejará la experiencia de usuario: rutas de la SPA (p.ej. `/login`, `/animales`, `/animales/:id`), componentes visuales, formularios y lógica para consumir la API. Emplearemos servicios de Angular (`HttpClient`) para realizar las peticiones HTTP al backend. También aprovecharemos funcionalidades como *data binding* para actualizar la vista reactivamente cuando cambien los datos (por ejemplo, al recibir una nueva ubicación).

* El **backend** con Node/Fastify expondrá una serie de endpoints REST. Algunos esenciales serían:

  * `POST /login` – verifica usuario/contraseña, devuelve token de sesión (JWT).
  * `GET /animales` – lista todos los animales (requiere auth).
  * `POST /animales` – crea un nuevo animal (requiere auth de operador).
  * `GET /animales/{id}` – detalles de un animal, incluyendo última ubicación.
  * `POST /animales/{id}/ubicacion` – registra una nueva posición para el animal dado (requiere auth de operador).

  Fastify facilita definir estas rutas y puede incorporar *plugins* para, por ejemplo, autenticación JWT o validación de esquema JSON de entrada. Por simplicidad, podríamos primero implementar sin seguridad estricta y luego agregar la capa de autenticación una vez funcione lo básico.

* **Base de datos:** Podemos usar una base ligera como SQLite, un simple JSON en memoria, o incluso un arreglo en memoria durante desarrollo. Para que persista entre ejecuciones, SQLite o un archivo JSON serían adecuados. El esquema sería sencillo: una tabla/colección de `animales` (con campos id, nombre, etc.) y otra de `ubicaciones` (id del animal, timestamp, lat, long). Como optimización mínima, se puede guardar la ubicación *actual* directamente en la tabla de animales (campos lat, long, last\_update), y mantener una tabla separada solo si queremos historiales. Dado el tiempo, probablemente almacenemos solo la última posición (pero dejando la puerta abierta a extensiones futuras de mantener el histórico de movimientos).

* **Restricción por rol:** Cada petición que modifique datos verificará que el usuario autenticado tiene rol de operador. Esto se logra, por ejemplo, mediante un middleware en Fastify que inspecte el JWT enviado en el header Authorization. El JWT podría llevar un campo `role: "operador"`. Si el rol no coincide, el servidor devuelve un error 403 (Forbidden). De esta forma, incluso si alguien descubriera la API, no podría usarla para enviar datos sin las credenciales apropiadas. Implementar esta seguridad básica sería importante para emular el concepto real de "solo operadores autorizados".

* **Captura de ubicación en la app:** En el navegador web (modo desktop), obviamente no tendremos GPS real, pero podríamos permitir ingresar manualmente coordenadas o seleccionar un punto en un mapa como simulación. En cambio, en la aplicación móvil (modo Capacitor), usaremos el plugin de Geolocalización. Por ejemplo, mediante `navigator.geolocation.getCurrentPosition` del estándar web o la API provista por Capacitor (que internamente accede al GPS nativo) podemos obtener la latitud y longitud actuales. Esa info se pasará al backend en la petición de actualización.

  * *Nota:* Si el operador está en campo con el animal, esta técnica obtiene la ubicación del operador (asumiendo cercano al animal), lo cual en la práctica equivale a la del animal en ese momento. No tendremos dispositivos en el animal, así que esta es la forma más directa de simular *tracking*.

* **Interfaz de usuario:** Diseñaremos la UI de forma sencilla pero funcional, dado el tiempo corto. Utilizaremos componentes de Angular Material u otra biblioteca de UI para agilizar. Por ejemplo:

  * Pantalla de **Login**: un formulario de usuario y contraseña.
  * Pantalla principal **Lista de Animales**: muestra todos los animales registrados en una tabla o cards, con su ID y quizá un indicador de estado (ej. un icono verde si tiene ubicación reciente). Desde aquí se podría ir al detalle de cada animal.
  * **Detalle de Animal**: muestra información del animal y su ubicación actual. Incluiría un pequeño mapa con un marcador o, en MVP inicial, un texto tipo "Ubicación: Lat -34.90, Lon -56.16 (Montevideo) actualizada hace 5 min". También un botón "Actualizar Ubicación" que solo se habilita para el rol operador.
  * **Registro nuevo Animal**: podría ser un diálogo o una ruta aparte con formulario para ingresar el ID (y otros datos opcionales) de un nuevo animal, que al enviar llame al endpoint de creación.

* **Empaquetado con Capacitor:** Una vez tengamos la SPA funcionando en el navegador, integraremos Capacitor para obtener la app móvil. Esto implica ejecutar comandos (como `npx cap init` para inicializar Capacitor en el proyecto Angular, y `npx cap add android` para crear el proyecto Android). Luego, abriremos el proyecto Android en Android Studio para compilar y probar en un dispositivo o emulador. Capacitor incluirá la WebView que carga nuestra app; hay que asegurarse de que las URLs del backend estén accesibles (posiblemente configurando el servidor backend con IP accesible en la red local, o usando una URL pública/ngrok durante las pruebas).

  * Además, instalaremos cualquier plugin necesario de Capacitor. En particular, para GPS podemos usar el plugin oficial `@capacitor/geolocation`. La ventaja es que la misma llamada en JavaScript funcionará tanto en la versión web (que pedirá permiso de ubicación en el browser) como en la versión móvil (que pedirá permiso en Android/iOS). Capacitor unifica esas llamadas. Si quisiéramos agregar, por ejemplo, funcionalidad de escanear código de barras (imaginando que las caravanas tuvieran código QR), podríamos usar otro plugin; pero eso podría quedar fuera del MVP si no es prioritario.

## Consideraciones Finales y Viabilidad

Con este planteo, en 4 semanas se ve factible construir un MVP funcional:

* **Semana 1:** Configuración del proyecto (Angular, Node) y desarrollo de modelo de datos. Implementar backend básico (endpoints CRUD de animales) y probar con Postman. Implementar pantalla de login y lista de animales en Angular, obteniendo datos estáticos o del backend ya.
* **Semana 2:** Añadir autenticación (simple al menos) y rol operador en backend. Proteger las rutas. Terminar flujo de login en frontend (almacenando token). Permitir creación de nuevos animales desde la UI. Empezar con la pantalla de detalle de animal.
* **Semana 3:** Integrar geolocalización. Backend: endpoint de actualizar ubicación. Frontend: botón que toma posición (simulada o real) y envía al backend. Mostrar la ubicación en la UI (texto o mapa básico). Verificar que todo el ciclo funciona (e.g., actualizar y luego ver reflejado en consulta).
* **Semana 4:** Testing e integración final. Aquí se incorpora **Capacitor** para generar la app móvil. Probar en un dispositivo real las funciones (login, listar, actualizar ubicación con GPS real). Hacer ajustes de UX si algo no funciona en mobile. Finalmente, documentar y preparar la demo.

Como mejora futura (ya fuera del MVP), se podría explorar conectar con fuentes reales: por ejemplo, que el backend consulte algún servicio de MGAP para validar si un ID de animal existe, o incluso aprovechar *open data*. También se podría permitir a usuarios sin rol operador **ver** la información (solo lectura) mientras solo el operador modifica – simulando que un productor pueda consultar pero no editar. Sin embargo, para el alcance mínimo propuesto nos enfocamos en el **rol operador** y las funciones esenciales de registro y localización.

**Conclusión:** Nuestro MVP implementará una versión simplificada del sistema de trazabilidad animal uruguayo utilizando Node.js + Fastify en el backend, un frontend SPA en Angular, y empaquetado con Capacitor para entregar también una app móvil. Así, demostramos en pequeño escala cómo *“saber dónde está cada animal en tiempo real”* manteniendo la restricción de que solo personas autorizadas registran los datos, tal como en el sistema real de Uruguay. Este enfoque asegura un proyecto abordable en 4 semanas y sienta las bases para expandir funcionalidad en el futuro.

**Fuentes y Referencias:**

* Características de Node.js y su uso en tiempo real
* Definición y enfoque de alto rendimiento de Fastify
* Angular como framework SPA en TypeScript
* Capacitor para apps híbridas (web a nativo)
* Trazabilidad bovina en Uruguay y rol de operador autorizado
