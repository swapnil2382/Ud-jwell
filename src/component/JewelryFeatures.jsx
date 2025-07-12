import {
  CheckCircle,
  Award,
  Medal,
  Package,
  Shield,
  RotateCcw,
  ShieldCheck,
  Gem,
  Truck,
} from "lucide-react";

export default function JewelryFeatures() {
  const features = [
    {
      icon: CheckCircle,
      title: "100% Certified",
      subtitle: "Jewellery",
    },
    {
      icon: Award,
      title: "BIS Hallmarked",
      subtitle: "Gold Jewellery",
    },
    {
      icon: Medal,
      title: "Platinum",
      subtitle: "Certified Jewellery",
    },
    {
      icon: Package,
      title: "Lifetime",
      subtitle: "Exchange",
    },
    {
      icon: Shield,
      title: "Lifetime",
      subtitle: "Buyback",
    },
    {
      icon: RotateCcw,
      title: "7 Days Return",
      subtitle: "Policy",
    },
    {
      icon: ShieldCheck,
      title: "1 Year Free",
      subtitle: "Insurance",
    },
    {
      icon: Gem,
      title: "6 Months Free",
      subtitle: "Product Upgrade",
    },
    {
      icon: Truck,
      title: "Free",
      subtitle: "Shipping",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group"
          >
            {/* Icon container with circular background and star decoration */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                <feature.icon className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              {/* Star decoration */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-2 h-2 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            {/* Text content */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600 leading-tight">
                {feature.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
