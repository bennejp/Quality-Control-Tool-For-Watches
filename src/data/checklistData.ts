import { ChecklistItem } from '../types';

export const defaultChecklist: ChecklistItem[] = [
  {
    id: 'index-alignment',
    title: 'Index Alignment',
    description: 'Check if all hour markers are properly aligned and evenly spaced around the dial.',
    howToCheck: 'Use the Hour Grid overlay to verify each hour marker aligns with the radial lines. Look for any markers that appear tilted, off-center, or misaligned.',
    recommendedOverlay: 'minute-grid',
    severity: 'critical',
    commonIssues: [
      '6 o\'clock marker is crooked',
      '12 o\'clock marker slightly off-center',
      'Markers not perfectly aligned with minute track',
      'Uneven spacing between markers'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'date-wheel',
    title: 'Date Wheel Alignment',
    description: 'Verify the date sits centered in the date window and is clearly visible.',
    howToCheck: 'Check multiple dates if possible. Look for consistent centering - some dates may sit better than others on the same disc. The date should not touch the edges of the window.',
    recommendedOverlay: 'date-guide',
    severity: 'important',
    commonIssues: [
      'Date sits too far left or right',
      'Date sits too high or low',
      'Inconsistent between different dates',
      'Date font is too thick/thin'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'bezel-alignment',
    title: 'Bezel Pip Centering',
    description: 'Check if the bezel pip (triangle marker at 12 o\'clock) is perfectly centered.',
    howToCheck: 'Use the Minute Grid or Crosshair overlay. The bezel pip should align exactly with the 12 o\'clock position. Check if the bezel itself is evenly spaced around the case.',
    recommendedOverlay: 'crosshair',
    severity: 'critical',
    commonIssues: [
      'Bezel pip slightly left or right of center',
      'Bezel can\'t be rotated or is too loose',
      'Bezel engravings poorly filled',
      'Bezel insert not seated properly'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'sel-gaps',
    title: 'Solid End Links (SEL) Gaps',
    description: 'Check the gap between the bracelet\'s first link and the case lugs.',
    howToCheck: 'Look at where the bracelet meets the case. The gap should be minimal and even on both sides. Larger gaps indicate poor fitment.',
    severity: 'important',
    commonIssues: [
      'Visible gap on one or both sides',
      'Gap larger on one side than the other',
      'SEL doesn\'t sit flush with case',
      'Scratches visible in gap area'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'hand-alignment',
    title: 'Hand Alignment',
    description: 'Verify all hands are properly aligned and point to their correct positions.',
    howToCheck: 'Use the Crosshair overlay. Check if the hour and minute hands meet at the exact center. For chronographs, verify chrono hands point to 12 when reset. Hands should not touch each other or the dial.',
    recommendedOverlay: 'crosshair',
    severity: 'critical',
    commonIssues: [
      'Chrono hand doesn\'t point exactly to 12',
      'Hands touch each other when overlapping',
      'Hour hand slightly misaligned with hour marker',
      'Second hand doesn\'t hit markers precisely'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'dial-printing',
    title: 'Dial Printing Quality',
    description: 'Check for any defects, misalignment, or poor quality in the dial text and printing.',
    howToCheck: 'Use the Logo/Dial Alignment overlay to check if text is level. Look for smudges, missing ink, crooked text, or spelling errors. Check logo clarity and sharpness.',
    recommendedOverlay: 'logo-guide',
    severity: 'important',
    commonIssues: [
      'Logo is tilted or misaligned',
      'Text is crooked (especially at 6 o\'clock)',
      'Poor print quality or smudging',
      'Spelling mistakes',
      'Uneven letter spacing'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'timegrapher',
    title: 'Timegrapher Numbers',
    description: 'Review the movement performance measurements from the timegrapher.',
    howToCheck: 'Check the provided timegrapher results. Acceptable ranges: Rate ±1-20 s/d, Amplitude 250-310, Beat Error 0.0-1.0ms. Values outside these ranges may indicate movement issues.',
    severity: 'critical',
    commonIssues: [
      'Rate too fast or slow (>±20 s/d)',
      'Low amplitude (<250)',
      'High beat error (>1.0ms)',
      'Inconsistent across positions'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'rehaut-alignment',
    title: 'Rehaut Alignment',
    description: 'Check if the rehaut engraving aligns properly with the hour markers (Rolex models).',
    howToCheck: 'Look at the inner ring engraving. Each letter/number should align with its corresponding hour marker. Use Minute Grid overlay to verify alignment.',
    recommendedOverlay: 'minute-grid',
    severity: 'optional',
    commonIssues: [
      'Rehaut rotated slightly clockwise/counterclockwise',
      'Text doesn\'t align with markers',
      'Engraving depth inconsistent',
      'Poor quality engraving'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'crown-alignment',
    title: 'Crown Alignment',
    description: 'Verify the crown is properly aligned when screwed down.',
    howToCheck: 'When the crown is fully screwed in, the crown guards should be symmetrical and the crown logo should be upright (where applicable).',
    severity: 'optional',
    commonIssues: [
      'Crown logo not upright when screwed in',
      'Crown sits crooked',
      'Crown guards not symmetrical',
      'Difficult to screw down'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'overall-quality',
    title: 'Overall Build Quality',
    description: 'General assessment of finishing, case quality, and overall craftsmanship.',
    howToCheck: 'Look for scratches, dents, fingerprints, dust under crystal, rough edges, poor polishing, or any other quality issues.',
    severity: 'important',
    commonIssues: [
      'Scratches on case or crystal',
      'Dust or particles under crystal',
      'Poor finishing on case edges',
      'Fingerprints on dial',
      'Cyclops misaligned (if applicable)'
    ],
    checked: false,
    userNotes: ''
  }
];

