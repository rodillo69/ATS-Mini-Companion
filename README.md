# ATS Mini Companion

Aplicación de control remoto para el receptor de radio ATS Mini a través de USB Serial.

## Descripción

ATS Mini Companion es una aplicación Android desarrollada con React, Vite y Capacitor que permite controlar de forma remota el receptor de radio ATS Mini mediante conexión USB Serial. La aplicación ofrece una interfaz intuitiva tipo ICOM para gestionar todos los parámetros del receptor.

## Características

- **Control de Frecuencia**: Ajuste preciso de frecuencia con botones +/- y soporte para pulsación larga
- **Gestión de Bandas**: Navegación rápida entre bandas de frecuencia
- **Modos de Operación**: Cambio entre diferentes modos de modulación (AM, FM, SSB, etc.)
- **Control de Ancho de Banda**: Ajuste del ancho de banda del receptor
- **Control de Paso**: Configuración del paso de sintonización
- **AGC/Atenuador**: Control de ganancia automática y atenuador
- **Control de Volumen**: Ajuste del nivel de audio con indicador visual
- **Control de Retroiluminación**: Ajuste del brillo de la pantalla del receptor
- **Acceso al Menú**: Acceso directo al menú del receptor

## Descarga

**[Descargar APK v2.5](https://github.com/rodillo69/ATS-Mini-Companion/releases/download/v2.5/ATSMini_v2.5_debug.apk)**

## Requisitos

- Dispositivo Android con soporte USB OTG
- Cable USB OTG para conectar el receptor ATS Mini
- Android 7.0 o superior

## Instalación

1. Descarga el archivo APK desde el enlace anterior
2. Habilita la instalación desde fuentes desconocidas en tu dispositivo Android
3. Instala la APK
4. Conecta tu receptor ATS Mini mediante cable USB OTG
5. Abre la aplicación y pulsa "Connect" para establecer la conexión

## Tecnologías Utilizadas

- **React 19**: Framework JavaScript para la interfaz de usuario
- **Vite 7**: Build tool y bundler de alto rendimiento
- **Capacitor 7**: Framework para aplicaciones nativas multiplataforma
- **TailwindCSS**: Framework CSS para diseño responsive
- **Capacitor Serial Plugin**: Plugin para comunicación USB Serial

## Desarrollo

### Requisitos de desarrollo

- Node.js 18 o superior
- Java JDK 17 (incluido en Android Studio)
- Android Studio con Android SDK
- Git

### Compilar desde código fuente

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

## Estructura del Proyecto

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

## Historial de Versiones

### v2.5 (Actual)
- Mejora en el control de long press para botones de frecuencia
- Verificación de cambio de frecuencia antes de enviar siguiente comando
- Prevención de saturación de comunicación serial

### v2.4
- Deshabilitada la selección de texto en toda la aplicación
- Mejoras en la experiencia táctil en dispositivos móviles

### v2.3
- Implementación de long press con control recursivo
- Corrección de problemas de comandos que no se detenían

### v2.2
- Ajuste de velocidad en long press para evitar saturación serial

### v2.1
- Implementación inicial de long press en botones de frecuencia

### v2.0
- Eliminación del control VFO dial rotatorio
- Nueva interfaz con botones horizontales +/-
- Diseño optimizado para dispositivos móviles

## Licencia

Este proyecto está bajo licencia MIT.

## Autor

Desarrollado por EA5IYR - Miguel Cañadas

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios importantes antes de crear un pull request.

## Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio de GitHub.
