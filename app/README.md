# ATS Mini Companion - Android App

[🇪🇸 Español](#español) | [🇬🇧 English](#english)

---

## English

React-based Android application for remote control of the ATS Mini radio receiver via USB Serial and Bluetooth LE.

### Features

- **Dual Connection Mode**: USB Serial or Bluetooth LE
- **Frequency Control**: Precise tuning with +/- buttons and long-press support
- **Band Management**: Quick navigation between frequency bands
- **Operating Modes**: AM, FM, SSB mode switching
- **Bandwidth Control**: Adjust receiver bandwidth
- **Step Control**: Configure tuning step
- **AGC/Attenuator**: Automatic gain control and attenuator
- **Volume Control**: Audio level adjustment with visual indicator
- **Backlight Control**: Adjust receiver screen brightness
- **Menu Access**: Direct access to receiver menu
- **Real-time Monitoring**: RSSI, SNR, battery voltage display

### Technologies

- **React 19**: JavaScript UI framework
- **Vite 7**: Build tool and bundler
- **Capacitor 7**: Cross-platform native framework
- **TailwindCSS**: CSS framework
- **Capacitor Serial Plugin**: USB Serial communication
- **Capacitor Bluetooth LE Plugin**: Bluetooth LE communication

### Development Setup

#### Prerequisites

- **Node.js 18+** - JavaScript runtime
- **Java JDK 17** - Included in Android Studio
- **Android Studio** - With Android SDK
- **Git** - Version control

#### Environment Setup

1. **Install Node.js**
   ```bash
   # macOS (using Homebrew)
   brew install node

   # Ubuntu/Debian
   sudo apt install nodejs npm

   # Verify installation
   node --version  # Should be 18+
   npm --version
   ```

2. **Install Android Studio**
   - Download from https://developer.android.com/studio
   - Install Android SDK (API 33 recommended)
   - Configure environment variables:
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
     export ANDROID_HOME=$HOME/Android/Sdk          # Linux
     export PATH=$PATH:$ANDROID_HOME/tools
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```

#### Build Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rodillo69/ATS-Mini-Companion.git
   cd ATS-Mini-Companion/app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build Web Assets**
   ```bash
   npm run build
   ```

4. **Sync with Android**
   ```bash
   npx cap sync android
   ```

5. **Open in Android Studio**
   ```bash
   npx cap open android
   ```

6. **Build APK**
   - In Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)
   - Or via command line:
     ```bash
     cd android
     ./gradlew assembleDebug
     ```
   - Output: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Development Mode

```bash
# Start Vite dev server
npm run dev

# In another terminal, run on Android device
npx cap run android
```

### Project Structure

```
app/
├── src/
│   ├── components/          # React components
│   │   ├── ConnectionTab.jsx
│   │   ├── ControlTab.jsx
│   │   ├── DebugTab.jsx
│   │   └── Header.jsx
│   ├── services/            # Communication services
│   │   ├── serialService.js     # USB Serial
│   │   └── bluetoothService.js  # Bluetooth LE
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── android/                 # Native Android project
│   ├── app/
│   │   └── build.gradle    # App build configuration
│   └── build.gradle        # Project build configuration
├── public/                  # Static assets
├── package.json            # Node dependencies
├── capacitor.config.json   # Capacitor configuration
├── vite.config.js          # Vite build configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

### Key Services

#### Serial Service (`serialService.js`)
- USB Serial communication
- Command queue management
- Automatic reconnection
- Device discovery

#### Bluetooth Service (`bluetoothService.js`)
- Bluetooth LE communication
- Nordic UART Service implementation
- Connection state management
- Data streaming

### Configuration

#### Capacitor Configuration (`capacitor.config.json`)

```json
{
  "appId": "com.ea5iyr.atscompanion",
  "appName": "ATS Companion",
  "webDir": "dist",
  "android": {
    "allowMixedContent": true
  }
}
```

#### Required Permissions (`android/app/src/main/AndroidManifest.xml`)

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### Building for Release

1. **Update Version**
   ```bash
   # Edit package.json and android/app/build.gradle
   ```

2. **Build Release APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Sign APK** (Optional)
   ```bash
   # Generate keystore
   keytool -genkey -v -keystore release-key.keystore \
     -alias ats-companion -keyalg RSA -keysize 2048 -validity 10000

   # Sign APK
   jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
     -keystore release-key.keystore \
     app/build/outputs/apk/release/app-release-unsigned.apk \
     ats-companion

   # Align APK
   zipalign -v 4 app-release-unsigned.apk ATS-Mini-Companion.apk
   ```

### Troubleshooting

#### Build Issues

**Problem**: `ANDROID_HOME not set`
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
export ANDROID_HOME=$HOME/Android/Sdk          # Linux
```

**Problem**: `Gradle build failed`
```bash
cd android
./gradlew clean
./gradlew build
```

**Problem**: `capacitor/core not found`
```bash
npm install @capacitor/core @capacitor/cli --save
npx cap sync
```

#### Runtime Issues

**Problem**: USB device not detected
- Enable USB debugging on Android device
- Grant USB permissions when prompted
- Check USB OTG cable

**Problem**: Bluetooth not connecting
- Grant location permissions (required for BLE on Android)
- Enable Bluetooth on device
- Ensure ATS Mini has Bluetooth firmware v1.4+

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

### License

MIT License - See LICENSE file

---

## Español

Aplicación Android basada en React para control remoto del receptor de radio ATS Mini vía USB Serial y Bluetooth LE.

### Características

- **Modo de Conexión Dual**: USB Serial o Bluetooth LE
- **Control de Frecuencia**: Sintonización precisa con botones +/- y pulsación larga
- **Gestión de Bandas**: Navegación rápida entre bandas de frecuencia
- **Modos de Operación**: Cambio entre modos AM, FM, SSB
- **Control de Ancho de Banda**: Ajuste del ancho de banda del receptor
- **Control de Paso**: Configuración del paso de sintonización
- **AGC/Atenuador**: Control de ganancia automática y atenuador
- **Control de Volumen**: Ajuste del nivel de audio con indicador visual
- **Control de Retroiluminación**: Ajuste del brillo de la pantalla del receptor
- **Acceso al Menú**: Acceso directo al menú del receptor
- **Monitoreo en Tiempo Real**: Visualización de RSSI, SNR, voltaje de batería

### Tecnologías

- **React 19**: Framework JavaScript de UI
- **Vite 7**: Herramienta de construcción
- **Capacitor 7**: Framework nativo multiplataforma
- **TailwindCSS**: Framework CSS
- **Capacitor Serial Plugin**: Comunicación USB Serial
- **Capacitor Bluetooth LE Plugin**: Comunicación Bluetooth LE

### Configuración de Desarrollo

#### Requisitos Previos

- **Node.js 18+** - Runtime de JavaScript
- **Java JDK 17** - Incluido en Android Studio
- **Android Studio** - Con Android SDK
- **Git** - Control de versiones

#### Configuración del Entorno

1. **Instalar Node.js**
   ```bash
   # macOS (usando Homebrew)
   brew install node

   # Ubuntu/Debian
   sudo apt install nodejs npm

   # Verificar instalación
   node --version  # Debe ser 18+
   npm --version
   ```

2. **Instalar Android Studio**
   - Descargar desde https://developer.android.com/studio
   - Instalar Android SDK (API 33 recomendado)
   - Configurar variables de entorno:
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
     export ANDROID_HOME=$HOME/Android/Sdk          # Linux
     export PATH=$PATH:$ANDROID_HOME/tools
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```

#### Instrucciones de Compilación

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/rodillo69/ATS-Mini-Companion.git
   cd ATS-Mini-Companion/app
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   ```

3. **Compilar Assets Web**
   ```bash
   npm run build
   ```

4. **Sincronizar con Android**
   ```bash
   npx cap sync android
   ```

5. **Abrir en Android Studio**
   ```bash
   npx cap open android
   ```

6. **Compilar APK**
   - En Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)
   - O vía línea de comandos:
     ```bash
     cd android
     ./gradlew assembleDebug
     ```
   - Salida: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Modo Desarrollo

```bash
# Iniciar servidor de desarrollo Vite
npm run dev

# En otra terminal, ejecutar en dispositivo Android
npx cap run android
```

### Estructura del Proyecto

```
app/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ConnectionTab.jsx
│   │   ├── ControlTab.jsx
│   │   ├── DebugTab.jsx
│   │   └── Header.jsx
│   ├── services/            # Servicios de comunicación
│   │   ├── serialService.js     # USB Serial
│   │   └── bluetoothService.js  # Bluetooth LE
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── android/                 # Proyecto Android nativo
│   ├── app/
│   │   └── build.gradle    # Configuración de compilación
│   └── build.gradle        # Configuración del proyecto
├── public/                  # Assets estáticos
├── package.json            # Dependencias Node
├── capacitor.config.json   # Configuración Capacitor
├── vite.config.js          # Configuración Vite
└── tailwind.config.js      # Configuración Tailwind CSS
```

### Servicios Clave

#### Servicio Serial (`serialService.js`)
- Comunicación USB Serial
- Gestión de cola de comandos
- Reconexión automática
- Descubrimiento de dispositivos

#### Servicio Bluetooth (`bluetoothService.js`)
- Comunicación Bluetooth LE
- Implementación Nordic UART Service
- Gestión de estado de conexión
- Streaming de datos

### Configuración

#### Configuración Capacitor (`capacitor.config.json`)

```json
{
  "appId": "com.ea5iyr.atscompanion",
  "appName": "ATS Companion",
  "webDir": "dist",
  "android": {
    "allowMixedContent": true
  }
}
```

#### Permisos Requeridos (`android/app/src/main/AndroidManifest.xml`)

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### Compilar para Release

1. **Actualizar Versión**
   ```bash
   # Editar package.json y android/app/build.gradle
   ```

2. **Compilar APK Release**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Firmar APK** (Opcional)
   ```bash
   # Generar keystore
   keytool -genkey -v -keystore release-key.keystore \
     -alias ats-companion -keyalg RSA -keysize 2048 -validity 10000

   # Firmar APK
   jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
     -keystore release-key.keystore \
     app/build/outputs/apk/release/app-release-unsigned.apk \
     ats-companion

   # Alinear APK
   zipalign -v 4 app-release-unsigned.apk ATS-Mini-Companion.apk
   ```

### Solución de Problemas

#### Problemas de Compilación

**Problema**: `ANDROID_HOME not set`
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
export ANDROID_HOME=$HOME/Android/Sdk          # Linux
```

**Problema**: `Gradle build failed`
```bash
cd android
./gradlew clean
./gradlew build
```

**Problema**: `capacitor/core not found`
```bash
npm install @capacitor/core @capacitor/cli --save
npx cap sync
```

#### Problemas de Ejecución

**Problema**: Dispositivo USB no detectado
- Habilitar depuración USB en dispositivo Android
- Otorgar permisos USB cuando se soliciten
- Verificar cable USB OTG

**Problema**: Bluetooth no conecta
- Otorgar permisos de ubicación (requerido para BLE en Android)
- Habilitar Bluetooth en el dispositivo
- Asegurar que ATS Mini tiene firmware Bluetooth v1.4+

### Contribuir

1. Hacer fork del repositorio
2. Crear rama de funcionalidad: `git checkout -b nombre-funcionalidad`
3. Hacer commit de cambios: `git commit -am 'Agregar funcionalidad'`
4. Push a la rama: `git push origin nombre-funcionalidad`
5. Abrir un Pull Request

### Licencia

Licencia MIT - Ver archivo LICENSE
