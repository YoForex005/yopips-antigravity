"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, TrendingUp, Globe, Smartphone, DollarSign, BarChart3, PieChart, Landmark, Building2, ArrowRight, CheckCircle2, Lock, Calendar, Star, ChevronDown, ChevronUp, Video, X, UserCheck, Activity, Layers, Zap, Server, PlayCircle, Download, FileText, Hash } from "lucide-react";
import Wizard from "@/components/home/Wizard";
import MobileCommandCenter from "@/components/home/MobileCommandCenter";
import Proof from "@/components/home/Proof";
import FAQ from "@/components/home/FAQ";



export default function Home() {
  const [investment, setInvestment] = useState(10000);
  const monthlyRate = 0.07;
  const monthlyReturn = Math.floor(investment * monthlyRate);

  // Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState(false);


  const openWizard = () => {
    setIsWizardOpen(true);
  };

  const closeWizard = () => {
    setIsWizardOpen(false);
  };



  // Dynamic Data from API
  const [pools, setPools] = useState<any[]>([]);
  const [depositEvents, setDepositEvents] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [goldPrice, setGoldPrice] = useState(2034.50);
  const [pnl, setPnl] = useState(4250.00);

  // Poll API for Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Pools
        const poolsRes = await fetch('/api/pools');
        const poolsData = await poolsRes.json();
        setPools(poolsData.pools);
        setDepositEvents(poolsData.depositEvents);

        // Fetch Market
        const marketRes = await fetch('/api/market');
        const marketData = await marketRes.json();
        setGoldPrice(marketData.goldPrice);
        setPnl(marketData.pnl);
        setLogs(marketData.logs);
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      }
    };

    // Initial Fetch
    fetchData();

    // Poll every 1 second
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen pt-[40px]">
      {/* Live Ticker */}


      {/* Navigation */}
      <nav className="container mx-auto" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px', borderBottom: '1px solid #2b3139' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={28} />
          YoPips
        </div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="/strategy" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Strategy</a>
          <a href="/about" style={{ fontWeight: 500, fontSize: '0.9rem' }}>About</a>
          <a href="#proof" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Proof</a>
          <button className="btn btn-primary" onClick={() => window.location.href = '/login'}>
            Institutional Login
          </button>
        </div>
      </nav>

      {/* Section A: Hero */}
      <section className="container mx-auto" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(252, 213, 53, 0.1)', color: 'var(--color-primary)', padding: '6px 12px', borderRadius: '4px', marginBottom: '30px', fontSize: '0.8rem', fontWeight: '600', border: '1px solid rgba(252, 213, 53, 0.2)' }}>
          <ShieldCheck size={14} /> Trusted by 3,500+ Investors
        </div>
        <h1 className="animate-fade-in" style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '20px', lineHeight: '1.1', letterSpacing: '-1px' }}>
          Stop Trading With <br />
          <span className="text-primary">Lunch Money.</span>
        </h1>
        <p className="animate-fade-in" style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          Retail traders fail because they lack scale. We provide the institutional
          <strong> 'Swiss Army Knife'</strong> of algo-strategies. You don't trade; you withdraw.
        </p>

        <div className="animate-fade-in" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '60px' }}>
          <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }} onClick={openWizard}>
            Start $100 Test Drive
          </button>
          <button className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => window.location.href = '/strategy'}>
            <PlayCircle size={20} /> Watch Strategy
          </button>
        </div>

        {/* Hero Grid: Dashboard | Video | Trust Protocol */}
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto', alignItems: 'start' }}>

          {/* Col 1: Live Pool Monitor (Left) */}
          <div style={{ background: '#1e2329', border: '1px solid #2b3139', borderRadius: '12px', padding: '25px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'left', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #2b3139', paddingBottom: '15px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#848e9c', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Layers size={14} className="text-primary" /> POOL MONITOR
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>24 Active Pools</div>
              </div>
              <div style={{ background: 'rgba(252, 213, 53, 0.1)', color: 'var(--color-primary)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                AUM: ${(pools.reduce((acc, p) => acc + p.balance, 0)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            {/* Pool List (Scrollable) */}
            <div style={{ flex: 1, overflowY: 'auto', maxHeight: '300px', paddingRight: '5px', marginBottom: '20px' }} className="custom-scrollbar">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pools.slice(0, 5).map((pool) => (
                  <div key={pool.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', borderLeft: `3px solid ${pool.id === 1 ? 'var(--color-success)' : pool.id === 2 ? '#f6465d' : 'var(--color-primary)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>
                        LVL {pool.id}: {pool.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#848e9c' }}>{pool.members} Members</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: pool.id === 1 ? 'var(--color-success)' : '#fff' }}>
                        ${pool.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-success)' }}>+1.0% / day</div>
                    </div>
                  </div>
                ))}
                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', padding: '10px' }}>
                  + 19 More Pools Active...
                </div>
              </div>
            </div>

            {/* Live Deposit Feed */}
            <div style={{ background: '#0b0e11', borderRadius: '8px', padding: '15px', border: '1px solid #333' }}>
              <div style={{ fontSize: '0.7rem', color: '#848e9c', marginBottom: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Activity size={12} className="text-success" /> LIVE INFLOWS
              </div>
              <div style={{ height: '100px', overflow: 'hidden', position: 'relative' }}>
                {depositEvents.slice(0, 3).map((event, i) => (
                  <div key={event.id} className="animate-slide-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.8rem' }}>
                    <div>
                      <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>+${event.amount.toFixed(2)}</span>
                      <span style={{ color: '#666', marginLeft: '5px' }}>to Lvl {event.poolId}</span>
                    </div>
                    <div style={{ color: '#848e9c' }}>{event.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Terminal Log (Center) */}
          <div style={{ background: '#0b0e11', border: '1px solid #2b3139', borderRadius: '12px', overflow: 'hidden', position: 'relative', aspectRatio: '9/16', display: 'flex', flexDirection: 'column', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}>
            <div style={{ background: '#1e2329', padding: '10px 15px', borderBottom: '1px solid #2b3139', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Hash size={14} className="text-primary" /> ALGO_EXEC_V4
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f6465d' }}></div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)' }}></div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }}></div>
              </div>
            </div>
            <div style={{ padding: '15px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-success)', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              {logs.map((log, i) => (
                <div key={i} style={{ opacity: Math.max(0.3, (i + 1) / logs.length), marginBottom: '5px' }}>{log}</div>
              ))}
              <div style={{ color: 'var(--color-primary)', marginTop: '10px' }}>_</div>
            </div>
            {/* Scan Line Animation */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'rgba(14, 203, 129, 0.5)', boxShadow: '0 0 10px rgba(14, 203, 129, 0.8)', animation: 'scan 3s infinite linear' }}></div>
          </div>

          {/* Col 3: Trust Protocol (Right) */}
          <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', lineHeight: '1.1' }}>The Trust <br /> Protocol</h2>

            {/* Step 1 */}
            <div style={{ marginBottom: '40px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--color-primary)' }}>
              <div style={{ background: 'var(--color-primary)', color: '#000', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>STEP 1</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Test Drive</h3>
              <p style={{ color: '#848e9c', fontSize: '0.9rem', marginBottom: '15px' }}>Start with $100. No lock-up. Watch daily returns.</p>
              <div style={{ background: 'linear-gradient(135deg, #1e2329, #000)', border: '1px solid #333', borderRadius: '8px', padding: '20px', textAlign: 'center', maxWidth: '250px' }}>
                <div style={{ color: 'var(--color-primary)', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '5px' }}>ACCESS GRANTED</div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>TIER 1: TESTER</div>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ marginBottom: '40px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #333' }}>
              <div style={{ background: '#333', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>STEP 2</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Verify</h3>
              <p style={{ color: '#848e9c', fontSize: '0.9rem', marginBottom: '15px' }}>Withdraw profits. Check blockchain. Confirm bank wire.</p>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={24} className="text-success" />
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #333' }}>
              <div style={{ background: '#333', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>STEP 3</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Meet Us</h3>
              <p style={{ color: '#848e9c', fontSize: '0.9rem', marginBottom: '15px' }}>Trust established? Let's talk. Video, WhatsApp, or Visit.</p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <Video size={24} className="text-primary" />
                <Smartphone size={24} className="text-primary" />
                <Building2 size={24} className="text-primary" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Section B: Institutional Partners */}
      <section style={{ borderTop: '1px solid #2b3139', borderBottom: '1px solid #2b3139', padding: '40px 0', background: '#0b0e11' }}>
        <div className="container mx-auto" style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', opacity: 0.5, filter: 'grayscale(100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
            <Landmark size={30} /> BARCLAYS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
            <Globe size={30} /> HSBC
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
            <Building2 size={30} /> J.P. MORGAN
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
            <ShieldCheck size={30} /> CITI
          </div>
        </div>
      </section>

      {/* Section C: The "Lunch Money" Trap */}
      <section id="comparison" className="container mx-auto" style={{ padding: '100px 20px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>The "Lunch Money" Trap</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>

          {/* Left: Old Way */}
          <div style={{ background: '#1e2329', border: '1px solid #2b3139', borderRadius: '8px', padding: '40px', position: 'relative', opacity: 0.7 }}>
            <div style={{ position: 'absolute', top: '-15px', left: '30px', background: '#2b3139', padding: '5px 15px', fontSize: '0.8rem', fontWeight: 'bold', color: '#848e9c' }}>THE OLD WAY</div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', color: '#f6465d' }}>Manual Retail Trading</h3>
            <ul style={{ listStyle: 'none', color: '#848e9c', lineHeight: '2' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><X size={18} color="#f6465d" /> Staring at charts for 12 hours</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><X size={18} color="#f6465d" /> Emotional panic selling</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><X size={18} color="#f6465d" /> 7% Yearly Bank Returns</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><X size={18} color="#f6465d" /> Competing against Supercomputers</li>
            </ul>
            <div style={{ marginTop: '30px', padding: '20px', background: '#0b0e11', borderRadius: '4px', borderLeft: '4px solid #f6465d' }}>
              <div style={{ fontSize: '0.9rem', color: '#848e9c' }}>RESULT</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>Withdrawing $200 / month</div>
            </div>
          </div>

          {/* Right: YoPips Method */}
          <div style={{ background: '#1e2329', border: '1px solid var(--color-primary)', borderRadius: '8px', padding: '40px', position: 'relative', boxShadow: '0 0 30px rgba(252, 213, 53, 0.1)' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '30px', background: 'var(--color-primary)', padding: '5px 15px', fontSize: '0.8rem', fontWeight: 'bold', color: '#000' }}>YOPIPS METHOD</div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', color: 'var(--color-primary)' }}>Institutional Algorithms</h3>
            <ul style={{ listStyle: 'none', color: '#fff', lineHeight: '2' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} color="var(--color-primary)" /> 100% Automated Strategy</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} color="var(--color-primary)" /> Zero emotional decisions</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} color="var(--color-primary)" /> 7-15% Monthly Returns</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} color="var(--color-primary)" /> Institutional-Grade Execution</li>
            </ul>
            <div style={{ marginTop: '30px', padding: '20px', background: '#0b0e11', borderRadius: '4px', borderLeft: '4px solid var(--color-primary)' }}>
              <div style={{ fontSize: '0.9rem', color: '#848e9c' }}>RESULT</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>Withdrawing $18,000 / month</div>
            </div>
          </div>

        </div>
      </section>

      {/* Section D: Strategy (Swiss Army Knife) */}
      <section id="strategy" style={{ background: '#181a20', padding: '100px 0', borderTop: '1px solid #2b3139', borderBottom: '1px solid #2b3139' }}>
        <div className="container mx-auto" style={{ textAlign: 'center' }}>
          <h2 className="section-title">The "Swiss Army Knife" Strategy</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 60px' }}>
            Most trading robots fail because they only work in one market. Our Multi-Strategy Portfolio covers everything.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
            <div style={{ padding: '30px', border: '1px solid #2b3139', borderRadius: '8px', background: '#0b0e11' }}>
              <Landmark size={40} className="text-primary" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Gold Hedging</h3>
              <p style={{ fontSize: '0.9rem', color: '#848e9c' }}>Safe-haven assets to protect capital during volatility.</p>
            </div>
            <div style={{ padding: '30px', border: '1px solid #2b3139', borderRadius: '8px', background: '#0b0e11' }}>
              <Building2 size={40} className="text-primary" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Real Estate REITs</h3>
              <p style={{ fontSize: '0.9rem', color: '#848e9c' }}>Steady income from commercial property markets.</p>
            </div>
            <div style={{ padding: '30px', border: '1px solid #2b3139', borderRadius: '8px', background: '#0b0e11' }}>
              <Activity size={40} className="text-primary" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Forex Momentum</h3>
              <p style={{ fontSize: '0.9rem', color: '#848e9c' }}>High-frequency trading on major currency pairs.</p>
            </div>
            <div style={{ padding: '30px', border: '1px solid #2b3139', borderRadius: '8px', background: '#0b0e11' }}>
              <Server size={40} className="text-primary" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>US Govt Bonds</h3>
              <p style={{ fontSize: '0.9rem', color: '#848e9c' }}>Fixed-income securities for guaranteed yield.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Performance History (New) */}
      <section style={{ padding: '100px 0', background: '#0b0e11', borderBottom: '1px solid #2b3139' }}>
        <div className="container mx-auto">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>Track Record</h2>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>

            {/* Chart Image */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <img src="/growth-chart.png" alt="Growth Chart" style={{ width: '100%', borderRadius: '12px', border: '1px solid #2b3139', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
            </div>

            {/* Table */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #2b3139', color: '#848e9c' }}>
                      <th style={{ padding: '15px', textAlign: 'left' }}>MONTH</th>
                      <th style={{ padding: '15px', textAlign: 'right' }}>NET RETURN</th>
                      <th style={{ padding: '15px', textAlign: 'right' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { month: 'Oct 2024', ret: '+12.4%', status: 'Verified' },
                      { month: 'Sep 2024', ret: '+9.8%', status: 'Verified' },
                      { month: 'Aug 2024', ret: '+11.2%', status: 'Verified' },
                      { month: 'Jul 2024', ret: '+8.5%', status: 'Verified' },
                      { month: 'Jun 2024', ret: '+10.1%', status: 'Verified' },
                      { month: 'May 2024', ret: '+9.3%', status: 'Verified' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #1e2329' }}>
                        <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>{row.month}</td>
                        <td style={{ padding: '15px', textAlign: 'right', color: 'var(--color-success)', fontWeight: 'bold' }}>{row.ret}</td>
                        <td style={{ padding: '15px', textAlign: 'right' }}>
                          <span style={{ background: 'rgba(14, 203, 129, 0.1)', color: 'var(--color-success)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section E: 3-Step Blueprint */}
      <section className="container mx-auto" style={{ padding: '100px 20px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>The Blueprint</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#2b3139', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', fontWeight: 'bold' }}>1</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Secure Access</h3>
            <p style={{ color: '#848e9c' }}>Open a managed account and leverage our institutional liquidity pool.</p>
          </div>
          <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: 'var(--color-primary)', color: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', fontWeight: 'bold' }}>2</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Deploy Portfolio</h3>
            <p style={{ color: '#848e9c' }}>We activate the "Swiss Army Knife" algos on your capital immediately.</p>
          </div>
          <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#2b3139', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem', fontWeight: 'bold' }}>3</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Funnel Profits</h3>
            <p style={{ color: '#848e9c' }}>Withdraw 7-15% monthly. No lock-ins. Scale your wealth.</p>
          </div>
        </div>
      </section>

      {/* Section F: Social Proof (Withdrawals) */}
      <section id="proof" style={{ background: '#181a20', padding: '100px 0', borderTop: '1px solid #2b3139' }}>
        <div className="container mx-auto" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Don't Trust Words. Trust Withdrawals.</h2>
          <p style={{ color: '#848e9c', marginBottom: '60px' }}>Real payouts to real investors. Updated daily.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

            {/* Phone Mockup 1 */}
            <div style={{ background: '#0b0e11', border: '4px solid #2b3139', borderRadius: '24px', padding: '20px', maxWidth: '320px', margin: '0 auto', position: 'relative' }}>
              <div style={{ width: '60px', height: '5px', background: '#2b3139', borderRadius: '3px', margin: '0 auto 20px' }}></div>
              <div style={{ textAlign: 'left', background: '#1e2329', borderRadius: '12px', padding: '15px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#848e9c' }}>BANK ALERT</span>
                  <span style={{ fontSize: '0.8rem', color: '#848e9c' }}>Now</span>
                </div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Incoming Transfer</div>
                <div style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>+$12,450.00</div>
                <div style={{ fontSize: '0.8rem', color: '#848e9c' }}>From: YoPips Fund Ltd</div>
              </div>
              <div style={{ textAlign: 'left', background: '#1e2329', borderRadius: '12px', padding: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#848e9c' }}>WALLET</span>
                  <span style={{ fontSize: '0.8rem', color: '#848e9c' }}>2m ago</span>
                </div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>USDT Received</div>
                <div style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>+5,200.00 USDT</div>
              </div>
            </div>

            {/* Withdrawal Certificate */}
            <div style={{ background: '#fff', color: '#000', padding: '30px', borderRadius: '8px', textAlign: 'left', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <div style={{ borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>PAYOUT CERTIFICATE</span>
                <CheckCircle2 size={24} color="#0ecb81" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>BENEFICIARY</div>
                  <div style={{ fontWeight: 'bold' }}>James Thompson</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>AMOUNT</div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>$28,900.00</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>DATE</div>
                  <div style={{ fontWeight: 'bold' }}>Oct 24, 2024</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>STATUS</div>
                  <div style={{ fontWeight: 'bold', color: '#0ecb81' }}>CLEARED</div>
                </div>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#666', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                Authorized by YoPips Fund Liquidity Provider
              </div>
            </div>

            {/* Phone Mockup 2 */}
            <div style={{ background: '#0b0e11', border: '4px solid #2b3139', borderRadius: '24px', padding: '20px', maxWidth: '320px', margin: '0 auto', position: 'relative' }}>
              <div style={{ width: '60px', height: '5px', background: '#2b3139', borderRadius: '3px', margin: '0 auto 20px' }}></div>
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={50} color="var(--color-success)" style={{ margin: '0 auto 20px' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Success</div>
                <div style={{ color: '#848e9c', marginBottom: '20px' }}>You have successfully withdrawn</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>$8,450.00</div>
              </div>
            </div>

          </div>

          <div style={{ marginTop: '60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '10px 20px', borderRadius: '4px' }}>
              <Star size={24} fill="#00b67a" color="#00b67a" />
              <span style={{ color: '#000', fontWeight: 'bold', fontSize: '1.2rem' }}>Trustpilot</span>
              <span style={{ color: '#000' }}>4.9/5.0</span>
            </div>
          </div>
        </div>
      </section>

      <MobileCommandCenter />

      {/* Section: Client Voices (New) */}
      <section style={{ padding: '100px 0' }}>
        <div className="container mx-auto">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>Client Voices</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

            {/* Testimonial 1 */}
            <div className="glass-card" style={{ padding: '40px' }}>
              <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="var(--color-primary)" color="var(--color-primary)" />)}
              </div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', marginBottom: '30px', fontStyle: 'italic' }}>
                "I was skeptical about the 7% monthly claim. I started with the $100 Test Drive. After seeing the withdrawals hit my Binance account for 3 months straight, I moved my entire retirement portfolio over. The transparency is unmatched."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>JD</div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>James D.</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>Private Investor, Dubai</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass-card" style={{ padding: '40px' }}>
              <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="var(--color-primary)" color="var(--color-primary)" />)}
              </div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', marginBottom: '30px', fontStyle: 'italic' }}>
                "As a Family Office manager, risk management is my priority. YoPips' 'Swiss Army' approach with Gold and Bonds provides the safety net we need, while the Forex algos deliver the alpha. It's the perfect balance."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>SK</div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>Sarah K.</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>Fund Manager, Singapore</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass-card" style={{ padding: '40px' }}>
              <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="var(--color-primary)" color="var(--color-primary)" />)}
              </div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', marginBottom: '30px', fontStyle: 'italic' }}>
                "The 1-1 video onboarding was a game changer. Speaking to a real human who understood my tax situation and goals made me feel comfortable. I'm not just an account number here; I'm a partner."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>MR</div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>Michael R.</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>Entrepreneur, London</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <FAQ />

      <Proof />

      {/* Full Screen Wizard Overlay (Retained) */}
      <Wizard isOpen={isWizardOpen} onClose={closeWizard} />

      {/* Footer */}
      <footer style={{ padding: '60px 0', borderTop: '1px solid #2b3139', textAlign: 'center', color: '#848e9c', background: '#0b0e11' }}>
        <div className="container mx-auto">
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <TrendingUp size={24} className="text-primary" />
            YoPips Hedge Fund
          </div>
          <p style={{ maxWidth: '600px', margin: '0 auto 20px', fontSize: '0.9rem' }}>
            <strong>Risk Warning:</strong> Past performance is not indicative of future results. Trading involves risk.
            <br />
            YoPips Hedge Fund is a registered trademark.
            <br />
            Headquarters: Canary Wharf, London, UK.
          </p>
          <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <span>&copy; 1999-2024 YoPips Hedge Fund.</span>
            <a href="/about" style={{ textDecoration: 'underline' }}>About Us</a>
            <a href="/legal/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</a>
            <a href="/legal/terms" style={{ textDecoration: 'underline' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
