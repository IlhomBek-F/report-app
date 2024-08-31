
export function downloadCSV(data: any[], filename = 'report-data') {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function convertToCSV(data: any[]): string {
    const array = [Object.keys(data[0])].concat(data);
    return array.map(row => {
      return Object.values(row).join(',');
    }).join('\n');
  }