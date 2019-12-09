<h1>
  Bienvenidos a la guía de cómo ver el código hasta ahora escrito de nodejs
</h1>

<p>
  De antemano pido disculpas, no pude terminar el proyecto debido al estado de
  salud de mi abuelita dado que estuve la mayor parte del tiempo cuidando de
  ella, no obstante espero que con lo que les mostraré a continuación y con la
  sustentación pueda pasar la prueba, me hubiera gustado haber hecho el proyecto
  con Babel (ES6) y Typescript pero al fin me decanté por ES5.
</p>
<p>
  De igual manera estoy dispuesto a terminar el proyecto, en caso de que estén
  interesados hacermelo saber y continuaré con el desarrollo.
</p>
<p>
  <b>Muchas gracias por su tiempo y su atención.</b>
</p>

<hr />

<h2>Instalar y correr:</h2>
<ul>
  <li>
    <p><b>1:</b> clonar el repositorio</p>
  </li>
  <li>
    <p><b>2:</b> instalar dependencias con el cómando <i>npm install</i></p>
  </li>
  <li>
    <p><b>3:</b> usar el comando <i>npm start</i> para iniciar el servidor</p>
  </li>
</ul>

<p>
  Una vez iniciado el localhost mirar en la consola en qué puerto inició (8081
  predeterminado pero en caso de que el sistema tenga uno disponible se le
  asignará este)
  <br />
  <b>http://localhost:&ltport&gt</b>
  <br />
  <b>http://localhost:8081</b>
</p>
<hr />
<h2>Métodos:</h2>
<p>
  <b>/signin =></b> recibe como parámetros username:string, email:string y
  password:string. Retorna un JSON con el código del status, la descripción del
  status y un mensaje
</p>
<p>
  <b>/login =></b> recibe como parámetros username:string o email:string y
  password:string Retorna un JSON con el código del status, la descripción, un
  mensaje y en caso de éxito un token de autenticación
</p>
<p>
  <b>/post =></b> Aun falta por implementar, de momento valida que el token de
  usuario sea válido
</p>
<h2>Estructura del proyecto:</h2>
<p>
  La estructura del proyecto es bastante simple, el archivo
  <b>./src/index.js</b> es el archivo encargado de arrancar el servidor.
</p>
<p>
  Cuenta con un archivo de configuración ofuscado para que no sean legibles las
  credenciales que permiten conectar a MongoDB y la clave de cifrado para las
  contraseñas ingresadas por los usuarios, este se encuentra en la ruta
  <b>./src/config/config-file.js'</b>
</p>
<p>
  Luego un nivel más abajo se encuentra la ruta <b>./src/app/</b>, en esta ruta
  se encuentran los <b>controladores</b>, las <b>rutas</b> y los
  <b>servicios</b> descritos a continuación:
</p>
<ul>
  <ul>
    <li>
      <h3>Controladores:</h3>
      <p>
        Contienen la lógica de las validaciones y operaciones, se encuentran en
        la ruta <b>./src/app/controllers/*.controller.js</b>
      </p>
    </li>
    <li>
      <h3>Rutas:</h3>
      <p>
        Contienen las rutas a las cuales se puede acceder al servidor por
        métodos REST, se encuentran en la ruta <b>./src/app/routes/*.js</b>
      </p>
    </li>
    <li>
      <h3>Servicios:</h3>
      <p>
        Los servicios son las estructuras de los datos, el formato y las
        restricciones con las que se almacenan, no realiza operaciones, sólo
        recibe y envía información, se encuentran en la ruta
        <b>./src/app/services/*.service.js</b>
      </p>
    </li>
  </ul>
  <p></p>
</ul>
