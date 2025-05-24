import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function GrokPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header section */}
      <section className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            Meet Epochie
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            An AI assistant that combines intelligence designed to answer questions with a touch of humor and
            personality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">Try Epochie Products</Button>
            <Button
              variant="outline"
              className="rounded-full border-gray-700 text-white hover:bg-gray-800 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="blue-gradient-middle py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Real-time knowledge</h2>
              <p className="text-gray-300 text-lg mb-6">
                Epochie has access to real-time information via the web, allowing it to provide up-to-date answers on
                current events, recent developments, and the latest news.
              </p>
              <ul className="space-y-4">
                {["Current events awareness", "Web browsing capabilities", "Data analysis", "Continuous learning"].map(
                  (feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                      <span>{feature}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
              <div className="aspect-square rounded-xl bg-black/50 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Grok AI visualization"
                  width={400}
                  height={400}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities section */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Epochie Capabilities</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Advanced Voice Cloning",
              description: "Creates realistic voice clones for personalized interactions.",
              
            },
            {
              title: "Lip Syncing",
              description: "Synchronizes lip movements with audio for realistic video generation.",
            },
            {
              title: "Code Generation",
              description: "Writes and explains code in multiple programming languages.",
            },
          ].map((capability, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
              <p className="text-gray-400">{capability.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="blue-gradient-top-fade py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to experience Epochie?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of users already leveraging Epochie's capabilities for work, learning, and creativity.
            </p>
            <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
