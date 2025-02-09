import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket } from 'lucide-react';
import { pricingPlans } from '@/lib/data/pricing-plans';
import { formatPrice } from '@/lib/utils/format-price';

export function BoostPricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">⚡Choose Your Boost Package</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`p-6 ${plan.highlighted ? 'border-primary scale-105 shadow-lg' : ''}`}
            >
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
              {plan.name === 'Basic Boost' ? (
                <Button 
                  className="w-full" 
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <a href="https://www.creem.io/payment/prod_7FO7FxcXQLx26V29dKw8TB" target="_blank" rel="noopener noreferrer">
                    Buy Now
                  </a>
                </Button>
              ) : plan.name === 'Premium Boost' ? (
                <Button 
                  className="w-full" 
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <a href="https://www.creem.io/payment/prod_7QY1xoxYvmD381CkLFgH9N" target="_blank" rel="noopener noreferrer">
                    Buy Now
                  </a>
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <a href="mailto:contact@startups.ad">
                    {plan.buttonText || 'Contact Us'}
                  </a>
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
