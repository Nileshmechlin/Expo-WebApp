// components/Layout.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header />
      {children}
    </SafeAreaView>
  );
};

export default Layout;
