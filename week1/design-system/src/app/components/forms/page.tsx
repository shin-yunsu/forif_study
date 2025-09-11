"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PasswordInput } from '@/components/ui/password-input'
import { FormField } from '@/components/ui/form-field'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function FormsPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
    country: '',
    newsletter: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = '이메일은 필수입니다'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요'
    }
    
    if (!formData.password) {
      newErrors.password = '비밀번호는 필수입니다'
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다'
    }
    
    if (!formData.agreed) {
      newErrors.agreed = '약관에 동의해주세요'
    }
    
    if (!formData.country) {
      newErrors.country = '국가를 선택해주세요'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link href="/components" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          컴포넌트 목록으로 돌아가기
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold tracking-tight">폼 & 입력 컴포넌트</h1>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            완료
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          사용자 입력과 폼 처리를 위한 컴포넌트들입니다. 유효성 검사, 접근성, 사용성을 고려하여 설계되었습니다.
        </p>
      </div>

      {/* Component Showcase */}
      <div className="space-y-8">
        
        {/* Basic Input Components */}
        <Card>
          <CardHeader>
            <CardTitle>기본 입력 컴포넌트</CardTitle>
            <CardDescription>
              Input, Label, Button 등 기본적인 폼 요소들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="이메일 주소" required>
                <Input 
                  type="email" 
                  placeholder="example@domain.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </FormField>
              
              <FormField label="전화번호" description="국가 코드를 포함해 입력해주세요">
                <Input type="tel" placeholder="+82 10-1234-5678" />
              </FormField>
            </div>

            <div className="flex gap-4">
              <Button>Primary 버튼</Button>
              <Button variant="secondary">Secondary 버튼</Button>
              <Button variant="outline">Outline 버튼</Button>
              <Button variant="ghost">Ghost 버튼</Button>
            </div>
          </CardContent>
        </Card>

        {/* Password Input */}
        <Card>
          <CardHeader>
            <CardTitle>패스워드 입력 컴포넌트</CardTitle>
            <CardDescription>
              비밀번호 표시/숨김 기능과 강도 측정 기능이 포함된 패스워드 입력 컴포넌트입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="비밀번호" 
                required
                error={errors.password}
                description="최소 8자, 대소문자, 숫자, 특수문자 포함"
              >
                <PasswordInput 
                  placeholder="비밀번호를 입력하세요"
                  showPasswordStrength={true}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </FormField>
              
              <FormField 
                label="비밀번호 확인" 
                required
                error={errors.confirmPassword}
              >
                <PasswordInput 
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Select and Checkbox */}
        <Card>
          <CardHeader>
            <CardTitle>선택 컴포넌트</CardTitle>
            <CardDescription>
              Select, Checkbox 등 선택 기능을 제공하는 컴포넌트들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="국가 선택" 
                required
                error={errors.country}
              >
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="국가를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kr">대한민국</SelectItem>
                    <SelectItem value="us">미국</SelectItem>
                    <SelectItem value="jp">일본</SelectItem>
                    <SelectItem value="cn">중국</SelectItem>
                    <SelectItem value="de">독일</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>추가 옵션</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                      />
                      <Label htmlFor="newsletter">뉴스레터 구독</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="agreed"
                        checked={formData.agreed}
                        onCheckedChange={(checked) => handleInputChange('agreed', checked)}
                      />
                      <Label htmlFor="agreed" className={errors.agreed ? "text-destructive" : ""}>
                        이용약관 및 개인정보처리방침에 동의합니다 *
                      </Label>
                    </div>
                    {errors.agreed && (
                      <p className="text-sm text-destructive">{errors.agreed}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Example */}
        <Card>
          <CardHeader>
            <CardTitle>완전한 폼 예제</CardTitle>
            <CardDescription>
              위의 모든 컴포넌트들을 결합한 실제 회원가입 폼 예제입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField 
                  label="이메일 주소" 
                  required
                  error={errors.email}
                >
                  <Input 
                    type="email" 
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </FormField>
                
                <FormField 
                  label="국가" 
                  required
                  error={errors.country}
                >
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="국가 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kr">대한민국</SelectItem>
                      <SelectItem value="us">미국</SelectItem>
                      <SelectItem value="jp">일본</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField 
                  label="비밀번호" 
                  required
                  error={errors.password}
                  description="최소 8자, 대소문자, 숫자, 특수문자 포함"
                >
                  <PasswordInput 
                    showPasswordStrength={true}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </FormField>
                
                <FormField 
                  label="비밀번호 확인" 
                  required
                  error={errors.confirmPassword}
                >
                  <PasswordInput 
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                </FormField>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="form-newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                  />
                  <Label htmlFor="form-newsletter">마케팅 이메일 수신에 동의합니다</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="form-agreed"
                    checked={formData.agreed}
                    onCheckedChange={(checked) => handleInputChange('agreed', checked)}
                  />
                  <Label htmlFor="form-agreed" className={errors.agreed ? "text-destructive" : ""}>
                    이용약관 및 개인정보처리방침에 동의합니다 *
                  </Label>
                </div>
                {errors.agreed && (
                  <p className="text-sm text-destructive">{errors.agreed}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit">회원가입</Button>
                <Button type="button" variant="outline" onClick={() => {
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    agreed: false,
                    country: '',
                    newsletter: false
                  })
                  setErrors({})
                }}>
                  초기화
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Component List */}
        <Card>
          <CardHeader>
            <CardTitle>포함된 컴포넌트</CardTitle>
            <CardDescription>
              이 섹션에서 구현한 폼 관련 컴포넌트들의 목록입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Input', path: '@/components/ui/input', description: '기본 입력 필드' },
                { name: 'Button', path: '@/components/ui/button', description: '다양한 스타일 버튼' },
                { name: 'Label', path: '@/components/ui/label', description: '접근성을 고려한 라벨' },
                { name: 'Checkbox', path: '@/components/ui/checkbox', description: '체크박스 입력' },
                { name: 'Select', path: '@/components/ui/select', description: '드롭다운 선택' },
                { name: 'PasswordInput', path: '@/components/ui/password-input', description: '패스워드 입력 + 강도 표시' },
                { name: 'FormField', path: '@/components/ui/form-field', description: '폼 필드 래퍼' },
              ].map((component) => (
                <Card key={component.name} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{component.name}</h4>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        완료
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {component.description}
                    </p>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {component.path}
                    </code>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}