import { Header, Footer } from '@/components/layout';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Banner */}
      <section className="relative h-[316px] bg-gray-100 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="relative text-center">
          <h1 className="text-5xl font-medium text-black mb-2">About</h1>
          <div className="flex items-center justify-center gap-2 text-base">
            <span className="font-medium">Home</span>
            <span className="text-black">›</span>
            <span className="font-light">About</span>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#3A3A3A]">
                Crafting Beautiful Spaces Since 1995
              </h2>
              <p className="text-[#666666] text-lg leading-relaxed">
                For over 25 years, Furniro has been transforming houses into homes with our 
                carefully curated collection of premium furniture. We believe that great design 
                should be accessible to everyone, and that your living space should reflect your 
                personal style.
              </p>
              <p className="text-[#666666] text-lg leading-relaxed">
                Our journey began in a small workshop, where skilled craftsmen poured their 
                passion into every piece. Today, we work with artisans from around the world, 
                bringing you unique designs that combine traditional craftsmanship with modern 
                aesthetics.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <h3 className="text-3xl font-bold text-[#B88E2F] mb-2">50K+</h3>
                  <p className="text-[#666666]">Happy Customers</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#B88E2F] mb-2">25+</h3>
                  <p className="text-[#666666]">Years of Experience</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#B88E2F] mb-2">300+</h3>
                  <p className="text-[#666666]">Products Available</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#B88E2F] mb-2">20+</h3>
                  <p className="text-[#666666]">Store Locations</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Our workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#F9F1E7] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3A3A3A] mb-4">Our Values</h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto">
              These core values guide everything we do, from selecting products to serving our customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-semibold text-[#3A3A3A] mb-4">Design Excellence</h3>
              <p className="text-[#666666]">
                We curate only the finest designs that combine beauty with functionality, ensuring 
                every piece enhances your living space.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-semibold text-[#3A3A3A] mb-4">Sustainability</h3>
              <p className="text-[#666666]">
                We're committed to sustainable practices, working with suppliers who share our 
                vision for environmental responsibility.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-2xl font-semibold text-[#3A3A3A] mb-4">Customer First</h3>
              <p className="text-[#666666]">
                Your satisfaction is our priority. From selection to delivery, we ensure a 
                seamless experience at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3A3A3A] mb-4">Meet Our Team</h2>
            <p className="text-[#666666] text-lg max-w-2xl mx-auto">
              Our dedicated team of professionals is here to help you create your perfect space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'John Smith', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Sarah Johnson', role: 'Design Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Michael Chen', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Emily Davis', role: 'Customer Experience', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#3A3A3A] mb-1">{member.name}</h3>
                <p className="text-[#666666]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}