import { Injectable } from '@angular/core';

export interface Tire {
  id: string;
  brand: string;
  name: string;
  category: 'Harian' | 'Balap' | 'Offroad';
  price: string;
  image: string;
  rating: number;
  matchScore: number;
  rimSize: string;
  description: string;
  size: string;
  durability: string;
  // Detailed Specs
  compound?: 'Soft' | 'Medium' | 'Hard';
  loadIndex?: string;
  speedRating?: string;
  structure?: 'Bias' | 'Radial';
}

@Injectable({
  providedIn: 'root'
})
export class TireService {
  private tires: Tire[] = [
    // --- RING 14 (Matic: Beat, Vario, Mio, Genio, etc) ---
    {
      id: 'mic_1', brand: 'Michelin', name: 'City Grip 2', category: 'Harian', price: 'Rp 650.000',
      image: 'assets/tires/maxxis_diamond.png', // Placeholder if original missing
      rating: 4.9, matchScore: 98, rimSize: '14',
      description: 'The reference for scooter tires, now with even more grip in wet conditions.',
      size: '90/90-14', durability: '20.000 KM', compound: 'Medium', loadIndex: '46P', speedRating: 'S', structure: 'Bias'
    },
    {
      id: 'max_v1', brand: 'Maxxis', name: 'Victra S98 ST', category: 'Balap', price: 'Rp 450.000',
      image: 'assets/tires/maxxis_victra.png', 
      rating: 4.9, matchScore: 99, rimSize: '14',
      description: 'Dual compound technology for excellent grip and durability. Perfect for sporty daily or track days.',
      size: '90/80-14', durability: '12.000 KM', compound: 'Soft', loadIndex: '43P', speedRating: 'S', structure: 'Bias'
    },
    {
      id: 'max_d1', brand: 'Maxxis', name: 'Diamond MA-3DN', category: 'Harian', price: 'Rp 320.000',
      image: 'assets/tires/maxxis_diamond.png', 
      rating: 4.7, matchScore: 94, rimSize: '14',
      description: 'Unique diamond pattern for maximum water dispersion and safety in the rain.',
      size: '80/90-14', durability: '15.000 KM', compound: 'Medium', loadIndex: '40P', speedRating: 'P', structure: 'Bias'
    },
    {
      id: 'fdr_h1', brand: 'FDR', name: 'Hover', category: 'Offroad', price: 'Rp 350.000',
      image: 'assets/tires/fdr_hover.png', 
      rating: 4.8, matchScore: 96, rimSize: '14',
      description: 'Dual purpose tire with aggressive pattern for both asphalt and light off-road terrain.',
      size: '90/90-14', durability: '15.000 KM', compound: 'Medium', loadIndex: '46P', speedRating: 'P', structure: 'Bias'
    },
    {
      id: 'fdr_z1', brand: 'FDR', name: 'Sport Zevo', category: 'Harian', price: 'Rp 310.000',
      image: 'assets/tires/fdr_zevo.png', 
      rating: 4.6, matchScore: 92, rimSize: '14',
      description: 'Modern design for daily commuting with great handling and fuel efficiency.',
      size: '90/80-14', durability: '18.000 KM', compound: 'Medium', loadIndex: '43P', speedRating: 'P', structure: 'Bias'
    },
    {
      id: 'pre_1', brand: 'Presa', name: 'PS-588', category: 'Harian', price: 'Rp 290.000',
      image: 'assets/tires/presa_ps588.png', 
      rating: 4.5, matchScore: 90, rimSize: '14',
      description: 'Economical yet high performance daily tire with sporty tread pattern.',
      size: '90/90-14', durability: '15.000 KM', compound: 'Medium', loadIndex: '46P', speedRating: 'P', structure: 'Bias'
    },

    // --- RING 13 (NMAX, ADV, Lexi LX) ---
    {
      id: 'met_1', brand: 'Metzeler', name: 'Roadtec Scooter', category: 'Harian', price: 'Rp 620.000',
      image: 'assets/tires/maxxis_victra.png', // Placeholder
      rating: 4.7, matchScore: 95, rimSize: '13',
      description: 'Versatile tire for all weather conditions with high mileage and comfort.',
      size: '130/70-13', durability: '18.000 KM', compound: 'Medium', loadIndex: '63P', speedRating: 'S', structure: 'Bias'
    },
    {
      id: 'max_v2', brand: 'Maxxis', name: 'Victra S98 ST', category: 'Balap', price: 'Rp 580.000',
      image: 'assets/tires/maxxis_victra.png', 
      rating: 4.9, matchScore: 98, rimSize: '13',
      description: 'High performance tire for NMAX users who want maximum cornering confidence.',
      size: '130/70-13', durability: '10.000 KM', compound: 'Soft', loadIndex: '63P', speedRating: 'S', structure: 'Bias'
    },
    {
      id: 'pir_a1', brand: 'Pirelli', name: 'Angel Scooter', category: 'Harian', price: 'Rp 550.000',
      image: 'assets/tires/fdr_zevo.png', // Placeholder
      rating: 4.8, matchScore: 97, rimSize: '13',
      description: 'Superior handling and braking performance for urban commuting.',
      size: '110/70-13', durability: '16.000 KM', compound: 'Medium', loadIndex: '48P', speedRating: 'P', structure: 'Bias'
    },

    // --- RING 12 (Scoopy, Fazzio, Grand Filano) ---
    {
      id: 'max_v3', brand: 'Maxxis', name: 'Victra S98 ST', category: 'Harian', price: 'Rp 380.000',
      image: 'assets/tires/maxxis_victra.png', 
      rating: 4.8, matchScore: 96, rimSize: '12',
      description: 'Sporty look and feel for 12-inch scooters with premium compound.',
      size: '110/70-12', durability: '12.000 KM', compound: 'Medium', loadIndex: '47J', speedRating: 'J', structure: 'Bias'
    },
    {
      id: 'asp_s1', brand: 'Aspira Premio', name: 'Sportivo', category: 'Harian', price: 'Rp 340.000',
      image: 'assets/tires/aspira_sportivo.png', 
      rating: 4.7, matchScore: 94, rimSize: '12',
      description: 'Pro-Design technology for maximum contact area and safety.',
      size: '110/70-12', durability: '15.000 KM', compound: 'Medium', loadIndex: '47J', speedRating: 'J', structure: 'Bias'
    },

    // --- RING 17 (Sport/Bebek: MX King, Vixion, CB150R, Supra X) ---
    {
      id: 'irc_f1', brand: 'IRC', name: 'Fasti 1', category: 'Balap', price: 'Rp 520.000',
      image: 'assets/tires/irc_fasti.png', 
      rating: 4.9, matchScore: 99, rimSize: '17',
      description: 'The standard for local racing. Slick-like grip for dry track conditions.',
      size: '90/80-17', durability: '3.000 KM', compound: 'Soft', loadIndex: '46S', speedRating: 'S', structure: 'Bias'
    },
    {
      id: 'cor_r46', brand: 'Corsa', name: 'Platinum R46', category: 'Balap', price: 'Rp 480.000',
      image: 'assets/tires/corsa_r46.png', 
      rating: 4.9, matchScore: 98, rimSize: '17',
      description: 'Aggressive racing profile with soft compound for extreme lean angles.',
      size: '90/80-17', durability: '5.000 KM', compound: 'Soft', loadIndex: '46P', speedRating: 'P', structure: 'Bias'
    },
    {
      id: 'fdr_m1', brand: 'FDR', name: 'Maxtreme', category: 'Offroad', price: 'Rp 620.000',
      image: 'assets/tires/fdr_hover.png', // Placeholder
      rating: 4.8, matchScore: 97, rimSize: '17',
      description: 'Supermoto style tire that excels on both asphalt and gravel roads.',
      size: '120/70-17', durability: '12.000 KM', compound: 'Medium', loadIndex: '58P', speedRating: 'P', structure: 'Bias'
    },
    {
      id: 'kin_a1', brand: 'Kingland', name: 'Axcero CTX 001', category: 'Balap', price: 'Rp 420.000',
      image: 'assets/tires/kingland_axcero.png', 
      rating: 4.7, matchScore: 95, rimSize: '17',
      description: 'High performance racing tire from local manufacturer with competitive pricing.',
      size: '90/80-17', durability: '4.000 KM', compound: 'Soft', loadIndex: '46P', speedRating: 'P', structure: 'Bias'
    },
    {
      id: 'swa_117', brand: 'Swallow', name: 'SB-117', category: 'Offroad', price: 'Rp 450.000',
      image: 'assets/tires/swallow_sb117.png', 
      rating: 4.7, matchScore: 95, rimSize: '17',
      description: 'The legendary "Ban Tahu" for dual purpose use. Very durable and tough.',
      size: '100/80-17', durability: '15.000 KM', compound: 'Medium', loadIndex: '52P', speedRating: 'P', structure: 'Bias'
    },

    // --- RING 18/21 (Offroad: KLX, CRF, WR155) ---
    {
      id: 'dun_d605', brand: 'Dunlop', name: 'D605', category: 'Offroad', price: 'Rp 550.000',
      image: 'assets/tires/swallow_sb117.png', // Placeholder
      rating: 4.8, matchScore: 96, rimSize: '21',
      description: 'Universal trial tire for dual purpose machines. Good on and off road.',
      size: '2.75-21', durability: '12.000 KM', compound: 'Medium', loadIndex: '45P', speedRating: 'P', structure: 'Bias'
    },
    {
      id: 'irc_gp21', brand: 'IRC', name: 'GP-21 / GP-22', category: 'Offroad', price: 'Rp 480.000',
      image: 'assets/tires/irc_fasti.png', // Placeholder
      rating: 4.7, matchScore: 94, rimSize: '18',
      description: 'Standard equipment for many adventure bikes. Reliable in mud and dirt.',
      size: '4.10-18', durability: '10.000 KM', compound: 'Hard', loadIndex: '59P', speedRating: 'P', structure: 'Bias'
    },
    {
      id: 'asp_t1', brand: 'Aspira Premio', name: 'Terreno', category: 'Offroad', price: 'Rp 520.000',
      image: 'assets/tires/swallow_sb117.png', // Placeholder
      rating: 4.8, matchScore: 95, rimSize: '18',
      description: 'Aggressive block pattern for off-road traction without sacrificing comfort.',
      size: '120/80-18', durability: '12.000 KM', compound: 'Medium', loadIndex: '62P', speedRating: 'P', structure: 'Bias'
    }
  ];

  constructor() { }

  getTiresByCategoryAndRim(category: 'Harian' | 'Balap' | 'Offroad', rimSize: string): Tire[] {
    const rims = rimSize.split('/');
    return this.tires.filter(t => t.category === category && rims.includes(t.rimSize));
  }

  filterTires(category: 'Harian' | 'Balap' | 'Offroad', rimSize: string, brand?: string, sortBy?: string): Tire[] {
    let filtered = this.getTiresByCategoryAndRim(category, rimSize);
    
    if (brand && brand !== 'Semua') {
      filtered = filtered.filter(t => t.brand === brand);
    }

    if (sortBy) {
      if (sortBy === 'Harga Terendah') {
        filtered.sort((a, b) => this.parsePrice(a.price) - this.parsePrice(b.price));
      } else if (sortBy === 'Harga Tertinggi') {
        filtered.sort((a, b) => this.parsePrice(b.price) - this.parsePrice(a.price));
      } else if (sortBy === 'Rating Tertinggi') {
        filtered.sort((a, b) => b.rating - a.rating);
      }
    }

    return filtered;
  }

  private parsePrice(price: string): number {
    return parseInt(price.replace(/[^0-9]/g, ''));
  }

  getTireById(id: string): Tire | undefined {
    return this.tires.find(t => t.id === id);
  }

  getBrands(category: 'Harian' | 'Balap' | 'Offroad', rimSize: string): string[] {
    const tires = this.getTiresByCategoryAndRim(category, rimSize);
    const brands = Array.from(new Set(tires.map(t => t.brand)));
    return ['Semua', ...brands];
  }
}
