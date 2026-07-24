import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

const CONTENT: Record<string, { title: string; category: string; author: string; date: string; readTime: number; image: string; body: string; tags: string[] }> = {
  '10-nutrition-habits': {
    title: '10 Evidence-Based Nutrition Habits for Optimal Health',
    category: 'Nutrition',
    author: 'Dr. Sarah Chen',
    date: 'July 20, 2026',
    readTime: 8,
    image: 'photo-1490645935967-10de6ba17061?w=1200&h=500&fit=crop',
    tags: ['Nutrition', 'Diet', 'Wellness', 'Health'],
    body: `Optimal nutrition is the cornerstone of good health. The food choices we make daily profoundly impact our energy levels, immune function, cognitive performance, and long-term disease risk.

**1. Prioritize Whole, Unprocessed Foods**
The foundation of any healthy diet should be whole, minimally processed foods. These include vegetables, fruits, whole grains, legumes, nuts, seeds, and quality proteins. These foods provide a complex matrix of nutrients, fiber, and beneficial compounds that work synergistically for health.

**2. Eat the Rainbow**
Different colored plants contain different phytonutrients — beneficial plant compounds that reduce inflammation and disease risk. Aim for at least 5–7 servings of colorful vegetables and fruits daily.

**3. Prioritize Protein at Every Meal**
Adequate protein intake supports muscle maintenance, satiety, immune function, and metabolic health. Aim for 0.7–1 gram of protein per pound of body weight, distributed across meals.

**4. Don't Fear Healthy Fats**
Monounsaturated and polyunsaturated fats found in olive oil, avocados, nuts, and fatty fish are essential for brain health, hormone production, and absorbing fat-soluble vitamins.

**5. Stay Consistently Hydrated**
Water is involved in virtually every bodily function. Aim for 2–3 liters daily, more if you exercise or live in a hot climate. Start each morning with a glass of water before coffee.

**6. Practice Mindful Eating**
Slow down, chew thoroughly, eat without distractions, and tune into hunger and fullness cues. Mindful eating improves digestion, prevents overeating, and enhances meal satisfaction.

**7. Time Your Nutrition**
Eating patterns matter as much as food choices. Front-load your calories earlier in the day, finish eating 2–3 hours before bed, and consider maintaining a consistent eating window.

**8. Optimize Your Gut Microbiome**
Include prebiotic foods (garlic, onions, leeks, asparagus) and probiotic foods (yogurt, kefir, kimchi, sauerkraut) regularly to support a diverse and healthy gut microbiome.

**9. Limit Added Sugars and Ultra-Processed Foods**
These are linked to inflammation, metabolic dysfunction, and chronic disease. Read labels and aim to keep added sugar below 25–36 grams per day.

**10. Make It Sustainable and Enjoyable**
The best diet is one you can maintain long-term. Focus on abundance and variety rather than restriction. Cook at home more often, explore diverse cuisines, and find healthy foods you genuinely enjoy.`,
  },
};

const FALLBACK = {
  title: 'Health & Wellness Insights',
  category: 'Wellness',
  author: 'LifestyleBio Editorial',
  date: 'July 2026',
  readTime: 5,
  image: 'photo-1576091160399-112ba8d25d1d?w=1200&h=500&fit=crop',
  tags: ['Health', 'Wellness'],
  body: 'This comprehensive guide covers the latest research and practical strategies for optimizing your health and wellness. Stay tuned for our full article library as we continue to expand our content.',
};

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? CONTENT[slug] || FALLBACK : FALLBACK;

  const paragraphs = post.body.split('\n\n').filter(Boolean);

  return (
    <div>
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={`https://images.unsplash.com/${post.image}`} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full mb-3">{post.category}</span>
            <h1 className="text-2xl md:text-4xl font-bold text-white font-heading max-w-3xl leading-tight">{post.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-medium mr-4">
              <ArrowLeft size={16} /> Back
            </button>
            <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} min read</span>
          </div>

          <div className="prose prose-lg max-w-none">
            {paragraphs.map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">{para.slice(2, -2)}</h2>;
              }
              if (/^\*\*.+?\*\*/.test(para)) {
                const [bold, ...rest] = para.split('**').filter(Boolean);
                return <p key={i} className="text-gray-700 leading-relaxed mb-4"><strong>{bold}</strong>{rest.join(' ')}</p>;
              }
              return <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>;
            })}
          </div>

          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
            <span className="flex items-center gap-1 text-gray-500 text-sm"><Tag size={14} /> Tags:</span>
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">{tag}</span>
            ))}
          </div>

          <div className="mt-10 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
            <h3 className="font-bold text-gray-900 mb-2">Start Your Health Journey Today</h3>
            <p className="text-gray-600 text-sm mb-4">Track your nutrition, fitness, and wellness with LifestyleBio's AI-powered platform.</p>
            <Link to={ROUTES.REGISTER} className="btn-primary inline-block text-sm py-2.5 px-6">Get Started Free</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
