"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { categories } from "@/lib/placeholder-data"
import { useLanguage } from "@/components/language-provider"

export function ProductFilters() {
  const { t } = useLanguage()
  const [priceRange, setPriceRange] = useState([0, 10000000])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{t.products.filters}</h3>
        <Button variant="ghost" size="sm" className="text-xs h-8">
          {t.products.clearAll}
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "status"]} className="w-full">
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">{t.products.category}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-reverse space-x-2">
                  <Checkbox id={`cat-${category.id}`} />
                  <Label htmlFor={`cat-${category.id}`} className="text-sm font-normal cursor-pointer">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">{t.products.priceRange}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-4 px-1">
              <Slider
                defaultValue={[0, 10000000]}
                max={10000000}
                step={100000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-4"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{priceRange[0].toLocaleString()} {t.products.toman}</span>
                <span>{priceRange[1].toLocaleString()} {t.products.toman}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Status */}
        <AccordionItem value="status">
          <AccordionTrigger className="text-sm font-medium hover:no-underline">{t.products.productStatus}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-reverse space-x-2">
                <Checkbox id="status-stock" />
                <Label htmlFor="status-stock" className="text-sm font-normal cursor-pointer">
                  {t.products.inStockOnly}
                </Label>
              </div>
              <div className="flex items-center space-x-reverse space-x-2">
                <Checkbox id="status-sale" />
                <Label htmlFor="status-sale" className="text-sm font-normal cursor-pointer">
                  {t.products.onSale}
                </Label>
              </div>
              <div className="flex items-center space-x-reverse space-x-2">
                <Checkbox id="status-new" />
                <Label htmlFor="status-new" className="text-sm font-normal cursor-pointer">
                  {t.products.newProducts}
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
