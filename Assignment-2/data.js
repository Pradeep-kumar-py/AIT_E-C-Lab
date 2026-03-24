const PRODUCTS = [
	{
		id: 1,
		name: "Wireless Noise-Cancelling Headphones",
		category: "Audio",
		price: 7999,
		rating: 4.6,
		inStock: true,
		image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
		description: "Over-ear headphones with active noise cancellation and 30-hour battery life."
	},
	{
		id: 2,
		name: "Smart Fitness Watch",
		category: "Wearables",
		price: 5499,
		rating: 4.2,
		inStock: true,
		image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
		description: "Tracks heart rate, sleep, steps, and workouts with IP68 water resistance."
	},
	{
		id: 3,
		name: "Mechanical Gaming Keyboard",
		category: "Accessories",
		price: 3499,
		rating: 4.5,
		inStock: true,
		image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80",
		description: "RGB mechanical keyboard with hot-swappable switches and anti-ghosting."
	},
	{
		id: 4,
		name: "4K Action Camera",
		category: "Cameras",
		price: 8999,
		rating: 4.1,
		inStock: false,
		image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=900&q=80",
		description: "Compact action camera with 4K recording and image stabilization."
	},
	{
		id: 5,
		name: "Bluetooth Portable Speaker",
		category: "Audio",
		price: 2699,
		rating: 4.3,
		inStock: true,
		image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80",
		description: "Portable speaker with deep bass, stereo pairing, and 12-hour playback."
	},
	{
		id: 6,
		name: "USB-C Hub 8-in-1",
		category: "Accessories",
		price: 2199,
		rating: 4.0,
		inStock: true,
		image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
		description: "Multiport hub with HDMI, Ethernet, USB 3.0, and SD card support."
	},
	{
		id: 7,
		name: "Mirrorless Camera Lens 50mm",
		category: "Cameras",
		price: 12999,
		rating: 4.8,
		inStock: true,
		image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
		description: "Prime 50mm lens with f/1.8 aperture for portraits and low-light shots."
	},
	{
		id: 8,
		name: "Wireless Charging Pad",
		category: "Accessories",
		price: 1499,
		rating: 3.9,
		inStock: false,
		image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
		description: "Fast wireless charging pad compatible with Qi-enabled devices."
	},
	{
		id: 9,
		name: "True Wireless Earbuds",
		category: "Audio",
		price: 3299,
		rating: 4.4,
		inStock: true,
		image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
		description: "In-ear earbuds with ENC calling, touch controls, and compact case."
	},
	{
		id: 10,
		name: "E-Reader 8-inch",
		category: "Smart Devices",
		price: 6999,
		rating: 4.3,
		inStock: true,
		image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=80",
		description: "Glare-free display e-reader with adjustable warm light and Wi-Fi support."
	},
	{
		id: 11,
		name: "Home Security Smart Camera",
		category: "Smart Devices",
		price: 4599,
		rating: 4.1,
		inStock: false,
		image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
		description: "Indoor smart camera with motion alerts, two-way audio, and night vision."
	},
	{
		id: 12,
		name: "VR Headset",
		category: "Wearables",
		price: 15999,
		rating: 4.7,
		inStock: true,
		image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=900&q=80",
		description: "Immersive standalone VR headset with high refresh-rate display."
	},
	{
		id: 13,
		name: "27-inch 144Hz Gaming Monitor",
		category: "Displays",
		price: 17999,
		rating: 4.5,
		inStock: true,
		image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
		description: "QHD gaming monitor with 144Hz refresh rate and 1ms response time."
	},
	{
		id: 14,
		name: "Smart Home Speaker",
		category: "Smart Devices",
		price: 4999,
		rating: 4.2,
		inStock: true,
		image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80",
		description: "Voice-assistant speaker for music, reminders, and smart home control."
	},
	{
		id: 15,
		name: "Portable SSD 1TB",
		category: "Storage",
		price: 7499,
		rating: 4.7,
		inStock: true,
		image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=900&q=80",
		description: "High-speed USB-C portable SSD with shock resistance and metal body."
	},
	{
		id: 16,
		name: "Wireless Gaming Mouse",
		category: "Accessories",
		price: 2999,
		rating: 4.4,
		inStock: false,
		image: "https://images.unsplash.com/photo-1586349906319-48d9f6f64f5d?auto=format&fit=crop&w=900&q=80",
		description: "Ergonomic mouse with adjustable DPI, low-latency wireless mode, and RGB."
	},
	{
		id: 17,
		name: "1080p Webcam",
		category: "Cameras",
		price: 2599,
		rating: 4.0,
		inStock: true,
		image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",
		description: "Full HD webcam with built-in dual microphones and privacy shutter."
	},
	{
		id: 18,
		name: "Tablet 10-inch",
		category: "Smart Devices",
		price: 13999,
		rating: 4.1,
		inStock: true,
		image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
		description: "10-inch tablet for study and entertainment with long battery backup."
	},
	{
		id: 19,
		name: "Graphics Drawing Pen Tablet",
		category: "Accessories",
		price: 6299,
		rating: 4.3,
		inStock: true,
		image: "https://images.unsplash.com/photo-1587614203976-365c74645e83?auto=format&fit=crop&w=900&q=80",
		description: "Pen tablet with pressure sensitivity for digital art and design work."
	},
	{
		id: 20,
		name: "Smartphone Gimbal Stabilizer",
		category: "Cameras",
		price: 8999,
		rating: 4.4,
		inStock: false,
		image: "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?auto=format&fit=crop&w=900&q=80",
		description: "3-axis handheld gimbal for smooth cinematic mobile video recording."
	}
];
