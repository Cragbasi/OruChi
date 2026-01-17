import { motion } from 'framer-motion';
import { 
  Wrench, 
  Paintbrush, 
  Home, 
  Droplets, 
  Wind, 
  DoorOpen,
  Fence,
  Thermometer,
  LayoutGrid,
  Package,
  Hammer,
  Bath,
  ChefHat,
  TreePine
} from 'lucide-react';
import { Card, CardContent } from './ui/card';

export const Services = () => {
  const services = [
    { 
      icon: DoorOpen, 
      title: 'Windows & Doors', 
      description: 'Installation, repair, and weatherproofing for all types of windows and doors',
      featured: false 
    },
    { 
      icon: Home, 
      title: 'Walls & Drywall', 
      description: 'Patching, texturing, and complete wall renovations',
      featured: false 
    },
    { 
      icon: Droplets, 
      title: 'Plumbing', 
      description: 'Leak repairs, pipe installations, fixture replacements, and drain cleaning',
      featured: true 
    },
    { 
      icon: Hammer, 
      title: 'Roof Repair', 
      description: 'Shingle replacement, leak detection, and gutter maintenance',
      featured: false 
    },
    { 
      icon: Wind, 
      title: 'Leak Detection', 
      description: 'Professional leak detection and waterproofing solutions',
      featured: false 
    },
    { 
      icon: Fence, 
      title: 'Fence & Deck', 
      description: 'New installations, repairs, staining, and restoration',
      featured: false 
    },
    { 
      icon: Thermometer, 
      title: 'Heating & HVAC', 
      description: 'Basic heating repairs and maintenance services',
      featured: false 
    },
    { 
      icon: Paintbrush, 
      title: 'Painting', 
      description: 'Interior and exterior painting with premium finishes',
      featured: true 
    },
    { 
      icon: LayoutGrid, 
      title: 'Flooring', 
      description: 'Hardwood, tile, laminate installation and refinishing',
      featured: false 
    },
    { 
      icon: Package, 
      title: 'Cabinets', 
      description: 'Installation, repair, refinishing, and hardware upgrades',
      featured: false 
    },
    { 
      icon: Wrench, 
      title: 'Remodeling', 
      description: 'Complete room renovations and home improvement projects',
      featured: true 
    },
    { 
      icon: Bath, 
      title: 'Bathroom Remodeling', 
      description: 'Full bathroom renovations, tile work, vanities, and fixture upgrades',
      featured: true 
    },
    { 
      icon: ChefHat, 
      title: 'Kitchen Remodeling', 
      description: 'Kitchen makeovers, countertops, backsplash, and appliance installation',
      featured: true 
    },
    { 
      icon: TreePine, 
      title: 'Patio & Outdoor', 
      description: 'Patio construction, repairs, outdoor living spaces, and deck work',
      featured: false 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      id="services" 
      className="py-24 bg-background"
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 
            className="font-bitter font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4"
            data-testid="services-title"
          >
            What Can I Fix For You?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From small repairs to major renovations, I've got the skills and experience 
            to make your home look and work like new.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`${service.featured ? 'sm:col-span-2 lg:col-span-1 xl:col-span-2' : ''}`}
            >
              <Card 
                className={`h-full service-card group cursor-pointer border border-border/40 hover:border-primary/40 bg-card hover:shadow-lg transition-all duration-300 ${
                  service.featured ? 'bg-gradient-to-br from-primary/5 to-accent/5' : ''
                }`}
                data-testid={`service-card-${index}`}
              >
                <CardContent className={`p-6 ${service.featured ? 'p-8' : ''}`}>
                  <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors ${
                    service.featured ? 'w-14 h-14' : ''
                  }`}>
                    <service.icon className={`text-primary ${service.featured ? 'w-7 h-7' : 'w-6 h-6'}`} />
                  </div>
                  <h3 className={`font-bitter font-bold text-foreground mb-2 group-hover:text-primary transition-colors ${
                    service.featured ? 'text-xl' : 'text-lg'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-muted-foreground ${service.featured ? 'text-base' : 'text-sm'}`}>
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
