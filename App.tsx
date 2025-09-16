import { StatusBar } from 'expo-status-bar';
import { ChatBot } from './src/components/ChatBot';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatBot />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}