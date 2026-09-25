import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ThemeMode } from '../types';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQSectionProps {
  themeMode: ThemeMode;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ themeMode }) => {
  const [openFaqId, setOpenFaqId] = useState<string>('faq-2');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? '' : id);
  };

  return (
    <section 
      id="section-faq"
      className="relative w-full py-20 lg:py-24 px-5 lg:px-12 overflow-hidden bg-transparent z-10"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-medium mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto font-sans"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Common questions about the transformation process.
          </p>
        </motion.div>

        {/* FAQ Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="surface-glass p-6 sm:p-10 transition-colors duration-300"
          style={{ borderRadius: 'var(--radius-lg)' }}
        >
          <div className="space-y-6">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => toggleFaq(faq.id)}
                  className="border-b pb-6 cursor-pointer group transition-colors"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h4 className="font-serif-heading text-lg sm:text-xl font-medium transition-colors"
                      style={{
                        color: isOpen ? 'var(--color-accent-gold)' : 'var(--color-text-primary)'
                      }}
                    >
                      {faq.question}
                    </h4>

                    <div className={
                      isOpen
                        ? "p-1.5 rounded-full transition-transform duration-300 rotate-180"
                        : "p-1.5 rounded-full transition-transform duration-300"
                    }
                      style={{ color: isOpen ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)' }}
                    >
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  {/* Expandable Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 text-sm sm:text-base leading-relaxed font-sans"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
