# Como instalar
1. Clona el repositorio de GitHub en tu máquina local utilizando el comando `git clone` seguido de la URL del repositorio.

2. Asegúrate de tener Node.js instalado en tu máquina. Puedes verificar esto ejecutando el comando `node -v` en tu terminal. Si no tienes Node.js, puedes descargarlo desde su sitio web oficial. (también debes tener instalado git si vas a usar el método de clonar de github, si no es el caso puedes bajarlo en zip y descomprimirlo en una carpeta)

3. Abre una terminal en la carpeta raíz de tu proyecto y ejecuta el comando `npm install`. Esto instalará todas las dependencias necesarias para el proyecto, incluyendo Express.

4. Una vez que se hayan instalado todas las dependencias, puedes ejecutar tu aplicación utilizando el comando `npm start`. Esto iniciará tu servidor y lo hará accesible en tu navegador en la dirección **_http://localhost:2000._**
#Views

Para empezar a ver la información de la api se debe ingresar sesión en la siguiente página y rellenar la información con los usuarios que están guardados en la base de datos (se debe tener el servidor apache y mysql para poder iniciar el servidor)

http://localhost:2000/login



Luego de haber iniciado sesión podrás ver el token de la sesión el cual solo dura 10m, luego de pasado el tiempo el token caducará y no podrás usarlo de nuevo 

Para hacer las consultas segun hayas iniciado sesion con el contador o facturador tendrás que añadir al header del html ?accessToken=”ingresas el token que te dio al logear”

![image](https://github.com/JustKillu/Express.js/assets/60795569/66cd9d9f-8a6b-474d-84b8-7ee05dd93e1b)

![image](https://github.com/JustKillu/Express.js/assets/60795569/6fcad024-7823-4daf-ab3b-14843b3c7f61)

Ejemplo de logear en http://localhost:2000/?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJpZCI6MSwidXNlcm5hbWUiOiJ4YXZpZXIiLCJwYXNzd29yZCI6MTIzNDUsIndvcmtwbGFjZSI6ImNvbnRhZG9yIn1dLCJpYXQiOjE2OTAxODE5NDQsImV4cCI6MTY5MDE4MjEyNH0.qNEuo5I9LvsckEeBkhoFvCxLh7hsYtvLUeDbjlA7TNY

![image](https://github.com/JustKillu/Express.js/assets/60795569/405d224d-5307-41e5-bc41-1e02a6410f1d)

![image](https://github.com/JustKillu/Express.js/assets/60795569/bd39770b-7128-4d95-a029-70634c3d8ee4)


##Botones

-> Productos = Sólo accesible para el facturador
-> Clientes = Sólo accesible para el contador
-> Cuentas = Sólo accesible para el contador
-> Facturas = Solo accesible para el facturador
-> Repartidores = Sólo accesible para el facturador


#Consultas
Para hacer las consultas ahora puedes ingresar desde la raíz “http://localhost:2000/?accessToken=”( luego de haberse logeado he ingresado) mediante los botones verás la siguiente interfaz donde podrás ver gráficamente lo que contienen y eliminar/editar mediante botones

Tabla Clientes



Si quieres añadir información a la tabla haciendo scroll hacia abajo puedes ver unos cuantos inputs para insertar información directamente y actualizar la página

![image](https://github.com/JustKillu/Express.js/assets/60795569/b94265ff-a30a-4a75-a0f5-145ee0036eab)


Tabla Cuentas

![image](https://github.com/JustKillu/Express.js/assets/60795569/928f03ad-37ae-4f9e-8946-481547b3d992)



Tabla Productos

![image](https://github.com/JustKillu/Express.js/assets/60795569/6d823c55-019a-40f2-8c55-e1ccb97f2a0f)


Tabla Repartidores

![image](https://github.com/JustKillu/Express.js/assets/60795569/3183941f-893a-483b-825a-10e8082b6b9f)



Tabla Facturas
a esta tabla se le añadió un pequeño menu con bootstrap para colocar la fecha en formato 'dd-mm-yy'

![image](https://github.com/JustKillu/Express.js/assets/60795569/005d19d5-a282-4f74-918c-5d59ee1962b5)


En cuanto al menú de edición se creó un SWITCH donde se diseñaron distintas interfaces según que se vaya a editar

Ejemplo editar facturas

![image](https://github.com/JustKillu/Express.js/assets/60795569/07c62a97-5a76-43f2-86ed-beec8d459b33)


De igual forma se anexan las consultas manuales mediante thunder client

#***Consultas*** **GET** simplemente colocar la **URL** a la que se desea acceder y añadirle `/`+ la id a la que se desea acceder y este mostrará a quien pertenece 
Nota: utilizando la extensión thunder client colocamos el token que se nos da al logear en query 

 ![image](https://github.com/JustKillu/Express.js/assets/60795569/90c51e36-a635-49c5-befc-1148635a07d6)

~~si se quiere obtener una vista de todos lo valores disponibles seria sin la **id**~~




Consultas POST teniendo en cuenta en qué URL se tiene que cambiar del método de GET a POST en el thunder client situándonos en BODY escribimos en formato JSON nuestro nuevo input luego de esto se nos mostrará en el panel de la derecha todo valores disponibles más el nuevo creado manualmente, también en consola se nos mostrar un mensaje como por ejemplo en la siguiente imagen:


![image](https://github.com/JustKillu/Express.js/assets/60795569/9656a2ed-c368-4ee8-b335-ef17683ecfbd)


Consultas PUT Con este método podremos actualizar un valor de nuestra lista, siguiendo el método get para seleccionar un valor(utilizando su id) y ya podremos actualizar el valor a nuestro gusto como por ejemplo:



Consultas DELETE Para utilizar este metodo tambien deberemos seguir el metodo GET para seleccionar el valor a eliminar hacer la petición ejemplo:

![image](https://github.com/JustKillu/Express.js/assets/60795569/d276c807-4cda-4728-b5e5-29655b98c993)


Consultas de Facturas GET Para consultar facturas especificas deberemos envez de utilizar el id como veníamos haciendo tendremos que utilizar la fecha de la factura para poder checar a quien o quienes pertenecen como por ejemplo:

![image](https://github.com/JustKillu/Express.js/assets/60795569/93079220-2c1a-4164-a713-1951fc915328)


