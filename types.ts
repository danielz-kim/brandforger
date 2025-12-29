
export interface ColorSwatch {
  hex: string;
  name: string;
  usage: string;
}

export interface Typography {
  headingFont: string;
  bodyFont: string;
  reasoning: string;
}

export interface BrandIdentity {
  companyName: string;
  tagline: string;
  mission: string;
  brandVoice: string;
  targetAudience: string;
  keywords: string[];
  colors: ColorSwatch[];
  typography: Typography;
  marketPositioning: {
    axisX: string; // e.g., "Traditional vs Modern"
    axisY: string; // e.g., "Budget vs Luxury"
    valueX: number; // 0-100
    valueY: number; // 0-100
  };
}

export interface BrandFormInputs {
  name: string;
  sector: string;
  description: string;
  style: string;
  audience: string;
}

export interface BrandState {
  identity: BrandIdentity | null;
  logoUrl: string | null;
  loading: boolean;
  error: string | null;
}
