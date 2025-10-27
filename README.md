# Alex Lee Portfolio

A modern, sunset-themed portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design with sunset color palette
- WakaTime coding activity dashboard
- Project showcase with demo videos
- Skills, experience, and education sections
- Contact form

## Setup

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your WakaTime API key from https://wakatime.com/settings/api-key

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## WakaTime Dashboard

The dashboard displays your coding activity from the last 30 days, including:
- Total coding time
- Best coding day
- Top programming language
- Daily activity chart
- Language breakdown
- Top 5 projects

### Caching

WakaTime data is cached for 30 minutes to respect API rate limits. If the API fails, the last successful response is served.

### Timezone

All date calculations use America/Denver timezone. You can change this by updating the `TZ` environment variable.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Chart.js & react-chartjs-2
- Lucide React icons
- shadcn/ui components

## License

MIT
