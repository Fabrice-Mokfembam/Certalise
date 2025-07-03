const formatRelativeTime = (date: Date | string): string => {
    // Convert to Date object if input is a string
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Validate that dateObj is a valid Date
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
  
    const now = new Date();
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
    }
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }
    return dateObj.toLocaleString();
  };
  
  export { formatRelativeTime };