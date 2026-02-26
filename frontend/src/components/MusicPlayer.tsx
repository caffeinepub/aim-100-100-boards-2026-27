import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  type: 'motivational' | 'binaural';
  emoji: string;
  description: string;
  youtubeSearch: string;
}

const tracks: Track[] = [
  { id: 1, title: 'Eye of the Tiger', artist: 'Survivor', type: 'motivational', emoji: '🐯', description: 'Classic motivational anthem', youtubeSearch: 'Eye of the Tiger Survivor' },
  { id: 2, title: 'Lose Yourself', artist: 'Eminem', type: 'motivational', emoji: '🔥', description: 'Ultimate focus & determination', youtubeSearch: 'Lose Yourself Eminem' },
  { id: 3, title: 'Hall of Fame', artist: 'The Script', type: 'motivational', emoji: '🏆', description: 'Believe in yourself', youtubeSearch: 'Hall of Fame The Script' },
  { id: 4, title: 'Stronger', artist: 'Kanye West', type: 'motivational', emoji: '💪', description: 'What doesn\'t kill you...', youtubeSearch: 'Stronger Kanye West' },
  { id: 5, title: 'Believer', artist: 'Imagine Dragons', type: 'motivational', emoji: '⚡', description: 'Pain makes you stronger', youtubeSearch: 'Believer Imagine Dragons' },
  { id: 6, title: 'Unstoppable', artist: 'Sia', type: 'motivational', emoji: '🚀', description: 'You are unstoppable', youtubeSearch: 'Unstoppable Sia' },
  { id: 7, title: 'Fight Song', artist: 'Rachel Platten', type: 'motivational', emoji: '⚔️', description: 'This is my fight song', youtubeSearch: 'Fight Song Rachel Platten' },
  { id: 8, title: 'Roar', artist: 'Katy Perry', type: 'motivational', emoji: '🦁', description: 'Hear me roar', youtubeSearch: 'Roar Katy Perry' },
  { id: 9, title: '40Hz Gamma Binaural', artist: 'Study Beats', type: 'binaural', emoji: '🧠', description: 'Enhances focus & memory', youtubeSearch: '40hz gamma binaural beats focus study' },
  { id: 10, title: 'Alpha Waves 10Hz', artist: 'Brain Waves', type: 'binaural', emoji: '🌊', description: 'Relaxed alertness', youtubeSearch: 'alpha waves 10hz binaural beats study' },
  { id: 11, title: 'Theta 6Hz Deep Focus', artist: 'Meditation Beats', type: 'binaural', emoji: '🎯', description: 'Deep concentration', youtubeSearch: 'theta 6hz binaural beats deep focus' },
  { id: 12, title: 'Beta 20Hz Active Mind', artist: 'Focus Waves', type: 'binaural', emoji: '⚡', description: 'Active thinking & problem solving', youtubeSearch: 'beta 20hz binaural beats active mind' },
  { id: 13, title: 'Delta 2Hz Deep Rest', artist: 'Sleep Waves', type: 'binaural', emoji: '😴', description: 'Deep rest & recovery', youtubeSearch: 'delta 2hz binaural beats deep sleep' },
  { id: 14, title: '528Hz Solfeggio', artist: 'Healing Tones', type: 'binaural', emoji: '✨', description: 'DNA repair & transformation', youtubeSearch: '528hz solfeggio frequency study' },
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'motivational' | 'binaural'>('motivational');

  const motivationalTracks = tracks.filter(t => t.type === 'motivational');
  const binauralTracks = tracks.filter(t => t.type === 'binaural');

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const list = activeTab === 'motivational' ? motivationalTracks : binauralTracks;
    if (!currentTrack) { setCurrentTrack(list[0]); return; }
    const idx = list.findIndex(t => t.id === currentTrack.id);
    setCurrentTrack(list[(idx + 1) % list.length]);
  };

  const handlePrev = () => {
    const list = activeTab === 'motivational' ? motivationalTracks : binauralTracks;
    if (!currentTrack) { setCurrentTrack(list[0]); return; }
    const idx = list.findIndex(t => t.id === currentTrack.id);
    setCurrentTrack(list[(idx - 1 + list.length) % list.length]);
  };

  const openYouTube = () => {
    if (currentTrack) {
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(currentTrack.youtubeSearch)}`, '_blank');
    }
  };

  const TrackList = ({ trackList }: { trackList: Track[] }) => (
    <div className="space-y-2">
      {trackList.map(track => (
        <button
          key={track.id}
          onClick={() => handleTrackSelect(track)}
          className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
            currentTrack?.id === track.id
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 hover:bg-accent/20'
          }`}
        >
          <span className="text-2xl">{track.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">{track.title}</p>
            <p className="text-xs text-muted-foreground truncate">{track.artist} · {track.description}</p>
          </div>
          {currentTrack?.id === track.id && isPlaying && (
            <div className="flex gap-0.5 items-end h-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1 rounded-full animate-pulse" style={{ height: `${8 + i * 4}px`, background: 'oklch(0.65 0.17 55)', animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
      <h2 className="font-heading font-bold text-2xl text-foreground">🎵 Music Player</h2>

      {/* Now Playing */}
      <Card className="premium-card" style={{ background: 'linear-gradient(135deg, oklch(0.17 0.015 260), oklch(0.22 0.02 260))' }}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, oklch(0.65 0.17 55), oklch(0.75 0.15 65))' }}>
              {currentTrack?.emoji || '🎵'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-white text-lg truncate">
                {currentTrack?.title || 'Select a track'}
              </p>
              <p className="text-white/60 text-sm truncate">{currentTrack?.artist || 'Choose from the list below'}</p>
              {currentTrack && (
                <Badge className="mt-1 text-xs" style={{ background: currentTrack.type === 'motivational' ? 'oklch(0.65 0.17 55)' : 'oklch(0.55 0.14 200)' }}>
                  {currentTrack.type === 'motivational' ? '🔥 Motivational' : '🧠 Binaural'}
                </Badge>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={handlePrev} className="text-white/70 hover:text-white">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className="w-12 h-12 rounded-full"
              style={{ background: 'oklch(0.65 0.17 55)' }}
              onClick={() => {
                if (currentTrack) {
                  setIsPlaying(!isPlaying);
                  if (!isPlaying) openYouTube();
                } else {
                  const list = activeTab === 'motivational' ? motivationalTracks : binauralTracks;
                  handleTrackSelect(list[0]);
                }
              }}
            >
              {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNext} className="text-white/70 hover:text-white">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="text-white/70 hover:text-white">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={([v]) => { setVolume(v); setIsMuted(false); }}
              max={100}
              className="flex-1"
            />
            <span className="text-white/60 text-xs w-8">{isMuted ? 0 : volume}%</span>
          </div>

          {currentTrack && (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 border-white/20 text-white/80 hover:bg-white/10"
              onClick={openYouTube}
            >
              🎬 Open on YouTube
            </Button>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        💡 Tracks open on YouTube. Use headphones for binaural beats for best effect.
      </p>

      {/* Track List */}
      <Tabs value={activeTab} onValueChange={v => setActiveTab(v as 'motivational' | 'binaural')}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="motivational">🔥 Motivational</TabsTrigger>
          <TabsTrigger value="binaural">🧠 Binaural Beats</TabsTrigger>
        </TabsList>
        <TabsContent value="motivational" className="mt-4">
          <TrackList trackList={motivationalTracks} />
        </TabsContent>
        <TabsContent value="binaural" className="mt-4">
          <TrackList trackList={binauralTracks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
