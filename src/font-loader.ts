export class FontLoader {
  public static async loadAllFonts(fonts: string[], text: string[]): Promise<void> {
    const fontRequest = fonts.map((font) => `family=${font}`);
    const normalizeFontText = this.normalizeFontText(text);

    const fontResponse = await fetch(`https://fonts.googleapis.com/css2?${fontRequest.join('&')}&display=swap&text=${normalizeFontText}`);
    if (!fontResponse.ok) {
      return;
    }

    const rawText = (await fontResponse.text()).replace(/\n/g, '');
    const fontSections = rawText.match(/@font-face \{.+?\}/g);

    if (!fontSections) {
      return;
    }

    await Promise.all(fontSections.map(this.loadFont));
  }

  private static normalizeFontText(strings: string[]): string {
    const uniqueChars = new Set(strings.join('').split(''));
    return Array.from(uniqueChars).join('').replace(/\s+/, '');
  }

  private static async loadFont(fontSection: string) {
    const fontUrl = fontSection.match(/url\(.+?\)/)?.[0];
    const fontName = fontSection.match(/font-family:\s*'(.+?)';/)?.[1];

    if (!fontUrl || !fontName) {
      return;
    }

    const font = new FontFace(fontName, fontUrl);
    await font.load();
    document.fonts.add(font);
  }
}
