import { ProgramItem, ColorSwatch } from './types';

export const WEDDING_DATE = new Date('2026-08-22T10:00:00+03:00'); // East Africa Time

export const WEDDING_DETAILS = {
  couple: {
    bride: 'Carol',
    groom: 'John',
    brideFull: 'Caroline',
    groomFull: 'John',
  },
  ceremony: {
    time: '10:00 a.m. - 12:00 p.m.',
    venue: 'SFS Catholic Church, Katani',
    address: 'Katani Road, Syokimau/Katani, Kenya',
    coordinates: { lat: -1.3653, lng: 37.0145 },
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.856983350175!2d37.00049449999999!3d-1.3533481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f716611f7da3f%3A0xe54b9d038fa8022a!2sSt.%20Francis%20de%20Sales%20(SFS)%20Catholic%20Church%20Katani!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske',
  },
  reception: {
    time: '12:00 p.m. onwards',
    venue: 'Brighton International School',
    address: 'Mombasa Road / Syokimau Vicinity, Kenya',
    coordinates: { lat: -1.3524, lng: 36.9421 },
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.919532560594!2d36.936082449999995!3d-1.349195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f73b88939b4b7%3A0x6b7720bc20800d11!2sBrighton%20International%20School!5e0!3m2!1sen!2ske!4v1710000000001!5m2!1sen!2ske',
  },
  contacts: [
    { name: 'Carol RSVP', phone: '+254 724 783 311' },
    { name: 'John RSVP', phone: '+254 714 413 777' },
  ],
  registry: {
    paybill: '4080357',
    accountNo: 'Your Name',
  },
  bibleVerses: [
    {
      text: 'I have found the one whom my soul loves.',
      reference: 'Song of Solomon 3:4',
    },
    {
      text: 'Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.',
      reference: '1 Corinthians 13:4,7',
    },
    {
      text: 'When the time is right, I, the Lord will make it happen.',
      reference: 'Isaiah 60:22',
    }
  ]
};

export const PROGRAM_ITEMS: ProgramItem[] = [
  {
    time: '10:00 AM - 12:00 PM',
    duration: '2 hours',
    title: 'Holy Matrimony Service',
    description: 'Sacrament of Holy Matrimony and Nuptial Mass at SFS Catholic Church, Katani.',
    bullets: ['Processional & Opening Hymn', 'Liturgy of the Word', 'Exchange of Vows & Rings', 'Nuptial Blessing', 'Signing of Certificate & Photo Session'],
    isChurch: true,
  },
  {
    time: '12:00 PM - 1:00 PM',
    duration: '1 hour',
    title: 'Bridal Party Photo Shoot',
    description: 'The couple and bridal party take beautiful memories in the church gardens, while guests transfer to Brighton International School.',
    isChurch: false,
  },
  {
    time: '1:00 PM - 1:30 PM',
    duration: '30 mins',
    title: 'Arrival of Guests',
    description: 'Guests arrive at the Brighton International School reception venue, are ushered to their seats, and enjoy soft background music.',
    isChurch: false,
  },
  {
    time: '1:30 PM - 2:30 PM',
    duration: '1 hour',
    title: 'Welcome & Lunch Service',
    description: 'Welcome addresses, opening prayers, and a sumptuous feast is served to our treasured guests.',
    bullets: ['Welcoming the MC', 'Opening Prayer', 'Blessing of the Food', 'Lunch Buffet Service'],
    isChurch: false,
  },
  {
    time: '2:30 PM - 3:30 PM',
    duration: '1 hour',
    title: 'Grand Bridal Entrance & Dancing',
    description: 'High-energy celebration welcoming the newly married couple back into the reception area with dancing and music.',
    isChurch: false,
  },
  {
    time: '3:30 PM - 4:15 PM',
    duration: '45 mins',
    title: 'Speeches & Presentation of Gifts',
    description: 'Messages of love, advice, and blessings from families, friends, and special groups.',
    bullets: ["Groom's Family Speeches", "Bride's Family Speeches", 'Church representatives', 'Friends, Workmates & Neighbours'],
    isChurch: false,
  },
  {
    time: '4:15 PM - 5:00 PM',
    duration: '45 mins',
    title: 'Cake Cutting Ceremony',
    description: 'The sweet celebration of unity, cake sharing, and honoring parents and wedding helpers.',
    bullets: ['Cake Cutting', 'Serving of parents & grandparents', 'Serving of best couple & priest', 'Cake distribution to guests'],
    isChurch: false,
  },
  {
    time: '5:00 PM - 5:15 PM',
    duration: '15 mins',
    title: 'Vote of Thanks & Closing Ceremony',
    description: 'Expressing gratitude to everyone who made this day possible, followed by the bouquet toss.',
    bullets: ['Vote of thanks by Christopher Mwangi', 'Bouquet Toss', 'Closing Prayer & Blessing'],
    isChurch: false,
  },
  {
    time: '5:15 PM onwards',
    duration: 'Evening',
    title: 'Guest Departure',
    description: 'Guests are free to depart at their own leisure. Thank you for celebrating with us!',
    isChurch: false,
  },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Blush Pink',
    hex: '#F4C2C2',
    textColor: '#884D55',
    description: 'Soft, romantic, and delicate rose tones representing pure love.'
  },
  {
    name: 'Swaying Sage',
    hex: '#B2C2B2',
    textColor: '#3D553D',
    description: 'Gentle, natural earthy green symbolizing growth and tranquility.'
  },
  {
    name: 'Dusty Lavender',
    hex: '#C3B1E1',
    textColor: '#543D7A',
    description: 'An elegant, sophisticated lilac hue representing devotion.'
  },
  {
    name: 'Cream Champagne',
    hex: '#F5E6CC',
    textColor: '#705322',
    description: 'A warm, ivory-tinged gold tone for classic celebration vibes.'
  },
  {
    name: 'Powder Peach',
    hex: '#FFD1B3',
    textColor: '#8C522B',
    description: 'A joyful, warm pastel orange reflecting vitality and sweetness.'
  }
];
