export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  aiMatch: number;
  whyRecommended: string;
  specs: Record<string, string>;
  tags: string[];
  views: number;
  comparisons: number;
  cartAdds: number;
  purchases: number;
}

export const products: Product[] = [
  // =========================
  // LAPTOPS
  // =========================

  {
    id: "p1",
    name: "Lenovo IdeaPad Slim 5",
    brand: "Lenovo",
    price: 64999,
    originalPrice: 74999,
    rating: 4.5,
    reviews: 1284,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format",
    category: "Laptop",
    aiMatch: 94,
    whyRecommended:
      "Strong performance for programming, 16GB RAM and excellent 10-hour battery life while staying within your ₹70,000 budget.",
    specs: {
      Processor: "AMD Ryzen 7 5700U",
      RAM: "16 GB DDR4",
      Storage: "512 GB NVMe SSD",
      Display: '15.6" FHD IPS',
      Battery: "10 hours",
      OS: "Windows 11 Home",
      Weight: "1.66 kg",
      Graphics: "AMD Radeon",
    },
    tags: ["coding", "student", "battery life"],
    views: 4820,
    comparisons: 1240,
    cartAdds: 892,
    purchases: 418,
  },

  {
    id: "p2",
    name: "ASUS VivoBook 16X",
    brand: "ASUS",
    price: 59999,
    originalPrice: 67999,
    rating: 4.3,
    reviews: 956,
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop&auto=format",
    category: "Laptop",
    aiMatch: 89,
    whyRecommended:
      "Great value pick with large 16-inch display, solid RAM configuration, and comfortable keyboard for long coding sessions.",
    specs: {
      Processor: "Intel Core i5-12500H",
      RAM: "16 GB DDR4",
      Storage: "512 GB SSD",
      Display: '16" WUXGA IPS',
      Battery: "8 hours",
      OS: "Windows 11 Home",
      Weight: "1.88 kg",
      Graphics: "Intel Iris Xe",
    },
    tags: ["coding", "value", "large screen"],
    views: 3610,
    comparisons: 980,
    cartAdds: 671,
    purchases: 312,
  },

  {
    id: "p3",
    name: "HP Pavilion 15",
    brand: "HP",
    price: 62499,
    originalPrice: 70000,
    rating: 4.2,
    reviews: 743,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop&auto=format",
    category: "Laptop",
    aiMatch: 82,
    whyRecommended:
      "Reliable HP build quality with fast SSD storage and smooth multitasking capability for programming workloads.",
    specs: {
      Processor: "Intel Core i7-1255U",
      RAM: "16 GB DDR4",
      Storage: "1 TB SSD",
      Display: '15.6" FHD IPS',
      Battery: "9 hours",
      OS: "Windows 11 Home",
      Weight: "1.75 kg",
      Graphics: "Intel Iris Xe",
    },
    tags: ["coding", "reliable", "1TB storage"],
    views: 2980,
    comparisons: 760,
    cartAdds: 543,
    purchases: 248,
  },

  {
    id: "p8",
    name: "MacBook Air M2",
    brand: "Apple",
    price: 114900,
    originalPrice: 119900,
    rating: 4.9,
    reviews: 4872,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&auto=format",
    category: "Laptop",
    aiMatch: 76,
    whyRecommended:
      "Exceptional performance and battery life, though above your budget. Worth considering if you can extend your budget slightly.",
    specs: {
      Processor: "Apple M2 (8-core)",
      RAM: "8 GB Unified Memory",
      Storage: "256 GB SSD",
      Display: '13.6" Liquid Retina',
      Battery: "18 hours",
      OS: "macOS Ventura",
      Weight: "1.24 kg",
      Graphics: "10-core GPU",
    },
    tags: ["premium", "MacOS", "ultralight"],
    views: 8940,
    comparisons: 2340,
    cartAdds: 1890,
    purchases: 1120,
  },

  // =========================
  // HEADPHONES
  // =========================

  {
    id: "p4",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 26990,
    originalPrice: 32990,
    rating: 4.8,
    reviews: 5621,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format",
    category: "Headphones",
    aiMatch: 96,
    whyRecommended:
      "Premium noise cancellation, 30-hour battery and high-quality sound for music and work.",
    specs: {
      Type: "Over-ear, Wireless",
      "Noise Cancellation": "Adaptive ANC",
      Battery: "30 hours",
      Charging: "USB-C, Quick Charge",
      Driver: "30mm",
      Weight: "250g",
      Connectivity: "Bluetooth 5.2",
      Microphones: "8 microphones",
    },
    tags: ["premium", "ANC", "work from home", "music"],
    views: 9200,
    comparisons: 2100,
    cartAdds: 1820,
    purchases: 1240,
  },

  {
    id: "p5",
    name: "boAt Rockerz 450",
    brand: "boAt",
    price: 1499,
    originalPrice: 3990,
    rating: 4.1,
    reviews: 28400,
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop&auto=format",
    category: "Headphones",
    aiMatch: 78,
    whyRecommended:
      "Budget-friendly wireless headphones with long battery life and strong bass response.",
    specs: {
      Type: "Over-ear, Wireless",
      "Noise Cancellation": "None",
      Battery: "15 hours",
      Charging: "Micro-USB",
      Driver: "40mm",
      Weight: "220g",
      Connectivity: "Bluetooth 5.0",
      Microphones: "Built-in",
    },
    tags: ["budget", "bass", "casual", "music"],
    views: 14800,
    comparisons: 3200,
    cartAdds: 4100,
    purchases: 2900,
  },

  // =========================
  // SMARTPHONES
  // =========================

  {
    id: "p6",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 129999,
    originalPrice: 134999,
    rating: 4.7,
    reviews: 3412,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format",
    category: "Smartphone",
    aiMatch: 91,
    whyRecommended:
      "Advanced camera system with a 200MP main sensor, optical zoom and powerful performance.",
    specs: {
      Processor: "Snapdragon 8 Gen 3",
      RAM: "12 GB",
      Storage: "256 GB",
      Camera: "200MP + 50MP + 12MP",
      Battery: "5000 mAh",
      Display: '6.8" QHD+ AMOLED',
      OS: "Android 14",
      "Special Feature": "S Pen included",
    },
    tags: ["photography", "premium", "camera", "256GB"],
    views: 6720,
    comparisons: 1890,
    cartAdds: 1120,
    purchases: 680,
  },

  {
    id: "p9",
    name: "Google Pixel 8a",
    brand: "Google",
    price: 42999,
    originalPrice: 49999,
    rating: 4.5,
    reviews: 2140,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop&auto=format",
    category: "Smartphone",
    aiMatch: 90,
    whyRecommended:
      "Excellent camera quality and clean Android experience at a competitive price.",
    specs: {
      Processor: "Google Tensor G3",
      RAM: "8 GB",
      Storage: "128 GB",
      Camera: "64MP + 13MP",
      Battery: "4492 mAh",
      Display: '6.1" OLED',
      OS: "Android",
      "Special Feature": "AI Photography",
    },
    tags: ["photography", "camera", "AI", "compact"],
    views: 5200,
    comparisons: 1400,
    cartAdds: 900,
    purchases: 510,
  },

  {
    id: "p10",
    name: "OnePlus 12R",
    brand: "OnePlus",
    price: 39999,
    originalPrice: 45999,
    rating: 4.4,
    reviews: 3180,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop&auto=format",
    category: "Smartphone",
    aiMatch: 89,
    whyRecommended:
      "Strong performance, large battery and 256GB storage make it a strong value option.",
    specs: {
      Processor: "Snapdragon 8 Gen 2",
      RAM: "8 GB",
      Storage: "256 GB",
      Camera: "50MP + 8MP + 2MP",
      Battery: "5500 mAh",
      Display: '6.78" AMOLED',
      OS: "Android",
      "Special Feature": "100W Fast Charging",
    },
    tags: ["performance", "gaming", "battery", "256GB", "camera"],
    views: 6100,
    comparisons: 1700,
    cartAdds: 1050,
    purchases: 620,
  },

  {
    id: "p11",
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    price: 38999,
    originalPrice: 44999,
    rating: 4.3,
    reviews: 2760,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop&auto=format",
    category: "Smartphone",
    aiMatch: 87,
    whyRecommended:
      "Balanced camera, display, battery and 256GB storage package for everyday use.",
    specs: {
      Processor: "Exynos 1480",
      RAM: "8 GB",
      Storage: "256 GB",
      Camera: "50MP + 12MP + 5MP",
      Battery: "5000 mAh",
      Display: '6.6" Super AMOLED',
      OS: "Android",
      "Special Feature": "IP67 Water Resistance",
    },
    tags: ["camera", "256GB", "battery", "student"],
    views: 4800,
    comparisons: 1250,
    cartAdds: 820,
    purchases: 470,
  },

  {
    id: "p12",
    name: "Nothing Phone (2a)",
    brand: "Nothing",
    price: 27999,
    originalPrice: 31999,
    rating: 4.2,
    reviews: 1850,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop&auto=format",
    category: "Smartphone",
    aiMatch: 84,
    whyRecommended:
      "Affordable smartphone with a smooth display, capable camera and good battery life.",
    specs: {
      Processor: "MediaTek Dimensity 7200 Pro",
      RAM: "8 GB",
      Storage: "128 GB",
      Camera: "50MP + 50MP",
      Battery: "5000 mAh",
      Display: '6.7" AMOLED',
      OS: "Android",
      "Special Feature": "Glyph Interface",
    },
    tags: ["budget", "camera", "battery", "student"],
    views: 3900,
    comparisons: 980,
    cartAdds: 640,
    purchases: 360,
  },

  {
    id: "p13",
    name: "iQOO Neo 9 Pro",
    brand: "iQOO",
    price: 34999,
    originalPrice: 39999,
    rating: 4.4,
    reviews: 2210,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format",
    category: "Smartphone",
    aiMatch: 88,
    whyRecommended:
      "High-performance processor, 256GB storage and fast display make it suitable for gaming and demanding applications.",
    specs: {
      Processor: "Snapdragon 8 Gen 2",
      RAM: "8 GB",
      Storage: "256 GB",
      Camera: "50MP + 8MP",
      Battery: "5160 mAh",
      Display: '6.78" AMOLED 144Hz',
      OS: "Android",
      "Special Feature": "120W Fast Charging",
    },
    tags: ["gaming", "performance", "256GB", "battery", "camera"],
    views: 4500,
    comparisons: 1300,
    cartAdds: 780,
    purchases: 430,
  },

  {
    id: "p14",
    name: "OnePlus Nord 4",
    brand: "OnePlus",
    price: 29999,
    originalPrice: 34999,
    rating: 4.3,
    reviews: 1920,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop&auto=format",
    category: "Smartphone",
    aiMatch: 86,
    whyRecommended:
      "Good combination of performance, battery life, display quality and 256GB storage.",
    specs: {
      Processor: "Snapdragon 7+ Gen 3",
      RAM: "8 GB",
      Storage: "256 GB",
      Camera: "50MP + 8MP",
      Battery: "5500 mAh",
      Display: '6.74" AMOLED 120Hz',
      OS: "Android",
      "Special Feature": "100W Fast Charging",
    },
    tags: ["256GB", "battery", "student", "value", "camera"],
    views: 4100,
    comparisons: 1100,
    cartAdds: 710,
    purchases: 390,
  },

  // =========================
  // SMARTWATCH
  // =========================

  {
    id: "p7",
    name: "Apple Watch Series 9",
    brand: "Apple",
    price: 41900,
    originalPrice: 45900,
    rating: 4.6,
    reviews: 2180,
    image:
      "https://images.unsplash.com/photo-1523475496153-3e5c3e7f46de?w=400&h=300&fit=crop&auto=format",
    category: "Smartwatch",
    aiMatch: 88,
    whyRecommended:
      "Advanced health sensors, GPS tracking and seamless integration with Apple devices.",
    specs: {
      Display: '1.9" Always-On Retina',
      Processor: "S9 SiP",
      Health: "ECG, Blood Oxygen",
      Battery: "18 hours",
      Water: "50m WR",
      Connectivity: "GPS + Cellular",
      OS: "watchOS 10",
      Case: "Aluminum 45mm",
    },
    tags: ["health", "fitness", "iPhone"],
    views: 4120,
    comparisons: 1050,
    cartAdds: 760,
    purchases: 490,
  },
];

// =====================================================
// ANALYTICS DATA
// =====================================================

export const analyticsData = {
  metrics: {
    totalCustomers: 24850,
    totalCustomersGrowth: 18.4,
    productSearches: 89420,
    productSearchesGrowth: 24.7,
    conversionRate: 27.4,
    conversionRateGrowth: 5.8,
    revenueOpportunity: 1860000,
    revenueOpportunityGrowth: 12.3,
  },

  customerActivity: [
    { date: "Sep 1", searches: 2840, purchases: 680 },
    { date: "Sep 2", searches: 3120, purchases: 790 },
    { date: "Sep 3", searches: 2980, purchases: 720 },
    { date: "Sep 4", searches: 3560, purchases: 890 },
    { date: "Sep 5", searches: 4210, purchases: 1020 },
    { date: "Sep 6", searches: 3890, purchases: 970 },
    { date: "Sep 7", searches: 4580, purchases: 1140 },
    { date: "Sep 8", searches: 4120, purchases: 1050 },
    { date: "Sep 9", searches: 5010, purchases: 1280 },
    { date: "Sep 10", searches: 5640, purchases: 1420 },
    { date: "Sep 11", searches: 5280, purchases: 1360 },
    { date: "Sep 12", searches: 6100, purchases: 1580 },
    { date: "Sep 13", searches: 5920, purchases: 1510 },
    { date: "Sep 14", searches: 6780, purchases: 1720 },
  ],

  conversionByCategory: [
    { category: "Laptops", rate: 31.2 },
    { category: "Smartphones", rate: 28.4 },
    { category: "Headphones", rate: 42.1 },
    { category: "Smartwatches", rate: 22.8 },
    { category: "Accessories", rate: 38.6 },
  ],

  topCategories: [
    { name: "Laptops", searches: 31200, color: "#6366f1" },
    { name: "Headphones", searches: 22400, color: "#8b5cf6" },
    { name: "Smartphones", searches: 18900, color: "#a78bfa" },
    { name: "Smartwatches", searches: 9800, color: "#c4b5fd" },
    { name: "Accessories", searches: 7120, color: "#ddd6fe" },
  ],

  funnel: [
    { stage: "Search", count: 89420, percentage: 100 },
    { stage: "Product View", count: 62140, percentage: 69.5 },
    { stage: "Recommendation", count: 41890, percentage: 46.8 },
    { stage: "Comparison", count: 24210, percentage: 27.1 },
    { stage: "Cart Add", count: 14820, percentage: 16.6 },
    { stage: "Purchase", count: 8920, percentage: 9.98 },
  ],

  topProducts: [
    {
      product: "Lenovo IdeaPad Slim 5",
      views: 4820,
      comparisons: 1240,
      cartAdds: 892,
      purchases: 418,
      conversion: "8.7%",
    },
    {
      product: "Sony WH-1000XM5",
      views: 9200,
      comparisons: 2100,
      cartAdds: 1820,
      purchases: 1240,
      conversion: "13.5%",
    },
    {
      product: "MacBook Air M2",
      views: 8940,
      comparisons: 2340,
      cartAdds: 1890,
      purchases: 1120,
      conversion: "12.5%",
    },
    {
      product: "Samsung Galaxy S24 Ultra",
      views: 6720,
      comparisons: 1890,
      cartAdds: 1120,
      purchases: 680,
      conversion: "10.1%",
    },
    {
      product: "boAt Rockerz 450",
      views: 14800,
      comparisons: 3200,
      cartAdds: 4100,
      purchases: 2900,
      conversion: "19.6%",
    },
    {
      product: "Apple Watch Series 9",
      views: 4120,
      comparisons: 1050,
      cartAdds: 760,
      purchases: 490,
      conversion: "11.9%",
    },
  ],
};

// =====================================================
// INSIGHTS
// =====================================================

export const insights = [
  {
    id: "i1",
    priority: "HIGH",
    category: "High Demand",
    icon: "🔥",
    color: "#ef4444",
    title: "Laptops ₹50K–₹70K are the top searched segment",
    insight:
      "Laptops between ₹50,000 and ₹70,000 are the most frequently searched category, accounting for 34.9% of all product searches.",
    action:
      "Increase product listings in ₹50K–₹70K laptop segment and prioritize these in search results.",
    metric: "+34.9% of searches",
  },

  {
    id: "i2",
    priority: "HIGH",
    category: "Conversion Opportunity",
    icon: "⚡",
    color: "#f59e0b",
    title: "Laptop comparison-to-purchase drop-off detected",
    insight:
      "Customers frequently compare laptops but abandon before purchasing. Comparison page exit rate is 62.8%, well above category average.",
    action:
      "Deploy personalized comparison assistance and offer EMI breakdowns at the comparison stage.",
    metric: "62.8% exit rate",
  },

  {
    id: "i3",
    priority: "MEDIUM",
    category: "Product Opportunity",
    icon: "📈",
    color: "#6366f1",
    title: "High-view, low-purchase products need optimization",
    insight:
      "boAt Rockerz 450 has 14.8K views but only 19.6% conversion — description and social proof improvements could significantly lift sales.",
    action:
      "A/B test enhanced product descriptions with user-generated reviews and specification highlights.",
    metric: "14.8K views",
  },

  {
    id: "i4",
    priority: "MEDIUM",
    category: "Cross-Selling",
    icon: "🔗",
    color: "#10b981",
    title: "Laptop buyers frequently explore audio accessories",
    insight:
      "Customers purchasing laptops in the ₹50K–₹70K range browse wireless mice (68%) and headphones (54%) within the same session.",
    action:
      "Implement AI-driven bundle recommendations on laptop product pages and checkout flow.",
    metric: "54–68% co-browse rate",
  },
];

// =====================================================
// AI UNDERSTANDING EXAMPLES
// =====================================================

export const aiUnderstandingExamples: Record<
  string,
  {
    category: string;
    budget: string;
    useCase: string;
    priorities: string[];
  }
> = {
  laptop: {
    category: "Laptop",
    budget: "₹70,000",
    useCase: "Programming / Development",
    priorities: [
      "High Performance CPU",
      "16GB RAM",
      "Long Battery Life",
      "Fast SSD Storage",
    ],
  },

  headphones: {
    category: "Headphones",
    budget: "₹5,000",
    useCase: "Casual Listening / Music",
    priorities: [
      "Good Sound Quality",
      "Wireless Connectivity",
      "Comfortable Fit",
      "Long Battery",
    ],
  },

  smartphone: {
    category: "Smartphone",
    budget: "₹80,000",
    useCase: "Photography / Content Creation",
    priorities: [
      "High-Resolution Camera",
      "Optical Zoom",
      "Video Recording",
      "Large Display",
    ],
  },

  smartwatch: {
    category: "Smartwatch",
    budget: "₹45,000",
    useCase: "Health & Fitness Tracking",
    priorities: [
      "ECG & Health Sensors",
      "GPS Tracking",
      "Water Resistance",
      "Long Battery",
    ],
  },
};