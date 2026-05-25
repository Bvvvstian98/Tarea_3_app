# Tarea_3_app
Primera app movil - Formulario AsyncStorage y tema Dark/Light

# Primera App Móvil - Hola Mundo

Aplicación móvil desarrollada en React Native con Expo como primera tarea del curso de Desarrollo Web y Mobile.

---

## Descripción

Esta aplicación cumple con los siguientes requisitos de la tarea:

- Muestra el mensaje **"Hola Mundo"** en la pantalla principal
- Contiene un **formulario** con campos: Nombre, Email, Teléfono y Mensaje
- Los datos del formulario se **guardan localmente** en el dispositivo usando AsyncStorage
- Tiene un **botón para cambiar el tema** entre modo claro y modo oscuro
- El tema seleccionado es **persistente**, se mantiene al cerrar y volver a abrir la app
- Los datos del formulario también son **persistentes**

---

## Tecnologías utilizadas

- React Native
- Expo SDK 54
- AsyncStorage (almacenamiento local del dispositivo)
- React Context API (manejo global del tema)
- JavaScript

---

## Estructura del proyecto

HolaMundoApp/
├── App.js
├── app.json
├── package.json
└── src/
├── context/
│   └── ThemeContext.js
├── components/
│   ├── ThemeToggle.js
│   └── FormInput.js
└── screens/
└── HomeScreen.js

---

## Requisitos previos

Antes de ejecutar el proyecto necesitas tener instalado:

- Node.js version 18 o superior
- npm
- Expo CLI

Para instalar Expo CLI ejecuta:

```bash
npm install -g expo-cli
```

---

## Instalacion y ejecucion

### 1. Clonar el repositorio

```bash
git clone https://github.com/Bvvvstian98/Tarea_3_app.git
cd Tarea_3_app/HolaMundoApp
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar la aplicacion

```bash
npx expo start --clear
```

### 4. Ver la app

**En el navegador web:**
Presiona la tecla **W** en la terminal

**En tu telefono:**
- Descarga la app **Expo Go** desde App Store o Play Store
- Escanea el codigo QR que aparece en la terminal

---

## Funcionalidades

### Cambio de tema
- El boton en la parte superior derecha alterna entre modo claro y modo oscuro
- El tema elegido se guarda automaticamente y se recuerda al volver a abrir la app

### Formulario
- Campos: Nombre completo, Correo electronico, Telefono y Mensaje
- Al presionar "Terminar formulario" los datos se guardan en el dispositivo
- Si existen datos guardados, aparece un aviso para cargarlos
- Se puede borrar los datos guardados con el boton correspondiente

---

## Autor

- Nombre: Bastian González Devia
- Curso: Desarrollo Web y Mobile
- Repositorio: https://github.com/Bvvvstian98/Tarea_3_app
