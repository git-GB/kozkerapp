"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export type SolutionModalProps = {
  isOpen: boolean
  onClose: () => void
  solution: {
    id: string
    title: string
    description: string
    image: string
    features: string[]
    benefits: string[]
    caseStudy?: {
      name: string
      result: string
      description: string
    }
  }
}

export function SolutionModal({ isOpen, onClose, solution }: SolutionModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{solution.title}</DialogTitle>
          <DialogDescription className="text-base text-gray-600 dark:text-gray-300 mt-2">
            {solution.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="relative h-[250px] rounded-lg overflow-hidden mb-4">
              <Image src={solution.image || "/placeholder.svg"} alt={solution.title} fill className="object-cover" />
            </div>

            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
            <ul className="space-y-2 mb-4">
              {solution.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Benefits</h3>
            <ul className="space-y-2 mb-4">
              {solution.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {solution.caseStudy && (
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
                <h3 className="font-bold mb-2">Case Study: {solution.caseStudy.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{solution.caseStudy.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">Results:</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded font-bold">
                    {solution.caseStudy.result}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Button asChild className="w-full">
                <Link href="/contact">Get a Custom Solution</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
