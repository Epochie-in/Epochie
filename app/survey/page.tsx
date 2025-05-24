"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function SurveyPage() {
  const { user, loading, submitUserSurvey } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  // Survey responses
  const [source, setSource] = useState("")
  const [otherSource, setOtherSource] = useState("")
  const [age, setAge] = useState("")
  const [occupation, setOccupation] = useState("")
  const [otherOccupation, setOtherOccupation] = useState("")
  const [useCase, setUseCase] = useState("")
  const [otherUseCase, setOtherUseCase] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }

    // If user has already completed the survey, redirect to home
    if (user && user.surveyCompleted) {
      router.push("/")
    }
  }, [user, loading, router])

const handleNext = () => {
  const isValid = steps[currentStep].validation?.()
  if (!isValid) {
    setMessage({ type: "error", text: "Please complete the required field(s) before proceeding." })
    return
  }

  if (currentStep < steps.length - 1) {
    setCurrentStep(currentStep + 1)
    setMessage({ type: "", text: "" }) // Clear any error messages
  }
}


  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setMessage({ type: "", text: "" })

    try {
      // Prepare survey data
      const surveyData = {
        source: source === "other" ? otherSource : source,
        age,
        occupation: occupation === "other" ? otherOccupation : occupation,
        useCase: useCase === "other" ? otherUseCase : useCase,
        additionalInfo,
      }

      const success = await submitUserSurvey(surveyData)

      if (success) {
        setMessage({ type: "success", text: "Thank you for completing the survey!" })
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } else {
        throw new Error("Failed to submit survey")
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "An error occurred while submitting the survey",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    {
      title: "How did you hear about us?",
      content: (
        <div className="space-y-6">
          <RadioGroup value={source} onValueChange={setSource}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="search_engine" id="search_engine" />
                <Label htmlFor="search_engine">Search Engine (Google, Bing, etc.)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="social_media" id="social_media" />
                <Label htmlFor="social_media">Social Media</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="friend_referral" id="friend_referral" />
                <Label htmlFor="friend_referral">Friend or Colleague</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="blog_article" id="blog_article" />
                <Label htmlFor="blog_article">Blog or Article</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other_source" />
                <Label htmlFor="other_source">Other</Label>
              </div>
              {source === "other" && (
                <div className="pl-6 mt-2">
                  <Input
                    placeholder="Please specify"
                    value={otherSource}
                    onChange={(e) => setOtherSource(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              )}
            </div>
          </RadioGroup>
        </div>
      ),
      validation: () => !!source && (source !== "other" || !!otherSource),
    },
    {
      title: "What is your age group?",
      content: (
        <div className="space-y-6">
          <RadioGroup value={age} onValueChange={setAge}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="under_18" id="under_18" />
                <Label htmlFor="under_18">Under 18</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="18_24" id="18_24" />
                <Label htmlFor="18_24">18-24</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="25_34" id="25_34" />
                <Label htmlFor="25_34">25-34</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="35_44" id="35_44" />
                <Label htmlFor="35_44">35-44</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="45_54" id="45_54" />
                <Label htmlFor="45_54">45-54</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="55_plus" id="55_plus" />
                <Label htmlFor="55_plus">55+</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prefer_not_to_say" id="prefer_not_to_say" />
                <Label htmlFor="prefer_not_to_say">Prefer not to say</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      ),
      validation: () => !!age,
    },
    {
      title: "What is your occupation?",
      content: (
        <div className="space-y-6">
          <RadioGroup value={occupation} onValueChange={setOccupation}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="developer" id="developer" />
                <Label htmlFor="developer">Developer/Engineer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="designer" id="designer" />
                <Label htmlFor="designer">Designer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="researcher" id="researcher" />
                <Label htmlFor="researcher">Researcher/Academic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manager" id="manager" />
                <Label htmlFor="manager">Manager/Executive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="entrepreneur" id="entrepreneur" />
                <Label htmlFor="entrepreneur">Entrepreneur</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other_occupation" />
                <Label htmlFor="other_occupation">Other</Label>
              </div>
              {occupation === "other" && (
                <div className="pl-6 mt-2">
                  <Input
                    placeholder="Please specify"
                    value={otherOccupation}
                    onChange={(e) => setOtherOccupation(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              )}
            </div>
          </RadioGroup>
        </div>
      ),
      validation: () => !!occupation && (occupation !== "other" || !!otherOccupation),
    },
    {
      title: "What do you plan to use our services for?",
      content: (
        <div className="space-y-6">
          <RadioGroup value={useCase} onValueChange={setUseCase}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal_assistant" id="personal_assistant" />
                <Label htmlFor="personal_assistant">Personal AI Assistant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="research" id="research" />
                <Label htmlFor="research">Research and Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="content_creation" id="content_creation" />
                <Label htmlFor="content_creation">Content Creation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="programming" id="programming" />
                <Label htmlFor="programming">Programming/Coding Assistance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business">Business Applications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="education" id="education" />
                <Label htmlFor="education">Education and Learning</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="just_exploring" id="just_exploring" />
                <Label htmlFor="just_exploring">Just Exploring</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other_usecase" />
                <Label htmlFor="other_usecase">Other</Label>
              </div>
              {useCase === "other" && (
                <div className="pl-6 mt-2">
                  <Input
                    placeholder="Please specify"
                    value={otherUseCase}
                    onChange={(e) => setOtherUseCase(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              )}
            </div>
          </RadioGroup>
        </div>
      ),
      validation: () => !!useCase && (useCase !== "other" || !!otherUseCase),
    },
    {
      title: "Any additional information you'd like to share?",
      content: (
        <div className="space-y-6">
          <Textarea
            placeholder="Share any other information, feedback, or expectations (optional)"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="min-h-[150px] bg-gray-800 border-gray-700"
          />
        </div>
      ),
      validation: () => true, // Optional field
    },
    {
      title: "Thank you!",
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-xl font-bold">Thanks for taking the time to complete our survey!</h3>
          <p className="text-gray-400">
            Your feedback helps us improve our services and tailor them to better meet your needs.
          </p>
        </div>
      ),
      validation: () => true,
    },
  ]

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isValid = currentStepData.validation()

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Help Us Get to Know You</h1>
            <p className="text-gray-400">Please answer a few quick questions to help us personalize your experience</p>
          </div>

          {message.text && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className={
                message.type === "error"
                  ? "bg-red-900/50 border-red-800 text-white mb-6"
                  : "bg-green-900/50 border-green-800 text-white mb-6"
              }
            >
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">{currentStepData.title}</h2>
              <span className="text-sm text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            {currentStepData.content}

            <div className="flex justify-between mt-8">
              {currentStep > 0 && !isLastStep && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="rounded-full border-gray-700 text-white hover:bg-gray-800"
                >
                  Previous
                </Button>
              )}
              {!isLastStep ? (
                <Button
                  onClick={handleNext}
                  disabled={!isValid}
                  className="rounded-full bg-white text-black hover:bg-gray-200 ml-auto"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="rounded-full bg-white text-black hover:bg-gray-200 ml-auto"
                >
                  {isSubmitting ? "Submitting..." : "Complete Survey"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
