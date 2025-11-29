
export type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  kycStatus: "PENDING" | "VERIFIED" | "REJECTED" | "NOT_STARTED";
  kycData?: {
    idDocument: string;
    address: string;
  };
  banking?: {
    bankName?: string;
    accountNumber?: string;
    cryptoWallet?: string; // USDT TRC20
  };
  balance: number;
};

export interface Asset {
  id: string;
  name: string;
  type: 'SAFE' | 'HIGH_YIELD';
  roi: number; // Monthly ROI in %
  minInvestment: number;
  description: string;
  totalPoolSize: number;
  currentFloating: number;
}

export interface Investment {
  id: string;
  userId: string;
  assetId: string;
  amount: number;
  timestamp: number;
  status: 'ACTIVE' | 'COMPLETED';
}

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  timestamp: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'INVESTMENT' | 'PROFIT';
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  timestamp: number;
  description: string;
}

class MockDB {
  private users: UserProfile[] = [
    {
      id: "user_1",
      email: "client@institution.com",
      firstName: "Institutional",
      lastName: "Client",
      kycStatus: "VERIFIED",
      balance: 250000 // $250k starting balance
    }
  ];

  private assets: Asset[] = [
    // SAFE ASSETS (6% Fixed)
    { id: "safe_1", name: "Treasury Bond Alpha", type: "SAFE", roi: 6, minInvestment: 100, description: "Low-risk government backed securities.", totalPoolSize: 50000000, currentFloating: 2.1 },
    { id: "safe_2", name: "Corporate Blue Chip", type: "SAFE", roi: 6, minInvestment: 100, description: "Debt from top-tier global corporations.", totalPoolSize: 25000000, currentFloating: 1.8 },
    { id: "safe_3", name: "Municipal Infrastructure", type: "SAFE", roi: 6, minInvestment: 100, description: "Funding for essential public projects.", totalPoolSize: 15000000, currentFloating: 1.5 },
    { id: "safe_4", name: "Global Sovereign Debt", type: "SAFE", roi: 6, minInvestment: 100, description: "Diversified sovereign bonds portfolio.", totalPoolSize: 40000000, currentFloating: 2.3 },
    { id: "safe_5", name: "Real Estate Trust A", type: "SAFE", roi: 6, minInvestment: 100, description: "Commercial real estate income fund.", totalPoolSize: 30000000, currentFloating: 3.1 },
    { id: "safe_6", name: "Utility Sector Bond", type: "SAFE", roi: 6, minInvestment: 100, description: "Stable returns from utility companies.", totalPoolSize: 12000000, currentFloating: 1.2 },
    { id: "safe_7", name: "Tech Dividend Fund", type: "SAFE", roi: 6, minInvestment: 100, description: "Income from established tech giants.", totalPoolSize: 60000000, currentFloating: 4.5 },
    { id: "safe_8", name: "Healthcare Yield", type: "SAFE", roi: 6, minInvestment: 100, description: "Bonds from major healthcare providers.", totalPoolSize: 22000000, currentFloating: 1.9 },
    { id: "safe_9", name: "Consumer Staples", type: "SAFE", roi: 6, minInvestment: 100, description: "Defensive consumer goods sector.", totalPoolSize: 18000000, currentFloating: 1.4 },
    { id: "safe_10", name: "Green Energy Bond", type: "SAFE", roi: 6, minInvestment: 100, description: "Renewable energy project financing.", totalPoolSize: 35000000, currentFloating: 2.8 },
    { id: "safe_11", name: "Logistics REIT", type: "SAFE", roi: 6, minInvestment: 100, description: "Warehousing and logistics real estate.", totalPoolSize: 28000000, currentFloating: 3.5 },
    { id: "safe_12", name: "Precious Metals Debt", type: "SAFE", roi: 6, minInvestment: 100, description: "Secured lending to mining companies.", totalPoolSize: 10000000, currentFloating: 5.2 },

    // HIGH YIELD ASSETS (6-24% Variable)
    { id: "high_1", name: "Forex Scalping Bot", type: "HIGH_YIELD", roi: 24, minInvestment: 100, description: "High-frequency currency trading algorithm.", totalPoolSize: 5000000, currentFloating: 18.4 },
    { id: "high_2", name: "Crypto Arbitrage", type: "HIGH_YIELD", roi: 22, minInvestment: 100, description: "Exploiting price differences across exchanges.", totalPoolSize: 8000000, currentFloating: 21.2 },
    { id: "high_3", name: "DeFi Yield Farming", type: "HIGH_YIELD", roi: 20, minInvestment: 100, description: "Liquidity provision in decentralized protocols.", totalPoolSize: 12000000, currentFloating: 15.7 },
    { id: "high_4", name: "Emerging Market Equity", type: "HIGH_YIELD", roi: 18, minInvestment: 100, description: "Growth stocks in developing economies.", totalPoolSize: 15000000, currentFloating: 12.3 },
    { id: "high_5", name: "Venture Capital Fund", type: "HIGH_YIELD", roi: 24, minInvestment: 100, description: "Early-stage tech startup investments.", totalPoolSize: 20000000, currentFloating: 25.6 },
    { id: "high_6", name: "Distressed Debt", type: "HIGH_YIELD", roi: 19, minInvestment: 100, description: "Turnaround opportunities in corporate debt.", totalPoolSize: 7000000, currentFloating: 14.1 },
    { id: "high_7", name: "Options Alpha Strategy", type: "HIGH_YIELD", roi: 23, minInvestment: 100, description: "Advanced derivatives trading strategy.", totalPoolSize: 6000000, currentFloating: 19.8 },
    { id: "high_8", name: "Global Macro Hedge", type: "HIGH_YIELD", roi: 17, minInvestment: 100, description: "Betting on large-scale economic trends.", totalPoolSize: 30000000, currentFloating: 11.5 },
    { id: "high_9", name: "Biotech Innovation", type: "HIGH_YIELD", roi: 21, minInvestment: 100, description: "High-growth potential biotech stocks.", totalPoolSize: 9000000, currentFloating: 16.9 },
    { id: "high_10", name: "AI & Robotics", type: "HIGH_YIELD", roi: 24, minInvestment: 100, description: "Investing in the future of automation.", totalPoolSize: 25000000, currentFloating: 28.4 },
    { id: "high_11", name: "Space Exploration", type: "HIGH_YIELD", roi: 22, minInvestment: 100, description: "Commercial aerospace and satellite tech.", totalPoolSize: 11000000, currentFloating: 13.2 },
    { id: "high_12", name: "Quantum Computing", type: "HIGH_YIELD", roi: 24, minInvestment: 100, description: "Next-gen computing infrastructure.", totalPoolSize: 14000000, currentFloating: 22.1 },
  ];

  private investments: Investment[] = [
    { id: "inv_seed_1", userId: "user_1", assetId: "safe_1", amount: 50000, timestamp: Date.now() - 86400000 * 30, status: "ACTIVE" },
    { id: "inv_seed_2", userId: "user_1", assetId: "high_1", amount: 15000, timestamp: Date.now() - 86400000 * 15, status: "ACTIVE" },
    { id: "inv_seed_3", userId: "user_1", assetId: "high_5", amount: 25000, timestamp: Date.now() - 86400000 * 5, status: "ACTIVE" }
  ];

  private tickets: Ticket[] = [];

  private transactions: Transaction[] = [
    { id: "tx_seed_1", userId: "user_1", type: "DEPOSIT", amount: 340000, status: "COMPLETED", timestamp: Date.now() - 86400000 * 60, description: "Initial Deposit" },
    { id: "tx_seed_2", userId: "user_1", type: "INVESTMENT", amount: 50000, status: "COMPLETED", timestamp: Date.now() - 86400000 * 30, description: "Investment in Treasury Bond Alpha" },
    { id: "tx_seed_3", userId: "user_1", type: "INVESTMENT", amount: 15000, status: "COMPLETED", timestamp: Date.now() - 86400000 * 15, description: "Investment in Forex Scalping Bot" },
    { id: "tx_seed_4", userId: "user_1", type: "INVESTMENT", amount: 25000, status: "COMPLETED", timestamp: Date.now() - 86400000 * 5, description: "Investment in Venture Capital Fund" }
  ];

  // User Methods
  getUser(id: string) {
    return this.users.find(u => u.id === id);
  }

  updateKYC(userId: string, data: { idDocument: string; address: string }) {
    const user = this.getUser(userId);
    if (user) {
      user.kycData = data;
      user.kycStatus = "VERIFIED"; // Auto-verify for mock
      return user;
    }
    return null;
  }

  updateBanking(userId: string, data: { bankName?: string; accountNumber?: string; cryptoWallet?: string }) {
    const user = this.getUser(userId);
    if (user) {
      user.banking = { ...user.banking, ...data };
      return user;
    }
    return null;
  }

  // Asset Methods
  getAssets() {
    return this.assets;
  }

  // Investment Methods
  invest(userId: string, assetId: string, amount: number) {
    const user = this.getUser(userId);
    const asset = this.assets.find(a => a.id === assetId);

    if (!user || !asset) throw new Error("Invalid user or asset");
    if (user.balance < amount) throw new Error("Insufficient balance");
    if (amount < asset.minInvestment) throw new Error(`Minimum investment is $${asset.minInvestment}`);

    user.balance -= amount;

    const investment: Investment = {
      id: `inv_${Date.now()}`,
      userId,
      assetId,
      amount,
      timestamp: Date.now(),
      status: "ACTIVE"
    };

    this.investments.push(investment);

    // Log Transaction
    this.transactions.unshift({
      id: `tx_${Date.now()}`,
      userId,
      type: "INVESTMENT",
      amount,
      status: "COMPLETED",
      timestamp: Date.now(),
      description: `Investment in ${asset.name}`
    });

    return investment;
  }

  getInvestments(userId: string) {
    return this.investments.filter(i => i.userId === userId);
  }

  deposit(userId: string, amount: number) {
    const user = this.getUser(userId);
    if (!user) throw new Error("User not found");

    user.balance += amount;

    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      userId,
      type: "DEPOSIT",
      amount,
      status: "COMPLETED",
      timestamp: Date.now(),
      description: "Deposit via USDT"
    };
    this.transactions.unshift(tx);
    return user;
  }

  withdraw(userId: string, amount: number) {
    const user = this.getUser(userId);
    if (!user) throw new Error("User not found");
    if (user.balance < amount) throw new Error("Insufficient funds");

    user.balance -= amount;

    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      userId,
      type: "WITHDRAWAL",
      amount,
      status: "PENDING", // Withdrawals are pending initially
      timestamp: Date.now(),
      description: "Withdrawal Request"
    };
    this.transactions.unshift(tx);
    return user;
  }

  getTransactions(userId: string) {
    return this.transactions.filter(t => t.userId === userId);
  }

  // Support Methods
  createTicket(userId: string, subject: string, message: string) {
    const ticket: Ticket = {
      id: `tkt_${Date.now()}`,
      userId,
      subject,
      message,
      status: "OPEN",
      timestamp: Date.now()
    };
    this.tickets.push(ticket);
    return ticket;
  }

  getTickets(userId: string) {
    return this.tickets.filter(t => t.userId === userId);
  }
}

// Singleton Instance
export const db = new MockDB();
