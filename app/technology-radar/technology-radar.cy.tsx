import TechnologyRadar from "./page";

import { BLIPS_TEST_CONTENT } from "@/data/radar/testing-blips";
import { chartConfig } from "./lib/config";

describe('<TechnologyRadar/>', () => {
  it('should render and display radar in expected format', () => {
    cy.mount(<TechnologyRadar />);
    // general svg traits
    cy.get('svg').should('have.attr', 'width', chartConfig.sizePx).should('have.attr', 'height', chartConfig.sizePx);

    // ring labels
    chartConfig.rings.forEach((ring) => {
      cy.get(`[data-cy=ring-label-left-${ring.title}]`).should('have.html', ring.title.toUpperCase());
      cy.get(`[data-cy=ring-label-right-${ring.title}]`).should('have.html', ring.title.toUpperCase());
    });

    // blips
    cy.get('[id^="blip-symbol-"]').should('have.length', BLIPS_TEST_CONTENT.length);
    cy.get('[id^="blip-tooltip-"]').should('have.length', BLIPS_TEST_CONTENT.length);
  })
});

export { }
