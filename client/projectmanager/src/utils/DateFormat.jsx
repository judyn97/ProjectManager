export function formatDateToLong(dateString) {
    const date = new Date(dateString);  
    
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short', 
        year: 'numeric',
    });
}