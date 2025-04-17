import { Variants } from 'framer-motion';

// Fade In animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6
    }
  }
};

// Fade In Up animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6
    }
  }
};

// Fade In Down animation variants
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6
    }
  }
};

// Fade In Left animation variants
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6
    }
  }
};

// Fade In Right animation variants
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6
    }
  }
};

// Scale In animation variants
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5
    }
  }
};

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hover animation for cards
export const hoverScale = {
  whileHover: { 
    scale: 1.05,
    transition: { 
      duration: 0.3
    }
  }
};

// Scroll-triggered animation settings
export const scrollAnimationProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.3 }
};

// Button tap animation
export const buttonTap = {
  whileTap: { scale: 0.95 }
};

// Carousel item animation
export const carouselItem: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4
    }
  }
};

// Background transition variants (from black to #121212)
export const bgTransition: Variants = {
  hidden: { 
    backgroundColor: "#121212",
  },
  visible: { 
    backgroundColor: "#121212",
    transition: { 
      duration: 0.8,
      ease: "easeOut" 
    }
  }
};

// Combined background and fade transition
export const bgFadeTransition: Variants = {
  hidden: { 
    opacity: 0,
    backgroundColor: "#121212",
  },
  visible: { 
    opacity: 1,
    backgroundColor: "#121212",
    transition: { 
      opacity: { duration: 0.6 },
      backgroundColor: { duration: 0.8, ease: "easeOut" }
    }
  }
}; 