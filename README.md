# ATS Mini Companion

[🇪🇸 Español](#español) | [🇬🇧 English](#english)

<p align="center">
  <img src="https://i.ibb.co/m5FHq2Hk/ats-companion-3.jpg" alt="ats-companion-3" width="300"/>
  <img src="https://i.ibb.co/vvcjqD3K/ats-companion-2.jpg" alt="ats-companion-2" width="300"/>
  <img src="https://i.ibb.co/60FcVWw8/ats-companion-1.jpg" alt="ats-companion-1" width="300"/>
</p>

---

## English

Remote control application for the ATS Mini radio receiver via USB Serial.

### Description

ATS Mini Companion is an Android application developed with React, Vite, and Capacitor that allows remote control of the ATS Mini radio receiver through USB Serial connection. The application offers an intuitive ICOM-style interface to manage all receiver parameters.

### Features

- **Frequency Control**: Precise frequency adjustment with +/- buttons and long-press support
- **Band Management**: Quick navigation between frequency bands
- **Operating Modes**: Switch between different modulation modes (AM, FM, SSB, etc.)
- **Bandwidth Control**: Adjust receiver bandwidth
- **Step Control**: Configure tuning step
- **AGC/Attenuator**: Automatic gain control and attenuator
- **Volume Control**: Audio level adjustment with visual indicator
- **Backlight Control**: Adjust receiver screen brightness
- **Menu Access**: Direct access to receiver menu

### Download

**[Download APK v2.5](https://github.com/rodillo69/ATS-Mini-Companion/releases/download/v2.5/ATSMini_v2.5_debug.apk)**

### Requirements

- Android device with USB OTG support
- USB OTG cable to connect the ATS Mini receiver
- Android 7.0 or higher

### Installation

1. Download the APK file from the link above
2. Enable installation from unknown sources on your Android device
3. Install the APK
4. Connect your ATS Mini receiver using a USB OTG cable
5. Open the application and press "Connect" to establish the connection

### Technologies Used

- **React 19**: JavaScript framework for the user interface
- **Vite 7**: High-performance build tool and bundler
- **Capacitor 7**: Cross-platform native application framework
- **TailwindCSS**: CSS framework for responsive design
- **Capacitor Serial Plugin**: Plugin for USB Serial communication

### Development

#### Development Requirements

- Node.js 18 or higher
- Java JDK 17 (included in Android Studio)
- Android Studio with Android SDK
- Git

#### Build from Source

```bash
# Clone the repository
git clone https://github.com/rodillo69/ATS-Mini-Companion.git
cd ATS-Mini-Companion

# Install dependencies
npm install

# Build the web application
npm run build

# Sync with Android
npx cap sync android

# Open in Android Studio
npx cap open android

# Or build directly with Gradle
cd android
./gradlew assembleDebug
```

The generated APK will be in `android/app/build/outputs/apk/debug/app-debug.apk`

### Project Structure

```
ats-mini-control/
├── src/
│   ├── components/       # React components
│   ├── services/         # Serial communication services
│   ├── App.jsx          # Main component
│   └── index.css        # Global styles
├── android/             # Native Android project
├── public/              # Static assets
├── capacitor.config.ts  # Capacitor configuration
└── vite.config.js       # Vite configuration
```

### Version History

#### v2.5 (Current)
- Improved long press control for frequency buttons
- Frequency change verification before sending next command
- Serial communication saturation prevention

#### v2.4
- Disabled text selection throughout the application
- Improved touch experience on mobile devices

#### v2.3
- Long press implementation with recursive control
- Fixed command stopping issues

#### v2.2
- Long press speed adjustment to avoid serial saturation

#### v2.1
- Initial long press implementation for frequency buttons

#### v2.0
- Removed rotary VFO dial control
- New interface with horizontal +/- buttons
- Mobile-optimized design

### License

This project is under the MIT License.

### Author

Developed by EA5IYR - Miguel Cañadas

### Contributions

Contributions are welcome. Please open an issue to discuss important changes before creating a pull request.

### Support

If you encounter any problems or have suggestions, please open an issue in the GitHub repository.

### Acknowledgments

This project is a companion application for the **ATS Mini** radio receiver, an amazing open-source project by the ESP32-SI4732 community.

**ATS Mini Radio Receiver:**
- 📻 [ATS Mini Official Documentation](https://esp32-si4732.github.io/ats-mini/index.html)
- 🔧 [ATS Mini GitHub Repository](https://github.com/ESP32-SI4732/ATS-Mini)

Special thanks to the ATS Mini development team for creating such an excellent and hackable radio receiver platform. This application wouldn't be possible without their outstanding work on the hardware and firmware.

---

## Español

Aplicación de control remoto para el receptor de radio ATS Mini a través de USB Serial.

### Descripción

ATS Mini Companion es una aplicación Android desarrollada con React, Vite y Capacitor que permite controlar de forma remota el receptor de radio ATS Mini mediante conexión USB Serial. La aplicación ofrece una interfaz intuitiva tipo ICOM para gestionar todos los parámetros del receptor.

### Características

- **Control de Frecuencia**: Ajuste preciso de frecuencia con botones +/- y soporte para pulsación larga
- **Gestión de Bandas**: Navegación rápida entre bandas de frecuencia
- **Modos de Operación**: Cambio entre diferentes modos de modulación (AM, FM, SSB, etc.)
- **Control de Ancho de Banda**: Ajuste del ancho de banda del receptor
- **Control de Paso**: Configuración del paso de sintonización
- **AGC/Atenuador**: Control de ganancia automática y atenuador
- **Control de Volumen**: Ajuste del nivel de audio con indicador visual
- **Control de Retroiluminación**: Ajuste del brillo de la pantalla del receptor
- **Acceso al Menú**: Acceso directo al menú del receptor

### Descarga

**[Descargar APK v2.5](https://github.com/rodillo69/ATS-Mini-Companion/releases/download/v2.5/ATSMini_v2.5_debug.apk)**

### Requisitos

- Dispositivo Android con soporte USB OTG
- Cable USB OTG para conectar el receptor ATS Mini
- Android 7.0 o superior

### Instalación

1. Descarga el archivo APK desde el enlace anterior
2. Habilita la instalación desde fuentes desconocidas en tu dispositivo Android
3. Instala la APK
4. Conecta tu receptor ATS Mini mediante cable USB OTG
5. Abre la aplicación y pulsa "Connect" para establecer la conexión

### Tecnologías Utilizadas

- **React 19**: Framework JavaScript para la interfaz de usuario
- **Vite 7**: Build tool y bundler de alto rendimiento
- **Capacitor 7**: Framework para aplicaciones nativas multiplataforma
- **TailwindCSS**: Framework CSS para diseño responsive
- **Capacitor Serial Plugin**: Plugin para comunicación USB Serial

### Desarrollo

#### Requisitos de desarrollo

- Node.js 18 o superior
- Java JDK 17 (incluido en Android Studio)
- Android Studio con Android SDK
- Git

#### Compilar desde código fuente

```bash
# Clonar el repositorio
git clone https://github.com/rodillo69/ATS-Mini-Companion.git
cd ATS-Mini-Companion

# Instalar dependencias
npm install

# Compilar la aplicación web
npm run build

# Sincronizar con Android
npx cap sync android

# Abrir en Android Studio
npx cap open android

# O compilar directamente con Gradle
cd android
./gradlew assembleDebug
```

La APK generada estará en `android/app/build/outputs/apk/debug/app-debug.apk`

### Estructura del Proyecto

```
ats-mini-control/
├── src/
│   ├── components/       # Componentes React
│   ├── services/         # Servicios de comunicación serial
│   ├── App.jsx          # Componente principal
│   └── index.css        # Estilos globales
├── android/             # Proyecto Android nativo
├── public/              # Assets estáticos
├── capacitor.config.ts  # Configuración de Capacitor
└── vite.config.js       # Configuración de Vite
```

### Historial de Versiones

#### v2.5 (Actual)
- Mejora en el control de long press para botones de frecuencia
- Verificación de cambio de frecuencia antes de enviar siguiente comando
- Prevención de saturación de comunicación serial

#### v2.4
- Deshabilitada la selección de texto en toda la aplicación
- Mejoras en la experiencia táctil en dispositivos móviles

#### v2.3
- Implementación de long press con control recursivo
- Corrección de problemas de comandos que no se detenían

#### v2.2
- Ajuste de velocidad en long press para evitar saturación serial

#### v2.1
- Implementación inicial de long press en botones de frecuencia

#### v2.0
- Eliminación del control VFO dial rotatorio
- Nueva interfaz con botones horizontales +/-
- Diseño optimizado para dispositivos móviles

### Licencia

Este proyecto está bajo licencia MIT.

### Autor

Desarrollado por EA5IYR - Miguel Cañadas

### Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios importantes antes de crear un pull request.

### Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio de GitHub.

### Agradecimientos

Este proyecto es una aplicación complementaria para el receptor de radio **ATS Mini**, un increíble proyecto de código abierto de la comunidad ESP32-SI4732.

**Receptor de Radio ATS Mini:**
- 📻 [Documentación Oficial del ATS Mini](https://esp32-si4732.github.io/ats-mini/index.html)
- 🔧 [Repositorio GitHub del ATS Mini](https://github.com/ESP32-SI4732/ATS-Mini)

Agradecimientos especiales al equipo de desarrollo del ATS Mini por crear una plataforma de receptor de radio tan excelente y modificable. Esta aplicación no sería posible sin su destacado trabajo en el hardware y firmware.
