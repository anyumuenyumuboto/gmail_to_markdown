// markdown.test.ts

import { createMarkdownFromHtml } from '../src/markdown';

describe('createMarkdownFromHtml', () => {
	it('should not include content inside <style> tags in the output markdown', () => {
		const html = `
			<h1>Hello</h1>
			<style>
				body { color: red; }
			</style>
			<p>This is a paragraph.</p>
		`;

		const markdown = createMarkdownFromHtml(html);

		expect(markdown).not.toContain('body { color: red; }');
		expect(markdown).toContain('# Hello');
		expect(markdown).toContain('This is a paragraph.');
	});

	it('should also remove <script> tags and their content', () => {
		const html = `
			<p>Text before script</p>
			<script>
				console.log("hello");
			</script>
			<p>Text after script</p>
		`;

		const markdown = createMarkdownFromHtml(html);

		expect(markdown).not.toContain('console.log');
		expect(markdown).toContain('Text before script');
		expect(markdown).toContain('Text after script');
	});

	it('should handle multiple style tags', () => {
		const html = `
			<style>.a { color: blue; }</style>
			<p>Content</p>
			<style>.b { font-size: 14px; }</style>
		`;

		const markdown = createMarkdownFromHtml(html);

		expect(markdown).not.toContain('.a { color: blue; }');
		expect(markdown).not.toContain('.b { font-size: 14px; }');
		expect(markdown).toContain('Content');
	});
});
