import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext, waitForPageReady } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preRender(page) {
    // Inject axe-core for accessibility testing
    await injectAxe(page);
  },

  async postRender(page, context) {
    // Get story specific parameters
    const storyContext = await getStoryContext(page, context);
    
    // Run accessibility tests
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });

    // Wait for the page to be fully rendered
    await waitForPageReady(page);

    // Take DOM snapshot for structural testing
    const elementHandler = await page.$('#storybook-root');
    if (elementHandler) {
      const innerHTML = await elementHandler.innerHTML();
      expect(innerHTML).toMatchSnapshot();
    }

    // Take visual snapshot if not disabled
    if (storyContext.parameters?.visual !== false) {
      const image = await page.screenshot();
      expect(image).toMatchSnapshot();
    }
  },
};

export default config; 