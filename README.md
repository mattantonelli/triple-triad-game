# Triple Triad Online

Final Fantasy XIV's Triple Triad running on [Next.js](https://nextjs.org/). This application is a work in progress. Data provided by [Another Triple Triad Tracker](https://triad.raelys.com/).

## Installation

```bash
git clone https://github.com/mattantonelli/triple-triad-game
cd triple-triad-game
npm install
```

### Setting up the database

This application uses a PostgreSQL database running on Vercel. You will need to configure a `.env` file in the root directory and generate a [prisma](https://www.prisma.io/) client. The client must be re-generated if any changes are made to the schema.

```bash
cp .env.example .env # Set these values appropriately
npx prisma generate
```

### Starting the server

```bash
npm run dev
```

---

FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.

FINAL FANTASY XIV © SQUARE ENIX CO., LTD.