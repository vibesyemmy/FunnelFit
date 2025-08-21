import React from 'react'
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Select,
  Avatar
} from './ui'

const DesignSystemShowcase: React.FC = () => {
  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  return (
    <div className="min-h-screen bg-gray-25 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FunnelFit Design System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional SaaS platform UI components following Untitled UI design patterns
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Primary Colors */}
            <div className="space-y-2">
              <div className="h-16 bg-primary-500 rounded-lg"></div>
              <p className="text-sm font-medium">Primary 500</p>
              <p className="text-xs text-gray-500">#9E7B64</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-600 rounded-lg"></div>
              <p className="text-sm font-medium">Primary 600</p>
              <p className="text-xs text-gray-500">#8f6a55</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-400 rounded-lg"></div>
              <p className="text-sm font-medium">Primary 400</p>
              <p className="text-xs text-gray-500">#d2bab0</p>
            </div>
            
            {/* Gray Colors */}
            <div className="space-y-2">
              <div className="h-16 bg-gray-100 rounded-lg"></div>
              <p className="text-sm font-medium">Gray 100</p>
              <p className="text-xs text-gray-500">#f2f4f7</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-gray-500 rounded-lg"></div>
              <p className="text-sm font-medium">Gray 500</p>
              <p className="text-xs text-gray-500">#667085</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-gray-900 rounded-lg"></div>
              <p className="text-sm font-medium">Gray 900</p>
              <p className="text-xs text-gray-500">#101828</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Typography</h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-6xl font-bold text-gray-900">Heading 1</h1>
              <p className="text-sm text-gray-500 mt-2">text-6xl font-bold</p>
            </div>
            <div>
              <h2 className="text-4xl font-semibold text-gray-900">Heading 2</h2>
              <p className="text-sm text-gray-500 mt-2">text-4xl font-semibold</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Heading 3</h3>
              <p className="text-sm text-gray-500 mt-2">text-2xl font-semibold</p>
            </div>
            <div>
              <p className="text-lg text-gray-900">Body Large</p>
              <p className="text-sm text-gray-500 mt-2">text-lg</p>
            </div>
            <div>
              <p className="text-base text-gray-900">Body Default</p>
              <p className="text-sm text-gray-500 mt-2">text-base</p>
            </div>
            <div>
              <p className="text-sm text-gray-900">Body Small</p>
              <p className="text-sm text-gray-500 mt-2">text-sm</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Buttons</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <span>+</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Form Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Input Fields</h3>
              <Input placeholder="Default input" />
              <Input placeholder="Small input" size="sm" />
              <Input placeholder="Large input" size="lg" />
              <Input placeholder="Disabled input" disabled />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Select</h3>
              <Select
                options={selectOptions}
                placeholder="Select an option"
              />
              <Select
                options={selectOptions}
                placeholder="Small select"
                size="sm"
              />
              <Select
                options={selectOptions}
                placeholder="Large select"
                size="lg"
              />
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  This is the card content area where you can put any content.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  A simple card without footer.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Avatar fallback="JD" />
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        </section>

        {/* Avatars */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Avatars</h2>
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-center">
              <Avatar size="sm" fallback="JD" className="mb-2" />
              <p className="text-sm text-gray-600">Small</p>
            </div>
            <div className="text-center">
              <Avatar size="default" fallback="JD" className="mb-2" />
              <p className="text-sm text-gray-600">Default</p>
            </div>
            <div className="text-center">
              <Avatar size="lg" fallback="JD" className="mb-2" />
              <p className="text-sm text-gray-600">Large</p>
            </div>
            <div className="text-center">
              <Avatar size="xl" fallback="JD" className="mb-2" />
              <p className="text-sm text-gray-600">Extra Large</p>
            </div>
          </div>
        </section>

        {/* Spacing Scale */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Spacing Scale</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-primary-500 rounded"></div>
              <span className="text-sm font-medium">4px (0.25rem)</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary-500 rounded"></div>
              <span className="text-sm font-medium">8px (0.5rem)</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-500 rounded"></div>
              <span className="text-sm font-medium">16px (1rem)</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-primary-500 rounded"></div>
              <span className="text-sm font-medium">24px (1.5rem)</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-32 bg-primary-500 rounded"></div>
              <span className="text-sm font-medium">32px (2rem)</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DesignSystemShowcase
