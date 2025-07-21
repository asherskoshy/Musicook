import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-outfit font-bold text-center mb-8">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the AI music generation work?</AccordionTrigger>
            <AccordionContent>
              Our AI analyzes your lyrics for emotional content, rhythm, and structure, then generates melodies, harmonies, and arrangements that perfectly match your words.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I use the generated music commercially?</AccordionTrigger>
            <AccordionContent>
              Yes! All music generated with Musicook is royalty-free and can be used for commercial purposes.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>What audio formats do you support?</AccordionTrigger>
            <AccordionContent>
              We support MP3, WAV, and FLAC formats for both input and output. Premium users get access to uncompressed formats.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;