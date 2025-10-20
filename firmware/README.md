# 📻 ATS Mini - Bluetooth Edition con Splash Screen

**Versión**: 1.4
**Fecha**: 20 Octubre 2025
**Hardware**: ESP32-S3-WROOM-1-N16R8 (16MB Flash + 8MB PSRAM)

---

## 📦 Contenido del Paquete

Este directorio contiene todo lo necesario para tu ATS Mini con Bluetooth LE y splash screen personalizado:

### Firmware - Elige una opción:

**Opción A - Archivo único (⭐ RECOMENDADO):**
- **ats-mini.ino.merged.bin** (16 MB)
  - Todo en uno: bootloader + particiones + firmware + splash screen
  - Flashear en dirección 0x0
  - Logo personalizado incluido (muestra 2 segundos al arrancar)

**Opción B - Archivos separados:**
- **ats-mini.ino.bootloader.bin** (20 KB) → Flashear en 0x0
- **ats-mini.ino.partitions.bin** (3 KB) → Flashear en 0x8000
- **ats-mini.ino.bin** (1.7 MB) → Flashear en 0x10000

**Características del firmware v1.4:**
- ✅ **Splash screen personalizado** al arranque (2 segundos)
- ✅ **Bluetooth LE funcional** (activar en Settings > Bluetooth > Bluefruit)
- ✅ **WiFi/BLE exclusión mutua automática**
- ✅ ESP32-S3-WROOM-1-N16R8 (16MB Flash + 8MB PSRAM)
- ✅ Tamaño total: 1.7MB (86% del espacio disponible)
- ✅ Logo embebido en firmware (no necesita SPIFFS)

### Aplicación Android:

**ATS-Mini-Companion-BLE.apk** (6.6 MB)
- Soporte dual: USB Serial + Bluetooth LE
- Requisitos: Android 7.0+
- Permisos: Bluetooth LE

### Documentación:

**README.md** (este archivo)
- Resumen y inicio rápido

**INSTRUCCIONES_FLASHEO.md** ⭐ **COMIENZA AQUÍ**
- Guía paso a paso en español
- Instrucciones de flasheo (Mac/Windows/Linux)
- Instalación del APK en Android
- Conexión y uso de Bluetooth
- Solución de problemas

**BLUETOOTH_IMPLEMENTATION.md**
- Documentación técnica completa
- Detalles de implementación
- Protocolo BLE (Nordic UART Service)
- Cambios en firmware y aplicación

---

## 🚀 Inicio Rápido

### Paso 1: Flashear Firmware

**Opción fácil (archivo único):**
```bash
# Mac/Linux
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash 0x0 ats-mini.ino.merged.bin

# Windows
esptool.py --chip esp32s3 --port COM3 \
  --baud 921600 write_flash 0x0 ats-mini.ino.merged.bin
```

**Opción avanzada (archivos separados):**
```bash
# Mac/Linux
esptool.py --chip esp32s3 --port /dev/cu.usbmodem101 \
  --baud 921600 write_flash \
  0x0 ats-mini.ino.bootloader.bin \
  0x8000 ats-mini.ino.partitions.bin \
  0x10000 ats-mini.ino.bin

# Windows
esptool.py --chip esp32s3 --port COM3 \
  --baud 921600 write_flash \
  0x0 ats-mini.ino.bootloader.bin \
  0x8000 ats-mini.ino.partitions.bin \
  0x10000 ats-mini.ino.bin
```

### Paso 2: Instalar APK
1. Copiar `ATS-Mini-Companion-BLE.apk` a tu Android
2. Habilitar "Fuentes desconocidas" en Configuración > Seguridad
3. Instalar y otorgar permisos Bluetooth

### Paso 3: Conectar
1. Abrir app **ATS Mini Companion**
2. Seleccionar **Bluetooth LE** como tipo de conexión
3. Tap **CONNECT TO ATS MINI**
4. Seleccionar "ATS-Mini" en el diálogo
5. ✅ ¡Listo!

---

## ✨ Características

### Control Completo via Bluetooth
- ✅ Frecuencia (VFO +/-)
- ✅ Banda (FM, MW, SW)
- ✅ Modo (AM, FM, USB, LSB)
- ✅ Volumen
- ✅ AGC/Atenuador
- ✅ Bandwidth
- ✅ Step
- ✅ Brillo
- ✅ Memorias
- ✅ Calibración BFO

### Monitoreo en Tiempo Real (cada 500ms)
- RSSI (calidad de señal)
- SNR (relación señal/ruido)
- Voltaje de batería
- Capacitor de antena
- Todos los parámetros actuales

### Ventajas
- 📡 **Alcance**: ~10 metros
- 🔋 **Bajo consumo**: BLE optimizado
- 🎯 **Sin configuración**: BLE activo por defecto
- 🔄 **Dual mode**: Mantiene USB Serial + BLE
- 📱 **Universal**: Compatible con Android/iOS (via Capacitor)

---

## 🔧 Especificaciones Técnicas

### Hardware
- **MCU**: ESP32-S3-WROOM-1-N16R8
- **Flash**: 16MB
- **PSRAM**: 8MB QSPI
- **BLE**: Nordic UART Service (NUS)

### Software
- **Firmware**: Arduino ESP32 v3.3.1
- **App**: React 19 + Capacitor 7
- **BLE Plugin**: @capacitor-community/bluetooth-le v7.2.0

### Protocolo BLE
- **Service UUID**: `6E400001-B5A3-F393-E0A9-E50E24DCCA9E`
- **RX (Write)**: `6E400002-B5A3-F393-E0A9-E50E24DCCA9E`
- **TX (Notify)**: `6E400003-B5A3-F393-E0A9-E50E24DCCA9E`
- **Formato datos**: CSV (15 campos)
- **Intervalo**: 500ms

---

## 📞 Soporte

### Documentación
- **Guía de Usuario**: INSTRUCCIONES_FLASHEO.md
- **Documentación Técnica**: BLUETOOTH_IMPLEMENTATION.md
- **Firmware Original**: https://github.com/esp32-si4732/ats-mini

### Contacto
- **Desarrollador**: EA5IYR - Miguel Cañadas
- **Implementación BLE**: Claude (Anthropic)

---

## ⚠️ Importante

1. **BLE está activado por defecto** - No necesitas configurar nada en el menú del ATS Mini
2. Usa cable USB-C de calidad para flashear
3. Asegura modo bootloader: BOOT + RESET antes de flashear
4. Primera conexión BLE puede tardar 5-10 segundos

---

## 📄 Licencia

MIT License - Igual que el proyecto ATS Mini original

---

**¡Disfruta de tu ATS Mini con Bluetooth!** 📻🔵
