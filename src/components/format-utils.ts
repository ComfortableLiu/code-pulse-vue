import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/parser-babel';
import prettierPluginEstree from "prettier/plugins/estree";

/**
 * 格式化代码
 * @param text
 * @param parser - babel | typescript | html | css
 */
export async function formatCode(text: string, parser: 'babel' | 'typescript' | 'html' | 'css' = 'babel') {
  try {
    return prettier.format(text, {
      parser: parser,
      tabWidth: 2,
      singleQuote: true,
      semi: false,
      plugins: [
        parserBabel,
        prettierPluginEstree,
      ],
    });
  } catch (error) {
    console.error('格式化失败:', error);
    return text;
  }
}
