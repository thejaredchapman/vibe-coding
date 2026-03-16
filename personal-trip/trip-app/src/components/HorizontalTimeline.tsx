import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { TRAVELERS } from '../data/tripData';
import { useTrip } from '../context/TripContext';
import { useThemeColors } from '../hooks/useThemeColors';

const CATEGORY_COLORS: Record<string, string> = {
  sightseeing: '#e94560',
  food: '#f4a261',
  transport: '#4ecdc4',
  entertainment: '#9b59b6',
  shopping: '#ff6b6b',
  culture: '#3498db',
  nature: '#27ae60',
};

const HorizontalTimeline: React.FC = () => {
  const { days } = useTrip();
  const c = useThemeColors();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Scroll buttons — hidden on small screens where swipe is natural */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll('left')}
        className="timeline-scroll-btn"
        style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
          width: 32, height: 32, borderRadius: '50%', border: `1px solid ${c.border}`,
          background: c.bgCard, backdropFilter: 'blur(10px)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: c.textSecondary, fontSize: 14, boxShadow: `0 2px 12px rgba(0,0,0,0.2)`,
        }}
      >
        ◀
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll('right')}
        className="timeline-scroll-btn"
        style={{
          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
          width: 32, height: 32, borderRadius: '50%', border: `1px solid ${c.border}`,
          background: c.bgCard, backdropFilter: 'blur(10px)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: c.textSecondary, fontSize: 14, boxShadow: `0 2px 12px rgba(0,0,0,0.2)`,
        }}
      >
        ▶
      </motion.button>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        style={{
          overflowX: 'auto',
          padding: '10px 12px 20px',
          scrollbarWidth: 'thin',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
      >
        <div style={{ display: 'flex', gap: 0, minWidth: 'min-content', position: 'relative' }}>
          {/* Horizontal connector line */}
          <div style={{
            position: 'absolute', top: 34, left: 20, right: 20, height: 3,
            background: `linear-gradient(90deg, #e94560, #e94560 28%, #f4a261 28%, #f4a261 66%, #e94560 66%, #e94560)`,
            borderRadius: 2, opacity: 0.25, zIndex: 0,
          }} />

          {days.map((day, idx) => {
            const isParis = day.city.toLowerCase().includes('paris');
            const cityColor = isParis ? '#f4a261' : '#e94560';
            const presentTravelers = TRAVELERS.filter((t) => t.presentDays.includes(day.day));
            const isTransit = day.city.includes('→');

            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, type: 'spring', damping: 20 }}
                style={{
                  minWidth: 240,
                  maxWidth: 280,
                  padding: '0 6px',
                  position: 'relative',
                  zIndex: 1,
                  scrollSnapAlign: 'start',
                }}
              >
                {/* Day node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${cityColor}, ${cityColor}cc)`,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 4px 16px ${cityColor}40`,
                      border: `3px solid ${c.isDark ? '#1a1a2e' : '#f5f0e8'}`,
                      position: 'relative', zIndex: 2,
                    }}
                  >
                    <span style={{ color: '#fff', fontSize: 9, fontWeight: 800, lineHeight: 1 }}>DAY</span>
                    <span style={{ color: '#fff', fontSize: 16, fontWeight: 900, lineHeight: 1 }}>{day.day}</span>
                  </motion.div>
                  <span style={{ color: c.textTertiary, fontSize: 10, fontWeight: 600, marginTop: 4 }}>
                    {day.dateShort}
                  </span>
                  <span style={{ color: cityColor, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {isTransit ? 'London → Paris' : day.city} {isParis ? '🇫🇷' : '🇬🇧'}
                  </span>
                </div>

                {/* Day card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  style={{
                    background: c.bgCard,
                    border: `1px solid ${cityColor}25`,
                    borderRadius: 16,
                    padding: 14,
                    minHeight: 200,
                  }}
                >
                  <h4 style={{ color: c.text, margin: '0 0 6px', fontSize: 13, fontWeight: 700 }}>
                    {day.subtitle}
                  </h4>

                  {/* Traveler avatars */}
                  <div style={{ display: 'flex', marginBottom: 8 }}>
                    {presentTravelers.map((t, i) => (
                      <div
                        key={t.id}
                        title={t.name}
                        style={{
                          width: 22, height: 22, borderRadius: '50%',
                          background: `linear-gradient(135deg, ${t.color}, ${t.colorLight})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontWeight: 700, fontSize: 8,
                          border: `2px solid ${c.isDark ? '#1a1a2e' : '#f5f0e8'}`,
                          marginLeft: i > 0 ? -5 : 0, zIndex: presentTravelers.length - i,
                        }}
                      >
                        {t.avatarInitials}
                      </div>
                    ))}
                    <span style={{ color: c.textFaint, fontSize: 9, marginLeft: 5, alignSelf: 'center' }}>
                      {presentTravelers.length}/4
                    </span>
                  </div>

                  {/* Accommodation */}
                  {day.accommodation && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8, background: c.bgSubtle, borderRadius: 6, padding: '4px 8px' }}>
                      <span style={{ fontSize: 10 }}>🏨</span>
                      <span style={{ color: c.textTertiary, fontSize: 10 }}>{day.accommodation}</span>
                    </div>
                  )}

                  {/* Activities */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {day.activities.map((activity, ai) => {
                      const catColor = CATEGORY_COLORS[activity.category] || cityColor;
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 + ai * 0.03 }}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: 6,
                            padding: '4px 0',
                            borderBottom: ai < day.activities.length - 1 ? `1px solid ${c.borderLight}` : 'none',
                          }}
                        >
                          <div style={{
                            width: 6, height: 6, borderRadius: '50%', background: catColor,
                            boxShadow: `0 0 4px ${catColor}40`, flexShrink: 0, marginTop: 4,
                          }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <span style={{ fontSize: 12 }}>{activity.icon}</span>
                              <span style={{ color: c.text, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {activity.title}
                              </span>
                            </div>
                            {activity.time && (
                              <span style={{ color: catColor, fontSize: 9, fontWeight: 600, fontFamily: 'monospace' }}>
                                {activity.time}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Notes */}
                  {day.notes && (
                    <div style={{ marginTop: 6, background: 'rgba(243,156,18,0.08)', borderRadius: 6, padding: '4px 8px' }}>
                      <p style={{ color: '#f39c12', fontSize: 9, margin: 0, fontStyle: 'italic' }}>{day.notes}</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HorizontalTimeline;
