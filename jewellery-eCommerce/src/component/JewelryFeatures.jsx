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
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                <feature.icon className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
            </div>

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
