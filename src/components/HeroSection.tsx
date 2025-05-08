
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hero-gradient text-white py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Automated CI/CD Pipelines Made Simple
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg">
              Streamline your deployment workflows with our powerful Jenkins and Docker integration platform. Deploy faster, with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue hover:bg-blue-light text-white">
                Start For Free
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
            <div className="pt-6">
              <p className="text-gray-300 text-sm">Trusted by engineering teams at:</p>
              <div className="flex flex-wrap items-center gap-8 mt-4">
                <div className="text-gray-300 font-semibold">Acme Inc</div>
                <div className="text-gray-300 font-semibold">TechCorp</div>
                <div className="text-gray-300 font-semibold">DevSystems</div>
                <div className="text-gray-300 font-semibold">BuildFast</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-navy-light p-6 rounded-lg border border-blue/20 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-300">pipeline.yaml</div>
              </div>
              <pre className="text-xs md:text-sm text-gray-300 overflow-x-auto">
                <code>{`version: '2.1'
pipeline:
  build:
    docker:
      - image: node:16
    steps:
      - checkout
      - run: npm install
      - run: npm test
  
  deploy:
    docker:
      - image: jenkins-agent:latest
    steps:
      - checkout
      - setup_remote_docker
      - run:
          name: Build and push Docker image
          command: |
            docker build -t myapp:$VERSION .
            docker push myapp:$VERSION
      
      - run:
          name: Deploy to production
          command: |
            jenkins-cli deploy \
              --env=production \
              --version=$VERSION \
              --notify=slack`}</code>
              </pre>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-success text-white text-sm px-4 py-2 rounded-md shadow-lg">
              Deployment successful!
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
