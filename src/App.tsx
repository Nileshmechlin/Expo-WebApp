import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import '../global.css';
import { debugConfig } from './utils/debug';

// Sendbird UIKit + Services
import {
  SendbirdUIKitContainer,
  createExpoClipboardService,
  createExpoFileService,
  createExpoMediaService,
  createExpoNotificationService,
  createExpoPlayerService,
  createExpoRecorderService,
  SendbirdUIKitContainerProps,
} from '@sendbird/uikit-react-native';

// Expo native modules
import * as ExpoClipboard from 'expo-clipboard';
import * as ExpoDocumentPicker from 'expo-document-picker';
import * as ExpoFS from 'expo-file-system';
import * as ExpoImagePicker from 'expo-image-picker';
import * as ExpoMediaLibrary from 'expo-media-library';
import * as ExpoNotifications from 'expo-notifications';
import * as ExpoAV from 'expo-av';
import * as ExpoVideoThumbnail from 'expo-video-thumbnails';
import * as ExpoImageManipulator from 'expo-image-manipulator';

// MMKV storage
import { MMKV } from 'react-native-mmkv';
const mmkv = new MMKV();

// Configure Sendbird platform services
const platformServices: SendbirdUIKitContainerProps['platformServices'] = {
  clipboard: createExpoClipboardService(ExpoClipboard),
  notification: createExpoNotificationService(ExpoNotifications),
  file: createExpoFileService({
    fsModule: ExpoFS,
    imagePickerModule: ExpoImagePicker,
    mediaLibraryModule: ExpoMediaLibrary,
    documentPickerModule: ExpoDocumentPicker,
  }),
  media: createExpoMediaService({
    avModule: ExpoAV,
    thumbnailModule: ExpoVideoThumbnail,
    imageManipulator: ExpoImageManipulator,
    fsModule: ExpoFS,
  }),
  player: createExpoPlayerService({
    avModule: ExpoAV,
  }),
  recorder: createExpoRecorderService({
    avModule: ExpoAV,
  }),
};

// Run debug config
debugConfig();

export default function App() {
  return (
    <SafeAreaProvider>
      <SendbirdUIKitContainer
        appId={'YOUR_SENDBIRD_APP_ID'} // 🔁 Replace with your actual App ID
        chatOptions={{ localCacheStorage: mmkv }}
        platformServices={platformServices}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2563eb"
          translucent={false}
        />
        <RootNavigator />
      </SendbirdUIKitContainer>
    </SafeAreaProvider>
  );
}
