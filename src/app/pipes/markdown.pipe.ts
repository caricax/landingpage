import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    let result = value;
    
    // Group consecutive blockquotes
    const lines = result.split('\n');
    let inBlockquote = false;
    let blockquoteContent: string[] = [];
    const newLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().startsWith('>')) {
        inBlockquote = true;
        blockquoteContent.push(line.trim().replace(/^>\s?/, ''));
      } else {
        if (inBlockquote) {
          newLines.push(`<blockquote class="pl-4 border-l-4 border-caricax-green text-gray-700 dark:text-gray-300 my-4 py-3 bg-caricax-green/5 dark:bg-caricax-green/10 rounded-r-lg shadow-sm italic">\n${blockquoteContent.join('\n')}\n</blockquote>`);
          inBlockquote = false;
          blockquoteContent = [];
        }
        newLines.push(line);
      }
    }
    
    if (inBlockquote) {
      newLines.push(`<blockquote class="pl-4 border-l-4 border-caricax-green text-gray-700 dark:text-gray-300 my-4 py-3 bg-caricax-green/5 dark:bg-caricax-green/10 rounded-r-lg shadow-sm italic">\n${blockquoteContent.join('\n')}\n</blockquote>`);
    }
    
    result = newLines.join('\n');
    
    // Renderizar **bold**
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-caricax-green dark:text-caricax-green">$1</strong>');
    
    // Renderizar *italic*
    result = result.replace(/\*(.*?)\*/g, '<em class="italic text-gray-800 dark:text-gray-200">$1</em>');
    
    // Renderizar _italic_ (usado para _ganiza_)
    result = result.replace(/_(.*?)_/g, '<em class="italic text-caricax-orange">$1</em>');
    
    return result;
  }
}
