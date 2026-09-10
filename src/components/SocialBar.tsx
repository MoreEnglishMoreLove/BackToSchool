import React from 'react';
import { MessageCircle, Youtube, Instagram, Send, Facebook, Heart } from 'lucide-react';
import { TEACHER_WHATSAPP_NUMBER } from '../utils/cryptoAlgorithm';

export const SocialBar: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <footer className="w-full bg-slate-900/95 border-t border-slate-800/80 backdrop-blur-md text-slate-300 py-4 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Teacher & Branding info */}
        <div className="flex items-center gap-3 text-center md:text-right">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-cyan-500/20">
            JS
          </div>
          <div>
            <div className="font-english font-bold text-white tracking-wide text-sm md:text-base flex items-center gap-1.5 justify-center md:justify-start">
              <span>English Teacher's Name:</span>
              <span className="text-cyan-400">T. Jaidaa Saqer</span>
            </div>
            <div className="text-xs text-slate-400 font-arabic flex items-center gap-1 justify-center md:justify-start">
              <span>بإشراف وتدريس المعلمة جيداء صقر</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
              <span>MORE ENGLISH MORE LOVE</span>
            </div>
          </div>
        </div>

        {/* Official Channels as featured in curriculum pages */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs">
          {/* WhatsApp */}
          <a
            id="social-whatsapp-link"
            href={`https://wa.me/${TEACHER_WHATSAPP_NUMBER.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors font-english font-medium"
            title="WhatsApp Contact"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>{TEACHER_WHATSAPP_NUMBER}</span>
          </a>

          {/* Facebook */}
          <a
            id="social-facebook-link"
            href="https://www.facebook.com/MoreEnglishMoreLove/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 transition-colors font-english font-medium"
            title="Facebook Page"
          >
            <Facebook className="w-4 h-4 text-blue-400" />
            <span>Facebook Page</span>
          </a>

          {/* YouTube */}
          <a
            id="social-youtube-link"
            href="https://www.youtube.com/@MoreEnglishMoreLove"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 transition-colors font-english font-medium"
            title="YouTube Channel"
          >
            <Youtube className="w-4 h-4 text-red-400" />
            <span>YouTube</span>
          </a>

          {/* Instagram */}
          <a
            id="social-instagram-link"
            href="https://www.instagram.com/moreenglishmorelove/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600/10 hover:bg-pink-600/20 text-pink-400 border border-pink-500/30 transition-colors font-english font-medium"
            title="Instagram"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Instagram</span>
          </a>

          {/* Telegram */}
          <a
            id="social-telegram-link"
            href="https://t.me/moreenglishmorelove"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-colors font-english font-medium"
            title="Telegram Channel"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>Telegram</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
