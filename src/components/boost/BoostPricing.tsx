import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket } from 'lucide-react';
import { pricingPlans } from '@/lib/data/pricing-plans';
import { formatPrice } from '@/lib/utils/format-price';
import { motion } from 'framer-motion';

export function BoostPricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">⚡Choose Your Boost Package</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card 
                className={`p-6 relative overflow-hidden ${
                  plan.highlighted 
                    ? 'border-primary scale-105 shadow-lg' 
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold">
                    {formatPrice(plan.price, plan.period)}
                  </p>
                  {plan.badge && (
                    <Badge variant={plan.badge.variant} className="mt-2">
                      {plan.badge.text}
                    </Badge>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Rocket className="w-5 h-5 mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {plan.name === 'Basic Boost' ? (
                    <Button 
                      className={`w-full relative group ${
                        plan.highlighted 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg' 
                          : 'bg-primary/90 hover:bg-primary text-primary-foreground'
                      }`}
                      size="lg"
                      asChild
                    >
                      <a 
                        href="https://www.creem.io/payment/prod_7FO7FxcXQLx26V29dKw8TB" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative py-6 overflow-hidden"
                      >
                        <span className="relative z-10">Buy Now</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 transform -skew-x-12 group-hover:animate-shine" />
                      </a>
                    </Button>
                  ) : plan.name === 'Premium Boost' ? (
                    <Button 
                      className={`w-full relative group ${
                        plan.highlighted 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg' 
                          : 'bg-primary/90 hover:bg-primary text-primary-foreground'
                      }`}
                      size="lg"
                      asChild
                    >
                      <a 
                        href="https://www.creem.io/payment/prod_7QY1xoxYvmD381CkLFgH9N" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative py-6 overflow-hidden"
                      >
                        <span className="relative z-10">Buy Now</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 transform -skew-x-12 group-hover:animate-shine" />
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      className={`w-full relative group ${
                        plan.highlighted 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                          : 'bg-primary/90 hover:bg-primary text-primary-foreground'
                      }`}
                      size="lg"
                      asChild
                    >
                      <a 
                        href="mailto:contact@startups.ad"
                        className="relative py-6"
                      >
                        <span className="relative z-10">{plan.buttonText || 'Contact Us'}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 transform -skew-x-12 group-hover:animate-shine" />
                      </a>
                    </Button>
                  )}
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
