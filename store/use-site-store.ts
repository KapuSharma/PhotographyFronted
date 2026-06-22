import { create } from "zustand";

/* Booking selections (the step-by-step flow), mirrored from the prototype's S.booking */
export type BookingState = {
  service: string;
  pkg: string;
  date: number;
  slot: string;
  hold: boolean;
};

type SiteStore = {
  /* mobile nav drawer */
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  toggleNav: () => void;

  /* floating AI chat widget */
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;

  /* gallery category filter */
  galleryFilter: string;
  setGalleryFilter: (cat: string) => void;

  /* website template:
     - serverTemplate: the real choice resolved on the server (backend, by domain)
     - templateOverride: a client-side preview override (switcher / ?previewTemplate)
     The displayed template is `templateOverride ?? serverTemplate`. */
  serverTemplate: string;
  setServerTemplate: (slug: string) => void;
  templateOverride: string | null;
  setTemplateOverride: (slug: string | null) => void;

  /* booking flow */
  bookingStep: number;
  setBookingStep: (step: number) => void;
  booking: BookingState;
  setBooking: (patch: Partial<BookingState>) => void;
};

export const useSiteStore = create<SiteStore>((set) => ({
  navOpen: false,
  setNavOpen: (navOpen) => set({ navOpen }),
  toggleNav: () => set((s) => ({ navOpen: !s.navOpen })),

  chatOpen: false,
  setChatOpen: (chatOpen) => set({ chatOpen }),

  galleryFilter: "All",
  setGalleryFilter: (galleryFilter) => set({ galleryFilter }),

  serverTemplate: "aurora",
  setServerTemplate: (serverTemplate) => set({ serverTemplate }),
  templateOverride: null,
  setTemplateOverride: (templateOverride) => set({ templateOverride }),

  bookingStep: 0,
  setBookingStep: (bookingStep) => set({ bookingStep }),
  booking: { service: "Wedding", pkg: "signature", date: 18, slot: "3:00 PM", hold: false },
  setBooking: (patch) => set((s) => ({ booking: { ...s.booking, ...patch } })),
}));
