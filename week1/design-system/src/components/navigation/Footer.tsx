"use client"

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/navigation/Logo'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowUp
} from 'lucide-react'

const footerVariants = cva(
  "w-full bg-background",
  {
    variants: {
      variant: {
        default: "bg-background",
        dark: "bg-secondary/50 dark:bg-secondary/20",
        primary: "bg-primary text-primary-foreground",
        minimal: "bg-transparent border-none",
      },
      size: {
        sm: "py-8",
        md: "py-12",
        lg: "py-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface FooterLink {
  label: string
  href: string
  external?: boolean
  badge?: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'youtube' | 'linkedin' | 'github'
  href: string
  label?: string
}

interface ContactInfo {
  email?: string
  phone?: string
  address?: string
}

interface FooterProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  sections?: FooterSection[]
  socialLinks?: SocialLink[]
  contactInfo?: ContactInfo
  showNewsletter?: boolean
  newsletterTitle?: string
  newsletterDescription?: string
  onNewsletterSubmit?: (email: string) => void
  showBackToTop?: boolean
  copyright?: string
  bottomLinks?: FooterLink[]
  companyDescription?: string
}

const SocialIcon = ({ platform }: { platform: SocialLink['platform'] }) => {
  const iconProps = { className: "h-4 w-4" }
  
  switch (platform) {
    case 'facebook': return <Facebook {...iconProps} />
    case 'twitter': return <Twitter {...iconProps} />
    case 'instagram': return <Instagram {...iconProps} />
    case 'youtube': return <Youtube {...iconProps} />
    case 'linkedin': return <Linkedin {...iconProps} />
    case 'github': return <Github {...iconProps} />
    default: return null
  }
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({
    className,
    variant,
    size,
    sections = [
      {
        title: "서비스",
        links: [
          { label: "기능", href: "/features" },
          { label: "요금제", href: "/pricing" },
          { label: "API", href: "/api", badge: "신규" },
          { label: "문서", href: "/docs" }
        ]
      },
      {
        title: "회사",
        links: [
          { label: "소개", href: "/about" },
          { label: "블로그", href: "/blog" },
          { label: "채용", href: "/careers" },
          { label: "문의", href: "/contact" }
        ]
      },
      {
        title: "지원",
        links: [
          { label: "고객센터", href: "/help" },
          { label: "커뮤니티", href: "/community" },
          { label: "서비스 상태", href: "https://status.example.com", external: true },
          { label: "버그 신고", href: "/bug-report" }
        ]
      }
    ],
    socialLinks = [
      { platform: 'twitter', href: 'https://twitter.com/company' },
      { platform: 'github', href: 'https://github.com/company' },
      { platform: 'linkedin', href: 'https://linkedin.com/company/company' }
    ],
    contactInfo,
    showNewsletter = false,
    newsletterTitle = "최신 소식 받기",
    newsletterDescription = "뉴스레터를 구독하여 최신 업데이트를 받아보세요.",
    onNewsletterSubmit,
    showBackToTop = true,
    copyright,
    bottomLinks = [
      { label: "개인정보처리방침", href: "/privacy" },
      { label: "이용약관", href: "/terms" },
      { label: "쿠키정책", href: "/cookies" }
    ],
    companyDescription,
    ...props
  }, ref) => {
    const [newsletterEmail, setNewsletterEmail] = React.useState("")

    const handleNewsletterSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (newsletterEmail.trim()) {
        onNewsletterSubmit?.(newsletterEmail)
        setNewsletterEmail("")
      }
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const isPrimary = variant === "primary"

    return (
      <footer 
        ref={ref} 
        className={cn(footerVariants({ variant, size }), className)} 
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <Logo variant={isPrimary ? "white" : "default"} />
              {companyDescription && (
                <p className={cn(
                  "text-sm leading-relaxed",
                  isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {companyDescription}
                </p>
              )}
              
              {/* Contact Info */}
              {contactInfo && (
                <div className="space-y-2">
                  {contactInfo.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3" />
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className={cn(
                          "hover:underline",
                          isPrimary ? "text-primary-foreground/80 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  )}
                  {contactInfo.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3" />
                      <a 
                        href={`tel:${contactInfo.phone}`}
                        className={cn(
                          "hover:underline",
                          isPrimary ? "text-primary-foreground/80 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  )}
                  {contactInfo.address && (
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-3 w-3 mt-0.5" />
                      <span className={cn(
                        isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>
                        {contactInfo.address}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.platform}
                      variant={isPrimary ? "secondary" : "ghost"}
                      size="sm"
                      className="h-9 w-9 p-0"
                      asChild
                    >
                      <a 
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label || `Follow us on ${social.platform}`}
                      >
                        <SocialIcon platform={social.platform} />
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Sections */}
            {sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className={cn(
                  "font-semibold text-sm uppercase tracking-wide",
                  isPrimary ? "text-primary-foreground" : "text-foreground"
                )}>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className={cn(
                          "text-sm hover:underline inline-flex items-center gap-2",
                          isPrimary 
                            ? "text-primary-foreground/80 hover:text-primary-foreground" 
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {link.label}
                        {link.badge && (
                          <Badge variant="secondary" className="text-xs h-4 px-1.5">
                            {link.badge}
                          </Badge>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Signup */}
            {showNewsletter && (
              <div className="space-y-4">
                <h3 className={cn(
                  "font-semibold text-sm uppercase tracking-wide",
                  isPrimary ? "text-primary-foreground" : "text-foreground"
                )}>
                  {newsletterTitle}
                </h3>
                <p className={cn(
                  "text-sm",
                  isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {newsletterDescription}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <Input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className={cn(
                      isPrimary && "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    )}
                  />
                  <Button 
                    type="submit"
                    variant={isPrimary ? "secondary" : "default"}
                    size="sm"
                    className="w-full"
                  >
                    구독하기
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Separator - 화면 전체 너비 */}
        <Separator className={cn(
          "my-8",
          isPrimary && "bg-primary-foreground/20"
        )} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className={cn(
                "text-xs",
                isPrimary ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {copyright || `© ${new Date().getFullYear()} forif. 모든 권리 보유.`}
              </p>
            </div>

            {/* Bottom Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {bottomLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "text-xs hover:underline",
                    isPrimary 
                      ? "text-primary-foreground/70 hover:text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
              
              {/* Back to Top */}
              {showBackToTop && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className={cn(
                    "text-xs h-auto p-1 hover:bg-transparent",
                    isPrimary 
                      ? "text-primary-foreground/70 hover:text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ArrowUp className="h-3 w-3 mr-1" />
                  맨 위로
                </Button>
              )}
            </div>
          </div>
        </div>
      </footer>
    )
  }
)

Footer.displayName = "Footer"

export { Footer, footerVariants }
export type { FooterLink, FooterSection, SocialLink, ContactInfo, FooterProps }