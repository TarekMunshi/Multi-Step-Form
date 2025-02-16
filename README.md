# Multi-Step Form - Next.js Project

This is a multi-step form built using [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), [React Hook Form](https://react-hook-form.com), and [ShadCN UI](https://shadcn.dev). The project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Brief

This multi-step form allows users to input and validate data across multiple steps. The form includes country, state, and city fields, where the user’s input is validated in real-time based on selected country, state, and corresponding zip codes. This ensures that users provide accurate data before proceeding to the next step of the form.

Key technologies used:
• Next.js: A powerful React framework for server-side rendering and static site generation.
• Tailwind CSS: A utility-first CSS framework to build responsive, modern user interfaces.
• React Hook Form: Manages form state and validation efficiently with easy integration.
• ShadCN UI: Provides elegant and reusable UI components.
• Zip Code Validation: The project validates the entered zip code based on the selected country and state. This feature ensures that only valid combinations of country, state, and city are accepted.

## Live Demo

You can access the live version of this project at: [Live Site](https://multi-step-form-snowy.vercel.app/)

## Prerequisites

Make sure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/) (v18.0.0 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management
- [Git](https://git-scm.com/) (optional)

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/multi-step-form.git
cd multi-step-form

2. Install Dependencies

Install the necessary dependencies using npm, yarn, or your preferred package manager:

npm install
# or
yarn install
# or
pnpm install
# or
bun install

Run the Development Server

Start the development server using the following command:
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

The development server should now be running on http://localhost:3000.

4. Open the Project in Your Browser

Open http://localhost:3000 in your browser to view the multi-step form. The app will automatically reload as you make changes to the code.

5. Editing the Project

You can start editing the app by modifying the files in the app/ directory. The changes will automatically reflect on the browser.

Project Features
	• Multi-step form built using Next.js
	• Tailwind CSS for styling
	• React Hook Form for form handling
	• ShadCN UI components for user interface
```

## Zip Code Information by Country, State, and City

Below is the list of supported countries, states, cities, and their respective zip codes.

United States (US)
• California (CA)
• Los Angeles: 90001
• San Francisco: 94105
• New York (NY)
• New York City: 10001
• Buffalo: 14201

India (IN)
• Maharashtra (MH)
• Mumbai: 400001
• Pune: 411001
• Delhi (DL)
• New Delhi: 110001
• Old Delhi: 110006

United Kingdom (UK)
• England (ENG)
• London: E1
• Manchester: M1
• Scotland (SCO)
• Edinburgh: EH1
• Glasgow: G1

Australia (AU)
• New South Wales (NSW)
• Sydney: 2000
• Newcastle: 2300
• Victoria (VIC)
• Melbourne: 3000
• Geelong: 3220

Canada (CA)
• Ontario (ON)
• Toronto: M5A
• Ottawa: K1P
• British Columbia (BC)
• Vancouver: V5K
• Victoria: V8W
