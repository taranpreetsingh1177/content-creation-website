export const siteConfig = {
  name: "Jacob Vos",
  title: "Design Engineer",
  established: "EST. 1997",
  email: "hello@jacobvos.com",
  bio: {
    intro: "Hey, I'm Jacob a design engineer at",
    company: "Walt",
    location: "Lagos, Portugal",
    specialty:
      "where I specialize in crafting polished web interfaces with a strong focus on accessibility, web animation, and product design.",
  },
  work: {
    label: "WORK",
    description:
      "Below are some select projects, full walkthroughs on request",
  },
  experience: {
    label: "EXPERIENCE",
    description:
      "Throughout my career, I've worked on various projects, from building scalable systems to designing user-friendly interfaces. Here's a brief overview.",
    items: [
      {
        period: "2024 — NOW",
        badge: "Live Project",
        role: "Design engineer",
        company: "Walt",
        logoType: "walt",
        link: "https://walt.co",
        description:
          "Designed a real-time waitlist and dashboard for monitoring sign ups with live updates, reducing latency by 15%",
      },
      {
        period: "2021 — 2024",
        badge: "Internship",
        role: "Design engineer",
        company: "Omega",
        logoType: "omega",
        link: "https://omega.dev",
        description:
          "Designed and built an admin panel for enterprise clients, scaling to support over 500 active users as well as designing high-quality user flows.",
      },
      {
        period: "2017 — 2020",
        badge: "Full-time",
        role: "Software engineer",
        company: "Theta",
        logoType: "theta",
        link: "https://theta.sh",
        description:
          "Developed the user interface for a crypto payment gateway, ensuring compliance with global accessibility standards.",
      },
    ],
  },
  contact: {
    label: "CONTACT",
    description: "You can contact me using the form or via the links below.",
    socials: [
      {
        platform: "Email",
        handle: "hello@jacobvos.com",
        href: "mailto:hello@jacobvos.com",
      },
      {
        platform: "X.com",
        handle: "@jacob",
        href: "https://x.com/jacob",
      },
      {
        platform: "GitHub",
        handle: "@jv",
        href: "https://github.com/jv",
      },
      {
        platform: "LinkedIn",
        handle: "/in/jacobvos",
        href: "https://linkedin.com/in/jacobvos",
      },
    ],
  },
} as const;
