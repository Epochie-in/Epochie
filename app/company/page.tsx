import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header section */}
      <section className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            About x.ai
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            We're building advanced AI systems that augment human capabilities and push the boundaries of what's
            possible.
          </p>
        </div>
      </section>

      {/* Mission section */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
            <div className="aspect-video rounded-xl bg-black/50 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="x.ai mission"
                width={500}
                height={300}
                className="rounded-xl"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg mb-6">
              At x.ai, we're on a mission to build artificial general intelligence (AGI) that benefits humanity. We
              believe AI should be developed in a way that is safe, beneficial, and accessible to everyone.
            </p>
            <p className="text-gray-300 text-lg">
              Our team of researchers, engineers, and designers are working at the cutting edge of AI to create systems
              that can understand, learn, and reason like humans.
            </p>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              description: "We push the boundaries of what's possible, constantly exploring new ideas and approaches.",
            },
            {
              title: "Transparency",
              description:
                "We believe in being open about our work, sharing our progress and challenges with the world.",
            },
            {
              title: "Responsibility",
              description: "We develop AI with careful consideration of its impact on society and individuals.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Leadership Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((member) => (
            <div
              key={member}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <div className="mb-4 rounded-full overflow-hidden w-24 h-24 mx-auto">
                <Image
                  src="/placeholder.svg?height=96&width=96"
                  alt={`Team member ${member}`}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-center">Executive Name</h3>
              <p className="text-gray-400 text-center mb-4">Chief Technology Officer</p>
              <p className="text-gray-500 text-sm text-center">
                Previously at leading AI research labs with expertise in machine learning and neural networks.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Join us section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-gray-300 text-lg mb-8">
            We're looking for talented individuals who are passionate about AI and want to make a difference.
          </p>
          <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
            View Open Positions
          </Button>
        </div>
      </section>
    </div>
  )
}
