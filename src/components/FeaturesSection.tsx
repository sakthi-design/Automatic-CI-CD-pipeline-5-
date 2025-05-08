
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Package, Server } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Server className="h-8 w-8 text-blue" />,
      title: "Jenkins Integration",
      description: "Seamlessly connect to your existing Jenkins instances with our ready-to-use integration. Configure jobs, monitor builds, and deploy with ease."
    },
    {
      icon: <Package className="h-8 w-8 text-blue" />,
      title: "Docker Workflows",
      description: "Build, test, and deploy containerized applications with our Docker workflow templates. Ensure consistency across all environments."
    },
    {
      icon: <Code className="h-8 w-8 text-blue" />,
      title: "Pipeline as Code",
      description: "Define your entire CI/CD pipeline in code. Version-controlled, reviewable, and repeatable deployment processes for your team."
    },
    {
      icon: <Database className="h-8 w-8 text-blue" />,
      title: "Artifact Management",
      description: "Store, version, and distribute your build artifacts with our integrated repository. Keep track of every version of your applications."
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features to Streamline Your CI/CD</h2>
          <p className="text-muted-foreground text-lg">
            Our platform offers everything you need to build, test, and deploy your applications with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover border-border">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/70">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
