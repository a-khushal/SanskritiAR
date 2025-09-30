# Cultural Heritage AR Explorer

A React Native application that leverages augmented reality to preserve and showcase cultural heritage sites through immersive 3D experiences and historical visualization.

## Features

- **AR Visualization**: View 3D models of cultural heritage sites overlaid in the real world
- **Site Recognition**: Automatic detection using GPS and image recognition
- **Historical Context**: Access detailed information and historical data about each site
- **Degradation Analysis**: Compare current site conditions with historical references
- **Offline Support**: Core functionality available without internet connection
- **Extensible**: Easy to add new sites and models

## Prerequisites

- Node.js 16+ and npm 8+
- React Native CLI
- For iOS development:
  - Xcode 13+
  - CocoaPods
  - macOS with Apple Silicon or Intel processor
- For Android development:
  - Android Studio
  - Android SDK
  - Java Development Kit (JDK) 11+
- Physical device with ARCore (Android) or ARKit (iOS) support for AR features

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/a-khushal/SanskritiAR.git
   cd SanskritiAR
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Install iOS dependencies (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Android
```bash
# Start Metro bundler in a separate terminal
npx react-native start or yarn start

# In another terminal
npx react-native run-android
```

### iOS
```bash
# Install pods if not already done
cd ios && pod install && cd ..

# Run the app
npx react-native run-ios
```

## Project Structure

```
.
├── android/                 # Android native code
├── ios/                    # iOS native code
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/            # App screens
│   ├── services/           # API and data services
│   ├── utils/              # Helper functions
│   └── App.tsx             # Main application component
├── assets/                 # Static assets
│   ├── models/            # 3D model files
│   └── images/            # Image assets
└── __tests__/             # Test files
```

## Development

### Adding New Heritage Sites
1. Add 3D model files to `assets/models/`
2. Update site metadata in `src/data/sites.js`
3. Add reference images to `assets/reference-images/`

### Development Workflow
- Use `npm run lint` to check code quality
- Run tests with `npm test`
- For production builds, use `npm run build:android` or `npm run build:ios`

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support or feature requests, please [open an issue](https://github.com/a-khushal/SanskritiAR/issues).

