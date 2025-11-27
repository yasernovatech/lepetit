"use client"

import type React from "react"
import { useState, useEffect, memo, useCallback, useMemo } from "react"
import { useLanguage } from "@/components/language-provider"

interface OptionData {
  id: number
  background: string
  icon: string
  mainFa: string
  mainDe: string
  subFa: string
  subDe: string
  defaultColor: string
}

const OptionsSelector: React.FC = memo(() => {
  const { language } = useLanguage()
  const [activeOption, setActiveOption] = useState<number>(0)

  useEffect(() => {
    const images = [
      "/images/baby-clothes.jpg",
      "/images/baby-onesie.jpg",
      "/images/baby-accessories.jpg",
      "/images/soft-baby-doll.jpg"
    ]
    images.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [])

  const allOptionsData: OptionData[] = useMemo(() => [
    {
      id: 0,
      background: "/images/baby-clothes.jpg",
      icon: "fas fa-tshirt",
      mainFa: "لباس نوزاد",
      mainDe: "Babykleidung",
      subFa: "کیفیت بالا و راحتی",
      subDe: "Hohe Qualität",
      defaultColor: "#ED5565",
    },
    {
      id: 1,
      background: "/images/baby-onesie.jpg",
      icon: "fas fa-baby",
      mainFa: "سرهمی نوزاد",
      mainDe: "Baby Strampler",
      subFa: "طراحی زیبا و کاربردی",
      subDe: "Schönes Design",
      defaultColor: "#FC6E51",
    },
    {
      id: 2,
      background: "/images/baby-accessories.jpg",
      icon: "fas fa-hat-cowboy",
      mainFa: "لوازم جانبی",
      mainDe: "Zubehör",
      subFa: "تکمیل کننده استایل",
      subDe: "Stilergänzung",
      defaultColor: "#FFCE54",
    },
    {
      id: 3,
      background: "/images/soft-baby-doll.jpg",
      icon: "fas fa-heart",
      mainFa: "عروسک نرم",
      mainDe: "Weiche Puppe",
      subFa: "دوست صمیمی کودک",
      subDe: "Kinderfreund",
      defaultColor: "#2ECC71",
    },
  ], [])

  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const optionsData = isMobile ? allOptionsData.slice(0, 3) : allOptionsData

  const handleOptionClick = useCallback((optionId: number) => {
    setActiveOption(optionId)
  }, [])

  const handleLinkClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = '/luxury-products'
  }, [])

  const styles = `
    .options-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      height: 500px;
      font-family: 'Roboto', sans-serif;
      transition: 0.25s;
      background: #f5f5f5;
      border-radius: 20px;
      margin: 20px 0;
    }
    
    .options-wrapper {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      overflow: hidden;
      min-width: 600px;
      max-width: 900px;
      width: calc(100% - 100px);
      height: 400px;
    }
    
    .option-item {
      position: relative;
      overflow: hidden;
      width: 80px;
      margin: 10px;
      background-size: cover;
      background-position: center;
      cursor: pointer;
      transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
      border-radius: 30px;
      flex-shrink: 0;
      will-change: width, margin, border-radius, transform;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }
    
    .option-item.active {
      width: 500px;
      margin: 0px;
      border-radius: 40px;
    }
    
    .option-item.active .option-shadow {
      box-shadow: none;
    }
    
    .option-item:not(.active) .option-shadow {
      bottom: -40px;
      box-shadow: none;
    }
    
    .option-item .option-label {
      bottom: 20px;
      left: 20px;
    }
    
    .option-item:not(.active) .option-label {
      bottom: 10px;
      left: 10px;
    }
    
    .option-item.active .option-info > div {
      opacity: 1;
      transform: translateX(0);
    }
    
    .option-item:not(.active) .option-info > div {
      opacity: 0;
      transform: translateX(20px);
    }
    
    .option-shadow {
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      height: 120px;
      transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
      background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
      transform: translate3d(0, 0, 0);
    }
    
    .option-label {
      display: flex;
      position: absolute;
      right: 0px;
      height: 40px;
      transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
      transform: translate3d(0, 0, 0);
    }
    
    .option-icon {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      min-width: 40px;
      max-width: 40px;
      height: 40px;
      border-radius: 100%;
      background-color: white;
    }
    
    .option-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      color: white;
      white-space: pre;
    }
    
    .option-info > div {
      position: relative;
      transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
      transform: translate3d(0, 0, 0);
    }
    
    .option-main {
      font-weight: 700;
      font-size: 1.2rem;
      font-family: 'Vazirmatn', sans-serif;
    }
    
    .option-sub {
      transition-delay: 0.1s;
      font-family: 'Vazirmatn', sans-serif;
      font-weight: 400;
    }
    
    .inactive-options {
      display: none;
    }
    
    /* Mobile Responsive - Same as Desktop */
    @media screen and (max-width: 768px) {
      .options-container {
        height: 350px;
        padding: 15px;
      }
      
      .options-wrapper {
        width: 100%;
        max-width: 100%;
        height: 300px;
        justify-content: center;
      }
      
      .option-item {
        width: 60px;
        margin: 3px;
        border-radius: 20px;
        transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
        transform: translate3d(0, 0, 0);
      }
      
      .option-item.active {
        width: 240px;
        border-radius: 25px;
      }
      
      .option-shadow {
        transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      
      .option-label {
        transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
        bottom: 15px;
        left: 15px;
      }
      
      .option-info > div {
        transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      
      .option-item:not(.active) .option-label {
        bottom: 8px;
        left: 8px;
      }
      
      .option-main {
        font-size: 0.95rem;
      }
      
      .option-sub {
        font-size: 0.75rem;
      }
      
      .option-icon {
        min-width: 32px;
        max-width: 32px;
        height: 32px;
      }
    }
    
    @media screen and (max-width: 480px) {
      .options-container {
        height: 320px;
        padding: 10px;
      }
      
      .options-wrapper {
        height: 280px;
      }
      
      .option-item {
        width: 50px;
        margin: 2px;
      }
      
      .option-item.active {
        width: 200px;
      }
      
      .option-main {
        font-size: 0.85rem;
      }
      
      .option-sub {
        font-size: 0.7rem;
      }
      
      .option-icon {
        min-width: 28px;
        max-width: 28px;
        height: 28px;
        font-size: 12px;
      }
    }
  `

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="options-container">
        <div className="options-wrapper">
          {optionsData.map((option) => (
            <div
              key={option.id}
              className={`option-item ${activeOption === option.id ? "active" : ""}`}
              style={{
                backgroundImage: `url(${option.background})`,
                backgroundSize: "cover",
                "--defaultBackground": option.defaultColor,
              } as React.CSSProperties}
              onClick={() => handleOptionClick(option.id)}
            >
              <div className="option-shadow"></div>
              <div className="option-label">
                <div
                  className="option-icon"
                  style={{
                    color: option.defaultColor,
                  }}
                >
                  <i className={option.icon}></i>
                </div>
                <div className="option-info" onClick={handleLinkClick} style={{ cursor: 'pointer' }}>
                  <div className="option-main">{language === "fa" ? option.mainFa : option.mainDe}</div>
                  <div className="option-sub">{language === "fa" ? option.subFa : option.subDe}</div>
                </div>
              </div>
            </div>
          ))}


        </div>
      </div>
    </>
  )
})

OptionsSelector.displayName = "OptionsSelector"
export default OptionsSelector