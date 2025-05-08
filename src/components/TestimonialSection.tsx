
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
}

const TestimonialSection = () => {
  const testimonials: Testimonial[] = [
    {
      content: "Deploy-It-Now has transformed how our team handles deployments. What used to take us days now happens in minutes with complete confidence.",
      author: "Sarah Johnson",
      role: "DevOps Lead",
      company: "TechCorp"
    },
    {
      content: "The Jenkins and Docker integration is seamless. We've reduced our deployment failures by 87% since adopting this platform.",
      author: "Michael Chen",
      role: "CTO",
      company: "StartupScale"
    },
    {
      content: "Our CI/CD process was a mess before Deploy-It-Now. Now we have standardized pipelines across all projects and teams.",
      author: "Alex Rodriguez",
      role: "Engineering Manager",
      company: "Enterprise Solutions"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by DevOps Teams</h2>
          <p className="text-muted-foreground text-lg">
            See what engineering teams are saying about our CI/CD automation platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="pt-6">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-lg mb-6">"{testimonial.content}"</blockquote>
                
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
