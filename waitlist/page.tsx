import WaitlistHero from '@/components/waitlist/Hero'
import HowItWorks from '@/components/waitlist/HowItWorks'
import DemoStrip from '@/components/waitlist/DemoStrip'
import Features from '@/components/waitlist/Features'
import WaitlistForm from '@/components/waitlist/WaitlistForm'
import Footer from '@/components/waitlist/Footer'

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <WaitlistHero />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Visual Demo Strip */}
      <DemoStrip />
      
      {/* Features Section */}
      <Features />
      
      {/* Waitlist Form */}
      <WaitlistForm />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
