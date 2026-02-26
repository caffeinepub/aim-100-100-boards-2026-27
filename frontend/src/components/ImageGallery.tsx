import { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Trash2, Image as ImageIcon, X } from 'lucide-react';

const BANK_SIZE = 500;

interface ImageSlot {
  dataUrl: string | null;
  name: string;
}

function useImageBank(bankKey: string) {
  const [slots, setSlots] = useState<ImageSlot[]>(() => {
    const stored = localStorage.getItem(bankKey);
    if (stored) {
      try { return JSON.parse(stored); }
      catch { /* ignore */ }
    }
    return Array(BANK_SIZE).fill(null).map(() => ({ dataUrl: null, name: '' }));
  });

  const save = (data: ImageSlot[]) => {
    localStorage.setItem(bankKey, JSON.stringify(data));
    setSlots(data);
  };

  const uploadImage = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...slots];
      updated[index] = { dataUrl: e.target?.result as string, name: file.name };
      save(updated);
    };
    reader.readAsDataURL(file);
  };

  const deleteImage = (index: number) => {
    const updated = [...slots];
    updated[index] = { dataUrl: null, name: '' };
    save(updated);
  };

  const usedCount = slots.filter(s => s.dataUrl !== null).length;

  return { slots, uploadImage, deleteImage, usedCount };
}

interface BankProps {
  bankKey: string;
  bankName: string;
}

function ImageBank({ bankKey, bankName }: BankProps) {
  const { slots, uploadImage, deleteImage, usedCount } = useImageBank(bankKey);
  const [page, setPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingSlot, setPendingSlot] = useState<number | null>(null);

  const ITEMS_PER_PAGE = 50;
  const totalPages = Math.ceil(BANK_SIZE / ITEMS_PER_PAGE);
  const pageSlots = slots.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const handleSlotClick = (globalIndex: number) => {
    if (slots[globalIndex].dataUrl) {
      setSelectedImage({ url: slots[globalIndex].dataUrl!, name: slots[globalIndex].name });
    } else {
      setPendingSlot(globalIndex);
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && pendingSlot !== null) {
      uploadImage(pendingSlot, file);
      setPendingSlot(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {/* Stats */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm px-3 py-1">
          📸 {usedCount}/{BANK_SIZE} slots used
        </Badge>
        <div className="flex gap-1">
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => (
            <Button
              key={i}
              variant={page === i ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPage(i)}
              className="w-8 h-8 p-0 text-xs"
              style={page === i ? { background: 'oklch(0.65 0.17 55)' } : {}}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
        {pageSlots.map((slot, localIndex) => {
          const globalIndex = page * ITEMS_PER_PAGE + localIndex;
          return (
            <div
              key={globalIndex}
              onClick={() => handleSlotClick(globalIndex)}
              className="aspect-square rounded-lg border border-border cursor-pointer overflow-hidden relative group transition-all duration-200 hover:border-primary hover:shadow-md"
              style={{ background: slot.dataUrl ? 'transparent' : 'oklch(var(--muted))' }}
            >
              {slot.dataUrl ? (
                <>
                  <img src={slot.dataUrl} alt={slot.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-white hover:text-red-400"
                      onClick={e => { e.stopPropagation(); deleteImage(globalIndex); }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Upload className="w-3 h-3 text-muted-foreground opacity-50" />
                </div>
              )}
              <span className="absolute bottom-0 left-0 right-0 text-center text-white text-[8px] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity py-0.5">
                {globalIndex + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-2xl max-h-[80vh]" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.name} className="max-w-full max-h-[80vh] rounded-xl object-contain" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-4 h-4" />
            </Button>
            <p className="text-white text-center text-sm mt-2">{selectedImage.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ImageGallery() {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="font-heading font-bold text-2xl text-foreground">🖼️ Image Gallery</h2>
      <Tabs defaultValue="bankA">
        <TabsList className="grid grid-cols-2 w-full max-w-xs">
          <TabsTrigger value="bankA">📁 Bank A</TabsTrigger>
          <TabsTrigger value="bankB">📁 Bank B</TabsTrigger>
        </TabsList>
        <TabsContent value="bankA" className="mt-4">
          <Card className="premium-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-heading flex items-center gap-2">
                <ImageIcon className="w-4 h-4" style={{ color: 'oklch(0.65 0.17 55)' }} />
                Bank A — 500 Slots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageBank bankKey="aim100-gallery-a" bankName="Bank A" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bankB" className="mt-4">
          <Card className="premium-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-heading flex items-center gap-2">
                <ImageIcon className="w-4 h-4" style={{ color: 'oklch(0.65 0.17 55)' }} />
                Bank B — 500 Slots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageBank bankKey="aim100-gallery-b" bankName="Bank B" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
