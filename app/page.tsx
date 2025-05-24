import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-black relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-amber-500/20 via-transparent to-transparent opacity-40"></div>

      {/* Main content */}
      <div className="container mx-auto flex flex-col items-center justify-center h-[calc(100vh-200px)] relative z-10 pt-16">
        <div className="text-center mb-16">
          <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-700">
            Epochie
          </h1>
        </div>

        <div className="text-center max-w-2xl px-4 sm:px-0">
          <p className="text-gray-300 mb-8 text-sm sm:text-base">
            We are thrilled to unveil Grok 3, our most advanced model yet,
            <br className="hidden sm:block" />
            blending superior reasoning with extensive pretraining knowledge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" className="rounded-full border-gray-700 text-white hover:bg-gray-800 px-6">
              BUILD WITH GROK
            </Button>
            <Button variant="outline" className="rounded-full border-gray-700 text-white hover:bg-gray-800 px-6">
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 animate-bounce">
        <ArrowDown className="h-6 w-6" />
      </div>

      {/* Our Products section */}
      <section className="bg-black py-24 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            Our Products
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Grok AI */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="aspect-square rounded-xl bg-black/50 flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Grok AI"
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Grok AI</h3>
              <p className="text-gray-400 mb-6">
                Our flagship AI assistant that combines intelligence with wit, designed to answer questions with a touch
                of humor and personality.
              </p>
              <Link href="/grok" className="text-white font-medium hover:underline inline-flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Colossus */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="aspect-square rounded-xl bg-black/50 flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Colossus"
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Colossus</h3>
              <p className="text-gray-400 mb-6">
                Our next-generation AI infrastructure platform designed for unprecedented scale and performance for
                enterprise needs.
              </p>
              <Link href="/colossus" className="text-white font-medium hover:underline inline-flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* API */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="aspect-square rounded-xl bg-black/50 flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="API"
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Grok API</h3>
              <p className="text-gray-400 mb-6">
                Integrate Grok's powerful AI capabilities into your applications with our simple and flexible API for
                developers.
              </p>
              <Link href="/api" className="text-white font-medium hover:underline inline-flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="blue-gradient-middle py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            Capabilities
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced Reasoning",
                description:
                  "Grok excels at complex problem-solving, logical reasoning, and analytical thinking across diverse domains.",
              },
              {
                title: "Real-time Knowledge",
                description:
                  "With access to the latest information, Grok provides up-to-date answers on current events and developments.",
              },
              {
                title: "Creative Content",
                description:
                  "From writing stories to generating marketing copy, Grok helps you create engaging content with personality.",
              },
              {
                title: "Code Generation",
                description:
                  "Grok can write, explain, and debug code across multiple programming languages with precision.",
              },
              {
                title: "Conversational AI",
                description:
                  "Natural, engaging conversations with a touch of humor and personality make interactions more enjoyable.",
              },
              {
                title: "Multimodal Understanding",
                description:
                  "Grok can process and understand text, images, and structured data for comprehensive analysis.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-colors"
              >
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases section */}
      <section className="bg-black py-24 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            Use Cases
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
              <div className="aspect-video rounded-xl bg-black/50 flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Research and learning"
                  width={500}
                  height={300}
                  className="rounded-xl"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Research & Learning</h3>
              <p className="text-gray-400 mb-6">
                Accelerate your research process and deepen your understanding with Grok's ability to analyze complex
                topics, summarize research papers, and explain difficult concepts in simple terms.
              </p>
              <Link href="/grok" className="text-white font-medium hover:underline inline-flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
              <div className="aspect-video rounded-xl bg-black/50 flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Content creation"
                  width={500}
                  height={300}
                  className="rounded-xl"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Content Creation</h3>
              <p className="text-gray-400 mb-6">
                From drafting blog posts to generating marketing copy, Grok helps you create engaging content with
                personality. Get inspiration, overcome writer's block, and refine your ideas with intelligent
                suggestions.
              </p>
              <Link href="/grok" className="text-white font-medium hover:underline inline-flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
