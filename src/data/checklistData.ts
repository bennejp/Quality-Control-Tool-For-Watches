import { ChecklistItem } from '../types';

export const defaultChecklist: ChecklistItem[] = [
  {
    id: 'index-alignment',
    title: 'Index Alignment',
    description: 'Check if all hour markers are properly aligned and evenly spaced around the dial. Note any specific details that bother you.',
    howToCheck: 'Use the Hour Grid overlay to verify each hour marker aligns with the radial lines. Look for any markers that appear tilted, off-center, or misaligned. Watch photo should be top down, angled photos can cause overlay to be inaccurate.',
    recommendedOverlay: 'hour-grid',
    severity: 'critical',
    commonIssues: [
      '6 o\'clock marker is crooked',
      '12 o\'clock market is crooked',
      'Uneven spacing between markers'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'dial-printing',
    title: 'Dial Printing',
    description: 'Check for any defects, crookedness, or poor quality in the dial text and printing.',
    howToCheck: 'Look for smudges, missing ink, crooked text, or spelling errors. Check logo clarity and sharpness. Compare text alignment visually.',
    severity: 'important',
    commonIssues: [
      'Logo is tilted or misaligned',
      'Text is crooked (especially at 6 o\'clock)',
      'Poor print quality or smudging',
      'Uneven letter spacing'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'date-wheel',
    title: 'Date Wheel Alignment/Printing',
    description: 'Verify the date sits centered in the date window and is clearly visible.',
    howToCheck: 'Check multiple dates if possible. Look for consistent centering - some dates may sit better than others on the same disc. Visually compare to the date window edges.',
    severity: 'important',
    commonIssues: [
      'Date is not centered (very common!)',
      'Inconsistent between different dates',
      'Date font is wrong, make sure to compare to GEN'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'hand-alignment',
    title: 'Hand Alignment',
    description: 'Verify all hands are properly aligned and point to their correct positions.',
    howToCheck: 'Use the Hour Grid overlay - it includes center alignment. Check if the hour and minute hands meet at the exact center. Hands should not touch each other or the dial.',
    recommendedOverlay: 'hour-grid',
    severity: 'critical',
    commonIssues: [
      'Hands touch each other when overlapping',
      'Hour hand slightly misaligned with hour marker'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'bezel-alignment',
    title: 'Bezel',
    description: 'Check if the bezel pip (triangle marker at 12 o\'clock) is centered, and any engravings are properly filled.',
    howToCheck: 'Use the Hour Grid overlay. The bezel pip should align exactly with the 12 o\'clock position. Check if the bezel itself is evenly spaced around the case.',
    recommendedOverlay: 'hour-grid',
    severity: 'critical',
    commonIssues: [
      'Bezel pip slightly left or right of center',
      'Bezel is too loose',
      'Bezel engravings poorly filled',
      'Bezel insert not seated properly'
    ],
    checked: false,
    userNotes: ''
  },
  {
    id: 'sel-gaps',
    title: 'Solid End Links (SELs)',
    description: 'Check the gap between the bracelet\'s first link and the case lugs.',
    howToCheck: 'Look at where the bracelet meets the case. The gap should be minimal and even on both sides. Larger gaps indicate poor fitment.',
    severity: 'important',
    commonIssues: [
      'Visible gap on one or both sides',
      'Gap larger on one side than the other',
      'SEL doesn\'t sit flush with case'
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
    id: 'overall-quality',
    title: 'Other Notes',
    description: 'General assessment of finishing, case quality, and overall craftsmanship. Note anything that you bothered with.',
    howToCheck: 'Look for scratches, dents, fingerprints, dust under crystal, rough edges, poor polishing, or any other quality issues.',
    severity: 'important',
    commonIssues: [
      'Scratches on case or crystal',
      'Dust or particles under crystal',
      'Poor finishing on case edges',
      'Cyclops misaligned (if applicable)'
    ],
    checked: false,
    userNotes: ''
  }
];

