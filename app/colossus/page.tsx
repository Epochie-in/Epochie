import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, Database, Lock, Server } from "lucide-react"

export default function ColossusPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header section */}
      <section className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            Colossus
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Our next-generation AI infrastructure platform designed for unprecedented scale and performance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
              Request Access
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-gray-700 text-white hover:bg-gray-800 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Overview section */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powering the Future of AI</h2>
            <p className="text-gray-300 text-lg mb-6">
              Colossus is our custom-built infrastructure designed specifically for training and running the most
              advanced AI models at scale.
            </p>
            <p className="text-gray-300 text-lg mb-6">
              With unprecedented computational efficiency and optimized hardware-software integration, Colossus enables
              breakthroughs in AI capabilities that weren't possible before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button variant="outline" className="rounded-full border-gray-700 text-white hover:bg-gray-800">
                Technical Specifications <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
            <div className="aspect-square rounded-xl bg-black/50 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Colossus infrastructure"
                width={400}
                height={400}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Cpu className="h-8 w-8 mb-4" />,
              title: "Custom Silicon",
              description: "Purpose-built AI accelerators designed for maximum performance and efficiency.",
            },
            {
              icon: <Server className="h-8 w-8 mb-4" />,
              title: "Distributed Computing",
              description: "Seamlessly scale across thousands of nodes for massive parallel processing.",
            },
            {
              icon: <Database className="h-8 w-8 mb-4" />,
              title: "Optimized Data Pipeline",
              description: "High-throughput data processing designed for training on massive datasets.",
            },
            {
              icon: <Lock className="h-8 w-8 mb-4" />,
              title: "Enterprise Security",
              description: "Built-in security features for safe and compliant AI development.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors"
            >
              {feature.icon}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Performance section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Unmatched Performance</h2>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { metric: "10x", description: "Training Speed" },
                { metric: "80%", description: "Energy Reduction" },
                { metric: "5x", description: "Model Size Capacity" },
                { metric: "99.99%", description: "Uptime" },
              ].map((stat, index) => (
                <div key={index} className="p-4">
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                    {stat.metric}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use cases section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Use Cases</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Large-Scale Model Training",
              description: "Train foundation models with trillions of parameters efficiently.",
            },
            {
              title: "Real-time Inference",
              description: "Deploy models with millisecond response times for critical applications.",
            },
            {
              title: "Research & Development",
              description: "Accelerate AI research with rapid experimentation and iteration.",
            },
          ].map((useCase, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
              <p className="text-gray-400">{useCase.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to scale your AI capabilities?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Contact our team to learn how Colossus can transform your AI infrastructure.
          </p>
          <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
            Contact Sales
          </Button>
        </div>
      </section>
    </div>
  )
}
