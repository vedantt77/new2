import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket } from 'lucide-react';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { pricingPlans } from '@/lib/data/pricing-plans';
import { formatPrice } from '@/lib/utils/format-price';

export function BoostPricing() {
  const { theme } = useTheme();

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="paypal"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    script.async = true;

    script.onload = () => {
      pricingPlans.forEach(plan => {
        if (plan.paypalPlanId && typeof plan.price === 'number') {
          const buttonContainer = document.getElementById(`paypal-button-${plan.paypalPlanId}`);
          if (buttonContainer && window.paypal) {
            buttonContainer.innerHTML = '';
            
            window.paypal.Buttons({
              style: {
                layout: 'vertical',
                color: theme === 'dark' ? 'black' : 'blue',
                shape: 'rect',
                label: 'pay',
                height: 45
              },
              createOrder: (_data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: plan.price.toString(),
                      currency_code: 'USD'
                    },
                    description: `${plan.name} - ${plan.period}`
                  }]
                });
              },
              onApprove: async (_data: any, actions: any) => {
                const order = await actions.order.capture();
                console.log('Payment successful:', order);
                
                // Redirect based on the plan
                if (plan.paypalPlanId === 'basic-boost') {
                  window.location.href = 'https://tally.so/r/wAAGAW';
                } else if (plan.paypalPlanId === 'pro-boost') {
                  window.location.href = 'https://tally.so/r/w58D8P';
                }
              },
              onError: (err: any) => {
                console.error('Payment error:', err);
                alert('Payment failed. Please try again.');
              }
            }).render(`#paypal-button-${plan.paypalPlanId}`);
          }
        }
      });
    };

    document.body.appendChild(script);

    return () => {
      const script = document.querySelector('script[src*="paypal"]');
      if (script) {
        script.remove();
      }
    };
  }, [theme]);

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
              {plan.paypalPlanId ? (
                <div 
                  id={`paypal-button-${plan.paypalPlanId}`} 
                  className="mt-4 paypal-button-container"
                  style={{ minHeight: '45px' }}
                />
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