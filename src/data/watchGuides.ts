import { WatchGuide } from '../types';

export const watchGuides: WatchGuide[] = [
  {
    id: 'rolex-sub-116610',
    brand: 'Rolex',
    model: 'Submariner',
    referenceNumber: '116610LN',
    factories: ['VSF', 'Clean', 'ZF'],
    criticalCheckPoints: [
      'Rehaut alignment with markers',
      'Bezel pip centering',
      'SEL gaps',
      'Cyclops magnification (2.5x)',
      'Hand alignment'
    ],
    knownIssues: {
      'VSF': ['Slightly thick case sides', 'Sometimes loose bezel'],
      'Clean': ['Date wheel can vary', 'Rehaut sometimes misaligned'],
      'ZF': ['Older batch had SEL issues', 'Movement can be noisy']
    },
    tolerances: {
      'SEL gaps': 'Should be minimal (<0.5mm)',
      'Bezel alignment': 'Must be perfect at 12 o\'clock',
      'Rehaut': 'Within ±1 hour marker acceptable',
      'Timegrapher': '±10 s/d acceptable for this model'
    }
  },
  {
    id: 'rolex-daytona-116500',
    brand: 'Rolex',
    model: 'Daytona',
    referenceNumber: '116500LN',
    factories: ['Clean', 'BTF', 'Noob'],
    criticalCheckPoints: [
      'Subdial alignment',
      'Chrono hand reset to 12',
      'Bezel engraving depth',
      'Dial color accuracy',
      'Bracelet finishing'
    ],
    knownIssues: {
      'Clean': ['Best overall, occasional subdial misalignment', 'Chrono seconds hand thickness'],
      'BTF': ['Good bezel, sometimes dial printing issues'],
      'Noob': ['Discontinued but had good movement', 'Case proportions slightly off']
    },
    tolerances: {
      'Chrono reset': 'Must point exactly to 12 o\'clock',
      'Subdial alignment': 'Should be perfectly centered',
      'Bezel engravings': 'Deep and clean',
      'Dial color': 'Should match gen closely (white/black)'
    }
  },
  {
    id: 'omega-seamaster-300',
    brand: 'Omega',
    model: 'Seamaster 300M',
    referenceNumber: '210.30.42.20.01.001',
    factories: ['VSF', 'ORF'],
    criticalCheckPoints: [
      'Wave pattern on dial',
      'Bezel pip lume color',
      'He valve alignment',
      'Bracelet taper and finishing',
      'Omega logo printing'
    ],
    knownIssues: {
      'VSF': ['Best wave dial pattern', 'Occasional bezel action issues', 'Great bracelet'],
      'ORF': ['Good alternative', 'Wave pattern less defined', 'Case finishing excellent']
    },
    tolerances: {
      'Wave pattern': 'Should be crisp and visible',
      'He valve': 'Functional and aligned at 10 o\'clock',
      'Bezel': 'Smooth action, proper click',
      'Lume': 'Should be green/blue depending on model'
    }
  },
  {
    id: 'ap-royal-oak-15400',
    brand: 'Audemars Piguet',
    model: 'Royal Oak',
    referenceNumber: '15400',
    factories: ['ZF', 'XF'],
    criticalCheckPoints: [
      'Tapisserie dial pattern',
      'Bezel screw alignment',
      'Bracelet finishing and links',
      'Hand finishing and shape',
      'AP logo printing'
    ],
    knownIssues: {
      'ZF': ['Excellent tapisserie pattern', 'Best overall', 'Bezel screws should align'],
      'XF': ['Good budget option', 'Dial pattern less defined', 'Thicker case']
    },
    tolerances: {
      'Bezel screws': 'All should align perfectly',
      'Tapisserie': 'Pattern should be deep and uniform',
      'Bracelet': 'Smooth taper, excellent finishing',
      'Case thickness': 'Should be slim (9.8mm)'
    }
  },
  {
    id: 'patek-nautilus-5711',
    brand: 'Patek Philippe',
    model: 'Nautilus',
    referenceNumber: '5711/1A',
    factories: ['PPF', '3KF'],
    criticalCheckPoints: [
      'Horizontal embossed lines on dial',
      'Case finishing and edges',
      'Bracelet integration',
      'PP seal clarity',
      'Hand shape and finishing'
    ],
    knownIssues: {
      'PPF': ['Best dial pattern', 'Good bracelet', 'Sometimes date wheel sits low'],
      '3KF': ['Good case shape', 'Dial lines can be inconsistent', 'Bracelet finishing varies']
    },
    tolerances: {
      'Dial lines': 'Should be evenly spaced and crisp',
      'Case finishing': 'Brushing and polishing should be perfect',
      'Bracelet': 'Integrated design, perfect fit',
      'Date wheel': 'Centered and clear'
    }
  }
];

