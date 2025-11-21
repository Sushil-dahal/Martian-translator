import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { TranslatorInterface } from './components/TranslatorInterface';
import { StarBackground } from './components/StarBackground';
import { LoadingPortal } from './components/LoadingPortal';
import { Spaceship } from './components/Spaceship';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-purple-950 to-black">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingPortal key="portal" onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <StarBackground key="stars" />
            <Spaceship key="spaceship" />
            <div className="relative z-10">
              <TranslatorInterface />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
