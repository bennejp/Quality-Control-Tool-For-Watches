import { WatchGuide } from '../types';

export const watchGuides: WatchGuide[] = [
  {
    id: 'rolex-submariner',
    brand: 'Rolex',
    model: 'Submariner',
    referenceNumber: '',
    factories: ['VSF', 'ZF', 'Clean'],
    criticalCheckPoints: [
      'Rehaut alignment with markers',
      'Bezel pip centering',
      'SEL gaps',
      'Cyclops magnification (2.5x)',
      'Date wheel centering and font',
      'Hand alignment'
    ],
    knownIssues: {
      'VSF': ['Currently best option (still producing)', 'Excellent dial and case finishing', 'Best SEL fit', 'Sometimes thick case sides', 'Top choice overall'],
      'ZF': ['Good budget alternative', 'SEL gaps can be larger', 'Decent overall quality'],
      'Clean': ['Factory raided July 2025 - permanently closed', 'If you find one: excellent bezel action and rehaut alignment']
    },
    tolerances: {
      'SEL gaps': 'Should be minimal (<0.5mm)',
      'Bezel alignment': 'Must be perfect at 12 o\'clock',
      'Rehaut': 'Within ±1 hour marker acceptable',
      'Timegrapher': '±10 s/d acceptable'
    }
  },
  {
    id: 'rolex-gmt-master-ii',
    brand: 'Rolex',
    model: 'GMT Master II',
    referenceNumber: '',
    factories: ['GMF', 'Clean'],
    criticalCheckPoints: [
      'Bezel insert color accuracy',
      'GMT hand alignment',
      'Bezel pip centering',
      'SEL gaps',
      'Cyclops alignment and magnification',
      'Speed bumps on bracelet clasp'
    ],
    knownIssues: {
      'GMF': ['Currently best available option', 'Good bezel colors', 'Decent case profile', 'Good overall quality', 'Most reliable option now'],
      'Clean': ['Factory raided July 2025 - permanently closed', 'If you find one: bezel colors most accurate, excellent speed bumps', 'CF was same factory']
    },
    tolerances: {
      'Bezel colors': 'Should match gen as closely as possible',
      'GMT hand': 'Must function correctly',
      'Cyclops': '2.5x magnification',
      'SEL gaps': '<0.5mm acceptable'
    }
  },
  {
    id: 'rolex-datejust',
    brand: 'Rolex',
    model: 'Datejust 41',
    referenceNumber: '',
    factories: ['VSF', 'GMF', 'Clean'],
    criticalCheckPoints: [
      'Dial texture and sunburst',
      'Fluted bezel sharpness',
      'Date wheel centering',
      'Cyclops alignment',
      'Bracelet finishing (Jubilee/Oyster)',
      'Index hour markers'
    ],
    knownIssues: {
      'VSF': ['Currently best option (still producing)', 'Excellent bracelet finishing - best in industry', 'V2 models have increased weight for authenticity', 'Great dial sunburst finish', 'Top choice overall'],
      'GMF': ['Good budget friendly alternative', 'Dial sunburst less pronounced', 'Date font can vary', 'Decent quality for price'],
      'Clean': ['Factory raided July 2025 - permanently closed', 'If you find one: sharp fluted bezel, excellent date wheel alignment']
    },
    tolerances: {
      'Date centering': 'Must be well centered in window',
      'Fluted bezel': 'Sharp and even ridges',
      'Dial finish': 'Proper sunburst effect',
      'Cyclops': '2.5x magnification, centered'
    }
  },
  {
    id: 'rolex-daytona',
    brand: 'Rolex',
    model: 'Daytona',
    referenceNumber: '',
    factories: ['BTF', 'Clean', 'Noob'],
    criticalCheckPoints: [
      'Subdial alignment',
      'Chrono hand reset to 12',
      'Bezel engraving depth',
      'Dial color accuracy',
      'Bracelet finishing',
      'Chrono pushers function'
    ],
    knownIssues: {
      'BTF': ['Currently best available option', 'Good subdial alignment', 'Dial printing quality can vary by batch', 'Decent bezel engravings', 'Best choice now that Clean is gone'],
      'Clean': ['Factory raided July 2025 - permanently closed', 'If you find one: excellent subdials alignment, superior bezel engravings'],
      'Noob': ['Factory raided years ago - permanently closed', 'If you find one: had 4130 clone movement which was best']
    },
    tolerances: {
      'Chrono reset': 'Must point exactly to 12 o\'clock',
      'Subdial alignment': 'Should be perfectly centered',
      'Bezel engravings': 'Deep and clean',
      'Dial color': 'White/black should match gen closely'
    }
  },
  {
    id: 'omega-seamaster',
    brand: 'Omega',
    model: 'Seamaster 300M',
    referenceNumber: '',
    factories: ['VSF', 'ORF'],
    criticalCheckPoints: [
      'Wave pattern on dial',
      'Bezel pip lume color',
      'He valve alignment',
      'Bracelet taper and finishing',
      'Omega logo printing',
      'Ceramic bezel quality'
    ],
    knownIssues: {
      'VSF': ['Best wave dial pattern', 'Excellent bracelet', 'Bezel action can be stiff on some', 'Top tier overall'],
      'ORF': ['Good alternative to VSF', 'Wave pattern less defined', 'Excellent case finishing', 'Better bezel action']
    },
    tolerances: {
      'Wave pattern': 'Should be crisp and visible',
      'He valve': 'Functional and aligned at 10 o\'clock',
      'Bezel': 'Smooth action, proper click',
      'Lume': 'Green/blue depending on model'
    }
  },
  {
    id: 'ap-royal-oak',
    brand: 'Audemars Piguet',
    model: 'Royal Oak 15400/15500',
    referenceNumber: '',
    factories: ['ZF', 'XF', 'OMF'],
    criticalCheckPoints: [
      'Tapisserie dial pattern',
      'Bezel screw alignment',
      'Bracelet finishing and links',
      'Hand finishing and shape',
      'AP logo printing',
      'Case thickness'
    ],
    knownIssues: {
      'ZF': ['Best overall', 'Excellent tapisserie', 'Bezel screws mostly align', 'Best bracelet finishing'],
      'XF': ['Budget option', 'Dial pattern less defined', 'Thicker case than gen'],
      'OMF': ['Newer factory', 'Good dial', 'Quality can vary']
    },
    tolerances: {
      'Bezel screws': 'Should align as closely as possible',
      'Tapisserie': 'Pattern should be deep and uniform',
      'Bracelet': 'Smooth taper, excellent finishing',
      'Case thickness': '15400: 9.8mm, 15500: 10.4mm'
    }
  },
  {
    id: 'patek-nautilus',
    brand: 'Patek Philippe',
    model: 'Nautilus 5711/5811',
    referenceNumber: '',
    factories: ['PPF', '3KF'],
    criticalCheckPoints: [
      'Horizontal embossed lines on dial',
      'Case finishing and edges',
      'Bracelet integration',
      'PP seal clarity',
      'Hand shape and finishing',
      'Dial texture'
    ],
    knownIssues: {
      'PPF': ['Best overall for Nautilus', 'Excellent dial lines', 'Good bracelet', 'Date wheel can sit low on some'],
      '3KF': ['Alternative option', 'Dial lines inconsistent', 'Case shape good', 'Bracelet finishing varies']
    },
    tolerances: {
      'Dial lines': 'Should be evenly spaced and crisp',
      'Case finishing': 'Brushing and polishing should be perfect',
      'Bracelet': 'Integrated design, perfect fit',
      'Date wheel': 'Centered and clear font'
    }
  },
  {
    id: 'cartier-santos',
    brand: 'Cartier',
    model: 'Santos',
    referenceNumber: '',
    factories: ['GF', 'BVF', 'V6F'],
    criticalCheckPoints: [
      'Bezel screw alignment',
      'Roman numeral printing',
      'Blue spinel in crown',
      'Bracelet quick-release system',
      'Case finishing (brushed/polished)',
      'Dial color accuracy'
    ],
    knownIssues: {
      'GF': ['Best overall', 'Excellent bezel screws', 'Good bracelet system', 'Best dial'],
      'BVF': ['Good alternative', 'Bezel screws can misalign', 'Dial sunburst less pronounced'],
      'V6F': ['Older factory', 'Budget option', 'Quality inconsistent']
    },
    tolerances: {
      'Bezel screws': 'Should all align properly',
      'Roman numerals': 'Clean and sharp printing',
      'Bracelet system': 'Quick-release should function smoothly',
      'Crown spinel': 'Should be blue, not purple'
    }
  }
];
