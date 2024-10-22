import { FaFacebook , FaTwitter,FaInstagram, FaLinkedinIn  } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface IFooterProps {
    className? : string
}

export default function Footer({className} : IFooterProps) {
  return (
    <footer className={cn("bg-muted text-muted-foreground",className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/properties" className="hover:text-primary">Properties</Link></li>
              <li><Link href="/agents" className="hover:text-primary">Our Agents</Link></li>
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li><Link href="/properties/residential" className="hover:text-primary">Residential</Link></li>
              <li><Link href="/properties/commercial" className="hover:text-primary">Commercial</Link></li>
              <li><Link href="/properties/industrial" className="hover:text-primary">Industrial</Link></li>
              <li><Link href="/properties/land" className="hover:text-primary">Land</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p>123 Property Street</p>
            <p>Real Estate City, RE 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@propertywebsite.com</p>
          </div>
        
          {/* <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="mb-2">Stay updated with our latest properties and news</p>
            <form className="space-y-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit" className="w-full">Subscribe</Button>
            </form>
          </div> */}
        
        </div>

        <div className="mt-8 pt-8 border-t border-muted-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Property Website. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-primary">
                <FaFacebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-primary">
                <FaTwitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-primary">
                <FaInstagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-primary">
                <FaLinkedinIn className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}