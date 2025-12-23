import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Quote, Play, X, Heart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
interface Testimonial {
  id: number;
  coupleName: string;
  shortQuote: string;
  fullQuote: string;
  eventDate: string;
  eventType: string;
  youtubeId: string;
  location?: string;
}
const testimonials: Testimonial[] = [{
  id: 1,
  coupleName: "Sahan & Nethmi",
  shortQuote: "Every emotion, every laugh, every tear—perfectly captured.",
  fullQuote: "We were blown away by the final film. It captured every emotion, every laugh, every tear. Watching it brings us right back to that magical day. The team was incredibly professional and made us feel so comfortable throughout the entire process. From the initial consultation to the final delivery, everything was seamless. We couldn't have asked for a better experience. The cinematography was absolutely stunning, and the way they told our story was beyond anything we could have imagined.",
  eventDate: "March 2024",
  eventType: "Wedding",
  youtubeId: "EfD3jBkdvZs",
  location: "Colombo, Sri Lanka"
}, {
  id: 2,
  coupleName: "Kasun & Dilini",
  shortQuote: "Professional, creative, and made us feel so comfortable.",
  fullQuote: "From the very first meeting, we knew we were in great hands. The team was professional, creative, and made us feel so comfortable. Their attention to detail was remarkable, and they captured moments we didn't even know happened. The pre-wedding shoot was an incredible experience - they knew exactly how to guide us to get the most natural and beautiful shots.",
  eventDate: "February 2024",
  eventType: "Pre-Wedding",
  youtubeId: "JxeMUuvda9A",
  location: "Galle, Sri Lanka"
}, {
  id: 3,
  coupleName: "Ravindu & Sachini",
  shortQuote: "A film that felt like US—stunning cinematography.",
  fullQuote: "Serenity Wedding Films understood exactly what we wanted—a film that felt like US. The cinematography was stunning and exceeded our expectations. They have an incredible ability to capture raw emotions and genuine moments. Every time we watch our wedding film, we're transported back to that magical day.",
  eventDate: "January 2024",
  eventType: "Wedding",
  youtubeId: "co_WYnhlhi0",
  location: "Kandy, Sri Lanka"
}, {
  id: 4,
  coupleName: "Dinesh & Malsha",
  shortQuote: "Our families still talk about how beautiful the film was.",
  fullQuote: "Our families still talk about how beautiful the film was. Every detail of our traditional homecoming was captured with such care and artistry. The team was respectful of our traditions and customs while still creating a modern, cinematic masterpiece. They managed to capture the essence of our Sri Lankan heritage beautifully.",
  eventDate: "December 2023",
  eventType: "Homecoming",
  youtubeId: "EfD3jBkdvZs",
  location: "Negombo, Sri Lanka"
}, {
  id: 5,
  coupleName: "Tharindu & Ishara",
  shortQuote: "The 4K quality is incredible—you can see every detail.",
  fullQuote: "The 4K quality is incredible—you can see every detail. But more than that, they captured the FEELING of our day perfectly. The technical quality combined with their storytelling ability is unmatched. We were hesitant about having cameras around all day, but the team was so discreet that we often forgot they were there.",
  eventDate: "November 2023",
  eventType: "Wedding",
  youtubeId: "JxeMUuvda9A",
  location: "Bentota, Sri Lanka"
}, {
  id: 6,
  coupleName: "Nuwan & Sanduni",
  shortQuote: "Every frame tells our story with attention to detail.",
  fullQuote: "Every frame tells our story. The attention to detail and the creative vision exceeded everything we hoped for. From the first consultation to the final delivery, the experience was nothing short of magical. They understood our vision perfectly and translated it into a cinematic masterpiece.",
  eventDate: "October 2023",
  eventType: "Wedding",
  youtubeId: "co_WYnhlhi0",
  location: "Colombo, Sri Lanka"
}];
const TestimonialsPage = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  return <>
      <Helmet>
        <title>Client Testimonials | Serenity Wedding Films</title>
        <meta name="description" content="Watch heartfelt testimonials from our couples. Real stories, real emotions captured in cinematic reels." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-charcoal">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream/5 via-charcoal to-charcoal" />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cream/3 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cream/2 rounded-full blur-3xl" />
          </div>

          {/* Film Grain */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }} />

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div initial={{
            scaleX: 0
          }} animate={{
            scaleX: 1
          }} transition={{
            duration: 1,
            delay: 0.2
          }} className="w-20 h-px bg-gradient-to-r from-transparent via-cream/50 to-transparent mx-auto mb-8" />

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="flex justify-center mb-6">
              <Heart className="w-6 h-6 text-cream/40" />
            </motion.div>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="text-cream/50 text-xs tracking-[0.3em] uppercase mb-4">
              Words from Our Couples
            </motion.p>

            <motion.h1 initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.5
          }} className="text-5xl md:text-6xl lg:text-7xl font-serif text-cream mb-6">
              Love Stories
              <span className="block font-script text-4xl md:text-5xl lg:text-6xl text-cream/70 mt-2">
                Told by You
              </span>
            </motion.h1>

            <motion.p initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.8,
            delay: 0.7
          }} className="text-cream/50 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Real moments, genuine emotions, and heartfelt words from the couples 
              who trusted us to capture their most precious day
            </motion.p>

            <motion.div initial={{
            scaleX: 0
          }} animate={{
            scaleX: 1
          }} transition={{
            duration: 1,
            delay: 0.9
          }} className="w-20 h-px bg-gradient-to-r from-transparent via-cream/50 to-transparent mx-auto mt-8" />
          </div>

          {/* Scroll Indicator */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1.2,
          duration: 0.8
        }} className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <motion.div animate={{
            y: [0, 6, 0]
          }} transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}>
              <ChevronDown className="w-5 h-5 text-cream/30" />
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials Reel Grid */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <p className="text-cream/40 text-xs tracking-[0.2em] uppercase mb-3">
                Watch Their Stories
              </p>
              <h2 className="text-3xl font-serif text-cream text-center md:text-5xl">Testimonial</h2>
            </motion.div>

            {/* Reels Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {testimonials.map((testimonial, index) => <motion.div key={testimonial.id} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.5,
              delay: index * 0.08
            }} className="group">
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-charcoal/80 border border-cream/10 shadow-xl transition-all duration-500 group-hover:border-cream/30 group-hover:shadow-2xl group-hover:shadow-cream/5 group-hover:-translate-y-1">
                    {/* Video/Thumbnail */}
                    {playingId === testimonial.id ? <iframe src={`https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=1&loop=1&playlist=${testimonial.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0`} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={`${testimonial.coupleName} testimonial`} /> : <>
                        {/* Thumbnail */}
                        <img src={`https://img.youtube.com/vi/${testimonial.youtubeId}/maxresdefault.jpg`} alt={testimonial.coupleName} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80" />

                        {/* Play Button */}
                        <button onClick={() => setPlayingId(testimonial.id)} className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                            <Play className="w-5 h-5 md:w-6 md:h-6 text-cream fill-cream/50 ml-0.5" />
                          </div>
                        </button>
                      </>}

                    {/* Top Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2 py-1 bg-charcoal/60 backdrop-blur-sm rounded-full text-cream/70 text-[9px] tracking-wider uppercase">
                        {testimonial.eventType}
                      </span>
                      <Quote className="w-4 h-4 text-cream/30 rotate-180" />
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 cursor-pointer" onClick={() => setSelectedTestimonial(testimonial)}>
                      {/* Quote Preview */}
                      <p className="text-cream/80 text-[10px] md:text-xs leading-relaxed mb-3 line-clamp-2 italic">
                        "{testimonial.shortQuote}"
                      </p>

                      {/* Couple Info */}
                      <div className="flex items-end justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-cream font-serif text-xs md:text-sm truncate">
                            {testimonial.coupleName}
                          </h3>
                          <p className="text-cream/40 text-[9px] tracking-wide">
                            {testimonial.eventDate}
                          </p>
                        </div>

                        <ArrowRight className="w-3 h-3 text-cream/40 flex-shrink-0 group-hover:text-cream/70 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-cream/5 to-charcoal" />
          
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <Quote className="w-12 h-12 text-cream/20 rotate-180 mx-auto mb-8" />
            <p className="text-cream/70 text-lg md:text-xl lg:text-2xl font-serif leading-relaxed italic">
              "Every love story is beautiful, but yours should be told in a way 
              that makes you feel every moment again and again."
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-cream/20" />
              <span className="text-cream/40 text-xs tracking-[0.2em] uppercase">
                Serenity Films
              </span>
              <div className="w-12 h-px bg-cream/20" />
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-cream mb-4">
              Share Your Story
            </h2>
            <p className="text-cream/50 text-sm md:text-base mb-8 max-w-lg mx-auto">
              Let us capture the beautiful moments of your special day and create 
              a film you'll treasure forever
            </p>
            <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-cream text-charcoal font-medium tracking-wide hover:bg-cream/90 transition-all duration-300 group rounded-sm">
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Full Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/95 backdrop-blur-md" onClick={() => setSelectedTestimonial(null)}>
            <motion.div initial={{
          opacity: 0,
          scale: 0.9,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.9,
          y: 20
        }} transition={{
          duration: 0.3
        }} className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl" onClick={e => e.stopPropagation()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-gradient-to-br from-cream/8 to-cream/4 border border-cream/10">
                {/* Video Side */}
                <div className="relative aspect-[9/16] md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px] bg-charcoal">
                  <iframe src={`https://www.youtube.com/embed/${selectedTestimonial.youtubeId}?autoplay=0&controls=1&modestbranding=1&rel=0`} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={`${selectedTestimonial.coupleName} testimonial`} />
                </div>

                {/* Content Side */}
                <div className="p-6 md:p-10 flex flex-col justify-center max-h-[50vh] md:max-h-none overflow-y-auto">
                  {/* Close Button */}
                  <button onClick={() => setSelectedTestimonial(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-charcoal/80 border border-cream/20 flex items-center justify-center hover:bg-charcoal transition-colors z-10">
                    <X className="w-5 h-5 text-cream" />
                  </button>

                  <Quote className="w-8 h-8 text-cream/20 rotate-180 mb-4" />

                  <h3 className="text-2xl md:text-3xl font-script text-cream mb-2">
                    {selectedTestimonial.coupleName}
                  </h3>

                  <p className="text-cream/40 text-xs tracking-widest uppercase mb-6">
                    {selectedTestimonial.eventType} • {selectedTestimonial.eventDate}
                    {selectedTestimonial.location && ` • ${selectedTestimonial.location}`}
                  </p>

                  <p className="text-cream/70 text-sm md:text-base leading-relaxed">
                    {selectedTestimonial.fullQuote}
                  </p>

                  <div className="mt-8 pt-6 border-t border-cream/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-cream/50" />
                    </div>
                    <div>
                      <p className="text-cream/50 text-xs">With love,</p>
                      <p className="text-cream font-serif text-sm">
                        {selectedTestimonial.coupleName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default TestimonialsPage;