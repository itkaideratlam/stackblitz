export const exportToWord = (content: HTMLElement, filename: string) => {
  const html = content.innerHTML;
  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.doc`;
  link.click();
  URL.revokeObjectURL(url);
};