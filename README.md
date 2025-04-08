# Generative UI/UX Designer

A web application that generates UI/UX designs from natural language prompts with live preview and code export.

## Features

- **AI-Powered Design Generation**: Convert text descriptions into UI designs using OpenAI's GPT-4o model
- **Live Preview**: View generated designs in real-time with device responsiveness options
- **Code Export**: Get production-ready React, HTML, CSS, and Tailwind code
- **Design Customization**: Control layout style, color theme, hover states, and more
- **Persistent Storage**: Save and retrieve your designs with PostgreSQL database
- **Dark Mode Support**: Toggle between light and dark themes

## Technology Stack

- **Frontend**: React, Tailwind CSS, Shadcn UI components
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: OpenAI GPT-4o API
- **Deployment**: Docker containerization

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/Tanmayjoshi-3601/generative-ui-designer.git
cd generative-ui-designer
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following:
```
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=postgres://username:password@localhost:5432/database_name
```

4. Run database migrations
```bash
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

## Docker Deployment

This project includes Docker configuration for easy deployment:

```bash
docker-compose up -d
```

## License

MIT

## Acknowledgments

- OpenAI for their powerful GPT-4o API
- Shadcn UI for beautiful components