import { PHOTOS, SERVICES, PACKAGES, TESTIMONIALS, GALLERY_CATEGORIES, BLOG } from "@/lib/data";
import type { SiteContent } from "@/templates/types";

/* =====================================================================
   The "content box".

   Today it is assembled from the local mock data (lib/data.ts). Later,
   this is the ONE function to swap so it returns content fetched from
   the backend (SiteContent JSON, by domain) — templates won't change.
   ===================================================================== */

const HERO_IMGS = [0, 2, 1, 6];
const PORTFOLIO = [0, 2, 3, 4, 6, 7];

export function getSiteContent(): SiteContent {
  return {
    studioName: "Aria Studio",
    currencySymbol: "₹",
    hero: {
      active: true,
      badges: ["Verified studio", "4.9 · 186 clients", "Kolkata · Destination"],
      title: "Photography that feels like the moment, not just a photo.",
      accent: "not just a photo.",
      subtitle:
        "Wedding, pre-wedding, fashion, maternity and brand photography — with private galleries, guided booking, and an AI assistant that answers instantly.",
      primaryLabel: "Check availability",
      primaryHref: "/booking",
      secondaryEnabled: true,
      secondaryLabel: "Ask the AI assistant",
      images: HERO_IMGS.map((i) => PHOTOS[i].src),
      marqueeEnabled: true,
      marqueeImages: [...PHOTOS, ...PHOTOS].map((p) => p.src),
    },
    services: SERVICES.slice(0, 6).map((s, i) => ({
      ...s,
      id: `svc-${i}`,
      photo: PHOTOS[s.img],
      content: `${s.desc} Get in touch to plan your ${s.name.toLowerCase()} shoot — we'll guide you through the whole process from booking to delivery.`,
      images: [PHOTOS[s.img].src, PHOTOS[(s.img + 1) % PHOTOS.length].src, PHOTOS[(s.img + 2) % PHOTOS.length].src],
    })),
    portfolio: PORTFOLIO.map((i) => PHOTOS[i]),
    galleryCategories: GALLERY_CATEGORIES.filter((c) => c !== "All"),
    packages: PACKAGES.map((p, i) => ({
      ...p,
      content: `${p.bestFor}. The ${p.name} package (${p.duration}) includes everything you need — get in touch to tailor it to your day.`,
      images: [PHOTOS[i % PHOTOS.length].src, PHOTOS[(i + 2) % PHOTOS.length].src, PHOTOS[(i + 4) % PHOTOS.length].src],
    })),
    testimonials: TESTIMONIALS,
    sections: {
      services: { active: true, eyebrow: "What we shoot", title: "Featured services", desc: "Pick a service to see packages and start a booking." },
      portfolio: { active: true, eyebrow: "Selected work", title: "Portfolio highlights", desc: "" },
      packages: { active: true, eyebrow: "Packages", title: "Clear pricing, no surprises", desc: "" },
      reviews: { active: true, eyebrow: "Reviews", title: "Loved by recent clients", desc: "" },
    },
    cta: {
      active: true,
      title: "Ready to lock your date?",
      subtitle:
        "Start a booking now, or ask the AI assistant anything about packages, availability and delivery.",
    },
    about: {
      intro: {
        active: true,
        title: "About Aria Studio",
        tagline: "A boutique studio focused on natural, editorial photography.",
        body: "Aria Studio is a boutique photography studio based in Kolkata. We specialize in weddings, pre-weddings, maternity, fashion and brand photography across India. Our goal is simple — to capture your real emotions with creativity, care and perfection.",
        image: PHOTOS[5].src,
        eyebrow: "About Us",
        headlineTop: "We Capture Moments",
        headlineMain: "That Last",
        headlineAccent: "Forever.",
        thumbs: [PHOTOS[1].src, PHOTOS[7].src, PHOTOS[4].src],
        features: [
          { icon: "camera", label: "Natural & Editorial Photography" },
          { icon: "clock", label: "Fast Turnaround & Private Delivery" },
          { icon: "shield", label: "100% Secure Online Gallery" },
          { icon: "headphones", label: "Personalized Consultation" },
        ],
        primaryLabel: "View Portfolio", primaryHref: "/gallery",
        secondaryLabel: "Contact Us", secondaryHref: "/contact",
      },
      stats: {
        active: true,
        items: [
          { label: "Since", value: "2016" },
          { label: "Happy Clients", value: "186+" },
          { label: "Cities Covered", value: "20+" },
          { label: "Projects Completed", value: "1200+" },
          { label: "Google Rating", value: "4.9/5" },
        ],
      },
      journey: {
        active: true, eyebrow: "Our Journey", title: "From Passion to Purpose",
        items: [
          { year: "2016", icon: "rocket", text: "Started as a small team of passionate photographers." },
          { year: "2018", icon: "building", text: "Opened our studio and started serving clients across Kolkata." },
          { year: "2020", icon: "users", text: "Expanded our team and travelled across India for projects." },
          { year: "2023", icon: "camera", text: "Reached 1000+ projects and a 4.9/5 client rating." },
          { year: "2026", icon: "trophy", text: "Continuing our journey to create timeless memories." },
        ],
      },
      team: {
        active: true, eyebrow: "Meet the Team", title: "The People Behind the Lens",
        members: [
          { name: "Prem Kumar", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=400&q=80" },
          { name: "Arjun Das", role: "Lead Photographer", img: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?auto=format&fit=crop&w=400&q=80" },
          { name: "Ananya Bose", role: "Photo Editor", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
          { name: "Rohit Shaw", role: "Cinematographer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
        ],
      },
      behindScenes: {
        active: true, eyebrow: "Behind the Scenes", title: "Where Magic Happens",
        images: [
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
        ],
      },
      whyUs: {
        active: true, eyebrow: "Why Clients Choose Us", title: "The Aria Difference",
        items: [
          { icon: "camera", title: "Creative Storytelling", text: "We don't just take photos, we tell your story through powerful images." },
          { icon: "star", title: "Premium Quality", text: "High-end gear, professional editing and attention to every detail." },
          { icon: "clock", title: "Fast Delivery", text: "Quick turnaround with a smooth and transparent workflow." },
          { icon: "heart", title: "Personalized Experience", text: "Every client is unique. We tailor each shoot to your vision." },
          { icon: "shield", title: "Private & Secure", text: "Your memories are safe with a private gallery and secure delivery." },
        ],
      },
      testimonials: { active: true, eyebrow: "Client Love", title: "What Our Clients Say" },
      cta: {
        active: true,
        heading: "Let's Create Beautiful Memories Together",
        subtitle: "Have a project in mind? Let's talk about how we can bring your vision to life.",
        primaryLabel: "Book a Consultation", primaryHref: "/contact",
        secondaryLabel: "Chat with AI Assistant", secondaryHref: "/contact",
        bgImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80",
      },
    },
    contact: {
      eyebrow: "Get In Touch",
      title: "Let's create something",
      accent: "beautiful together",
      tagline: "Have a question or ready to book your session? We'd love to hear from you.",
      phone: "+91 98300 00000",
      email: "hello@ariastudio.in",
      address: "Park Street, Kolkata",
      note: "Every enquiry creates a CRM lead automatically.",
      phoneSub: "Mon – Sat, 10 AM – 7 PM",
      emailSub: "We reply within 24 hours",
      addressSub: "West Bengal, India",
      detailsHeading: "Get in touch",
      why: [
        { icon: "camera", title: "Customised Solutions", sub: "Tailored to your vision and needs." },
        { icon: "clock", title: "Quick Response", sub: "We respond within 24 hours." },
        { icon: "calendar", title: "Easy Booking", sub: "Hassle-free scheduling." },
        { icon: "heart", title: "Personalised Experience", sub: "We care for every moment." },
      ],
      form: {
        heading: "Send us an enquiry",
        nameLabel: "Full name *", namePh: "Your name",
        phoneLabel: "Phone *", phonePh: "Your phone number",
        emailLabel: "Email *", emailPh: "you@email.com",
        serviceLabel: "Service *", servicePh: "Select a service",
        messageLabel: "Message *", messagePh: "Tell us about your shoot, requirements, date, location or any special request...",
        submit: "Send enquiry",
        privacy: "We respect your privacy. Your information is safe with us.",
      },
      map: { studioName: "High On Innovation Photography Studio", address: "Park Street, Kolkata, West Bengal 700016", directionsLabel: "Get directions", directionsHref: "#" },
      cta: { active: true, heading: "Ready to capture your story?", subtitle: "Book your session today and let's create memories that last forever.", buttonLabel: "Book your session", buttonHref: "/booking" },
    },
    blog: BLOG.map((b) => ({
      title: b.title,
      date: b.date,
      excerpt: b.excerpt,
      image: PHOTOS[b.img].src,
    })),
    header: { tagline: "Photography Studio", bookLabel: "Book now" },
    footer: {
      description:
        "Wedding, pre-wedding, fashion, maternity and brand photography — with private galleries, guided booking, and an AI assistant that answers instantly.",
      brandTagline: "Photography Studio",
      linksTitle: "Explore",
      links: [],
      contactTitle: "Contact",
      showContact: true,
      socialTitle: "Follow us",
      socials: [
        { label: "Instagram", url: "https://instagram.com" },
        { label: "Facebook", url: "https://facebook.com" },
      ],
      copyright: "",
    },

    galleryPage: {
      hero: {
        active: true, eyebrow: "Our Gallery", title: "Gallery",
        subtitle: "A collection of real moments, captured with creativity and passion.",
        stats: [
          { icon: "camera", value: "1200+", label: "Photos" },
          { icon: "star", value: "8+", label: "Years Experience" },
          { icon: "heart", value: "500+", label: "Happy Clients" },
        ],
      },
      features: {
        active: true,
        items: [
          { icon: "camera", title: "Professional Setup", text: "Top of the line cameras and lighting." },
          { icon: "message", title: "Fast Delivery", text: "Quick turnaround with premium quality." },
          { icon: "share", title: "Personalized Service", text: "Every shoot is tailored to your story." },
          { icon: "shield", title: "Secure & Private", text: "Your photos are safe and always private." },
        ],
      },
      cta: { active: true, title: "Have a project in mind?", subtitle: "Let's create something beautiful together.", buttonLabel: "Contact us", buttonHref: "/contact" },
    },

    servicesPage: {
      hero: {
        active: true, title: "Our Services", tagline: "Capturing Moments. Creating Stories.",
        subtitle: "Explore our photography services crafted to preserve your most precious moments with artistry and passion.",
        stats: [
          { icon: "camera", value: "500+", label: "Projects" },
          { icon: "award", value: "8+", label: "Years Exp." },
          { icon: "star", value: "4.9/5", label: "120+ Reviews" },
          { icon: "clock", value: "Same Day", label: "Preview" },
        ],
      },
      featured: { active: true, badge: "Most Popular", serviceId: "", buttonLabel: "View Package Details", buttonHref: "/packages" },
      help: {
        active: true,
        items: [
          { icon: "sparkles", title: "Not sure which package suits you?", text: "Let our AI assistant help you find the perfect photography package.", buttonLabel: "Ask AI Assistant", buttonHref: "#" },
          { icon: "calendar", title: "Need a custom package?", text: "Let's discuss your requirements and create something perfect for you.", buttonLabel: "Book a Consultation", buttonHref: "/contact" },
        ],
      },
      cardButton: { label: "View Packages", href: "/packages" },
    },

    reviewsPage: {
      hero: { active: true, eyebrow: "Client Reviews", title: "Trusted by clients,", accent: "loved for memories.", subtitle: "We don't just take photos, we create experiences. Here's what our amazing clients have to say.", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80" },
      summary: {
        active: true, rating: "4.9", count: "250+ Reviews",
        quote: "Our goal is to make every client feel confident, comfortable and completely in love with their photos.",
        quoteAuthor: "High On Innovation Team",
        breakdown: [{ star: 5, percent: 95 }, { star: 4, percent: 4 }, { star: 3, percent: 1 }, { star: 2, percent: 0 }, { star: 1, percent: 0 }],
      },
      video: {
        active: true, thumbnail: PHOTOS[0].src, name: "Aisha & Rohan", role: "Wedding Photography", duration: "01:32",
        heading: "Client Video Testimonial", subtitle: "Hear directly from our happy clients",
        stats: [{ value: "250+", label: "Happy Clients" }, { value: "4.9", label: "Avg Rating" }, { value: "8+", label: "Years" }, { value: "100%", label: "Would Recommend" }],
      },
      viewMore: { label: "View more reviews", href: "#" },
      photoReviews: {
        active: true, heading: "Photo Reviews", subtitle: "Moments shared by our wonderful clients",
        viewAllLabel: "View all photos", viewAllHref: "#",
        images: [
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1490725263030-1f0521cec8ec?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1519227355453-8f982e425321?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=300&q=80",
        ],
      },
      reviewOn: {
        active: true, heading: "Review us on", subtitle: "Share your experience and help others choose the right photographer.",
        google: { label: "Google Reviews", url: "#" }, facebook: { label: "Facebook Reviews", url: "#" },
      },
      cta: { active: true, heading: "Ready to create your own beautiful memories?", subtitle: "Let's capture your moments that last a lifetime.", buttonLabel: "Book Your Session", buttonHref: "/contact" },
    },

    blogPage: {
      hero: { active: true, eyebrow: "Our Blog", title: "Stories, tips & inspiration for better", accent: "memories", subtitle: "Real stories, practical tips and creative inspiration to help you plan your perfect shoot.", image: "/templates/blog.png" },
      newsletter: { active: true, title: "Stay inspired", subtitle: "Get our latest stories and tips delivered straight to your inbox.", buttonLabel: "Subscribe", placeholder: "Your email address" },
      popular: {
        active: true, heading: "Popular Posts", viewAllLabel: "View all posts", viewAllHref: "/blog",
        items: [
          { title: "What to wear for your maternity shoot", date: "15 Jun 2026", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80", href: "/blog" },
          { title: "Top 10 wedding photography trends in 2026", date: "12 Jun 2026", img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=160&q=80", href: "/blog" },
          { title: "Best camera settings for perfect photos", date: "10 Jun 2026", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=160&q=80", href: "/blog" },
          { title: "Drone photography ideas for weddings", date: "08 Jun 2026", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=160&q=80", href: "/blog" },
        ],
      },
      suggest: { active: true, title: "Have a topic in mind?", subtitle: "Let us know what you'd like to read about next.", buttonLabel: "Suggest a Topic", buttonHref: "/contact" },
    },

    packagesPage: {
      hero: { active: true, eyebrow: "Our Packages", title: "Choose the Perfect Package", subtitle: "Every moment is unique. Pick a package that fits your story and let us create memories that last forever." },
      consultation: { active: true, title: "Not sure which package is right for you?", subtitle: "Let's understand your needs and suggest the perfect package.", buttonLabel: "Book a Free Consultation", buttonHref: "/contact" },
      sectionHeading: { subtitle: "From intimate ceremonies to grand celebrations, we capture every emotion beautifully.", ratingValue: "4.9/5", ratingCount: "(180+ Reviews)" },
      cardButtons: { primaryLabel: "Book this package", secondaryLabel: "View details" },
    },

    commonSections: {
      clients: {
        active: true, pages: ["gallery"], eyebrow: "Our Clients", title: "Trusted by amazing brands & people",
        paragraph: "Proud to work with some of the most inspiring brands and wonderful people.",
        viewAllLabel: "View all clients", viewAllHref: "#",
        logos: ["TATA", "KPMG", "amazon", "wipro", "airtel", "Deloitte."],
      },
      stories: {
        active: true, pages: ["gallery"], eyebrow: "What Our Clients Say", title: "Stories that make us proud",
        paragraph: "Real words from real people who trusted us with their special moments.",
        viewAllLabel: "View all reviews", viewAllHref: "/reviews",
        items: [
          { text: "High On Innovation captured our wedding so beautifully. Every moment was natural and full of emotions. Highly recommended!", name: "Rahul & Priya", role: "Wedding Client", avatar: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=150&q=80", rating: 5 },
          { text: "Professional team, creative ideas and great communication. The photos turned out even better than we imagined!", name: "Ankit Mehra", role: "Corporate Client", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", rating: 5 },
          { text: "Loved the entire experience! They made us feel so comfortable and the pictures are simply timeless.", name: "Sneha Kapoor", role: "Maternity Client", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80", rating: 5 },
        ],
      },
      blog: {
        active: true, pages: ["gallery"], eyebrow: "Latest from Blog", title: "Tips, ideas & inspiration for your next shoot",
        paragraph: "Explore our latest blogs and guides to plan better and create beautiful memories.",
        viewAllLabel: "View all posts", viewAllHref: "/blog",
        items: [
          { title: "Top 10 Pre-Wedding Shoot Locations in India", date: "May 20, 2024", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=300&q=80", href: "/blog" },
          { title: "What to Wear for Your Maternity Shoot", date: "May 15, 2024", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80", href: "/blog" },
          { title: "How to Prepare for Your Wedding Photoshoot", date: "May 10, 2024", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80", href: "/blog" },
        ],
      },
      services: {
        active: true, pages: ["gallery"], eyebrow: "Our Services", title: "What we do best",
        paragraph: "From timeless weddings to stunning portraits, we capture it all.",
        viewAllLabel: "View all services", viewAllHref: "/services",
        items: [
          { icon: "heart", name: "Wedding Photography", desc: "Complete wedding coverage with beautiful storytelling." },
          { icon: "users", name: "Pre-Wedding Photography", desc: "Romantic shoots that celebrate your love story." },
          { icon: "baby", name: "Maternity Photography", desc: "Elegant and heartfelt maternity sessions just for you." },
          { icon: "briefcase", name: "Corporate Photography", desc: "Professional imagery for your brand and team." },
          { icon: "package", name: "Product Photography", desc: "High-quality images that make your products shine." },
          { icon: "party", name: "Event Photography", desc: "Candid moments from your special events." },
        ],
      },
      packages: {
        active: true, pages: ["gallery"], eyebrow: "Our Packages", title: "Packages that fit your needs",
        paragraph: "Flexible packages for every occasion and every budget.",
        viewAllLabel: "View all packages", viewAllHref: "/packages",
        items: [
          { name: "Silver Package", price: "₹25,000", note: "Starting from", popular: false, custom: false, features: ["4 Hours Coverage", "1 Photographer", "100+ Edited Photos", "Online Gallery"], img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80", cta: "View Details", href: "/packages" },
          { name: "Gold Package", price: "₹45,000", note: "Starting from", popular: true, custom: false, features: ["8 Hours Coverage", "2 Photographers", "300+ Edited Photos", "Premium Album"], img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=500&q=80", cta: "View Details", href: "/packages" },
          { name: "Platinum Package", price: "₹75,000", note: "Starting from", popular: false, custom: false, features: ["12 Hours Coverage", "2 Photographers", "500+ Edited Photos", "Premium Album + Box"], img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=500&q=80", cta: "View Details", href: "/packages" },
          { name: "Custom Package", price: "", note: "Tailored for you", popular: false, custom: true, features: [], img: "", cta: "Enquire Now", href: "/contact" },
        ],
      },
      contact: {
        active: true, pages: ["gallery"], eyebrow: "Contact Us", heading: "Let's capture something beautiful together",
        paragraph: "We would love to hear from you. Reach out to discuss your ideas and bookings.",
        address: "123, Park Street, Salt Lake, Kolkata – 700091, India",
        phone: "+91 98765 43210", email: "hello@highoninnovation.com", hours: "Mon – Sat: 10:00 AM – 7:00 PM",
        socials: [
          { label: "Facebook", url: "#" }, { label: "Instagram", url: "#" },
          { label: "WhatsApp", url: "#" }, { label: "Pinterest", url: "#" },
        ],
        form: { name: "Your Name", email: "Your Email", phone: "Your Phone", subject: "Subject", message: "Tell us about your requirement", submit: "Send Message" },
      },
    },

    blogPostPage: {
      author: {
        name: "High On Innovation Team",
        bio: "We are a team of passionate photographers and storytellers who believe in capturing real emotions and timeless memories.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
      },
      sidebar: {
        searchPlaceholder: "Search blog posts...",
        categories: [
          { name: "Wedding", icon: "heart", count: "12" },
          { name: "Pre-Wedding", icon: "users", count: "8" },
          { name: "Maternity", icon: "baby", count: "6" },
          { name: "Corporate", icon: "briefcase", count: "7" },
          { name: "Product", icon: "package", count: "5" },
          { name: "Tips & Guide", icon: "lightbulb", count: "9" },
          { name: "Behind the Scenes", icon: "camera", count: "4" },
        ],
        tags: ["wedding tips", "pre wedding", "photography", "poses", "planning", "canon", "lighting", "indian wedding"],
        cta: { heading: "Capture your story beautifully", subtitle: "Let's create memories that last forever.", buttonLabel: "Book a Consultation", buttonHref: "/contact" },
      },
      related: {
        heading: "You may also like", viewAllLabel: "View all posts", viewAllHref: "/blog",
        items: [
          { category: "Pre-Wedding", date: "17 Jun 2026", title: "5 pre-wedding shoot locations around Kolkata", read: "4 min read", img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80", href: "/blog" },
          { category: "Tips & Guide", date: "16 Jun 2026", title: "How to prepare for your wedding photoshoot", read: "5 min read", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", href: "/blog" },
          { category: "Behind the Scenes", date: "15 Jun 2026", title: "Behind the scenes of a wedding photoshoot", read: "3 min read", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80", href: "/blog" },
          { category: "Wedding", date: "14 Jun 2026", title: "Candid moments that make weddings unforgettable", read: "4 min read", img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80", href: "/blog" },
        ],
      },
    },
  };
}
