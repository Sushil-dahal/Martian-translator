import { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translateText } from '../utils/translator';

export function TranslatorInterface() {
  const [englishText, setEnglishText] = useState('');
  const [alienText, setAlienText] = useState('');
  const [direction, setDirection] = useState<'toAlien' | 'toEnglish'>('toAlien');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (value: string) => {
    if (direction === 'toAlien') {
      setEnglishText(value);
      setAlienText(translateText(value, 'toAlien'));
    } else {
      setAlienText(value);
      setEnglishText(translateText(value, 'toEnglish'));
    }
  };
  const handleSwap = () => {
    setDirection(prev => prev === 'toAlien' ? 'toEnglish' : 'toAlien');
    // Swap the text values
    const temp = englishText;
    setEnglishText(alienText);
    setAlienText(temp);
  };

  const handleCopy = async () => {
    const textToCopy = direction === 'toAlien' ? alienText : englishText;
    try {
      // Try modern clipboard API first
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback method for when clipboard API is blocked
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          console.error('Failed to copy text using fallback method');
        }
      } catch (fallbackErr) {
        console.error('All copy methods failed:', fallbackErr);
      }
    }
  };

  const inputText = direction === 'toAlien' ? englishText : alienText;
  const outputText = direction === 'toAlien' ? alienText : englishText;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* The Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-cyan-400" />
          <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Martian Translator
          </h1>
          <Sparkles className="w-8 h-8 text-pink-400" />
        </div>
        <p className="text-cyan-300/80 text-lg md:text-xl">
          Decode the language of the cosmos
        </p>
      </motion.div>

      {/* The Translator Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        <div className="relative">
          {/* The Glassmorphic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/30 rounded-3xl backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" />
          
          {/* The Content */}
          <div className="relative p-6 md:p-10">
            {/* The Language Labels */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-400/40 shadow-lg shadow-cyan-500/20"
              >
                <h2 className="text-center text-cyan-300">
                  {direction === 'toAlien' ? 'English' : 'Alien'}
                </h2>
              </motion.div>

              <div className="flex items-center justify-center md:mx-4">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSwap}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full border-2 border-purple-400/50 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 transition-all"
                  aria-label="Swap languages"
                >
                  <ArrowLeftRight className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/40 shadow-lg shadow-purple-500/20"
              >
                <h2 className="text-center text-purple-300">
                  {direction === 'toAlien' ? 'Alien' : 'English'}
                </h2>
              </motion.div>
            </div>

            {/* The Text Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* The Input Area */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-opacity" />
                <textarea
                  value={inputText}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={`Type ${direction === 'toAlien' ? 'English' : 'Alien'} text here...`}
                  className="relative w-full h-64 md:h-80 bg-black/60 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-6 text-white placeholder-cyan-300/40 focus:outline-none focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20 resize-none transition-all"
                  style={{ fontSize: '1.125rem', lineHeight: '1.75rem' }}
                />
              </div>

              {/* The Output Area */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-opacity" />
                <div className="relative">
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder="Translation appears here..."
                    className="w-full h-64 md:h-80 bg-black/60 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 text-white placeholder-purple-300/40 focus:outline-none resize-none"
                    style={{ fontSize: '1.125rem', lineHeight: '1.75rem' }}
                  />
                  {/* The Copy Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg border border-purple-400/50 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all"
                    aria-label="Copy to clipboard"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                        >
                          <Check className="w-5 h-5 text-green-300" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Copy className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* The Character Count */}
            <div className="mt-6 text-center text-cyan-300/60 text-sm">
              {inputText.length} characters
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
