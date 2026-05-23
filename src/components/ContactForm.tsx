/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, MessageSquare, Copy, Check, Send, PhoneCall, Globe } from 'lucide-react';

interface ContactFormProps {
  contacts: {
    whatsapp: string;
    whatsappUrl: string;
    email: string;
    linkedin: string;
    linkedinUrl: string;
    github: string;
    githubUrl: string;
  };
  isPt: boolean;
}

export default function ContactForm({ contacts, isPt }: ContactFormProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div id="contact-form-component" className="max-w-xl mx-auto w-full">
      {/* Contact Channels Options Info */}
      <div className="flex flex-col justify-between p-6 rounded-2xl border border-white/5 bg-[#080612]/30 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-zinc-200 tracking-tight flex items-center gap-1.5 mb-2 decoration-rose-500/25">
            <MessageSquare className="w-4 h-4 text-rose-400" />
            {isPt ? 'Canais Diretos' : 'Contact Channels'}
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-normal mb-5">
            {isPt 
              ? 'Se preferir contato direto ou queira conversar de forma imediata, use os caminhos abaixo.' 
              : 'Feel free to reach out directly through WhatsApp, Email, or check out my profiles.'}
          </p>

          <div className="space-y-3.5 select-none font-normal">
            {/* Email copying widget */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs font-mono">
              <span className="text-zinc-400 font-semibold flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                Email
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 tracking-tight overflow-hidden text-ellipsis max-w-[150px] md:max-w-xs">{contacts.email}</span>
                <button 
                  id="copy-email-btn"
                  onClick={() => handleCopy(contacts.email, 'email')}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-all cursor-pointer"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* WhatsApp clicking channel */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs font-mono">
              <span className="text-zinc-400 font-semibold flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 tracking-tight">{contacts.whatsapp}</span>
                <a 
                  id="whatsapp-link"
                  href={contacts.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-1 rounded text-zinc-500 hover:text-emerald-400 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* LinkedIn clicking channel */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs font-mono">
              <span className="text-zinc-400 font-semibold flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                LinkedIn
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 tracking-tight">/in/raphael-rapisardi</span>
                <a 
                  id="linkedin-link"
                  href={contacts.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-1 rounded text-zinc-500 hover:text-sky-400 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Live Active Clock matching design guidelines (e.g. anti-ai-slop, but a neat, honest local stamp) */}
        <div className="pt-4 border-t border-white/5 mt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500 select-none">
          <span>{isPt ? "FUSO HORÁRIO" : "TIMEZONE"}</span>
          <span className="font-semibold text-zinc-450">SAO PAULO (UTC-3)</span>
        </div>
      </div>
    </div>
  );
}
