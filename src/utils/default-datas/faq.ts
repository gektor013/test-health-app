export type Category = {
  title: string
  content: string[]
}

export type NestedItem = {
  title: string
  content: string[]
}

export type Data = Category[]

const data: Data = [
  {
    title: "1. How do I make an appointment with a therapist through the app?",
    content: [
      `Open the app, select the "Make an appointment" section, then select the type of therapist (massage therapist, osteopath, chiropractor, etc.), select the required specialist, choose a convenient date and time, and confirm the appointment.`
    ]
  },
  {
    title: "2. Can I cancel or reschedule a visit through the app?",
    content: ["Can I cancel or reschedule a visit through the app?"]
  },
  {
    title: "3. How can I view my visit history?",
    content: ["How can I view my visit history?"]
  },
  {
    title: "4. How can I get reminders for upcoming visits?",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ]
  },
  {
    title: "5. Can I see the schedule of all available therapists?",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ]
  }
]

export default data
