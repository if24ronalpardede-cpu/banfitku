import { Injectable } from '@angular/core';

export interface Motorbike {
  id: string;
  name: string;
  year: string;
  code: string;
  cc: string;
  rim: string;
}

@Injectable({
  providedIn: 'root'
})
export class MotorService {
  private motors: Motorbike[] = [
    // --- HONDA (BEBEK / CUB) ---
    { id: 'h1', name: 'Honda Astrea 800', year: '1984', code: 'GN2', cc: '86', rim: '17' },
    { id: 'h2', name: 'Honda Astrea Star', year: '1987', code: 'GN5', cc: '100', rim: '17' },
    { id: 'h3', name: 'Honda Astrea Prima', year: '1988', code: 'GN5', cc: '100', rim: '17' },
    { id: 'h4', name: 'Honda Astrea Grand', year: '1991', code: 'GN5', cc: '100', rim: '17' },
    { id: 'h5', name: 'Honda Supra', year: '1997', code: 'KEV', cc: '100', rim: '17' },
    { id: 'h6', name: 'Honda Supra Fit', year: '2004', code: 'KTL', cc: '100', rim: '17' },
    { id: 'h7', name: 'Honda Supra X 125', year: '2005', code: 'KPH', cc: '125', rim: '17' },
    { id: 'h8', name: 'Honda Supra X 125 FI', year: '2014', code: 'K41', cc: '125', rim: '17' },
    { id: 'h9', name: 'Honda Supra X Helm In', year: '2024', code: 'KYZ', cc: '125', rim: '17' },
    { id: 'h10', name: 'Honda Revo', year: '2007', code: 'KWB', cc: '100', rim: '17' },
    { id: 'h11', name: 'Honda Revo FI', year: '2014', code: 'K03', cc: '110', rim: '17' },
    { id: 'h12', name: 'Honda Supra GTR 150', year: '2016', code: 'K56', cc: '150', rim: '17' },

    // --- HONDA (MATIC) ---
    { id: 'h13', name: 'Honda Beat Karbu', year: '2008', code: 'KVY', cc: '110', rim: '14' },
    { id: 'h14', name: 'Honda Beat FI', year: '2012', code: 'K25', cc: '110', rim: '14' },
    { id: 'h15', name: 'Honda Beat eSP', year: '2016', code: 'K81', cc: '110', rim: '14' },
    { id: 'h16', name: 'Honda Beat Deluxe', year: '2024', code: 'K1A', cc: '110', rim: '14' },
    { id: 'h17', name: 'Honda Vario 110', year: '2006', code: 'KVB', cc: '110', rim: '14' },
    { id: 'h18', name: 'Honda Vario 125 Techno', year: '2012', code: 'KZR', cc: '125', rim: '14' },
    { id: 'h19', name: 'Honda Vario 125 LED', year: '2015', code: 'K60', cc: '125', rim: '14' },
    { id: 'h20', name: 'Honda Vario 150', year: '2015', code: 'K59', cc: '150', rim: '14' },
    { id: 'h21', name: 'Honda Vario 160', year: '2022', code: 'K2S', cc: '160', rim: '14' },
    { id: 'h22', name: 'Honda PCX 150 CBU', year: '2012', code: 'KZY', cc: '150', rim: '14' },
    { id: 'h23', name: 'Honda PCX 150 Lokal', year: '2018', code: 'K97', cc: '150', rim: '14' },
    { id: 'h24', name: 'Honda PCX 160', year: '2021', code: 'K1Z', cc: '160', rim: '14' },
    { id: 'h25', name: 'Honda ADV 150', year: '2019', code: 'K0W', cc: '150', rim: '14' },
    { id: 'h26', name: 'Honda ADV 160', year: '2022', code: 'K1N', cc: '160', rim: '14' },
    { id: 'h27', name: 'Honda Stylo 160', year: '2024', code: 'K3V', cc: '160', rim: '12' },
    { id: 'h28', name: 'Honda Scoopy Karbu', year: '2010', code: 'KYT', cc: '110', rim: '14' },
    { id: 'h29', name: 'Honda Scoopy FI', year: '2013', code: 'K16', cc: '110', rim: '12' },
    { id: 'h30', name: 'Honda PCX 175', year: '2026', code: 'K3X', cc: '175', rim: '14' },

    // --- HONDA (SPORT) ---
    { id: 'h31', name: 'Honda Tiger 2000', year: '1993', code: 'KC2', cc: '200', rim: '18' },
    { id: 'h32', name: 'Honda Tiger Revo', year: '2006', code: 'KCJ', cc: '200', rim: '18' },
    { id: 'h33', name: 'Honda Megapro Primus', year: '2006', code: 'KEH', cc: '160', rim: '18' },
    { id: 'h34', name: 'Honda New Megapro FI', year: '2014', code: 'K18', cc: '150', rim: '17' },
    { id: 'h35', name: 'Honda CB150R Old', year: '2012', code: 'K15', cc: '150', rim: '17' },
    { id: 'h36', name: 'Honda CB150R Streetfire', year: '2021', code: 'K15P', cc: '150', rim: '17' },
    { id: 'h37', name: 'Honda CBR150R Lokal', year: '2014', code: 'K45', cc: '150', rim: '17' },
    { id: 'h38', name: 'Honda CBR250RR', year: '2016', code: 'K64', cc: '250', rim: '17' },

    // --- YAMAHA (BEBEK) ---
    { id: 'y1', name: 'Yamaha Alfa', year: '1988', code: '3AY', cc: '100', rim: '17' },
    { id: 'y2', name: 'Yamaha Force 1', year: '1992', code: '3XA', cc: '110', rim: '17' },
    { id: 'y3', name: 'Yamaha F1ZR', year: '1997', code: '4US', cc: '110', rim: '17' },
    { id: 'y4', name: 'Yamaha Crypton', year: '1997', code: '4ST', cc: '105', rim: '17' },
    { id: 'y5', name: 'Yamaha Vega R', year: '2003', code: '5ER', cc: '110', rim: '17' },
    { id: 'y6', name: 'Yamaha Jupiter Z', year: '2003', code: '5TP', cc: '110', rim: '17' },
    { id: 'y7', name: 'Yamaha Jupiter MX 135', year: '2005', code: '1S7', cc: '135', rim: '17' },
    { id: 'y8', name: 'Yamaha MX King 150', year: '2015', code: '2PV', cc: '150', rim: '17' },

    // --- YAMAHA (MATIC) ---
    { id: 'y9', name: 'Yamaha Nouvo Lele', year: '2002', code: '5LW', cc: '115', rim: '16' },
    { id: 'y10', name: 'Yamaha Mio Sporty', year: '2004', code: '5TL', cc: '115', rim: '14' },
    { id: 'y11', name: 'Yamaha Mio Soul', year: '2007', code: '14D', cc: '115', rim: '14' },
    { id: 'y12', name: 'Yamaha Mio J', year: '2012', code: '54P', cc: '115', rim: '14' },
    { id: 'y13', name: 'Yamaha Soul GT', year: '2012', code: '1KP', cc: '115', rim: '14' },
    { id: 'y14', name: 'Yamaha NMAX Old', year: '2015', code: '2DP', cc: '155', rim: '13' },
    { id: 'y15', name: 'Yamaha NMAX New', year: '2020', code: 'B6H', cc: '155', rim: '13' },
    { id: 'y16', name: 'Yamaha NMAX Turbo', year: '2024', code: 'B6H', cc: '155', rim: '13' },
    { id: 'y17', name: 'Yamaha Aerox 155 Old', year: '2016', code: 'B65', cc: '155', rim: '14' },
    { id: 'y18', name: 'Yamaha Aerox 155 Connected', year: '2020', code: 'BBP', cc: '155', rim: '14' },
    { id: 'y19', name: 'Yamaha Lexi 125', year: '2018', code: 'B37', cc: '125', rim: '14' },
    { id: 'y20', name: 'Yamaha Lexi LX 155', year: '2024', code: 'BLS', cc: '155', rim: '14' },
    { id: 'y21', name: 'Yamaha Fazzio', year: '2022', code: 'BEJ', cc: '125', rim: '12' },
    { id: 'y22', name: 'Yamaha Grand Filano', year: '2023', code: 'BJU', cc: '125', rim: '12' },

    // --- YAMAHA (SPORT) ---
    { id: 'y23', name: 'Yamaha RX-King', year: '1983', code: '29N', cc: '135', rim: '18' },
    { id: 'y24', name: 'Yamaha RX-King New', year: '2002', code: '3KA', cc: '135', rim: '18' },
    { id: 'y25', name: 'Yamaha Vixion Old', year: '2007', code: '3C1', cc: '150', rim: '17' },
    { id: 'y26', name: 'Yamaha New Vixion Lightning', year: '2013', code: '1PA', cc: '150', rim: '17' },
    { id: 'y27', name: 'Yamaha R15 V2', year: '2014', code: '2PK', cc: '150', rim: '17' },
    { id: 'y28', name: 'Yamaha R15 V3', year: '2017', code: 'BK6', cc: '155', rim: '17' },
    { id: 'y29', name: 'Yamaha R25', year: '2014', code: '1WD', cc: '250', rim: '17' },
    { id: 'y30', name: 'Yamaha XSR 155', year: '2019', code: 'B1V', cc: '155', rim: '17' },

    // --- SUZUKI ---
    { id: 's1', name: 'Suzuki RC100 Bravo', year: '1988', code: 'RC100', cc: '100', rim: '17' },
    { id: 's2', name: 'Suzuki Satria 120R', year: '1997', code: 'F120', cc: '120', rim: '17' },
    { id: 's3', name: 'Suzuki Shogun 110', year: '1996', code: 'FD110', cc: '110', rim: '17' },
    { id: 's4', name: 'Suzuki Shogun 125', year: '2004', code: 'FL125', cc: '125', rim: '17' },
    { id: 's5', name: 'Suzuki Smash 110', year: '2003', code: 'FK110', cc: '110', rim: '17' },
    { id: 's6', name: 'Suzuki Satria F150 CBU', year: '2004', code: 'FX125', cc: '150', rim: '17' },
    { id: 's7', name: 'Suzuki Satria F150 Lokal', year: '2007', code: 'FU150', cc: '150', rim: '17' },
    { id: 's8', name: 'Suzuki GSX-R150', year: '2017', code: 'GSX150', cc: '150', rim: '17' },
    { id: 's9', name: 'Suzuki Address', year: '2014', code: 'UK110', cc: '110', rim: '14' },
    { id: 's10', name: 'Suzuki Nex II', year: '2018', code: 'NEX115', cc: '115', rim: '14' },

    // --- KAWASAKI ---
    { id: 'k1', name: 'Kawasaki Ninja 150 R', year: '1996', code: 'KR150', cc: '150', rim: '17' },
    { id: 'k2', name: 'Kawasaki Ninja 150 RR', year: '2002', code: 'KR150', cc: '150', rim: '17' },
    { id: 'k3', name: 'Kawasaki Ninja 250 FI', year: '2012', code: 'EX250L', cc: '250', rim: '17' },
    { id: 'k4', name: 'Kawasaki Ninja ZX-25R', year: '2020', code: 'ZX250', cc: '250', rim: '17' },
    { id: 'k5', name: 'Kawasaki KLX 150', year: '2009', code: 'KLX150', cc: '150', rim: '21/18' },
    { id: 'k6', name: 'Kawasaki W175', year: '2017', code: 'BJ175', cc: '175', rim: '17' },
    { id: 'k7', name: 'Kawasaki Ninja ZX-4RR', year: '2024', code: 'ZX400', cc: '400', rim: '17' },
    { id: 'h39', name: 'Honda CBR150R LED', year: '2016', code: 'K45G', cc: '150', rim: '17' },
    { id: 'h40', name: 'Honda CB150X', year: '2021', code: 'K15', cc: '150', rim: '17' },
    { id: 'h41', name: 'Honda CRF150L', year: '2017', code: 'K84', cc: '150', rim: '21/18' },
    { id: 'h42', name: 'Honda Genio', year: '2019', code: 'K0J', cc: '110', rim: '14' },
    { id: 'h43', name: 'Honda Sonic 150R', year: '2015', code: 'K56', cc: '150', rim: '17' },

    // --- YAMAHA ---
    { id: 'y31', name: 'Yamaha WR155R', year: '2019', code: 'B3M', cc: '155', rim: '21/18' },
    { id: 'y32', name: 'Yamaha MT-15', year: '2019', code: 'B7D', cc: '155', rim: '17' },
    { id: 'y33', name: 'Yamaha MT-25', year: '2015', code: 'B04', cc: '250', rim: '17' },
    { id: 'y34', name: 'Yamaha Gear 125', year: '2020', code: 'B3W', cc: '125', rim: '14' },
    { id: 'y35', name: 'Yamaha FreeGo', year: '2018', code: 'B5D', cc: '125', rim: '12' },

    // --- VESPA (PIAGGIO) ---
    { id: 'v1', name: 'Vespa Sprint 150 i-Get', year: '2016', code: 'SPRINT', cc: '150', rim: '12' },
    { id: 'v2', name: 'Vespa Primavera 150', year: '2014', code: 'PRIM', cc: '150', rim: '12' },
    { id: 'v3', name: 'Vespa GTS 150', year: '2017', code: 'GTS150', cc: '150', rim: '12' },
    { id: 'v4', name: 'Vespa GTS 300 HPE', year: '2019', code: 'GTS300', cc: '300', rim: '12' },
    { id: 'v5', name: 'Vespa LX 125 i-Get', year: '2017', code: 'LX125', cc: '125', rim: '11/10' },
    { id: 'v6', name: 'Vespa S 125 i-Get', year: '2017', code: 'S125', cc: '125', rim: '11/10' },

    // --- KAWASAKI ---
    { id: 'k8', name: 'Kawasaki Ninja 250 SL', year: '2014', code: 'BX250', cc: '250', rim: '17' },
    { id: 'k9', name: 'Kawasaki Z250', year: '2013', code: 'ER250', cc: '250', rim: '17' },
    { id: 'k10', name: 'Kawasaki Vulcan S', year: '2015', code: 'EN650', cc: '650', rim: '18/17' }
  ];

  constructor() { }

  getAllMotors(): Motorbike[] {
    return this.motors;
  }
}
