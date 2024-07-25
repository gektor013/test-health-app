import imageOnboarding1 from "#/images/onboarding_1.png";
import imageOnboarding2 from "#/images/onboarding_2.png";
import imageOnboarding3 from "#/images/onboarding_3.png";
import { OnboardingSlide } from "../types";

export const slides: OnboardingSlide[] = [
  {
    image: imageOnboarding1,
    title: "Welcome to the Bodybalance Gym!",
    description:
      "Manage your health with ease: book appointments, view visit history and educational videos - all in one app",
  },
  {
    image: imageOnboarding2,
    title: "Easy appointment booking",
    description:
      "Choose a convenient time and doctor in a few clicks. Notifications help you not miss important appointments.",
  },
  {
    image: imageOnboarding3,
    title: "Educational Videos\n for You",
    description:
      "Watch helpful videos from our experts. Improve your knowledge and take care of your health with us",
  },
];
