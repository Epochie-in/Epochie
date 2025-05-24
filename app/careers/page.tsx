import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header section */}
      <section className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Help us build the future of artificial intelligence and solve some of the most challenging problems in
            technology.
          </p>
          <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
            View Open Positions
          </Button>
        </div>
      </section>

      {/* Why join section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Join x.ai?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Cutting-Edge Technology",
              description:
                "Work on the most advanced AI systems in the world and push the boundaries of what's possible.",
            },
            {
              title: "World-Class Team",
              description: "Collaborate with some of the brightest minds in AI, engineering, and product development.",
            },
            {
              title: "Meaningful Impact",
              description: "Build technology that will shape the future and positively impact billions of people.",
            },
            {
              title: "Growth & Learning",
              description:
                "Continuous opportunities to learn, grow, and develop your skills in a supportive environment.",
            },
            {
              title: "Competitive Benefits",
              description:
                "Comprehensive health coverage, equity packages, and perks designed to support your wellbeing.",
            },
            {
              title: "Flexible Work",
              description: "Options for remote work and flexible schedules to help you do your best work.",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open positions section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Open Positions</h2>

          <div className="mb-8 relative">
            <Input
              type="search"
              placeholder="Search positions..."
              className="bg-black/50 border-gray-700 rounded-full py-6 pl-12"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">Senior AI Research Scientist</h3>
                  <p className="text-gray-400 mb-4">San Francisco, CA or Remote</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">Full-time</span>
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">Research</span>
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">AI</span>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full border-gray-700 text-white hover:bg-gray-800">
                  Apply
                </Button>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">Machine Learning Engineer</h3>
                  <p className="text-gray-400 mb-4">San Francisco, CA or Remote</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">Full-time</span>
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">Engineering</span>
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">ML</span>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full border-gray-700 text-white hover:bg-gray-800">
                  Apply
                </Button>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">Full Stack Engineer</h3>
                  <p className="text-gray-400 mb-4">San Francisco, CA or Remote</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">Full-time</span>
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">Engineering</span>
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">Web</span>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full border-gray-700 text-white hover:bg-gray-800">
                  Apply
                </Button>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">Product Designer</h3>
                  <p className="text-gray-400 mb-4">San Francisco, CA or Remote</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">Full-time</span>
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">Design</span>
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">UX/UI</span>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full border-gray-700 text-white hover:bg-gray-800">
                  Apply
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
              View All Positions
            </Button>
          </div>
        </div>
      </section>

      {/* Application process section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Hiring Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Application Review", description: "Our team reviews your application and resume." },
              {
                step: "02",
                title: "Initial Interview",
                description: "A conversation to learn more about you and your experience.",
              },
              {
                step: "03",
                title: "Technical Assessment",
                description: "A challenge related to the role you're applying for.",
              },
              { step: "04", title: "Final Interviews", description: "Meet with team members and leadership." },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-500 mb-2">{process.step}</div>
                <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                <p className="text-gray-400">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't see a role that fits?</h2>
          <p className="text-gray-300 text-lg mb-8">
            We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future
            opportunities.
          </p>
          <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
            Submit Your Resume
          </Button>
        </div>
      </section>
    </div>
  )
}
