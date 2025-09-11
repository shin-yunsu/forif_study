"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLink } from "lucide-react"

const termsCheckboxVariants = cva(
  "space-y-3",
  {
    variants: {
      variant: {
        default: "",
        compact: "space-y-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface TermItem {
  id: string
  title: string
  required: boolean
  content?: string
  url?: string
  description?: string
}

interface TermsCheckboxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof termsCheckboxVariants> {
  terms: TermItem[]
  onTermsChange?: (checkedTerms: Record<string, boolean>) => void
  showSelectAll?: boolean
  selectAllText?: string
  disabled?: boolean
}

const TermsCheckbox = React.forwardRef<HTMLDivElement, TermsCheckboxProps>(
  ({
    className,
    variant,
    terms,
    onTermsChange,
    showSelectAll = true,
    selectAllText = "전체 약관에 동의합니다",
    disabled = false,
    ...props
  }, ref) => {
    const [checkedTerms, setCheckedTerms] = React.useState<Record<string, boolean>>({})
    const [openDialogs, setOpenDialogs] = React.useState<Record<string, boolean>>({})

    const requiredTerms = terms.filter(term => term.required)
    const allRequiredChecked = requiredTerms.every(term => checkedTerms[term.id])
    const allTermsChecked = terms.every(term => checkedTerms[term.id])

    const handleTermChange = (termId: string, checked: boolean) => {
      const newCheckedTerms = { ...checkedTerms, [termId]: checked }
      setCheckedTerms(newCheckedTerms)
      onTermsChange?.(newCheckedTerms)
    }

    const handleSelectAll = (checked: boolean) => {
      const newCheckedTerms: Record<string, boolean> = {}
      terms.forEach(term => {
        newCheckedTerms[term.id] = checked
      })
      setCheckedTerms(newCheckedTerms)
      onTermsChange?.(newCheckedTerms)
    }

    const openDialog = (termId: string) => {
      setOpenDialogs(prev => ({ ...prev, [termId]: true }))
    }

    const closeDialog = (termId: string) => {
      setOpenDialogs(prev => ({ ...prev, [termId]: false }))
    }

    const handleTermLinkClick = (term: TermItem) => {
      if (term.url) {
        window.open(term.url, '_blank')
      } else if (term.content) {
        openDialog(term.id)
      }
    }

    return (
      <div ref={ref} className={cn(termsCheckboxVariants({ variant }), className)} {...props}>
        {showSelectAll && (
          <div className="pb-2 border-b">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={allTermsChecked}
                onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                disabled={disabled}
                className="mt-0.5"
              />
              <Label
                htmlFor="select-all"
                className={cn(
                  "text-sm font-medium cursor-pointer",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {selectAllText}
              </Label>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {terms.map((term) => (
            <div key={term.id} className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id={term.id}
                  checked={checkedTerms[term.id] || false}
                  onCheckedChange={(checked) => handleTermChange(term.id, checked as boolean)}
                  disabled={disabled}
                  className="mt-0.5"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor={term.id}
                      className={cn(
                        "text-sm cursor-pointer flex items-center gap-2",
                        disabled && "cursor-not-allowed opacity-50"
                      )}
                    >
                      <span>
                        {term.title}
                        {term.required && (
                          <span className="text-destructive ml-1">*</span>
                        )}
                      </span>
                    </Label>
                    
                    {(term.content || term.url) && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => handleTermLinkClick(term)}
                        disabled={disabled}
                      >
                        보기
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  {term.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {term.description}
                    </p>
                  )}
                </div>
              </div>

              {/* 약관 내용 모달 */}
              {term.content && (
                <Dialog 
                  open={openDialogs[term.id] || false} 
                  onOpenChange={(open) => open ? openDialog(term.id) : closeDialog(term.id)}
                >
                  <DialogContent className="max-w-2xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>{term.title}</DialogTitle>
                      <DialogDescription>
                        아래 약관 내용을 확인해주세요.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <ScrollArea className="max-h-[60vh] pr-4">
                      <div className="whitespace-pre-line text-sm leading-relaxed">
                        {term.content}
                      </div>
                    </ScrollArea>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => closeDialog(term.id)}
                      >
                        닫기
                      </Button>
                      <Button
                        onClick={() => {
                          handleTermChange(term.id, true)
                          closeDialog(term.id)
                        }}
                      >
                        동의하고 닫기
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ))}
        </div>

        {/* 필수 약관 미동의 시 경고 메시지 */}
        {!allRequiredChecked && Object.keys(checkedTerms).length > 0 && (
          <div className="text-sm text-destructive">
            필수 약관에 모두 동의해야 합니다.
          </div>
        )}
      </div>
    )
  }
)

TermsCheckbox.displayName = "TermsCheckbox"

export { TermsCheckbox, termsCheckboxVariants, type TermsCheckboxProps, type TermItem }