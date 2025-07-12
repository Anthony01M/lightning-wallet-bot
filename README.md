# LNWallet Bot
> LNWallet Bot is a public Discord bot that enables both **user-installed** and **guild-installed** Lightning wallet functionality.

## ⚡ Features
1. 🪪 User & Server Profiles
2. 💸 Lightning Deposit / Withdraw
3. 📦 Store & Level Reward System
4. 👥 Friends & Blocking System
5. 🧨 Drop, Rain, Red-Packet, Mine-Drop Mini-Games
6. 📈 Level progression for users and servers
7. 🧾 Transparent transaction logs
8. 🗳️ Voting + case reward system (**planned feature**)
9. 💼 Admin storefronts & booster support

## 📄 Documentation
> The LNWallet Bot documentation is currently a **work in progress** and subject to change at any time.

- **[Bot Features & Commands](docs/bot-features.md)** - Complete command documentation and feature overview
- **[API Documentation](docs/api.md)** - REST API endpoints and usage *(coming soon)*
- **[Website Documentation](docs/website.md)** - Frontend features and user guide *(coming soon)*

## 🏗️ Architecture
LNWallet Bot is a full-stack application consisting of:
- **Discord Bot** - Core bot functionality with slash commands
- **REST API** - Backend services for data management
- **Website** - Frontend dashboard and user interface

## 🛠️ Tech Stack
> LNWallet Bot is built using the following languages, libraries, and frameworks:

### `🧪` Language
- TypeScript

### `⚙️` Runtime
- Node.js

### `💻` Frontend
- Vite
- React
- Tailwind CSS

### `🧠` Backend
- Drizzle ORM - TypeScript ORM and query builder

### `🔌` API
- rjweb-server

### `🤖` Discord Bot
- discord.js

### `💾` Database
- MariaDB

### `⚡` Lightning Integration
- [Speed Wallet](https://links.speed.app/referral?referral_code=G616LL) - Primary wallet provider

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm
- Discord Application & Bot Token
- Speed Wallet API credentials

### Installation
```bash
# Clone the repository
git clone https://github.com/Anthony01M/lightning-wallet-bot.git
cd lightning-wallet-bot

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Configure your environment variables
# Edit .env with your Discord bot token, database credentials, etc.

# Build the frontend
cd lib && pnpm build && cd ..

# Start development servers
pnpm dev
```

## 📚 Project Structure
```
lnwallet-bot/
├── src/
│   ├── bot/          # Discord bot implementation
│   ├── api/          # Contains the REST API and web server (starts on the same port)
│   ├── shared/       # Shared utilities and types
│   └── classes/      # Shared class definitions
├── lib/              # Built bot (includes api, shared, and classes)
├── drizzle/          # Database schemas and migrations
├── public/           # React application
│   ├── dist/         # Built frontend
│   └── src/          # Frontend source code
├── docs/             # Documentation files
├── .github/          # GitHub templates and workflows
└── README.md
```

## 🤝 Contributing
Please read the [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

## 📋 Roadmap
- [ ] **Phase 1**: Core Discord bot functionality
- [ ] **Phase 2**: REST API development
- [ ] **Phase 3**: Frontend dashboard
- [ ] **Phase 4**: Advanced features (voting system, offers)

## 🔒 Security
- All sensitive data is encrypted
- API endpoints are properly secured
- Bot tokens and private keys are never exposed
- Regular security audits and updates

## 📞 Support
- **Discord**: [Join our support server](https://discord.gg/JgPqJqk)
- **Email**: anthony@sir.systems
- **Issues**: [GitHub Issues](https://github.com/Anthony01M/lightning-wallet-bot/issues)

## 📄 License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- [Speed Wallet](https://links.speed.app/referral?referral_code=G616LL) for Lightning Network integration
- Discord.js community for excellent documentation
- All contributors who help make this project better

## ⚠️ Disclaimer
This bot is in active development. Features may change, and the bot should be used at your own risk. Always verify transactions and keep backups of important data.