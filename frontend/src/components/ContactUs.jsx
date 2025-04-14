import {
    Phone,
    Mail,
    MapPin,
  } from "lucide-react"; // Lucide icons
  
  export default function ContactUs() {
    return (
      <section id="ContactUs" className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Get In <span className="text-coquelicot">Touch</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Have questions, feedback, or need assistance? We're here to help.
            </p>
          </div>
  
          {/* Contact Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Phone */}
            <div className="bg-neutral-800 p-8 rounded-2xl h-full">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-coquelicot/10 text-coquelicot rounded-lg flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-neutral-100">
                    Phone Support
                  </h4>
                  <p className="text-neutral-400 mb-1">Monday–Friday: 24/7</p>
                  <p className="text-neutral-400 mb-1">Weekends: 9am–6pm</p>
                  <a
                    href="tel:+911234567890"
                    className="text-coquelicot font-medium hover:underline"
                  >
                    +91 123 456 7890
                  </a>
                </div>
              </div>
            </div>
  
            {/* Email */}
            <div className="bg-neutral-800 p-8 rounded-2xl h-full">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-turquoise/10 text-turquoise rounded-lg flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-neutral-100">
                    Email Us
                  </h4>
                  <p className="text-neutral-400 mb-1">Response time: 24 hours</p>
                  <a
                    href="mailto:support@feastify.com"
                    className="text-turquoise font-medium hover:underline"
                  >
                    support@feastify.com
                  </a>
                </div>
              </div>
            </div>
  
            {/* Headquarters */}
            <div className="bg-neutral-800 p-8 rounded-2xl h-full">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-coquelicot/10 text-coquelicot rounded-lg flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-neutral-100">
                    Headquarters
                  </h4>
                  <p className="text-neutral-400 mb-1">123 Food Street</p>
                  <p className="text-neutral-400 mb-1">
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  