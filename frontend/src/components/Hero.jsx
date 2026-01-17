import { motion } from 'framer-motion';
import { CheckCircle, Award, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const Hero = () => {
  const features = [
    { icon: Award, text: 'Certified Engineer' },
    { icon: CheckCircle, text: 'Quality Guaranteed' },
    { icon: Clock, text: 'Fast Service' },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 hero-bg texture-overlay overflow-hidden"
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <Badge 
              className="mb-6 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full"
              data-testid="hero-badge"
            >
              Your Neighborhood Handyman
            </Badge>
            
            <h1 
              className="font-bitter font-black text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6"
              data-testid="hero-title"
            >
              Hi, I'm <span className="text-primary">Chi</span> — Your Certified Fixerupper
            </h1>
            
            <p 
              className="text-lg text-muted-foreground mb-8 max-w-xl"
              data-testid="hero-description"
            >
              I can fix anything for a bargain and make it last like brand new. 
              From plumbing to painting, roofs to floors — if it needs fixing, I've got you covered.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-foreground/80"
                  data-testid={`hero-feature-${index}`}
                >
                  <feature.icon className="w-5 h-5 text-accent" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all text-base px-8"
                data-testid="hero-cta-primary"
              >
                <a href="#contact">Get a Free Quote</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-primary text-primary hover:bg-primary/10 text-base px-8"
                data-testid="hero-cta-secondary"
              >
                <a href="#services">View Services</a>
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1461938337379-4b537cd2db74?w=800&q=80"
                alt="Chi - Professional Handyman"
                className="w-full h-auto object-cover aspect-[4/5]"
                data-testid="hero-image"
              />
              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-bitter font-bold text-foreground">Certified Mechanical Engineer</p>
                    <p className="text-sm text-muted-foreground">10+ Years Experience</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
