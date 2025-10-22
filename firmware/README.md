# ATS Mini Custom Firmware - Bluetooth Edition

[🇪🇸 Español](#español) | [🇬🇧 English](#english)

---

## English

Custom firmware for ATS Mini radio receiver with Bluetooth LE support and custom boot logo.

**Version**: 1.4
**Date**: October 20, 2025
**Hardware**: ESP32-S3-WROOM-1-N16R8 (16MB Flash + 8MB PSRAM)

### ✨ Features

- ✅ **Bluetooth LE** with Nordic UART Service (NUS)
- ✅ **WiFi/BLE automatic mutual exclusion** (only one active at a time)
- ✅ **Custom boot logo** (2 seconds at startup)
- ✅ **Logo embedded in firmware** (no SPIFFS required)
- ✅ **Compatible with USB Serial** (dual mode)
- ✅ **Low power consumption** with BLE optimization

### 📦 Precompiled Binaries

Located in [`binaries/`](binaries/) directory:

#### Option A - Single File (⭐ RECOMMENDED)
- **`ats-mini.ino.merged.bin`** (16 MB)
  - All-in-one: bootloader + partitions + firmware + boot logo
  - Flash at address **0x0**
  - Custom logo included (displays for 2 seconds at boot)

#### Option B - Separate Files
- **`ats-mini.ino.bootloader.bin`** (20 KB) → Flash at **0x0**
- **`ats-mini.ino.partitions.bin`** (3 KB) → Flash at **0x8000**
- **`ats-mini.ino.bin`** (1.7 MB) → Flash at **0x10000**

### 🚀 Quick Start - Flash Firmware

#### Method 1: Web Browser (Easiest - Chrome/Edge only)

1. Open https://espressif.github.io/esptool-js/
2. Connect ATS Mini via USB and power it on
3. Click "Connect" and select the serial port
4. Add `binaries/ats-mini.ino.merged.bin` at address **0x0**
5. Click "Program"
6. Wait for "Leaving... Hard resetting via RTS pin..."
7. Power cycle the receiver

#### Method 2: esptool.py (Mac/Linux/Windows)

**Install esptool:**
```bash
pip install esptool
```

**Flash merged firmware (recommended):**
```bash
# Mac/Linux
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash 0x0 binaries/ats-mini.ino.merged.bin

# Windows
esptool.py --chip esp32s3 --port COM3 \
  --baud 921600 write_flash 0x0 binaries\ats-mini.ino.merged.bin
```

**Flash separate files:**
```bash
# Mac/Linux
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash \
  0x0 binaries/ats-mini.ino.bootloader.bin \
  0x8000 binaries/ats-mini.ino.partitions.bin \
  0x10000 binaries/ats-mini.ino.bin

# Windows
esptool.py --chip esp32s3 --port COM3 \
  --baud 921600 write_flash \
  0x0 binaries\ats-mini.ino.bootloader.bin \
  0x8000 binaries\ats-mini.ino.partitions.bin \
  0x10000 binaries\ats-mini.ino.bin
```

For detailed instructions, see [`binaries/FLASH_INSTRUCTIONS.md`](binaries/FLASH_INSTRUCTIONS.md)

### 📖 Documentation

- [`binaries/FLASH_INSTRUCTIONS.md`](binaries/FLASH_INSTRUCTIONS.md) - Complete flashing guide
- [`docs/BLUETOOTH_IMPLEMENTATION.md`](docs/BLUETOOTH_IMPLEMENTATION.md) - Technical implementation details
- [`docs/NOTAS_VERSION.md`](docs/NOTAS_VERSION.md) - Version release notes

### 🛠️ Development Setup

#### Prerequisites

- **Arduino IDE 2.x** or **PlatformIO**
- **ESP32 Arduino Core 3.0+**
- **USB-C cable** for programming
- **ATS Mini hardware**

#### Required Libraries

Install via Arduino Library Manager or PlatformIO:

```
SI4735 by PU2CLR (pu2clr/SI4735)
TFT_eSPI
NimBLE-Arduino
Preferences (included in ESP32 core)
WiFi (included in ESP32 core)
```

#### Arduino IDE Setup

1. **Install ESP32 Board Support**
   - Open Arduino IDE
   - File > Preferences
   - Add to "Additional Board Manager URLs":
     ```
     https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
     ```
   - Tools > Board > Boards Manager
   - Search "esp32" and install "esp32 by Espressif Systems" (v3.0+)

2. **Board Configuration**
   - Board: "ESP32S3 Dev Module"
   - USB CDC On Boot: "Enabled"
   - Flash Size: "16MB (128Mb)"
   - PSRAM: "OPI PSRAM"
   - Partition Scheme: "16M Flash (3MB APP/9.9MB FATFS)"
   - Upload Speed: "921600"

3. **Configure TFT_eSPI**
   - Edit `libraries/TFT_eSPI/User_Setup.h`
   - Or use the `tft_setup.h` configuration from this project

#### Build from Source

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rodillo69/ATS-Mini-Companion.git
   cd ATS-Mini-Companion/firmware/ats-mini
   ```

2. **Open in Arduino IDE**
   ```bash
   # Open ats-mini.ino
   open ats-mini/ats-mini.ino  # macOS
   ```

3. **Install Dependencies**
   - Tools > Manage Libraries
   - Install all required libraries listed above

4. **Compile**
   - Sketch > Verify/Compile
   - Check for errors

5. **Upload**
   - Connect ATS Mini via USB
   - Tools > Port > Select your port
   - Sketch > Upload

#### PlatformIO Setup

```ini
[env:esp32-s3-devkitc-1]
platform = espressif32
board = esp32-s3-devkitc-1
framework = arduino

board_build.flash_size = 16MB
board_build.psram_type = opi
board_build.partitions = default_16MB.csv

lib_deps =
    pu2clr/SI4735@^2.1.4
    bodmer/TFT_eSPI@^2.5.0
    h2zero/NimBLE-Arduino@^1.4.0

build_flags =
    -DBOARD_HAS_PSRAM
    -DARDUINO_USB_CDC_ON_BOOT=1
```

### 📂 Source Code Structure

```
firmware/
├── ats-mini/                   # Arduino source code
│   ├── ats-mini.ino           # Main sketch
│   ├── Ble.cpp / Ble.h        # Bluetooth LE module
│   ├── Network.cpp            # WiFi module
│   ├── Common.h               # Common definitions
│   ├── SI4735-fixed.h         # Radio chip interface
│   ├── Storage.cpp            # EEPROM/Preferences
│   ├── Draw.cpp               # Display rendering
│   ├── Menu.cpp               # Menu system
│   ├── Scan.cpp               # Frequency scanning
│   ├── Utils.cpp              # Utilities
│   ├── EIBI.cpp               # Station database
│   ├── splash_data.h          # Boot logo data
│   └── tft_setup.h            # Display configuration
│
├── binaries/                   # Compiled firmware
│   ├── ats-mini.ino.merged.bin
│   ├── ats-mini.ino.bootloader.bin
│   ├── ats-mini.ino.partitions.bin
│   ├── ats-mini.ino.bin
│   ├── CHECKSUMS.txt
│   └── FLASH_INSTRUCTIONS.md
│
├── docs/                       # Documentation
│   ├── BLUETOOTH_IMPLEMENTATION.md
│   └── NOTAS_VERSION.md
│
└── README.md                   # This file
```

### 🔧 Key Modules

#### Bluetooth LE (`Ble.cpp / Ble.h`)
- **Service**: Nordic UART Service (NUS)
- **UUIDs**:
  - Service: `6E400001-B5A3-F393-E0A9-E50E24DCCA9E`
  - RX (Write): `6E400002-B5A3-F393-E0A9-E50E24DCCA9E`
  - TX (Notify): `6E400003-B5A3-F393-E0A9-E50E24DCCA9E`
- **Features**:
  - Command reception via RX characteristic
  - Status broadcast via TX characteristic (every 500ms)
  - Automatic WiFi/BLE mutual exclusion
  - Connection state management

#### WiFi Management (`Network.cpp`)
- Automatic disconnection when BLE activates
- WiFi station and AP modes
- NTP time synchronization

#### Radio Control (`SI4735-fixed.h`)
- SI4735/SI4732 chip interface
- AM/FM/SSB modes
- Frequency tuning
- Signal quality monitoring

#### Display (`Draw.cpp`)
- TFT display rendering
- Custom boot logo
- UI updates
- Theme support

### 🔨 Customization

#### Change Boot Logo

1. **Create your image**
   - Size: 320x170 pixels
   - Format: RGB565 (16-bit color)

2. **Convert to C array**
   ```bash
   # Use image2cpp or similar tool
   # Output format: const uint16_t splash_data[] PROGMEM = { ... };
   ```

3. **Replace in `splash_data.h`**
   ```cpp
   #define SPLASH_WIDTH 320
   #define SPLASH_HEIGHT 170
   const uint16_t splash_data[] PROGMEM = {
     // Your image data here
   };
   ```

4. **Recompile and flash**

#### Modify Bluetooth Behavior

Edit `Ble.cpp`:

```cpp
// Change device name
#define BLE_DEVICE_NAME "Your-Custom-Name"

// Change broadcast interval
#define BLE_STATUS_INTERVAL 500  // milliseconds

// Modify status data format
String bleGetStatusData() {
  // Customize CSV format
  return customData;
}
```

### 🐛 Troubleshooting

#### Compilation Errors

**Error**: `TFT_eSPI.h: No such file or directory`
```bash
# Install TFT_eSPI library
arduino-cli lib install "TFT_eSPI"
```

**Error**: `NimBLEDevice.h: No such file or directory`
```bash
# Install NimBLE-Arduino library
arduino-cli lib install "NimBLE-Arduino"
```

**Error**: `SI4735.h: No such file or directory`
```bash
# Install SI4735 library
arduino-cli lib install "SI4735"
```

#### Upload Issues

**Problem**: Board not detected
- Check USB cable (must support data transfer)
- Install CP210x or CH340 drivers if needed
- Try different USB port

**Problem**: Upload fails
- Enter bootloader mode: Hold BOOT + press RESET
- Release RESET, then release BOOT
- Try upload again

**Problem**: "Timed out waiting for packet header"
- Lower baud rate: Tools > Upload Speed > 115200
- Check USB cable quality
- Try shorter USB cable

### 📊 Technical Specifications

#### Hardware
- **MCU**: ESP32-S3-WROOM-1-N16R8
- **Flash**: 16MB
- **PSRAM**: 8MB OPI QSPI
- **Radio Chip**: SI4735/SI4732
- **Display**: 320x170 TFT LCD

#### Firmware
- **Framework**: Arduino ESP32 v3.0+
- **BLE Stack**: NimBLE
- **Size**: ~1.7MB (86% flash usage)
- **RAM Usage**: ~200KB

#### BLE Protocol
- **Service**: Nordic UART Service (NUS)
- **MTU**: 512 bytes
- **Data Format**: CSV (15 fields)
- **Update Rate**: 500ms
- **Range**: ~10 meters

### 📜 Version History

#### v1.4 (Current - Bluetooth Edition)
- **NEW**: Bluetooth LE with Nordic UART Service
- **NEW**: WiFi/BLE automatic mutual exclusion
- **NEW**: Custom boot logo embedded in firmware
- **IMPROVED**: Memory management
- **IMPROVED**: Connection stability

### 📄 License

This project is based on the original ATS Mini firmware and is licensed under MIT License.

### 🙏 Credits

- **Original ATS Mini**: ESP32-SI4732 community
- **SI4735 Library**: PU2CLR (Ricardo Lima Caratti)
- **Bluetooth Implementation**: EA5IYR - Miguel Cañadas

---

## Español

Firmware personalizado para el receptor de radio ATS Mini con soporte Bluetooth LE y logo de arranque personalizado.

**Versión**: 1.4
**Fecha**: 20 Octubre 2025
**Hardware**: ESP32-S3-WROOM-1-N16R8 (16MB Flash + 8MB PSRAM)

### ✨ Características

- ✅ **Bluetooth LE** con Nordic UART Service (NUS)
- ✅ **Exclusión mutua WiFi/BLE automática** (solo uno activo a la vez)
- ✅ **Logo personalizado al arranque** (2 segundos al inicio)
- ✅ **Logo embebido en firmware** (no requiere SPIFFS)
- ✅ **Compatible con USB Serial** (modo dual)
- ✅ **Bajo consumo** con optimización BLE

### 📦 Binarios Precompilados

Ubicados en el directorio [`binaries/`](binaries/):

#### Opción A - Archivo Único (⭐ RECOMENDADO)
- **`ats-mini.ino.merged.bin`** (16 MB)
  - Todo en uno: bootloader + particiones + firmware + logo
  - Flashear en dirección **0x0**
  - Logo personalizado incluido (se muestra 2 segundos al arrancar)

#### Opción B - Archivos Separados
- **`ats-mini.ino.bootloader.bin`** (20 KB) → Flashear en **0x0**
- **`ats-mini.ino.partitions.bin`** (3 KB) → Flashear en **0x8000**
- **`ats-mini.ino.bin`** (1.7 MB) → Flashear en **0x10000**

### 🚀 Inicio Rápido - Flashear Firmware

#### Método 1: Navegador Web (Más fácil - Solo Chrome/Edge)

1. Abrir https://espressif.github.io/esptool-js/
2. Conectar ATS Mini por USB y encender
3. Clic en "Connect" y seleccionar puerto serial
4. Añadir `binaries/ats-mini.ino.merged.bin` en dirección **0x0**
5. Clic en "Program"
6. Esperar "Leaving... Hard resetting via RTS pin..."
7. Reiniciar el receptor

#### Método 2: esptool.py (Mac/Linux/Windows)

**Instalar esptool:**
```bash
pip install esptool
```

**Flashear firmware merged (recomendado):**
```bash
# Mac/Linux
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash 0x0 binaries/ats-mini.ino.merged.bin

# Windows
esptool.py --chip esp32s3 --port COM3 \
  --baud 921600 write_flash 0x0 binaries\ats-mini.ino.merged.bin
```

**Flashear archivos separados:**
```bash
# Mac/Linux
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash \
  0x0 binaries/ats-mini.ino.bootloader.bin \
  0x8000 binaries/ats-mini.ino.partitions.bin \
  0x10000 binaries/ats-mini.ino.bin

# Windows
esptool.py --chip esp32s3 --port COM3 \
  --baud 921600 write_flash \
  0x0 binaries\ats-mini.ino.bootloader.bin \
  0x8000 binaries\ats-mini.ino.partitions.bin \
  0x10000 binaries\ats-mini.ino.bin
```

Para instrucciones detalladas, ver [`binaries/FLASH_INSTRUCTIONS.md`](binaries/FLASH_INSTRUCTIONS.md)

### 📖 Documentación

- [`binaries/FLASH_INSTRUCTIONS.md`](binaries/FLASH_INSTRUCTIONS.md) - Guía completa de flasheo
- [`docs/BLUETOOTH_IMPLEMENTATION.md`](docs/BLUETOOTH_IMPLEMENTATION.md) - Detalles técnicos de implementación
- [`docs/NOTAS_VERSION.md`](docs/NOTAS_VERSION.md) - Notas de la versión

### 🛠️ Configuración de Desarrollo

#### Requisitos Previos

- **Arduino IDE 2.x** o **PlatformIO**
- **ESP32 Arduino Core 3.0+**
- **Cable USB-C** para programación
- **Hardware ATS Mini**

#### Librerías Requeridas

Instalar vía Arduino Library Manager o PlatformIO:

```
SI4735 by PU2CLR (pu2clr/SI4735)
TFT_eSPI
NimBLE-Arduino
Preferences (incluida en ESP32 core)
WiFi (incluida en ESP32 core)
```

#### Configuración Arduino IDE

1. **Instalar Soporte para ESP32**
   - Abrir Arduino IDE
   - Archivo > Preferencias
   - Añadir a "Gestor de URLs Adicionales de Tarjetas":
     ```
     https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
     ```
   - Herramientas > Placa > Gestor de Tarjetas
   - Buscar "esp32" e instalar "esp32 by Espressif Systems" (v3.0+)

2. **Configuración de la Placa**
   - Placa: "ESP32S3 Dev Module"
   - USB CDC On Boot: "Enabled"
   - Flash Size: "16MB (128Mb)"
   - PSRAM: "OPI PSRAM"
   - Partition Scheme: "16M Flash (3MB APP/9.9MB FATFS)"
   - Upload Speed: "921600"

3. **Configurar TFT_eSPI**
   - Editar `libraries/TFT_eSPI/User_Setup.h`
   - O usar la configuración `tft_setup.h` de este proyecto

#### Compilar desde Código Fuente

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/rodillo69/ATS-Mini-Companion.git
   cd ATS-Mini-Companion/firmware/ats-mini
   ```

2. **Abrir en Arduino IDE**
   ```bash
   # Abrir ats-mini.ino
   open ats-mini/ats-mini.ino  # macOS
   ```

3. **Instalar Dependencias**
   - Herramientas > Administrar Bibliotecas
   - Instalar todas las librerías requeridas listadas arriba

4. **Compilar**
   - Programa > Verificar/Compilar
   - Verificar errores

5. **Subir**
   - Conectar ATS Mini por USB
   - Herramientas > Puerto > Seleccionar tu puerto
   - Programa > Subir

Para más detalles sobre desarrollo y personalización, ver la sección en inglés arriba.

### 📄 Licencia

Este proyecto está basado en el firmware original ATS Mini y está licenciado bajo MIT License.

### 🙏 Créditos

- **ATS Mini Original**: Comunidad ESP32-SI4732
- **Librería SI4735**: PU2CLR (Ricardo Lima Caratti)
- **Implementación Bluetooth**: EA5IYR - Miguel Cañadas
