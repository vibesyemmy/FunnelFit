/**
 * Date formatting utilities for consistent date display across the application
 */

/**
 * Formats a date string or Date object to "1 Jun 2025" format
 * @param date - Date string (YYYY-MM-DD) or Date object
 * @returns Formatted date string in "1 Jun 2025" format
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date'
  }
  
  return dateObj.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

/**
 * Formats a date string or Date object to "1 Jun 2025, 10:30 AM" format
 * @param date - Date string or Date object
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date'
  }
  
  const formattedDate = formatDate(dateObj)
  const formattedTime = dateObj.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
  
  return `${formattedDate}, ${formattedTime}`
}

/**
 * Formats a date for display in "Due 1 Jun 2025" format
 * @param date - Date string or Date object
 * @returns Formatted string with "Due" prefix
 */
export const formatDueDate = (date: string | Date): string => {
  return `Due ${formatDate(date)}`
}

/**
 * Formats a date for display with relative context (e.g., "1 Jun 2025 (3 days ago)")
 * @param date - Date string or Date object
 * @returns Formatted date with relative time context
 */
export const formatDateWithRelative = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffTime = now.getTime() - dateObj.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  const formattedDate = formatDate(dateObj)
  
  if (diffDays === 0) {
    return `${formattedDate} (today)`
  } else if (diffDays === 1) {
    return `${formattedDate} (yesterday)`
  } else if (diffDays > 1) {
    return `${formattedDate} (${diffDays} days ago)`
  } else if (diffDays === -1) {
    return `${formattedDate} (tomorrow)`
  } else {
    return `${formattedDate} (in ${Math.abs(diffDays)} days)`
  }
}