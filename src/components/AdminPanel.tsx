import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from './Sparkles';

export const AdminPanel = () => {
  const [recipientName, setRecipientName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    if (!recipientName.trim()) {
      toast.error('Vui lòng nhập tên người nhận');
      return;
    }

    const baseUrl = window.location.origin;
    const encodedName = encodeURIComponent(recipientName.trim());
    const link = `${baseUrl}/card?name=${encodedName}`;
    
    setGeneratedLink(link);
    toast.success('Đã tạo link thành công!');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast.success('Đã sao chép link!');
    } catch {
      toast.error('Không thể sao chép link');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light to-background" />
      <Sparkles />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-script text-5xl text-gold mb-2" style={{ textShadow: '0 0 20px hsl(43, 74%, 53%)' }}>
            Thiệp Sinh Nhật
          </h1>
          <p className="text-muted-foreground">
            Tạo thiệp sinh nhật cá nhân hóa
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-gold/30 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-6">
            {/* Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Tên người nhận
              </label>
              <Input
                type="text"
                placeholder="Nhập tên người nhận..."
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="bg-secondary border-gold/30 focus:border-gold text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Generate button */}
            <Button
              onClick={generateLink}
              className="w-full bg-gold hover:bg-gold-light text-primary-foreground font-semibold py-6 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-gold/30"
            >
              ✨ Tạo Link Thiệp
            </Button>

            {/* Generated link */}
            {generatedLink && (
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <label className="text-sm font-medium text-foreground">
                  Link thiệp
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="bg-secondary border-gold/30 text-foreground text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="border-gold/50 text-gold hover:bg-gold hover:text-primary-foreground shrink-0"
                  >
                    Copy
                  </Button>
                </div>
                
                {/* Preview link */}
                <a
                  href={generatedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-gold hover:text-gold-light underline underline-offset-4 transition-colors"
                >
                  Xem trước thiệp →
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center mt-6 text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          VietinBank Chi Nhánh TP. Hồ Chí Minh
        </motion.p>
      </motion.div>
    </div>
  );
};
