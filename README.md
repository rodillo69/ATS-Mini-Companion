# ATS Mini Companion

[🇪🇸 Español](#español) | [🇬🇧 English](#english)

<p align="center">
  <img src="https://i.ibb.co/ZRVJ7NnZ/splashscreen.jpg" alt="ATS Mini Splash" width="300"/>
  <img src="https://i.ibb.co/39r8Pz0n/menu-bluetooth.jpg" alt="Bluetooth Menu" width="300"/>
  <img src="https://i.ibb.co/0PG7XSH/conexion-bluetooth.jpg" alt="Bluetooth Connection" width="300"/>
</p>

<p align="center">
  <img src="https://i.ibb.co/m5FHq2Hk/ats-companion-3.jpg" alt="ats-companion-3" width="300"/>
  <img src="https://i.ibb.co/vvcjqD3K/ats-companion-2.jpg" alt="ats-companion-2" width="300"/>
  <img src="https://i.ibb.co/60FcVWw8/ats-companion-1.jpg" alt="ats-companion-1" width="300"/>
</p>

---

## English

Complete development environment for the ATS Mini radio receiver: Android companion app and custom Bluetooth-enabled firmware.

### 🎯 Project Overview

This repository contains two main components:

1. **[Android Companion App](app/)** - Remote control application for ATS Mini via USB Serial and Bluetooth LE
2. **[Custom Firmware](firmware/)** - Modified ATS Mini firmware with Bluetooth LE support and custom boot logo

### 📦 Quick Start

#### Download Prebuilt Release

**[Download APK v3.0 (Bluetooth Edition)](https://github.com/rodillo69/ATS-Mini-Companion/raw/main/releases/ATS-Mini-Companion-BLE.apk)**

#### Flash Firmware

See [Firmware README](firmware/README.md) for detailed instructions on how to flash the Bluetooth-enabled firmware.

### ✨ Features

#### Android App
- **Dual Connection Mode**: USB Serial or Bluetooth LE
- **Frequency Control**: Precise tuning with +/- buttons and long-press support
- **Band Management**: Quick navigation between frequency bands
- **Operating Modes**: AM, FM, SSB mode switching
- **Real-time Monitoring**: RSSI, SNR, battery voltage display
- **Full Remote Control**: Volume, bandwidth, AGC, attenuator, backlight

#### Custom Firmware (v1.4)
- ✅ **Bluetooth LE** with Nordic UART Service
- ✅ **WiFi/BLE automatic mutual exclusion** (only one active at a time)
- ✅ **Custom boot logo** (2 seconds at startup)
- ✅ **ESP32-S3-WROOM-1-N16R8** (16MB Flash + 8MB PSRAM)
- ✅ **Logo embedded in firmware** (no SPIFFS required)

### 📂 Repository Structure

```
ATS-Mini-Companion/
├── app/                        # Android companion application
│   ├── src/                   # React source code
│   ├── android/               # Native Android project
│   └── README.md              # App build & dev instructions
│
├── firmware/                   # ATS Mini custom firmware
│   ├── ats-mini/              # Arduino source code
│   ├── binaries/              # Compiled firmware files
│   ├── docs/                  # Firmware documentation
│   └── README.md              # Firmware build & flash instructions
│
├── releases/                   # Prebuilt APK releases
│   └── ATS-Mini-Companion-BLE.apk
│
└── docs/                       # General documentation
    ├── ANDROID-SETUP.md
    └── images/
```

### 🚀 Getting Started

#### For Users (Prebuilt Binaries)

1. **Install the Android App**
   - Download the APK from [releases/](releases/)
   - Install on your Android device (enable "Unknown sources")
   - Grant Bluetooth permissions

2. **Flash the Firmware**
   - Follow instructions in [firmware/README.md](firmware/README.md)
   - Use the precompiled binaries in [firmware/binaries/](firmware/binaries/)
   - Recommended: Flash `ats-mini.ino.merged.bin` at address `0x0`

3. **Connect and Enjoy**
   - On ATS Mini: Settings > Bluetooth > Bluefruit
   - Open the app and select "Bluetooth LE"
   - Connect to "ATS-Mini"

#### For Developers

- **Android App Development**: See [app/README.md](app/README.md)
- **Firmware Development**: See [firmware/README.md](firmware/README.md)

### 📋 Requirements

#### For USB Serial Connection
- Android device with USB OTG support
- USB OTG cable
- Android 7.0 or higher

#### For Bluetooth LE Connection
- Android device with Bluetooth LE support
- Android 7.0 or higher
- ATS Mini with Bluetooth-enabled firmware (v1.4 or higher)

### 🛠️ Technologies Used

#### Android App
- **React 19**: JavaScript UI framework
- **Vite 7**: Build tool and bundler
- **Capacitor 7**: Cross-platform native framework
- **TailwindCSS**: CSS framework
- **Capacitor Serial Plugin**: USB Serial communication
- **Capacitor Bluetooth LE Plugin**: Bluetooth communication

#### Firmware
- **Arduino Framework**: For ESP32-S3
- **SI4735 Library**: Radio chip control
- **NimBLE**: Bluetooth LE stack
- **TFT_eSPI**: Display driver
- **WiFi**: Network connectivity

### 📖 Documentation

- [Android App Documentation](app/README.md)
- [Firmware Documentation](firmware/README.md)
- [Android Setup Guide](docs/ANDROID-SETUP.md)
- [Bluetooth Implementation Details](firmware/docs/BLUETOOTH_IMPLEMENTATION.md)
- [Flashing Instructions](firmware/binaries/FLASH_INSTRUCTIONS.md)

### 🐛 Troubleshooting

#### Bluetooth not appearing in ATS Mini menu
- Flash the Bluetooth-enabled firmware (v1.4) from [firmware/binaries/](firmware/binaries/)

#### "ATS-Mini" not visible in Bluetooth scan
1. Verify Bluetooth is activated: Settings > Bluetooth > Bluefruit
2. Restart the ATS Mini (press RESET button)
3. Stay within 2 meters range

#### Connection frequently disconnects
1. Reduce distance to less than 5 meters
2. Remove metal obstacles between devices
3. Verify ATS Mini battery level (> 3.5V)
4. Close other Bluetooth apps

For more troubleshooting, see [firmware/binaries/FLASH_INSTRUCTIONS.md](firmware/binaries/FLASH_INSTRUCTIONS.md)

### 📜 Version History

#### v3.0 (Current - Bluetooth Edition)
- **NEW:** Bluetooth LE support with Nordic UART Service
- **NEW:** Dual connection mode (USB Serial + Bluetooth LE)
- **NEW:** WiFi/BLE automatic mutual exclusion in firmware
- **NEW:** Custom boot logo on ATS Mini
- **IMPROVED:** Connection status indicator
- **IMPROVED:** Real-time data streaming via Bluetooth
- **INCLUDED:** Complete firmware source code

Previous versions: [app/CHANGELOG.md](app/CHANGELOG.md)

### 📄 License

This project is under the MIT License.

### 👤 Author

Developed by EA5IYR - Miguel Cañadas

### 🤝 Contributions

Contributions are welcome! Please open an issue to discuss important changes before creating a pull request.

### 💬 Support

If you encounter any problems or have suggestions, please open an issue in the GitHub repository.

### 🙏 Acknowledgments

This project is a companion application for the **ATS Mini** radio receiver, an amazing open-source project by the ESP32-SI4732 community.

**ATS Mini Radio Receiver:**
- 📻 [ATS Mini Official Documentation](https://esp32-si4732.github.io/ats-mini/index.html)
- 🔧 [ATS Mini GitHub Repository](https://github.com/ESP32-SI4732/ATS-Mini)

Special thanks to the ATS Mini development team for creating such an excellent and hackable radio receiver platform.

---

## Español

Entorno de desarrollo completo para el receptor de radio ATS Mini: aplicación Android y firmware custom con Bluetooth.

### 🎯 Descripción del Proyecto

Este repositorio contiene dos componentes principales:

1. **[Aplicación Android](app/)** - Aplicación de control remoto para ATS Mini vía USB Serial y Bluetooth LE
2. **[Firmware Custom](firmware/)** - Firmware modificado del ATS Mini con soporte Bluetooth LE y logo personalizado

### 📦 Inicio Rápido

#### Descargar Release Precompilado

**[Descargar APK v3.0 (Edición Bluetooth)](https://github.com/rodillo69/ATS-Mini-Companion/raw/main/releases/ATS-Mini-Companion-BLE.apk)**

#### Flashear Firmware

Ver [README del Firmware](firmware/README.md) para instrucciones detalladas sobre cómo flashear el firmware con Bluetooth.

### ✨ Características

#### Aplicación Android
- **Modo de Conexión Dual**: USB Serial o Bluetooth LE
- **Control de Frecuencia**: Sintonización precisa con botones +/- y pulsación larga
- **Gestión de Bandas**: Navegación rápida entre bandas de frecuencia
- **Modos de Operación**: Cambio entre modos AM, FM, SSB
- **Monitoreo en Tiempo Real**: Visualización de RSSI, SNR, voltaje de batería
- **Control Remoto Completo**: Volumen, ancho de banda, AGC, atenuador, retroiluminación

#### Firmware Custom (v1.4)
- ✅ **Bluetooth LE** con Nordic UART Service
- ✅ **Exclusión mutua WiFi/BLE automática** (solo uno activo a la vez)
- ✅ **Logo personalizado al arranque** (2 segundos al inicio)
- ✅ **ESP32-S3-WROOM-1-N16R8** (16MB Flash + 8MB PSRAM)
- ✅ **Logo embebido en firmware** (no requiere SPIFFS)

### 📂 Estructura del Repositorio

```
ATS-Mini-Companion/
├── app/                        # Aplicación Android
│   ├── src/                   # Código fuente React
│   ├── android/               # Proyecto Android nativo
│   └── README.md              # Instrucciones de compilación
│
├── firmware/                   # Firmware custom ATS Mini
│   ├── ats-mini/              # Código fuente Arduino
│   ├── binaries/              # Archivos de firmware compilados
│   ├── docs/                  # Documentación del firmware
│   └── README.md              # Instrucciones de compilación y flasheo
│
├── releases/                   # Releases APK precompilados
│   └── ATS-Mini-Companion-BLE.apk
│
└── docs/                       # Documentación general
    ├── ANDROID-SETUP.md
    └── images/
```

### 🚀 Comenzar

#### Para Usuarios (Binarios Precompilados)

1. **Instalar la Aplicación Android**
   - Descarga la APK desde [releases/](releases/)
   - Instala en tu dispositivo Android (habilita "Fuentes desconocidas")
   - Otorga permisos de Bluetooth

2. **Flashear el Firmware**
   - Sigue las instrucciones en [firmware/README.md](firmware/README.md)
   - Usa los binarios precompilados en [firmware/binaries/](firmware/binaries/)
   - Recomendado: Flashea `ats-mini.ino.merged.bin` en dirección `0x0`

3. **Conectar y Disfrutar**
   - En ATS Mini: Settings > Bluetooth > Bluefruit
   - Abre la app y selecciona "Bluetooth LE"
   - Conecta a "ATS-Mini"

#### Para Desarrolladores

- **Desarrollo de la App Android**: Ver [app/README.md](app/README.md)
- **Desarrollo del Firmware**: Ver [firmware/README.md](firmware/README.md)

### 📋 Requisitos

#### Para Conexión USB Serial
- Dispositivo Android con soporte USB OTG
- Cable USB OTG
- Android 7.0 o superior

#### Para Conexión Bluetooth LE
- Dispositivo Android con soporte Bluetooth LE
- Android 7.0 o superior
- ATS Mini con firmware Bluetooth habilitado (v1.4 o superior)

### 🛠️ Tecnologías Utilizadas

#### Aplicación Android
- **React 19**: Framework JavaScript de UI
- **Vite 7**: Herramienta de construcción
- **Capacitor 7**: Framework nativo multiplataforma
- **TailwindCSS**: Framework CSS
- **Capacitor Serial Plugin**: Comunicación USB Serial
- **Capacitor Bluetooth LE Plugin**: Comunicación Bluetooth

#### Firmware
- **Arduino Framework**: Para ESP32-S3
- **Librería SI4735**: Control del chip de radio
- **NimBLE**: Stack Bluetooth LE
- **TFT_eSPI**: Driver de pantalla
- **WiFi**: Conectividad de red

### 📖 Documentación

- [Documentación de la App Android](app/README.md)
- [Documentación del Firmware](firmware/README.md)
- [Guía de Setup Android](docs/ANDROID-SETUP.md)
- [Detalles de Implementación Bluetooth](firmware/docs/BLUETOOTH_IMPLEMENTATION.md)
- [Instrucciones de Flasheo](firmware/binaries/FLASH_INSTRUCTIONS.md)

### 🐛 Solución de Problemas

#### Bluetooth no aparece en el menú del ATS Mini
- Flashea el firmware con Bluetooth (v1.4) desde [firmware/binaries/](firmware/binaries/)

#### "ATS-Mini" no es visible en el escaneo Bluetooth
1. Verifica que Bluetooth está activado: Settings > Bluetooth > Bluefruit
2. Reinicia el ATS Mini (presiona botón RESET)
3. Mantente a menos de 2 metros de distancia

#### La conexión se desconecta frecuentemente
1. Reduce la distancia a menos de 5 metros
2. Elimina obstáculos metálicos entre dispositivos
3. Verifica el nivel de batería del ATS Mini (> 3.5V)
4. Cierra otras apps de Bluetooth

Para más soluciones, ver [firmware/binaries/FLASH_INSTRUCTIONS.md](firmware/binaries/FLASH_INSTRUCTIONS.md)

### 📜 Historial de Versiones

#### v3.0 (Actual - Edición Bluetooth)
- **NUEVO:** Soporte Bluetooth LE con Nordic UART Service
- **NUEVO:** Modo de conexión dual (USB Serial + Bluetooth LE)
- **NUEVO:** Exclusión mutua WiFi/BLE automática en firmware
- **NUEVO:** Logo personalizado al arranque en ATS Mini
- **MEJORADO:** Indicador de estado de conexión
- **MEJORADO:** Streaming de datos en tiempo real vía Bluetooth
- **INCLUIDO:** Código fuente completo del firmware

Versiones anteriores: [app/CHANGELOG.md](app/CHANGELOG.md)

### 📄 Licencia

Este proyecto está bajo licencia MIT.

### 👤 Autor

Desarrollado por EA5IYR - Miguel Cañadas

### 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un issue para discutir cambios importantes antes de crear un pull request.

### 💬 Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio de GitHub.

### 🙏 Agradecimientos

Este proyecto es una aplicación complementaria para el receptor de radio **ATS Mini**, un increíble proyecto de código abierto de la comunidad ESP32-SI4732.

**Receptor de Radio ATS Mini:**
- 📻 [Documentación Oficial del ATS Mini](https://esp32-si4732.github.io/ats-mini/index.html)
- 🔧 [Repositorio GitHub del ATS Mini](https://github.com/ESP32-SI4732/ATS-Mini)

Agradecimientos especiales al equipo de desarrollo del ATS Mini por crear una plataforma de receptor de radio tan excelente y modificable.
