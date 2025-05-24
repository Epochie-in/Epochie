import Link from "next/link"
import Image from "next/image"
import { Twitter, Github, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="blue-gradient border-t border-gray-800">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/placeholder.svg?height=30&width=30"
                alt="x.ai logo"
                width={30}
                height={30}
                className="invert"
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Building advanced AI systems that augment human capabilities and push the boundaries of what's possible.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/grok" className="text-gray-400 hover:text-white">
                  Grok
                </Link>
              </li>
              <li>
                <Link href="/colossus" className="text-gray-400 hover:text-white">
                  Colossus
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-400 hover:text-white">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/company" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white">
                  News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-400 hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center md:flex md:items-center md:justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} x.ai Corporation. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
