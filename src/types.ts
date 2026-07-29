export interface Package {
  id: string;
  name: string;
  nameEn: string;
  speed: string;
  price: number;
  description: string;
  features: string[];
  badge?: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  category: "onu" | "router" | "booster" | "solar_inverter" | "solar_battery" | "solar_panel" | "solar_kit";
  categoryAr: string;
  brand: string;
  priceEstimate: string;
  description: string;
  features: string[];
  image: string;
  videoUrl?: string;
  specs?: {
    powerKW?: string;
    voltage?: string;
    capacity?: string;
    batteryType?: string;
    warranty?: string;
  };
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export interface Order {
  id: string;
  type: "subscription" | "hardware" | "recharge" | "solar" | "contracting";
  name: string;
  phone: string;
  email?: string;
  details: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  price?: number;
  adminNote?: string;
}
