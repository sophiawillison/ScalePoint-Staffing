// Hero video banners. Primary sources are professional stock clips; a Google
// sample-bucket source is included as a resilient fallback, and each has a poster
// image so the banner is never blank while loading.
export const HERO_MEDIA = {
  executive: {
    sources: [
      'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-city-at-night-4067-large.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    ],
    poster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=60',
  },
  employer: {
    sources: [
      'https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-business-people-in-a-meeting-seen-from-above-26264-large.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    ],
    poster: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=60',
  },
  about: {
    sources: [
      'https://assets.mixkit.co/videos/preview/mixkit-white-clouds-moving-in-the-sky-time-lapse-4067-large.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    ],
    poster: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1600&q=60',
  },
};
