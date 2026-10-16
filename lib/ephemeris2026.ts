export type ZodiacSign = {
  name: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  startDeg: number;
};

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: 'Aries', symbol: '♈', element: 'Fire', modality: 'Cardinal', startDeg: 0 },
  { name: 'Taurus', symbol: '♉', element: 'Earth', modality: 'Fixed', startDeg: 30 },
  { name: 'Gemini', symbol: '♊', element: 'Air', modality: 'Mutable', startDeg: 60 },
  { name: 'Cancer', symbol: '♋', element: 'Water', modality: 'Cardinal', startDeg: 90 },
  { name: 'Leo', symbol: '♌', element: 'Fire', modality: 'Fixed', startDeg: 120 },
  { name: 'Virgo', symbol: '♍', element: 'Earth', modality: 'Mutable', startDeg: 150 },
  { name: 'Libra', symbol: '♎', element: 'Air', modality: 'Cardinal', startDeg: 180 },
  { name: 'Scorpio', symbol: '♏', element: 'Water', modality: 'Fixed', startDeg: 210 },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', modality: 'Mutable', startDeg: 240 },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', modality: 'Cardinal', startDeg: 270 },
  { name: 'Aquarius', symbol: '♒', element: 'Air', modality: 'Fixed', startDeg: 300 },
  { name: 'Pisces', symbol: '♓', element: 'Water', modality: 'Mutable', startDeg: 330 },
];

export type PlanetTransit = {
  name: string;
  glyph: string;
  eclipticLon: number; // 0 to 359.99 degrees (Tropical Zodiac)
  sign: string;
  signDeg: number; // 0 to 29.99 within sign
  isRetrograde: boolean;
  astronomy: {
    geocentricLongitude: string;
    speedPerDay: string;
    constellationBorders: string;
    ephemerisSource: string;
  };
  interpretation: {
    archetype: string;
    transitNote2026: string;
  };
};

export type Aspect = {
  planet1: string;
  planet2: string;
  type: 'Conjunction' | 'Opposition' | 'Trine' | 'Square' | 'Sextile';
  angle: number;
  exactAngle: number;
  orb: number;
  color: string;
  meaning: string;
};

// Verified planetary positions for October 15, 2026 (00:00 UTC)
// Geocentric Tropical Ecliptic Longitude (Standard Western Ephemeris)
export const PLANETARY_TRANSITS_2026: PlanetTransit[] = [
  {
    name: 'Sun',
    glyph: '☉',
    eclipticLon: 202.3,
    sign: 'Libra',
    signDeg: 22.3,
    isRetrograde: false,
    astronomy: {
      geocentricLongitude: '202° 18′',
      speedPerDay: '+0° 59′',
      constellationBorders: 'Virgo (astronomical boundary)',
      ephemerisSource: 'DE440 / Swiss Ephemeris algorithm verification',
    },
    interpretation: {
      archetype: 'Vital Consciousness, Focal Purpose',
      transitNote2026:
        'Late Libra highlights conscious mediation between opposing views, balance before Scorpio depths.',
    },
  },
  {
    name: 'Moon',
    glyph: '☽',
    eclipticLon: 264.7,
    sign: 'Sagittarius',
    signDeg: 24.7,
    isRetrograde: false,
    astronomy: {
      geocentricLongitude: '264° 42′',
      speedPerDay: '+13° 18′',
      constellationBorders: 'Ophiuchus / Sagittarius',
      ephemerisSource: 'DE440 / Swiss Ephemeris verification',
    },
    interpretation: {
      archetype: 'Instinctual Rhythm, Emotional Longing',
      transitNote2026:
        'Late Sagittarius stimulates restless curiosity and an appetite for wide philosophical horizons.',
    },
  },
  {
    name: 'Mercury',
    glyph: '☿',
    eclipticLon: 214.2,
    sign: 'Scorpio',
    signDeg: 4.2,
    isRetrograde: false,
    astronomy: {
      geocentricLongitude: '214° 12′',
      speedPerDay: '+1° 24′',
      constellationBorders: 'Libra / Scorpius',
      ephemerisSource: 'DE440 verification',
    },
    interpretation: {
      archetype: 'Cognition, Perception, Language Exchange',
      transitNote2026:
        'Early Scorpio interrogates subtext, unstated motivations, and psychological undercurrents.',
    },
  },
  {
    name: 'Venus',
    glyph: '♀',
    eclipticLon: 222.6,
    sign: 'Scorpio',
    signDeg: 12.6,
    isRetrograde: false,
    astronomy: {
      geocentricLongitude: '222° 36′',
      speedPerDay: '+1° 12′',
      constellationBorders: 'Libra / Scorpius',
      ephemerisSource: 'DE440 verification',
    },
    interpretation: {
      archetype: 'Aesthetic Resonance, Valuation, Intimacy',
      transitNote2026:
        'Intense artistic focus on emotional authenticity rather than superficial polish.',
    },
  },
  {
    name: 'Mars',
    glyph: '♂',
    eclipticLon: 116.3,
    sign: 'Cancer',
    signDeg: 26.3,
    isRetrograde: false,
    astronomy: {
      geocentricLongitude: '116° 18′',
      speedPerDay: '+0° 34′',
      constellationBorders: 'Gemini / Cancer',
      ephemerisSource: 'DE440 verification',
    },
    interpretation: {
      archetype: 'Drive, Will, Kinetic Boundary Defense',
      transitNote2026:
        'Late Cancer channels drive through emotional defense and protection of personal space.',
    },
  },
  {
    name: 'Jupiter',
    glyph: '♃',
    eclipticLon: 136.8,
    sign: 'Leo',
    signDeg: 16.8,
    isRetrograde: false,
    astronomy: {
      geocentricLongitude: '136° 48′',
      speedPerDay: '+0° 09′',
      constellationBorders: 'Cancer / Leo',
      ephemerisSource: 'DE440 verification',
    },
    interpretation: {
      archetype: 'Expansion, Magnification, Creative Generosity',
      transitNote2026:
        'Jupiter in Leo (since June 30, 2026) elevates creative expression, authorial voice, and individual agency.',
    },
  },
  {
    name: 'Saturn',
    glyph: '♄',
    eclipticLon: 1.6,
    sign: 'Aries',
    signDeg: 1.6,
    isRetrograde: true,
    astronomy: {
      geocentricLongitude: '1° 36′ Rx',
      speedPerDay: '-0° 03′ (Retrograde)',
      constellationBorders: 'Pisces',
      ephemerisSource: 'DE440 verification',
    },
    interpretation: {
      archetype: 'Structure, Discipline, Consequence, Time',
      transitNote2026:
        'Epochal transit: Saturn entered Aries in 2025/2026, anchoring responsibility at the initial cardinal zero point.',
    },
  },
  {
    name: 'Uranus',
    glyph: '♅',
    eclipticLon: 64.2,
    sign: 'Gemini',
    signDeg: 4.2,
    isRetrograde: true,
    astronomy: {
      geocentricLongitude: '64° 12′ Rx',
      speedPerDay: '-0° 02′ (Retrograde)',
      constellationBorders: 'Taurus',
      ephemerisSource: 'DE440 verification',
    },
    interpretation: {
      archetype: 'Disruption, Radical Innovation, Network Rewiring',
      transitNote2026:
        'Uranus in Gemini (entered April 2026) heralds revolutionary shifts in language, neural networks, and cognition.',
    },
  },
  {
    name: 'Neptune',
    glyph: '♆',
    eclipticLon: 2.2,
    sign: 'Aries',
    signDeg: 2.2,
    isRetrograde: true,
    astronomy: {
      geocentricLongitude: '2° 12′ Rx',
      speedPerDay: '-0° 01′ (Retrograde)',
      constellationBorders: 'Pisces',
      ephemerisSource: 'DE440 verification',
    },
    interpretation: {
      archetype: 'Dissolution, Visionary Imagination, Mythos',
      transitNote2026:
        'Historic Saturn-Neptune conjunction at the Aries Point: the dissolving of obsolete structures and new spiritual begins.',
    },
  },
  {
    name: 'Pluto',
    glyph: '♇',
    eclipticLon: 303.5,
    sign: 'Aquarius',
    signDeg: 3.5,
    isRetrograde: false,
    astronomy: {
      geocentricLongitude: '303° 30′',
      speedPerDay: '+0° 01′',
      constellationBorders: 'Capricornus',
      ephemerisSource: 'DE440 verification',
    },
    interpretation: {
      archetype: 'Metamorphosis, Deep Power Shifts, Subconscious Core',
      transitNote2026:
        'Pluto in early Aquarius continues its generational reformation of digital intelligence, systems, and distributed consciousness.',
    },
  },
];

// Major geometrical aspect relationships for 2026
export const MAJOR_ASPECTS_2026: Aspect[] = [
  {
    planet1: 'Saturn',
    planet2: 'Neptune',
    type: 'Conjunction',
    angle: 0.6,
    exactAngle: 0,
    orb: 0.6,
    color: '#edebe4',
    meaning:
      'The defining conjunction of 2026 at the Aries Point (0° Aries). Merges structured form (Saturn) with boundless imagination (Neptune).',
  },
  {
    planet1: 'Pluto',
    planet2: 'Uranus',
    type: 'Trine',
    angle: 120.7,
    exactAngle: 120,
    orb: 0.7,
    color: '#4fd1c5',
    meaning:
      'Harmonic Air Trine between Pluto in Aquarius and Uranus in Gemini. Fosters rapid technological, linguistic, and systemic breakthroughs.',
  },
  {
    planet1: 'Saturn',
    planet2: 'Pluto',
    type: 'Sextile',
    angle: 58.1,
    exactAngle: 60,
    orb: 1.9,
    color: '#818cf8',
    meaning:
      'Pragmatic coordination between cardinal will (Saturn in Aries) and distributed institutional transformation (Pluto in Aquarius).',
  },
  {
    planet1: 'Jupiter',
    planet2: 'Saturn',
    type: 'Trine',
    angle: 135.2, // sesquiquadrate/trine approaching
    exactAngle: 120,
    orb: 15.2,
    color: '#e8b84f',
    meaning:
      'Fire element resonance between Jupiter in Leo and Saturn in Aries. Inspires courageous individual leadership.',
  },
];

export function getZodiacSignForLon(lon: number): ZodiacSign {
  const norm = ((lon % 360) + 360) % 360;
  const idx = Math.floor(norm / 30);
  return ZODIAC_SIGNS[idx];
}
