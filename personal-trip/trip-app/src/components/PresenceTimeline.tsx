import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TRAVELERS } from '../data/tripData';
import { useTrip } from '../context/TripContext';
import { useThemeColors } from '../hooks/useThemeColors';

interface Props {
  onDaySelect: (dayIndex: number) => void;
  selectedDay: number;
}

const PresenceTimeline: React.FC<Props> = ({ onDaySelect, selectedDay }) => {
  const { days } = useTrip();
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const c = useThemeColors();

  return (
    <div style={{ padding: '0 0 20px', overflowX: 'auto' }}>
      <div style={{ display: 'flex', gap: 6, minWidth: 'min-content', padding: '0 10px' }}>
        {days.map((day, idx) => {
          const isSelected = selectedDay === idx;
          const isHovered = hoveredDay === idx;
          const presentTravelers = TRAVELERS.filter((t) => t.presentDays.includes(day.day));
          const cityColor = day.city.toLowerCase().includes('paris') ? '#f4a261' : '#e94560';

          return (
            <motion.div
              key={day.day}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredDay(idx)}
              onHoverEnd={() => setHoveredDay(null)}
              onClick={() => onDaySelect(idx)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              style={{
                cursor: 'pointer',
                minWidth: 80,
                padding: '12px 8px 10px',
                borderRadius: 16,
                background: isSelected
                  ? `linear-gradient(180deg, ${cityColor}30, ${cityColor}10)`
                  : isHovered
                  ? c.bgHover
                  : c.bgCard,
                border: isSelected ? `2px solid ${cityColor}60` : '2px solid transparent',
                transition: 'background 0.2s, border 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                position: 'relative',
              }}
            >
              <span style={{ fontSize: 10, color: isSelected ? cityColor : c.textLabel, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                Day {day.day}
              </span>
              <span style={{ fontSize: 13, color: isSelected ? c.text : c.textSecondary, fontWeight: 600 }}>
                {day.dateShort}
              </span>
              <span style={{ fontSize: 9, color: cityColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {day.city.includes('→') ? '→' : day.city.split(' ')[0]}
              </span>
              <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
                {TRAVELERS.map((t) => {
                  const isPresent = presentTravelers.some((pt) => pt.id === t.id);
                  return (
                    <motion.div
                      key={t.id}
                      animate={{ scale: isPresent ? 1 : 0.5, opacity: isPresent ? 1 : 0.15 }}
                      style={{ width: 8, height: 8, borderRadius: '50%', background: t.color, boxShadow: isPresent ? `0 0 6px ${t.color}60` : 'none' }}
                    />
                  );
                })}
              </div>
              {isSelected && (
                <motion.div
                  layoutId="timeline-indicator"
                  style={{ position: 'absolute', bottom: -2, left: '20%', right: '20%', height: 3, borderRadius: 2, background: cityColor }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PresenceTimeline;
