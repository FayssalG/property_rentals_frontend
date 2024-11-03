import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseNumberForHumans(num : number){
  const reversedNum = num.toString().split('').reverse().join(''); 
  return reversedNum.replace(/(\d{3})/g , '$1 ').split('').reverse().join('');
}