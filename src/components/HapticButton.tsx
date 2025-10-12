import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { forwardRef } from 'react';

interface HapticButtonProps extends ButtonProps {
  hapticStrength?: 'light' | 'medium' | 'heavy';
}

const HapticButton = forwardRef<HTMLButtonElement, HapticButtonProps>(
  ({ children, hapticStrength = 'medium', className, onClick, ...props }, ref) => {
    const hapticScale = {
      light: 0.98,
      medium: 0.95,
      heavy: 0.92
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Trigger haptic feedback on supported devices
      if ('vibrate' in navigator) {
        const vibrationPattern = {
          light: [10],
          medium: [20],
          heavy: [30]
        };
        navigator.vibrate(vibrationPattern[hapticStrength]);
      }

      onClick?.(e);
    };

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: hapticScale[hapticStrength] }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Button
          ref={ref}
          className={className}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

HapticButton.displayName = 'HapticButton';

export default HapticButton;
