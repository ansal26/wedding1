/**
 * WEDDING INVITATION CONFIGURATION
 * Extracted accurately from Image 2 (Actual Wedding Card).
 */

export const weddingData = {
  // Configured wedding year: 2026
  weddingYear: 2026,

  // Sacred Invocation
  invocations: {
    om: "ॐ",
    ganesh: "॥ श्री गणेशाय नमः ॥",
    introScript: "A love story blessed by heaven",
    blessingText: "With the blessings of our beloved family & the grace of God",
    invitationNote: "We would be delighted to have your gracious presence on this auspicious occasion of our marriage.",
    subhVivah: "॥ Shubh Vivah ॥",
  },

  // Couple Details (Groom is "ASHISH", Village is "Chatier")
  groom: {
    name: "ASHISH",
    fullName: "ASHISH KUMAR",
    parents: "S/O Mrs. Pawana Devi and Mr. Tarlok Chand",
    address: {
      name: "ASHISH KUMAR",
      village: "Village - Chatier",
      po: "PO - Yol",
      tehsil: "Tehsil - Dharamshala",
      district: "District - Kangra, (HP)",
      pin: "Pin - 176052",
      fullText: "Village - Chatier, PO - Yol, Tehsil - Dharamshala, District - Kangra (HP) - 176052",
      mapQuery: "Chatier, Yol, Dharamshala, Kangra, Himachal Pradesh 176052",
    },
  },

  bride: {
    name: "SHIVANGI",
    parents: "D/O Mrs. Anita and Mr. Hemraj",
    address: {
      name: "SHIVANGI",
      village: "Village - Rehlu",
      po: "Post Office - Rehlu",
      tehsil: "Tehsil - Shahpur",
      district: "District - Kangra, (HP)",
      pin: "Pin - 176206",
      fullText: "Village - Rehlu, Post Office - Rehlu, Tehsil - Shahpur, District - Kangra (HP) - 176206",
      mapQuery: "Rehlu, Shahpur, Kangra, Himachal Pradesh 176206",
    },
  },

  // Wedding Dates
  dates: {
    summary: "11, 12, 13 DECEMBER",
    fullList: ["11 December", "12 December", "13 December"],
    month: "DECEMBER",
    days: ["11", "12", "13"],
    startDate: { year: 2026, month: 11, day: 11, hour: 15, minute: 0 },
  },

  // Our Story
  story: {
    subtitle: "Two hearts, one love. A beautiful journey that started with a smile and leads to forever.",
    fullStory:
      "Two souls, two families, united under the watchful peaks of the Dhauladhar mountains in Himachal Pradesh. Blessed by elders and guided by destiny, our journey from first conversations to lifelong companions has been filled with laughter, respect, and mutual devotion. As we take the sacred seven vows (Saptapadi) around the holy fire, we seek your presence and blessings to make this new chapter truly unforgettable.",
  },

  // Wedding Schedule
  schedule: [
    {
      date: "11 DECEMBER",
      dayTitle: "Pre-Wedding Festivities",
      events: [
        {
          time: "3:00 PM",
          title: "Ladies Sangeet",
          description: "An evening of celebratory Himachali folk songs, music, dance & joyous melodies.",
          category: "music",
          media: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
        },
        {
          time: "5:00 PM",
          title: "Mehndi",
          description: "Adorning hands with auspicious henna patterns, music, laughter & refreshments.",
          category: "henna",
          media: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      date: "12 DECEMBER",
      dayTitle: "Auspicious Ceremonies & Barat",
      events: [
        {
          time: "8:00 AM",
          title: "Samuhat (Haldi)",
          description: "Purifying turmeric ritual applying golden paste with fragrant flowers.",
          category: "haldi",
          media: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=800&q=80",
        },
        {
          time: "11:30 AM",
          title: "Shanti Havan",
          description: "Sacred Vedic fire ritual seeking peace, divine prosperity & universal blessings.",
          category: "havan",
          media: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=800&q=80",
        },
        {
          time: "2:00 PM",
          title: "Sehra Bandi",
          description: "Ceremonial tying of the royal groom's turban and traditional sehra.",
          category: "sehra",
          media: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
        },
        {
          time: "4:00 PM",
          title: "Departure of Barat",
          description: "The grand wedding procession heads out with dhol, dance & celebration.",
          category: "barat",
          media: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      date: "13 DECEMBER",
      dayTitle: "Welcoming the Bride & Celebrations",
      events: [
        {
          time: "9:00 AM",
          title: "Vadhu Pervesh",
          description: "Traditional auspicious Grihapravesh ceremony welcoming the newlywed bride.",
          category: "welcome",
          media: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        },
        {
          time: "12:00 PM to 04:00 PM",
          title: "Dham Feast",
          description: "The traditional royal Kangri wedding feast prepared by hereditary Boti chefs.",
          category: "feast",
          media: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=800&q=80",
        },
        {
          time: "7:00 PM",
          title: "Nuwala",
          description: "Auspicious Shiva thanksgiving prayer & devotional ceremony of gratitude.",
          category: "prayer",
          media: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  ],

  // Flattened events for Scroll01
  eventList: [
    {
      date: "11 DEC",
      time: "3:00 PM",
      title: "Ladies Sangeet",
      description: "An evening of celebratory Himachali folk songs, music, dance & joyous melodies.",
      media: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
    },
    {
      date: "11 DEC",
      time: "5:00 PM",
      title: "Mehndi",
      description: "Adorning hands with auspicious henna patterns, music, laughter & refreshments.",
      media: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
    },
    {
      date: "12 DEC",
      time: "8:00 AM",
      title: "Samuhat (Haldi)",
      description: "Purifying turmeric ritual applying golden paste with fragrant flowers.",
      media: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=1000&q=85",
    },
    {
      date: "12 DEC",
      time: "11:30 AM",
      title: "Shanti Havan",
      description: "Sacred Vedic fire ritual seeking peace, divine prosperity & universal blessings.",
      media: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1000&q=85",
    },
    {
      date: "12 DEC",
      time: "2:00 PM",
      title: "Sehra Bandi",
      description: "Ceremonial tying of the royal groom's turban and traditional sehra.",
      media: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85",
    },
    {
      date: "12 DEC",
      time: "4:00 PM",
      title: "Departure of Barat",
      description: "The grand wedding procession heads out with dhol, dance & celebration.",
      media: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    },
    {
      date: "13 DEC",
      time: "9:00 AM",
      title: "Vadhu Pervesh",
      description: "Traditional auspicious Grihapravesh ceremony welcoming the newlywed bride.",
      media: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
    },
    {
      date: "13 DEC",
      time: "12:00 PM to 04:00 PM",
      title: "Dham Feast",
      description: "The traditional royal Kangri wedding feast prepared by hereditary Boti chefs.",
      media: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=1000&q=85",
    },
    {
      date: "13 DEC",
      time: "7:00 PM",
      title: "Nuwala",
      description: "Auspicious Shiva thanksgiving prayer & devotional ceremony of gratitude.",
      media: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85",
    },
  ],

  // RSVP Information
  rsvp: {
    title: "R.S.V.P.",
    subtitle: "Kindly let us know of your gracious presence",
    familyMembers: ["Trishu", "Duggu", "Aaru", "Harshi", "Riyanshu"],
    contacts: [
      { name: "Family Helpline", phone: "8627064056", display: "+91 86270 64056" },
      { name: "Wedding Coordinator", phone: "8894815905", display: "+91 88948 15905" },
    ],
  },

  // Photos
  photos: {
    hero: "/1.jpg",
    story: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1000&q=85",
    details: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    tradition: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
  },
};
