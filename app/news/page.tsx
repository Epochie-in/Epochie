import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header section */}
      <section className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            Latest News
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Stay updated with the latest announcements, research breakthroughs, and company news from x.ai.
          </p>
        </div>
      </section>

      {/* Featured news section */}
      <section className="container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Featured news"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-2">March 15, 2025</div>
            <h2 className="text-3xl font-bold mb-4">Introducing Grok 3: Our Most Advanced AI Model Yet</h2>
            <p className="text-gray-300 mb-6">
              Today, we're thrilled to announce the release of Grok 3, our most advanced AI model to date. With improved
              reasoning capabilities and extensive pretraining knowledge, Grok 3 represents a significant leap forward
              in AI technology.
            </p>
            <Button className="rounded-full bg-white text-black hover:bg-gray-200">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* News grid section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Recent Updates</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((article) => (
            <div
              key={article}
              className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors"
            >
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt={`News article ${article}`}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-gray-400 mb-2">February 28, 2025</div>
                <h3 className="text-xl font-bold mb-3">x.ai Partners with Leading Research Institutions</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  We're excited to announce new partnerships with top research institutions to advance the field of
                  artificial intelligence and promote responsible AI development.
                </p>
                <Link href="#" className="text-white font-medium hover:underline inline-flex items-center">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" className="rounded-full border-gray-700 text-white hover:bg-gray-800">
            Load More
          </Button>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300">
              Subscribe to our newsletter to receive the latest news and updates from x.ai.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-black/50 border-gray-700 rounded-full py-6 px-6"
            />
            <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-6 py-6">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Press section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Press Coverage</h2>
        <div className="grid gap-6">
          {[
            { source: "TechCrunch", title: "x.ai Unveils Groundbreaking AI Infrastructure", date: "March 10, 2025" },
            { source: "The Verge", title: "How x.ai is Revolutionizing Conversational AI", date: "March 5, 2025" },
            {
              source: "MIT Technology Review",
              title: "The Science Behind Grok: x.ai's Latest Innovation",
              date: "February 28, 2025",
            },
            {
              source: "Wired",
              title: "Inside x.ai's Ambitious Vision for the Future of AI",
              date: "February 20, 2025",
            },
          ].map((press, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-400 mb-1">{press.source}</div>
                  <h3 className="text-xl font-bold">{press.title}</h3>
                </div>
                <div className="text-sm text-gray-400">{press.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
