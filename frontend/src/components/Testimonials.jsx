import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'fill-accent text-accent' : 'text-muted'
          }`}
        />
      ))}
    </div>
  );
};

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API}/testimonials`);
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback data
        setTestimonials([
          {
            id: '1',
            name: 'Sarah Johnson',
            rating: 5,
            comment: "Chi fixed our leaking roof in no time! Professional, affordable, and the quality is outstanding. Highly recommend!",
            service_type: 'Roof Repair',
          },
          {
            id: '2',
            name: 'Michael Chen',
            rating: 5,
            comment: "Our kitchen cabinets look brand new after Chi's work. He's meticulous and his prices are very fair.",
            service_type: 'Cabinets',
          },
          {
            id: '3',
            name: 'Emily Rodriguez',
            rating: 5,
            comment: "Best plumber in the neighborhood! Fixed our bathroom pipes and even gave us tips to prevent future issues.",
            service_type: 'Plumbing',
          },
          {
            id: '4',
            name: 'David Thompson',
            rating: 5,
            comment: "Chi painted our entire house interior. The attention to detail is incredible. Worth every penny!",
            service_type: 'Painting',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-background"
      data-testid="testimonials-section"
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
            data-testid="testimonials-title"
          >
            What My Neighbors Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my customers have to say 
            about their experience working with me.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <Card 
                  className="h-full testimonial-card border border-border/40 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                  data-testid={`testimonial-card-${index}`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <Quote className="w-8 h-8 text-accent/60" />
                    </div>

                    {/* Rating */}
                    <div className="mb-4">
                      <StarRating rating={testimonial.rating} />
                    </div>

                    {/* Comment */}
                    <p className="text-foreground/80 text-sm flex-grow mb-6 leading-relaxed">
                      "{testimonial.comment}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                      <Avatar className="w-10 h-10 bg-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.service_type}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
