
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-navy text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Automate Your Deployments?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of teams that have streamlined their CI/CD pipelines with our Jenkins and Docker integration platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-blue hover:bg-blue-light">
              Get Started For Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Schedule a Demo
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-gray-400">
            No credit card required. Free plan includes 5 pipelines and 100 builds per month.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
