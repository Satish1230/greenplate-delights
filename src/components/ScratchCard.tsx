
import React, { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isFireworksActive, setIsFireworksActive] = useState(false);
  const { toast } = useToast();

  // Scratch card parameters
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Setup canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill with sage color
    ctx.fillStyle = '#698c68';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some texture/pattern to make it look like a scratch card
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#5a7859';
    ctx.textAlign = 'center';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillText('✧', x, y);
    }

    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch here to reveal discount', canvas.width / 2, canvas.height / 2);

    // Variables for scratch tracking
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let scratchedPixels = 0;
    let totalPixels = canvas.width * canvas.height;

    // Handle drawing/scratching
    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const { offsetX, offsetY } = getCoordinates(e);
      lastX = offsetX;
      lastY = offsetY;
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();

      const { offsetX, offsetY } = getCoordinates(e);
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 40;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();

      // Calculate approximately how much has been scratched
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      scratchedPixels = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) scratchedPixels++;
      }

      const percent = Math.floor((scratchedPixels / totalPixels) * 100);
      setScratchPercentage(percent);

      // If 40% is scratched, reveal the discount
      if (percent >= 40 && !isRevealed) {
        setIsRevealed(true);
        setIsFireworksActive(true);
        toast({
          title: "Congratulations!",
          description: "You've unlocked a 20% discount!",
        });

        // Auto-remove the scratch card layer completely
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 500);

        // Stop fireworks after a few seconds
        setTimeout(() => {
          setIsFireworksActive(false);
        }, 5000);
      }

      lastX = offsetX;
      lastY = offsetY;
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    // Utility function to get coordinates from both mouse and touch events
    function getCoordinates(e: MouseEvent | TouchEvent) {
      let offsetX, offsetY;
      const rect = canvas.getBoundingClientRect();
      
      if (e instanceof MouseEvent) {
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
      } else {
        // Touch event
        const touch = (e as TouchEvent).touches[0];
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
      }
      
      return { offsetX, offsetY };
    }

    // Add event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    // Cleanup
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, []);

  return (
    <section className="py-16 bg-sage-50 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-medium text-center text-sage-800 mb-6">
          Scratch & Win
        </h2>
        <p className="text-center text-sage-600 mb-8">
          Scratch the card below to reveal your special discount!
        </p>
        
        <div 
          ref={containerRef}
          className="relative max-w-md mx-auto aspect-[2/1] rounded-xl overflow-hidden shadow-lg"
        >
          {/* Discount Revealed */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-sage-50 to-sage-100">
            <div className="text-center">
              <p className="text-sage-600 mb-2">You got</p>
              <h3 className="text-4xl md:text-5xl font-bold text-sage-800 mb-2">20% OFF</h3>
              <p className="text-sage-700">On your first order!</p>
            </div>
          </div>
          
          {/* Fireworks Effect */}
          {isFireworksActive && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Top Left */}
              <Sparkles className="absolute top-1/4 left-1/4 text-yellow-400 animate-ping" size={24} />
              <Sparkles className="absolute top-1/3 left-1/5 text-red-500 animate-pulse" size={20} />
              
              {/* Top Right */}
              <Sparkles className="absolute top-1/4 right-1/4 text-blue-400 animate-ping" size={24} />
              <Sparkles className="absolute top-1/3 right-1/5 text-purple-500 animate-pulse" size={20} />
              
              {/* Bottom */}
              <Sparkles className="absolute bottom-1/4 left-1/2 text-green-400 animate-ping" size={24} />
              <Sparkles className="absolute bottom-1/3 right-1/3 text-pink-500 animate-pulse" size={20} />
            </div>
          )}
          
          {/* Scratch Layer */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 cursor-pointer z-10"
          />
        </div>
        
        {/* Progress indicator (hidden when revealed) */}
        {!isRevealed && (
          <div className="mt-4 text-center text-sage-600">
            <span className="text-sm">Scratched: {scratchPercentage}%</span>
            <div className="w-full max-w-md mx-auto h-2 bg-sage-200 rounded-full mt-2">
              <div 
                className="h-2 bg-sage-500 rounded-full transition-all duration-300"
                style={{ width: `${scratchPercentage}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Call to action - only shown when revealed */}
        {isRevealed && (
          <div className="mt-6 text-center">
            <a 
              href="https://forms.gle/HUFnoTiq24m6aTdA8" 
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button inline-flex items-center justify-center gap-2"
            >
              Claim Your 20% Discount
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScratchCard;
