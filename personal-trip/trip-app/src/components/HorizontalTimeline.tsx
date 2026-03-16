import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRAVELERS, Activity } from '../data/tripData';
import { useTrip } from '../context/TripContext';
import { useAuth } from '../context/AuthContext';
import { useThemeColors } from '../hooks/useThemeColors';
import ActivityCard from './ActivityCard';

const CATEGORY_COLORS: Record<string, string> = {
  sightseeing: '#e94560',
  food: '#f4a261',
  transport: '#4ecdc4',
  entertainment: '#9b59b6',
  shopping: '#ff6b6b',
  culture: '#3498db',
  nature: '#27ae60',
};

const CATEGORY_OPTIONS: Activity['category'][] = ['sightseeing', 'food', 'transport', 'entertainment', 'shopping', 'culture', 'nature'];
const EMOJI_MAP: Record<string, string> = {
  sightseeing: '🏛️', food: '🍽️', transport: '🚕', entertainment: '🎭', shopping: '🛍️', culture: '🎨', nature: '🌳',
};

const HorizontalTimeline: React.FC = () => {
  const { days, updateActivity, removeActivity, addActivity, updateAccommodation, updateNotes } = useTrip();
  const { canEdit } = useAuth();
  const c = useThemeColors();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Add activity form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<Activity['category']>('sightseeing');

  // Accommodation / notes editing
  const [editingAccom, setEditingAccom] = useState(false);
  const [accomValue, setAccomValue] = useState('');
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState('');

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' });
    }
  };

  const handleSelectDay = (idx: number) => {
    if (selectedDay === idx) {
      setSelectedDay(null);
    } else {
      setSelectedDay(idx);
      setShowAddForm(false);
      setEditingAccom(false);
      setEditingNotes(false);
      // Reset add form
      setNewTitle('');
      setNewTime('');
      setNewDesc('');
      // Set accommodation/notes values
      const day = days[idx];
      if (day) {
        setAccomValue(day.accommodation || '');
        setNotesValue(day.notes || '');
      }
    }
  };

  const handleAddActivity = () => {
    if (selectedDay === null || !newTitle.trim()) return;
    addActivity(selectedDay, {
      time: newTime || undefined,
      title: newTitle,
      description: newDesc || undefined,
      icon: EMOJI_MAP[newCategory] || '📌',
      category: newCategory,
    });
    setNewTitle('');
    setNewTime('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const expandedDay = selectedDay !== null ? days[selectedDay] : null;
  const expandedCityColor = expandedDay
    ? expandedDay.city.toLowerCase().includes('paris') ? '#f4a261' : '#e94560'
    : '#e94560';
  const expandedPresentTravelers = expandedDay
    ? TRAVELERS.filter((t) => t.presentDays.includes(expandedDay.day))
    : [];

  return (
    <div>
      <div style={{ position: 'relative' }}>
        {/* Scroll buttons */}
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
              const isSelected = selectedDay === idx;

              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, type: 'spring', damping: 20 }}
                  onClick={() => handleSelectDay(idx)}
                  style={{
                    minWidth: 240,
                    maxWidth: 280,
                    padding: '0 6px',
                    position: 'relative',
                    zIndex: 1,
                    scrollSnapAlign: 'start',
                    cursor: 'pointer',
                  }}
                >
                  {/* Day node */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      animate={isSelected ? { scale: 1.15, boxShadow: `0 6px 24px ${cityColor}60` } : { scale: 1 }}
                      style={{
                        width: 48, height: 48, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${cityColor}, ${cityColor}cc)`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 4px 16px ${cityColor}40`,
                        border: isSelected ? `3px solid ${cityColor}` : `3px solid ${c.isDark ? '#1a1a2e' : '#f5f0e8'}`,
                        position: 'relative', zIndex: 2,
                        transition: 'border 0.2s',
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
                      background: isSelected ? `${cityColor}12` : c.bgCard,
                      border: isSelected ? `2px solid ${cityColor}50` : `1px solid ${cityColor}25`,
                      borderRadius: 16,
                      padding: 14,
                      minHeight: 200,
                      transition: 'background 0.2s, border 0.2s',
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
                          <div
                            key={activity.id}
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
                          </div>
                        );
                      })}
                    </div>

                    {/* Notes */}
                    {day.notes && (
                      <div style={{ marginTop: 6, background: 'rgba(243,156,18,0.08)', borderRadius: 6, padding: '4px 8px' }}>
                        <p style={{ color: '#f39c12', fontSize: 9, margin: 0, fontStyle: 'italic' }}>{day.notes}</p>
                      </div>
                    )}

                    {/* Selected indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textAlign: 'center', marginTop: 8 }}
                      >
                        <span style={{ color: cityColor, fontSize: 10, fontWeight: 600 }}>▼ Expanded Below</span>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expanded Day Detail Panel */}
      <AnimatePresence>
        {selectedDay !== null && expandedDay && (
          <motion.div
            key={`expanded-${selectedDay}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              background: `linear-gradient(135deg, ${expandedCityColor}10, transparent)`,
              border: `1px solid ${expandedCityColor}25`,
              borderRadius: 20,
              padding: '20px 16px',
              marginTop: 16,
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ background: `${expandedCityColor}20`, color: expandedCityColor, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Day {expandedDay.day} {expandedDay.city.toLowerCase().includes('paris') ? '🇫🇷' : '🇬🇧'}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedDay(null)}
                      style={{ background: c.bgHover, border: `1px solid ${c.border}`, borderRadius: 8, padding: '4px 10px', color: c.textTertiary, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      ✕ Close
                    </motion.button>
                  </div>
                  <h3 style={{ color: c.text, margin: '0 0 4px', fontSize: 20, fontWeight: 800 }}>
                    {expandedDay.subtitle}
                  </h3>
                  <p style={{ color: c.textTertiary, margin: 0, fontSize: 13 }}>
                    {expandedDay.date} &middot; {expandedDay.city}
                  </p>
                </div>
                <div style={{ display: 'flex' }}>
                  {expandedPresentTravelers.map((t, i) => (
                    <div
                      key={t.id}
                      title={t.name}
                      style={{
                        width: 30, height: 30, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${t.color}, ${t.colorLight})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: 10,
                        border: `2px solid ${c.isDark ? '#1a1a2e' : '#f5f0e8'}`,
                        marginLeft: i > 0 ? -6 : 0, zIndex: expandedPresentTravelers.length - i,
                      }}
                    >
                      {t.avatarInitials}
                    </div>
                  ))}
                </div>
              </div>

              {/* Accommodation */}
              {(expandedDay.accommodation || canEdit) && (
                <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 16 }}>🏨</span>
                  {editingAccom && canEdit ? (
                    <div style={{ display: 'flex', gap: 6, flex: 1 }}>
                      <input
                        value={accomValue}
                        onChange={(e) => setAccomValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { updateAccommodation(selectedDay, accomValue); setEditingAccom(false); } }}
                        style={{ background: c.bgInput, border: `1px solid ${c.borderInput}`, borderRadius: 8, padding: '6px 10px', color: c.text, fontSize: 13, outline: 'none', flex: 1 }}
                        autoFocus
                      />
                      <button onClick={() => { updateAccommodation(selectedDay, accomValue); setEditingAccom(false); }} style={{ background: expandedCityColor, border: 'none', borderRadius: 8, padding: '6px 14px', color: '#fff', fontSize: 12, cursor: 'pointer' }}>Save</button>
                    </div>
                  ) : (
                    <span
                      style={{ color: c.textSecondary, fontSize: 13, cursor: canEdit ? 'pointer' : 'default' }}
                      onClick={(e) => { e.stopPropagation(); if (canEdit) setEditingAccom(true); }}
                    >
                      {expandedDay.accommodation || 'No accommodation set'}
                      {canEdit && <span style={{ color: c.textFaint, marginLeft: 6, fontSize: 10 }}>click to edit</span>}
                    </span>
                  )}
                </div>
              )}

              {/* Notes */}
              {(expandedDay.notes || canEdit) && (
                <div style={{ marginBottom: 14 }}>
                  {editingNotes && canEdit ? (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <input
                        value={notesValue}
                        onChange={(e) => setNotesValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { updateNotes(selectedDay, notesValue); setEditingNotes(false); } }}
                        placeholder="Add a note..."
                        style={{ background: c.bgInput, border: `1px solid ${c.borderInput}`, borderRadius: 8, padding: '6px 10px', color: c.text, fontSize: 13, outline: 'none', flex: 1 }}
                        autoFocus
                      />
                      <button onClick={() => { updateNotes(selectedDay, notesValue); setEditingNotes(false); }} style={{ background: expandedCityColor, border: 'none', borderRadius: 8, padding: '6px 14px', color: '#fff', fontSize: 12, cursor: 'pointer' }}>Save</button>
                    </div>
                  ) : expandedDay.notes ? (
                    <p
                      style={{ color: '#f39c12', fontSize: 13, margin: 0, fontStyle: 'italic', cursor: canEdit ? 'pointer' : 'default', background: 'rgba(243,156,18,0.08)', padding: '6px 12px', borderRadius: 8, display: 'inline-block' }}
                      onClick={() => { if (canEdit) { setNotesValue(expandedDay.notes || ''); setEditingNotes(true); } }}
                    >
                      {expandedDay.notes}
                    </p>
                  ) : canEdit ? (
                    <button
                      onClick={() => setEditingNotes(true)}
                      style={{ background: c.bgSubtle, border: `1px dashed ${c.borderInput}`, borderRadius: 8, padding: '6px 14px', color: c.textFaint, fontSize: 12, cursor: 'pointer' }}
                    >
                      + Add note
                    </button>
                  ) : null}
                </div>
              )}

              {/* Full Activity List */}
              <div style={{ background: c.bgCard, borderRadius: 16, padding: '6px 14px', border: `1px solid ${c.borderLight}` }}>
                <AnimatePresence>
                  {expandedDay.activities.map((activity, idx) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      index={idx}
                      dayColor={expandedCityColor}
                      onUpdate={(updates) => updateActivity(selectedDay, activity.id, updates)}
                      onRemove={() => removeActivity(selectedDay, activity.id)}
                    />
                  ))}
                </AnimatePresence>

                {/* Add Activity */}
                {canEdit && (
                  <div style={{ padding: '12px 0' }}>
                    <AnimatePresence>
                      {showAddForm ? (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                          <div style={{ background: c.bgSubtle, borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <input value={newTime} onChange={(e) => setNewTime(e.target.value)} placeholder="Time" style={{ background: c.bgInput, border: `1px solid ${c.borderInput}`, borderRadius: 8, padding: '8px 10px', color: c.text, fontSize: 13, outline: 'none', width: 90 }} />
                              <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Activity name" style={{ background: c.bgInput, border: `1px solid ${c.borderInput}`, borderRadius: 8, padding: '8px 10px', color: c.text, fontSize: 13, outline: 'none', flex: 1 }} />
                            </div>
                            <input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Description (optional)" style={{ background: c.bgInput, border: `1px solid ${c.borderInput}`, borderRadius: 8, padding: '8px 10px', color: c.text, fontSize: 13, outline: 'none' }} />
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                              {CATEGORY_OPTIONS.map((cat) => (
                                <button key={cat} onClick={() => setNewCategory(cat)} style={{ background: newCategory === cat ? `${expandedCityColor}30` : c.bgSubtle, border: newCategory === cat ? `1px solid ${expandedCityColor}` : `1px solid ${c.border}`, borderRadius: 20, padding: '3px 10px', color: newCategory === cat ? expandedCityColor : c.textTertiary, fontSize: 10, cursor: 'pointer', textTransform: 'capitalize' }}>
                                  {EMOJI_MAP[cat]} {cat}
                                </button>
                              ))}
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleAddActivity} style={{ background: `linear-gradient(135deg, ${expandedCityColor}, ${expandedCityColor}cc)`, border: 'none', borderRadius: 10, padding: '8px 20px', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                                Add Activity
                              </motion.button>
                              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowAddForm(false)} style={{ background: c.bgHover, border: `1px solid ${c.border}`, borderRadius: 10, padding: '8px 20px', color: c.textTertiary, fontSize: 12, cursor: 'pointer' }}>
                                Cancel
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowAddForm(true)} style={{ width: '100%', padding: '12px', background: c.bgCard, border: `2px dashed ${c.borderLight}`, borderRadius: 12, color: c.textFaint, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <span style={{ fontSize: 16 }}>+</span> Add Activity
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HorizontalTimeline;
