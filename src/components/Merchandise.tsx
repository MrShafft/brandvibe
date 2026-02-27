import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CheckCircle2, Search, ExternalLink, MessageCircle, X, Info, Clock, Palette, Box } from 'lucide-react';

const categories = ['All', 'Corporate', 'Events', 'Apparel'];

interface Product {
  url: string;
  title: string;
  category: string;
  desc: string;
  longDesc?: string;
  specs?: string[];
  colors?: string[];
  leadTime?: string;
  minOrder?: string;
}

const merchandiseData: Product[] = [
  { 
    url: "https://ais-dev-s6xshee3rkarsvxm4ey4ul-58528994574.europe-west1.run.app/image_1.png", 
    title: "Premium Black Collection", 
    category: "Apparel",
    desc: "Sleek minimalist apparel and accessories for high-end branding.",
    longDesc: "Our Premium Black Collection is designed for brands that value sophistication and minimalism. Each piece is crafted from high-density fabrics with a matte finish, ensuring your logo stands out with subtle elegance.",
    specs: ["100% Organic Cotton", "Matte Black Finish", "Reinforced Stitching", "Eco-friendly Dyes"],
    colors: ["Matte Black", "Charcoal", "Midnight"],
    leadTime: "7-10 Business Days",
    minOrder: "20 Units"
  },
  { 
    url: "https://ais-dev-s6xshee3rkarsvxm4ey4ul-58528994574.europe-west1.run.app/image_2.png", 
    title: "Modern Pastel Series", 
    category: "Apparel",
    desc: "Soft tones and contemporary designs for lifestyle brands.",
    longDesc: "The Modern Pastel Series brings a fresh, approachable feel to your brand's merchandise. Perfect for lifestyle brands, tech startups, and creative agencies looking for a softer aesthetic.",
    specs: ["Soft-touch Finish", "Breathable Fabric", "Modern Fit", "Preshrunk"],
    colors: ["Sage", "Dusty Rose", "Sky Blue", "Lavender"],
    leadTime: "10-14 Business Days",
    minOrder: "25 Units"
  },
  { 
    url: "https://ais-dev-s6xshee3rkarsvxm4ey4ul-58528994574.europe-west1.run.app/image_3.png", 
    title: "Morison Executive Set", 
    category: "Corporate",
    desc: "Professional notebooks and mugs for corporate environments.",
    longDesc: "Elevate your office presence with the Morison Executive Set. This curated collection combines functionality with premium branding, making it the ideal gift for new hires or valued clients.",
    specs: ["Hardcover Notebook", "Ceramic 12oz Mug", "Soft-touch Coating", "Debossed Logo Option"],
    colors: ["Navy Blue", "Slate Grey", "Forest Green"],
    leadTime: "5-7 Business Days",
    minOrder: "10 Sets"
  },
  { 
    url: "https://ais-dev-s6xshee3rkarsvxm4ey4ul-58528994574.europe-west1.run.app/image_4.png", 
    title: "Facilitoy Promo Pack", 
    category: "Events",
    desc: "Vibrant blue event essentials including bags and stationery.",
    longDesc: "Make a splash at your next event with the Facilitoy Promo Pack. Designed for high visibility and utility, these items ensure your brand remains top-of-mind long after the event ends.",
    specs: ["Drawstring Bag", "Stainless Steel Bottle", "3-Pack Gel Pens", "Pocket Notebook"],
    colors: ["Electric Blue", "Cyan", "White"],
    leadTime: "3-5 Business Days",
    minOrder: "50 Packs"
  },
  { 
    url: "https://ais-dev-s6xshee3rkarsvxm4ey4ul-58528994574.europe-west1.run.app/image_5.png", 
    title: "Yuewen Tech Identity", 
    category: "Corporate",
    desc: "Comprehensive tech-focused branding kit for digital companies.",
    longDesc: "The Yuewen Tech Identity kit is built for the digital age. It includes essential tech accessories that every modern professional needs, all seamlessly branded with your company's visual identity.",
    specs: ["USB-C Hub", "Wireless Mouse", "Tech Pouch", "Cable Organizer"],
    colors: ["Space Grey", "Silver", "Black"],
    leadTime: "14-21 Business Days",
    minOrder: "15 Kits"
  },
  { 
    url: "https://ais-dev-s6xshee3rkarsvxm4ey4ul-58528994574.europe-west1.run.app/image_6.png", 
    title: "Blue Horizon Event Kit", 
    category: "Events",
    desc: "Complete event branding from balloons to apparel.",
    longDesc: "The Blue Horizon Event Kit provides a 360-degree branding solution for large-scale events. From the moment attendees arrive until they leave, your brand will be consistently represented.",
    specs: ["Branded Balloons", "Event Tees", "Lanyards", "Tote Bags"],
    colors: ["Royal Blue", "Navy", "White"],
    leadTime: "10-12 Business Days",
    minOrder: "100 Units"
  },
  { 
    url: "https://ais-dev-s6xshee3rkarsvxm4ey4ul-58528994574.europe-west1.run.app/image_7.png", 
    title: "Savanna Outdoor Promo", 
    category: "Events",
    desc: "Large scale outdoor branding including umbrellas and banners.",
    longDesc: "Command attention in any outdoor setting with the Savanna Outdoor Promo set. Built to withstand the elements while maintaining vibrant color and clear branding.",
    specs: ["UV-Resistant Umbrella", "Teardrop Banners", "A-Frame Sign", "Table Covers"],
    colors: ["Yellow", "Green", "Custom Match"],
    leadTime: "15-20 Business Days",
    minOrder: "1 Set"
  },
  { 
    url: "https://ais-dev-s6xshee3rkarsvxm4ey4ul-58528994574.europe-west1.run.app/image_8.png", 
    title: "Gallagher Signature Black", 
    category: "Corporate",
    desc: "Elite matte black corporate gifts and office essentials.",
    longDesc: "The Gallagher Signature Black collection represents the pinnacle of corporate gifting. Matte finishes and premium materials create an aura of exclusivity and prestige.",
    specs: ["Vacuum Insulated Tumbler", "Premium Journal", "Engraved Pen", "Gift Box"],
    colors: ["Matte Black"],
    leadTime: "7-10 Business Days",
    minOrder: "20 Sets"
  },
  {
    url: "https://picsum.photos/seed/pen/800/800",
    title: "Executive Pen Set",
    category: "Corporate",
    desc: "Handcrafted metal pens with custom engraving and premium gift box.",
    longDesc: "A timeless classic. Our Executive Pen Set features weighted metal pens that provide a superior writing experience, presented in a luxury velvet-lined box.",
    specs: ["Solid Brass Body", "German Ink Refill", "Laser Engraving", "Velvet Box"],
    colors: ["Gold", "Silver", "Gunmetal"],
    leadTime: "5 Business Days",
    minOrder: "10 Units"
  },
  {
    url: "https://picsum.photos/seed/desk/800/800",
    title: "Minimalist Desk Mat",
    category: "Corporate",
    desc: "Vegan leather desk mats with debossed company logo.",
    longDesc: "Protect your workspace and elevate your brand with our Minimalist Desk Mats. The smooth vegan leather surface is perfect for mouse tracking and provides a comfortable writing surface.",
    specs: ["Vegan Leather", "Non-slip Base", "Water Resistant", "900x400mm"],
    colors: ["Tan", "Black", "Navy"],
    leadTime: "7-10 Business Days",
    minOrder: "15 Units"
  },
  {
    url: "https://picsum.photos/seed/award/800/800",
    title: "Crystal Excellence Award",
    category: "Corporate",
    desc: "Premium optical crystal awards for corporate recognition.",
    longDesc: "Celebrate your team's achievements with our Crystal Excellence Awards. Each piece is precision-cut from the highest grade optical crystal, offering unmatched clarity and brilliance.",
    specs: ["Optical Grade Crystal", "Sandblast Engraving", "Gift Box Included", "Multiple Sizes"],
    colors: ["Clear"],
    leadTime: "10-14 Business Days",
    minOrder: "5 Units"
  },
  {
    url: "https://picsum.photos/seed/portfolio/800/800",
    title: "Leather Business Portfolio",
    category: "Corporate",
    desc: "Genuine leather organizers for the modern professional.",
    longDesc: "Our Leather Business Portfolio is the ultimate companion for the executive on the move. Hand-stitched from premium top-grain leather, it ages beautifully and keeps your essentials organized.",
    specs: ["Top-grain Leather", "A4 Pad Holder", "Business Card Slots", "Pen Loop"],
    colors: ["Cognac", "Espresso", "Black"],
    leadTime: "12-15 Business Days",
    minOrder: "10 Units"
  },
  {
    url: "https://picsum.photos/seed/banner/800/800",
    title: "Retractable Pull-up Banner",
    category: "Events",
    desc: "High-resolution printed banners with lightweight aluminum stands.",
    longDesc: "Set up your brand in seconds with our Retractable Pull-up Banners. Featuring high-tension mechanisms and anti-curl media, your graphics will look sharp and professional at every event.",
    specs: ["Anti-curl Vinyl", "Aluminum Base", "Padded Carry Bag", "850x2000mm"],
    colors: ["Custom Print"],
    leadTime: "3-5 Business Days",
    minOrder: "1 Unit"
  },
  {
    url: "https://picsum.photos/seed/lanyard/800/800",
    title: "Custom Lanyards & IDs",
    category: "Events",
    desc: "Durable woven lanyards with full-color badge printing.",
    longDesc: "Essential for any conference or trade show. Our custom lanyards are available in various widths and attachments, paired with high-quality PVC or cardstock ID badges.",
    specs: ["Polyester Ribbon", "Safety Breakaway", "Metal Lobster Claw", "Full Color Print"],
    colors: ["All PMS Colors"],
    leadTime: "10-12 Business Days",
    minOrder: "100 Units"
  },
  {
    url: "https://picsum.photos/seed/gazebo/800/800",
    title: "Branded Event Gazebo",
    category: "Events",
    desc: "Heavy-duty outdoor tents with custom roof and wall printing.",
    longDesc: "Own the outdoors with a fully branded gazebo. Our heavy-duty frames and weather-resistant fabrics ensure your brand is protected and visible in any environment.",
    specs: ["Hexagonal Alum Frame", "600D Polyester", "UV & Water Proof", "3x3m / 3x4.5m"],
    colors: ["Custom Full Print"],
    leadTime: "15-20 Business Days",
    minOrder: "1 Set"
  },
  {
    url: "https://picsum.photos/seed/tote/800/800",
    title: "Promotional Canvas Totes",
    category: "Events",
    desc: "Eco-friendly cotton bags for trade shows and giveaways.",
    longDesc: "The perfect sustainable giveaway. Our canvas totes are made from heavy-duty 12oz cotton, providing a large branding area and long-lasting utility for your customers.",
    specs: ["12oz Natural Canvas", "Cross-stitched Handles", "Screen Printed", "38x42cm"],
    colors: ["Natural", "Black", "Navy"],
    leadTime: "7-10 Business Days",
    minOrder: "100 Units"
  },
  {
    url: "https://picsum.photos/seed/polo/800/800",
    title: "Embroidered Polo Shirts",
    category: "Apparel",
    desc: "Classic fit cotton polos with high-density logo embroidery.",
    longDesc: "The gold standard for corporate apparel. Our polo shirts are made from premium pique cotton, offering a perfect balance of comfort, durability, and professional style.",
    specs: ["220gsm Pique Cotton", "Ribbed Collar", "Side Slits", "High-density Embroidery"],
    colors: ["White", "Navy", "Black", "Red", "Royal"],
    leadTime: "10-14 Business Days",
    minOrder: "20 Units"
  },
  {
    url: "https://picsum.photos/seed/jacket/800/800",
    title: "Winter Puffer Jackets",
    category: "Apparel",
    desc: "Insulated weather-resistant jackets for corporate teams.",
    longDesc: "Keep your team warm and on-brand during the colder months. Our puffer jackets feature lightweight synthetic down insulation and a water-resistant shell.",
    specs: ["Nylon Ripstop Shell", "Synthetic Down Fill", "Zippered Pockets", "Internal Branding"],
    colors: ["Black", "Navy"],
    leadTime: "14-21 Business Days",
    minOrder: "15 Units"
  },
  {
    url: "https://picsum.photos/seed/sport/800/800",
    title: "Performance Sportswear",
    category: "Apparel",
    desc: "Moisture-wicking athletic gear for corporate wellness events.",
    longDesc: "Designed for movement. Our performance range uses advanced moisture-wicking technology to keep athletes cool and dry, perfect for marathons or team-building events.",
    specs: ["100% Polyester Mesh", "Quick-dry Tech", "Flatlock Seams", "Sublimation Print"],
    colors: ["Neon Green", "Electric Blue", "White"],
    leadTime: "12-15 Business Days",
    minOrder: "30 Units"
  },
  {
    url: "https://picsum.photos/seed/beanie/800/800",
    title: "Premium Knit Beanies",
    category: "Apparel",
    desc: "Soft acrylic beanies with woven labels or embroidery.",
    longDesc: "A cozy addition to your brand's winter collection. Our beanies are double-layered for extra warmth and feature a versatile cuff for various branding options.",
    specs: ["100% Soft Acrylic", "Double Layer Knit", "Woven Label Option", "One Size Fits All"],
    colors: ["Grey", "Black", "Navy", "Burgundy"],
    leadTime: "10-12 Business Days",
    minOrder: "50 Units"
  }
];

export default function Merchandise() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredItems = useMemo(() => {
    return merchandiseData.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-24 px-4 bg-white" id="merchandise">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent font-bold text-sm mb-6"
          >
            <ShoppingBag size={16} />
            <span>Our Catalog</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display mb-6"
          >
            Branded Merchandise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-12"
          >
            Transform your brand into tangible experiences with our premium merchandise solutions.
          </motion.p>

          {/* Catalog Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 border text-sm ${
                    activeCategory === cat
                      ? 'bg-brand-primary text-white border-brand-primary shadow-lg'
                      : 'bg-transparent text-gray-500 border-gray-200 hover:border-brand-accent hover:text-brand-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Merchandise Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.url + item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onClick={() => setSelectedProduct(item)}
                className="group relative flex flex-col bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(item);
                      }}
                      className="px-6 py-2.5 bg-white text-brand-primary rounded-full text-sm font-bold hover:bg-brand-accent hover:text-white transition-all shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      <Search size={16} /> Quick View
                    </button>
                    <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                      <a 
                        href={`https://wa.me/254718440322?text=I'm interested in the ${item.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 rounded-full bg-white text-brand-primary hover:bg-brand-accent hover:text-white transition-all shadow-lg"
                        title="Inquire on WhatsApp"
                      >
                        <MessageCircle size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-brand-primary/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 z-10 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-brand-accent hover:text-white transition-all"
                >
                  <X size={24} />
                </button>

                {/* Left: Image */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                  <img
                    src={selectedProduct.url}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-6">
                    <span className="px-4 py-2 rounded-full bg-brand-accent text-white text-xs font-bold uppercase tracking-widest">
                      {selectedProduct.category}
                    </span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                  <h2 className="text-3xl md:text-4xl font-display text-brand-primary mb-4">
                    {selectedProduct.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {selectedProduct.longDesc || selectedProduct.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    {selectedProduct.specs && (
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-accent mb-4">
                          <Box size={16} /> Specifications
                        </h4>
                        <ul className="space-y-2">
                          {selectedProduct.specs.map((spec, i) => (
                            <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" /> {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedProduct.colors && (
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-accent mb-4">
                          <Palette size={16} /> Available Colors
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.colors.map((color, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600 font-medium">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-3xl mb-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1">
                        <Clock size={10} /> Lead Time
                      </p>
                      <p className="text-sm font-bold text-brand-primary">{selectedProduct.leadTime || 'Contact for info'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1">
                        <ShoppingBag size={10} /> Min. Order
                      </p>
                      <p className="text-sm font-bold text-brand-primary">{selectedProduct.minOrder || 'Flexible'}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`https://wa.me/254718440322?text=I'm interested in the ${selectedProduct.title}. Can you provide more details?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-brand-accent text-white rounded-full font-bold hover:bg-brand-primary transition-all shadow-lg"
                    >
                      <MessageCircle size={20} /> Inquire on WhatsApp
                    </a>
                    <button className="px-8 py-4 border-2 border-gray-200 text-gray-600 rounded-full font-bold hover:border-brand-accent hover:text-brand-accent transition-all">
                      Download Catalog
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-4 text-brand-accent font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Feature List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-20">
          {[
            { title: "High-End Materials", desc: "We source only the best fabrics and materials for longevity." },
            { title: "Precision Printing", desc: "State-of-the-art printing and embroidery techniques." },
            { title: "Bulk Discounts", desc: "Competitive pricing for large volume corporate orders." }
          ].map((feature, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="text-brand-accent shrink-0">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
