import { useState } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Trash2, ExternalLink, CheckCheck } from 'lucide-react';

export default function NotificationsFeed() {
  const { notifications, unreadCount, addNotification, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    addNotification(title, description, link || undefined);
    setTitle(''); setDescription(''); setLink('');
    setShowForm(false);
  };

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(ts).toLocaleDateString();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-heading font-bold text-2xl text-foreground">🔔 NextTopper Updates</h2>
          {unreadCount > 0 && (
            <Badge style={{ background: 'oklch(0.65 0.17 55)' }}>{unreadCount} new</Badge>
          )}
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="w-4 h-4 mr-1" /> Mark all read
            </Button>
          )}
          <Button size="sm" onClick={() => setShowForm(!showForm)} style={{ background: 'oklch(0.65 0.17 55)' }}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="premium-card border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-heading">📢 Post New Update</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs mb-1 block">Title *</Label>
              <Input placeholder="New video: How to score 100 in Physics..." value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Description</Label>
              <Textarea placeholder="Brief description of the content..." value={description} onChange={e => setDescription(e.target.value)} rows={2} />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Link (optional)</Label>
              <Input placeholder="https://youtube.com/..." value={link} onChange={e => setLink(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="flex-1" style={{ background: 'oklch(0.65 0.17 55)' }}>Post Update</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {notifications.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No notifications yet. Add one above!</p>
          </div>
        )}
        {notifications.map(notif => (
          <Card
            key={notif.id}
            className={`premium-card cursor-pointer transition-all duration-200 ${!notif.isRead ? 'border-primary/40 bg-primary/5' : ''}`}
            onClick={() => markAsRead(notif.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.isRead ? 'bg-muted' : 'bg-primary pulse-gold'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-medium text-sm ${notif.isRead ? 'text-foreground' : 'text-foreground font-semibold'}`}>
                      {notif.title}
                    </p>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{formatTime(notif.timestamp)}</span>
                  </div>
                  {notif.description && (
                    <p className="text-sm text-muted-foreground mt-1">{notif.description}</p>
                  )}
                  {notif.link && (
                    <a
                      href={notif.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs mt-2 hover:underline"
                      style={{ color: 'oklch(0.65 0.17 55)' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" /> Open Link
                    </a>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 text-muted-foreground hover:text-destructive flex-shrink-0"
                  onClick={e => { e.stopPropagation(); deleteNotification(notif.id); }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
