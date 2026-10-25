// Shared by CSS and JavaScript. Hold is measured after the hero transition.
export const motion = {
  heroTransition: 1400,
  heroCover: 220,
  heroUnveil: 1180,
  heroHold: 9000,
  imageReveal: 900,
  sectionImage: 900,
  sectionText: 650,
  sectionStep: 140,
  textEntrance: 700,
  detailEntrance: 550,
  detailExit: 320,
  feedback: 180,
  filter: 260,
  route: 220,
  gallery: 1100,
  depth: 180,
  ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
} as const;
export const heroCycle = motion.heroTransition + motion.heroHold;
export function installMotionTokens() {
  for (const [name, value] of Object.entries(motion)) {
    const property = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    document.documentElement.style.setProperty(
      `--motion-${property}`,
      typeof value === 'number' ? `${value}ms` : value,
    );
  }
}
