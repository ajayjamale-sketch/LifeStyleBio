import React, { Suspense } from 'react';
import AppRoutes from '@/routes/AppRoutes';
import ScrollToTop from '@/components/common/ScrollToTop';
import LoadingScreen from '@/components/common/LoadingScreen';

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <AppRoutes />
      </Suspense>
    </>
  );
};

export default App;
