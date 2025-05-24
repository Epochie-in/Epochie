import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code } from "lucide-react"

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header section */}
      <section className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            Grok API
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Integrate Grok's powerful AI capabilities into your applications with our simple and flexible API.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
              Get API Key
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-gray-700 text-white hover:bg-gray-800 px-8 py-6 text-lg"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* API Examples section */}
      <section className="blue-gradient-middle py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10">Quick Start Examples</h2>

          <Tabs defaultValue="javascript" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            <TabsContent value="javascript" className="rounded-xl bg-gray-900 p-6 border border-gray-800">
              <pre className="text-gray-300 overflow-x-auto">
                <code>{`import { GrokAI } from '@x.ai/grok-sdk';

// Initialize the client
const grok = new GrokAI({
  apiKey: process.env.GROK_API_KEY
});

// Generate a response
async function generateResponse() {
  const response = await grok.complete({
    prompt: "Explain quantum computing in simple terms",
    max_tokens: 150
  });
  
  console.log(response.text);
}

generateResponse();`}</code>
              </pre>
            </TabsContent>
            <TabsContent value="python" className="rounded-xl bg-gray-900 p-6 border border-gray-800">
              <pre className="text-gray-300 overflow-x-auto">
                <code>{`import os
from xai import GrokAI

# Initialize the client
grok = GrokAI(api_key=os.environ["GROK_API_KEY"])

# Generate a response
response = grok.complete(
    prompt="Explain quantum computing in simple terms",
    max_tokens=150
)

print(response.text)`}</code>
              </pre>
            </TabsContent>
            <TabsContent value="curl" className="rounded-xl bg-gray-900 p-6 border border-gray-800">
              <pre className="text-gray-300 overflow-x-auto">
                <code>{`curl https://api.x.ai/v1/complete \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $GROK_API_KEY" \\
  -d '{
    "prompt": "Explain quantum computing in simple terms",
    "max_tokens": 150
  }'`}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* API Features section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-10">API Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Text Generation",
              description:
                "Generate human-like text for various applications including content creation, chatbots, and more.",
            },
            {
              title: "Code Completion",
              description: "Get intelligent code suggestions and completions across multiple programming languages.",
            },
            {
              title: "Data Analysis",
              description: "Extract insights from data with natural language queries and get structured responses.",
            },
            {
              title: "Knowledge Retrieval",
              description: "Access Grok's extensive knowledge base to answer questions on a wide range of topics.",
            },
            {
              title: "Customization",
              description: "Fine-tune responses to match your specific use case and brand voice.",
            },
            {
              title: "Real-time Processing",
              description: "Get fast responses with low latency for real-time applications.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing section */}
      <section className="blue-gradient-top-fade py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-10">
            <h2 className="text-3xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-gray-300 text-lg mb-8">
              Pay only for what you use with our token-based pricing model. No hidden fees or complicated tiers.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">Grok-3</h3>
                <p className="text-3xl font-bold mb-4">
                  $0.0010 <span className="text-sm text-gray-400">/ 1K tokens</span>
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Most advanced model</li>
                  <li>• Best for complex reasoning</li>
                  <li>• 32K context window</li>
                </ul>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">Grok-2</h3>
                <p className="text-3xl font-bold mb-4">
                  $0.0005 <span className="text-sm text-gray-400">/ 1K tokens</span>
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Balanced performance</li>
                  <li>• Cost-effective</li>
                  <li>• 16K context window</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
                Start Building <Code className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
