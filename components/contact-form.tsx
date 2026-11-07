"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, CheckCircle2, MessageCircle, Linkedin } from "lucide-react";
import { LINKS } from "@/constants/links";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare mailto link with encoded content
    const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${LINKS.EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Attempt to trigger mailto
    window.location.href = mailtoUrl;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <Card className="border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm shadow-lg">
        <CardContent className="p-8 text-center space-y-4">
          <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
          <h3 className="text-xl font-bold text-foreground">Message Ready to Send!</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Your default email client has been opened with the message pre-filled. If it didn't open automatically,
            you can reach Shubham directly via:
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button asChild size="sm" className="bg-[#0A66C2] hover:bg-[#004182] text-white">
              <a href={LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 mr-1.5 fill-current" />
                Message on LinkedIn
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10">
              <a href={LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-1.5" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
              className="text-xs text-muted-foreground"
            >
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60 bg-card/60 backdrop-blur-sm shadow-md">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6">
          <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary mb-3">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-1">Send Me a Message</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Have a project in mind or an engineering opportunity? Reach out directly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold">Your Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="bg-background/50 border-border/60 text-sm"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
                className="bg-background/50 border-border/60 text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-xs font-semibold">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Full-Stack Engineer Role / Project Consultation"
              className="bg-background/50 border-border/60 text-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-xs font-semibold">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your requirements, timeline, or open role..."
              rows={4}
              className="bg-background/50 border-border/60 text-sm"
              required
            />
          </div>

          <Button type="submit" className="w-full shadow-md" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Opening Mailer...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Send via Email Client
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
