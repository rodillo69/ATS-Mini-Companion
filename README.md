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

Remote control application for the ATS Mini radio receiver via USB Serial and Bluetooth LE.

### Description

ATS Mini Companion is an Android application developed with React, Vite, and Capacitor that allows remote control of the ATS Mini radio receiver through USB Serial connection or Bluetooth LE. The application offers an intuitive ICOM-style interface to manage all receiver parameters.

### Features

- **Dual Connection Mode**: USB Serial or Bluetooth LE
- **Frequency Control**: Precise frequency adjustment with +/- buttons and long-press support
- **Band Management**: Quick navigation between frequency bands
- **Operating Modes**: Switch between different modulation modes (AM, FM, SSB, etc.)
- **Bandwidth Control**: Adjust receiver bandwidth
- **Step Control**: Configure tuning step
- **AGC/Attenuator**: Automatic gain control and attenuator
- **Volume Control**: Audio level adjustment with visual indicator
- **Backlight Control**: Adjust receiver screen brightness
- **Menu Access**: Direct access to receiver menu
- **Real-time Monitoring**: RSSI, SNR, battery voltage display

### Download

**[Download APK v3.0 (Bluetooth Edition)](https://github.com/rodillo69/ATS-Mini-Companion/raw/main/ATS-Mini-Companion-BLE.apk)**

### Requirements

#### For USB Serial Connection:
- Android device with USB OTG support
- USB OTG cable to connect the ATS Mini receiver
- Android 7.0 or higher

#### For Bluetooth LE Connection:
- Android device with Bluetooth LE support
- Android 7.0 or higher
- ATS Mini with Bluetooth-enabled firmware (v1.4 or higher)

### Installation

#### 1. Install the Android App

1. Download the APK file from the link above
2. Enable installation from unknown sources on your Android device
3. Install the APK
4. Grant Bluetooth permissions when prompted

#### 2. Flash Bluetooth-Enabled Firmware (Required for BLE)

To use Bluetooth, you need to flash the ATS Mini with the included firmware:

```bash
# Connect ESP32-S3 in bootloader mode (BOOT + RESET)
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash 0x0 firmware/ats-mini.ino.merged.bin
```

**Windows:**
```bash
esptool.py --chip esp32s3 --port COM3 \
  --baud 921600 write_flash 0x0 firmware/ats-mini.ino.merged.bin
```

For detailed flashing instructions, see [firmware/INSTRUCCIONES_FLASHEO.md](firmware/INSTRUCCIONES_FLASHEO.md)

### Usage

#### Connecting via USB Serial

1. Connect your ATS Mini receiver using a USB OTG cable
2. Open the application
3. In the CONNECT tab, select "USB Serial"
4. Press "CONNECT TO ATS MINI"
5. Select the USB device from the dialog

#### Connecting via Bluetooth LE

1. On your ATS Mini, go to: **Settings > Bluetooth**
2. Change from `OFF` to `Bluefruit`
3. Open the ATS Mini Companion app
4. In the CONNECT tab, select "Bluetooth LE"
5. Press "CONNECT TO ATS MINI"
6. Select "ATS-Mini" from the device list
7. Wait for connection (green indicator when connected)

**Note:** WiFi is automatically disabled when Bluetooth is activated on the ATS Mini.

### Firmware Features (v1.4)

- ✅ **Bluetooth LE** with Nordic UART Service
- ✅ **WiFi/BLE automatic mutual exclusion** (only one active at a time)
- ✅ **Custom boot logo** (2 seconds at startup)
- ✅ **ESP32-S3-WROOM-1-N16R8** (16MB Flash + 8MB PSRAM)
- ✅ **Logo embedded in firmware** (no SPIFFS required)

### Technologies Used

- **React 19**: JavaScript framework for the user interface
- **Vite 7**: High-performance build tool and bundler
- **Capacitor 7**: Cross-platform native application framework
- **TailwindCSS**: CSS framework for responsive design
- **Capacitor Serial Plugin**: Plugin for USB Serial communication
- **Capacitor Bluetooth LE Plugin**: Plugin for Bluetooth LE communication

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
ATS-Mini-Companion/
├── src/
│   ├── components/       # React components
│   ├── services/         # Serial and BLE communication services
│   ├── App.jsx          # Main component
│   └── index.css        # Global styles
├── android/             # Native Android project
├── firmware/            # ATS Mini Bluetooth firmware
│   ├── *.bin           # Firmware files
│   └── *.md            # Documentation
├── public/              # Static assets
├── capacitor.config.ts  # Capacitor configuration
└── vite.config.js       # Vite configuration
```

### Version History

#### v3.0 (Current - Bluetooth Edition)
- **NEW:** Bluetooth LE support with Nordic UART Service
- **NEW:** Dual connection mode (USB Serial + Bluetooth LE)
- **NEW:** WiFi/BLE automatic mutual exclusion in firmware
- **NEW:** Custom boot logo on ATS Mini
- **IMPROVED:** Connection status indicator
- **IMPROVED:** Real-time data streaming via Bluetooth
- **INCLUDED:** Bluetooth-enabled firmware (v1.4)

#### v2.5
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

### Troubleshooting

#### Bluetooth not appearing in ATS Mini menu
- Flash the Bluetooth-enabled firmware (v1.4) from the `firmware/` folder
- See detailed instructions in `firmware/INSTRUCCIONES_FLASHEO.md`

#### "ATS-Mini" not visible in Bluetooth scan
1. Verify Bluetooth is activated: Settings > Bluetooth > Bluefruit
2. Restart the ATS Mini (press RESET button)
3. Stay within 2 meters range
4. Verify Bluetooth is active on your phone
5. Close and reopen the app

#### Connection frequently disconnects
1. Reduce distance to less than 5 meters
2. Remove metal obstacles between devices
3. Verify ATS Mini battery level (> 3.5V)
4. Close other Bluetooth apps
5. Verify there's no WiFi interference

#### Commands not responding
1. Verify green "Connected" indicator in header
2. Go to DEBUG tab and verify data is arriving
3. Send 't' command manually to activate monitoring
4. Reconnect device
5. Verify firmware version (must be v1.4+)

For more troubleshooting, see [firmware/INSTRUCCIONES_FLASHEO.md](firmware/INSTRUCCIONES_FLASHEO.md)

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

Aplicación de control remoto para el receptor de radio ATS Mini a través de USB Serial y Bluetooth LE.

### Descripción

ATS Mini Companion es una aplicación Android desarrollada con React, Vite y Capacitor que permite controlar de forma remota el receptor de radio ATS Mini mediante conexión USB Serial o Bluetooth LE. La aplicación ofrece una interfaz intuitiva tipo ICOM para gestionar todos los parámetros del receptor.

### Características

- **Modo de Conexión Dual**: USB Serial o Bluetooth LE
- **Control de Frecuencia**: Ajuste preciso de frecuencia con botones +/- y soporte para pulsación larga
- **Gestión de Bandas**: Navegación rápida entre bandas de frecuencia
- **Modos de Operación**: Cambio entre diferentes modos de modulación (AM, FM, SSB, etc.)
- **Control de Ancho de Banda**: Ajuste del ancho de banda del receptor
- **Control de Paso**: Configuración del paso de sintonización
- **AGC/Atenuador**: Control de ganancia automática y atenuador
- **Control de Volumen**: Ajuste del nivel de audio con indicador visual
- **Control de Retroiluminación**: Ajuste del brillo de la pantalla del receptor
- **Acceso al Menú**: Acceso directo al menú del receptor
- **Monitoreo en Tiempo Real**: Visualización de RSSI, SNR, voltaje de batería

### Descarga

**[Descargar APK v3.0 (Edición Bluetooth)](https://github.com/rodillo69/ATS-Mini-Companion/raw/main/ATS-Mini-Companion-BLE.apk)**

### Requisitos

#### Para Conexión USB Serial:
- Dispositivo Android con soporte USB OTG
- Cable USB OTG para conectar el receptor ATS Mini
- Android 7.0 o superior

#### Para Conexión Bluetooth LE:
- Dispositivo Android con soporte Bluetooth LE
- Android 7.0 o superior
- ATS Mini con firmware Bluetooth habilitado (v1.4 o superior)

### Instalación

#### 1. Instalar la Aplicación Android

1. Descarga el archivo APK desde el enlace anterior
2. Habilita la instalación desde fuentes desconocidas en tu dispositivo Android
3. Instala la APK
4. Otorga los permisos de Bluetooth cuando se soliciten

#### 2. Flashear Firmware con Bluetooth (Requerido para BLE)

Para usar Bluetooth, necesitas flashear el ATS Mini con el firmware incluido:

```bash
# Conecta el ESP32-S3 en modo bootloader (BOOT + RESET)
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash 0x0 firmware/ats-mini.ino.merged.bin
```

**Windows:**
```bash
esptool.py --chip esp32s3 --port COM3 \
  --baud 921600 write_flash 0x0 firmware/ats-mini.ino.merged.bin
```

Para instrucciones detalladas de flasheo, ver [firmware/INSTRUCCIONES_FLASHEO.md](firmware/INSTRUCCIONES_FLASHEO.md)

### Uso

#### Conectar por USB Serial

1. Conecta tu receptor ATS Mini mediante cable USB OTG
2. Abre la aplicación
3. En la pestaña CONNECT, selecciona "USB Serial"
4. Presiona "CONNECT TO ATS MINI"
5. Selecciona el dispositivo USB del diálogo

#### Conectar por Bluetooth LE

1. En tu ATS Mini, ve a: **Settings > Bluetooth**
2. Cambia de `OFF` a `Bluefruit`
3. Abre la app ATS Mini Companion
4. En la pestaña CONNECT, selecciona "Bluetooth LE"
5. Presiona "CONNECT TO ATS MINI"
6. Selecciona "ATS-Mini" de la lista de dispositivos
7. Espera la conexión (indicador verde cuando está conectado)

**Nota:** El WiFi se desactiva automáticamente cuando se activa Bluetooth en el ATS Mini.

### Características del Firmware (v1.4)

- ✅ **Bluetooth LE** con Nordic UART Service
- ✅ **Exclusión mutua WiFi/BLE automática** (solo uno activo a la vez)
- ✅ **Logo personalizado al arranque** (2 segundos al inicio)
- ✅ **ESP32-S3-WROOM-1-N16R8** (16MB Flash + 8MB PSRAM)
- ✅ **Logo embebido en firmware** (no requiere SPIFFS)

### Tecnologías Utilizadas

- **React 19**: Framework JavaScript para la interfaz de usuario
- **Vite 7**: Build tool y bundler de alto rendimiento
- **Capacitor 7**: Framework para aplicaciones nativas multiplataforma
- **TailwindCSS**: Framework CSS para diseño responsive
- **Capacitor Serial Plugin**: Plugin para comunicación USB Serial
- **Capacitor Bluetooth LE Plugin**: Plugin para comunicación Bluetooth LE

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
ATS-Mini-Companion/
├── src/
│   ├── components/       # Componentes React
│   ├── services/         # Servicios de comunicación Serial y BLE
│   ├── App.jsx          # Componente principal
│   └── index.css        # Estilos globales
├── android/             # Proyecto Android nativo
├── firmware/            # Firmware Bluetooth para ATS Mini
│   ├── *.bin           # Archivos de firmware
│   └── *.md            # Documentación
├── public/              # Assets estáticos
├── capacitor.config.ts  # Configuración de Capacitor
└── vite.config.js       # Configuración de Vite
```

### Historial de Versiones

#### v3.0 (Actual - Edición Bluetooth)
- **NUEVO:** Soporte Bluetooth LE con Nordic UART Service
- **NUEVO:** Modo de conexión dual (USB Serial + Bluetooth LE)
- **NUEVO:** Exclusión mutua WiFi/BLE automática en firmware
- **NUEVO:** Logo personalizado al arranque en ATS Mini
- **MEJORADO:** Indicador de estado de conexión
- **MEJORADO:** Streaming de datos en tiempo real vía Bluetooth
- **INCLUIDO:** Firmware con Bluetooth habilitado (v1.4)

#### v2.5
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

### Solución de Problemas

#### Bluetooth no aparece en el menú del ATS Mini
- Flashea el firmware con Bluetooth habilitado (v1.4) desde la carpeta `firmware/`
- Ver instrucciones detalladas en `firmware/INSTRUCCIONES_FLASHEO.md`

#### "ATS-Mini" no es visible en el escaneo Bluetooth
1. Verifica que Bluetooth está activado: Settings > Bluetooth > Bluefruit
2. Reinicia el ATS Mini (presiona botón RESET)
3. Mantente a menos de 2 metros de distancia
4. Verifica que Bluetooth está activo en tu teléfono
5. Cierra y reabre la app

#### La conexión se desconecta frecuentemente
1. Reduce la distancia a menos de 5 metros
2. Elimina obstáculos metálicos entre dispositivos
3. Verifica el nivel de batería del ATS Mini (> 3.5V)
4. Cierra otras apps de Bluetooth
5. Verifica que no hay interferencia WiFi

#### Los comandos no responden
1. Verifica el indicador verde "Connected" en el encabezado
2. Ve a la pestaña DEBUG y verifica que llegan datos
3. Envía el comando 't' manualmente para activar el monitoreo
4. Reconecta el dispositivo
5. Verifica la versión del firmware (debe ser v1.4+)

Para más soluciones, ver [firmware/INSTRUCCIONES_FLASHEO.md](firmware/INSTRUCCIONES_FLASHEO.md)

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
